"use server";

import { createClient } from "@/lib/supabase/server";
import type { ContactMessage, Profile } from "@/lib/types";

export type AuthActionError =
  | "not_configured"
  | "invalid_credentials"
  | "email_not_confirmed"
  | "user_already_exists"
  | "unknown";

export type AuthUser = {
  id: string;
  email: string | null;
  createdAt: string;
};

export async function signInAction(
  email: string,
  password: string
): Promise<{ error: AuthActionError | null }> {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured" };

  try {
    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    if (!error) return { error: null };

    const message = error.message.toLowerCase();
    if (
      error.code === "email_not_confirmed" ||
      message.includes("not confirmed")
    )
      return { error: "email_not_confirmed" };
    if (error.code === "invalid_credentials" || message.includes("invalid"))
      return { error: "invalid_credentials" };
    return { error: "unknown" };
  } catch {
    return { error: "unknown" };
  }
}

export async function signUpAction(input: {
  name: string;
  email: string;
  phone: string;
  password: string;
}): Promise<{ error: AuthActionError | null; needsConfirmation: boolean }> {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured", needsConfirmation: false };

  const { data, error } = await supabase.auth.signUp({
    email: input.email,
    password: input.password,
    options: {
      data: { full_name: input.name, phone: input.phone },
    },
  });

  if (error) {
    const message = error.message.toLowerCase();
    if (
      error.code === "user_already_exists" ||
      message.includes("already registered")
    )
      return { error: "user_already_exists", needsConfirmation: false };
    return { error: "unknown", needsConfirmation: false };
  }

  return { error: null, needsConfirmation: !data.session };
}

export async function signOutAction(): Promise<void> {
  const supabase = await createClient();
  if (supabase) await supabase.auth.signOut();
}

export async function getMeAction(): Promise<{
  configured: boolean;
  user: AuthUser | null;
  profile: Profile | null;
}> {
  const supabase = await createClient();
  if (!supabase) return { configured: false, user: null, profile: null };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { configured: true, user: null, profile: null };

  const { data: profile } = await supabase
    .from("profiles")
    .select("id, full_name, phone, is_admin, created_at")
    .eq("id", user.id)
    .single();

  return {
    configured: true,
    user: {
      id: user.id,
      email: user.email ?? null,
      createdAt: user.created_at,
    },
    profile: (profile as Profile) ?? null,
  };
}

export async function updateProfileAction(input: {
  fullName: string;
  phone: string;
}): Promise<{ error: "unknown" | "not_configured" | null }> {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured" };

  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { error: "unknown" };

  const { error } = await supabase
    .from("profiles")
    .update({ full_name: input.fullName, phone: input.phone })
    .eq("id", user.id);

  return { error: error ? "unknown" : null };
}

export async function submitContactAction(input: {
  name: string;
  phone: string;
  message: string;
  packageName: string | null;
}): Promise<{ error: "unknown" | "not_configured" | null }> {
  const supabase = await createClient();
  if (!supabase) return { error: "not_configured" };

  const { error } = await supabase.from("contact_messages").insert({
    name: input.name,
    phone: input.phone,
    message: input.message,
    package: input.packageName,
  });

  return { error: error ? "unknown" : null };
}

export async function getAdminDataAction(): Promise<{
  ok: boolean;
  usersCount: number;
  messages: ContactMessage[];
}> {
  const supabase = await createClient();
  if (!supabase) return { ok: false, usersCount: 0, messages: [] };

  // RLS is the real gate; this just avoids pointless queries for non-admins.
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return { ok: false, usersCount: 0, messages: [] };

  const [usersRes, messagesRes] = await Promise.all([
    supabase.from("profiles").select("id", { count: "exact", head: true }),
    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false }),
  ]);

  return {
    ok: true,
    usersCount: usersRes.count ?? 0,
    messages: (messagesRes.data as ContactMessage[]) ?? [],
  };
}

export async function markMessageHandledAction(
  id: number
): Promise<{ error: "unknown" | null }> {
  const supabase = await createClient();
  if (!supabase) return { error: "unknown" };

  const { error } = await supabase
    .from("contact_messages")
    .update({ status: "handled" })
    .eq("id", id);

  return { error: error ? "unknown" : null };
}
