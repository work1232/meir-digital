"use client";

import { useEffect, useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Inbox, TrendingUp, TriangleAlert, Users } from "lucide-react";
import { toast } from "sonner";
import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useAuth } from "@/components/providers/auth-provider";
import { getSupabase } from "@/lib/supabase/client";
import type { ContactMessage } from "@/lib/types";

const DAY_MS = 24 * 60 * 60 * 1000;

export function AdminContent() {
  const t = useTranslations("admin");
  const tAuth = useTranslations("auth");
  const tCommon = useTranslations("common");
  const locale = useLocale();
  const { user, profile, loading, configured } = useAuth();

  const [userCount, setUserCount] = useState<number | null>(null);
  const [messages, setMessages] = useState<ContactMessage[] | null>(null);

  const isAdmin = Boolean(profile?.is_admin);

  useEffect(() => {
    if (!isAdmin) return;
    const supabase = getSupabase();
    if (!supabase) return;

    supabase
      .from("profiles")
      .select("id", { count: "exact", head: true })
      .then(({ count }) => setUserCount(count ?? 0));

    supabase
      .from("contact_messages")
      .select("*")
      .order("created_at", { ascending: false })
      .then(({ data }) => setMessages((data as ContactMessage[]) ?? []));
  }, [isAdmin]);

  const weekCount = useMemo(() => {
    if (!messages) return 0;
    const weekAgo = Date.now() - 7 * DAY_MS;
    return messages.filter((m) => new Date(m.created_at).getTime() > weekAgo)
      .length;
  }, [messages]);

  const chartData = useMemo(() => {
    const days = Array.from({ length: 14 }, (_, i) => {
      const date = new Date(Date.now() - (13 - i) * DAY_MS);
      return {
        label: new Intl.DateTimeFormat(locale === "he" ? "he-IL" : "en-US", {
          day: "numeric",
          month: "numeric",
        }).format(date),
        key: date.toDateString(),
        count: 0,
      };
    });
    for (const message of messages ?? []) {
      const key = new Date(message.created_at).toDateString();
      const day = days.find((d) => d.key === key);
      if (day) day.count += 1;
    }
    return days;
  }, [messages, locale]);

  const maxCount = Math.max(1, ...chartData.map((d) => d.count));

  const markHandled = async (id: number) => {
    const supabase = getSupabase();
    if (!supabase) return;
    const { error } = await supabase
      .from("contact_messages")
      .update({ status: "handled" })
      .eq("id", id);
    if (error) {
      toast.error(tAuth("errors.generic"));
      return;
    }
    setMessages(
      (prev) =>
        prev?.map((m) => (m.id === id ? { ...m, status: "handled" } : m)) ??
        null
    );
  };

  if (!configured) {
    return (
      <Shell title={t("title")} subtitle={t("subtitle")}>
        <Banner>{tAuth("errors.notConfigured")}</Banner>
      </Shell>
    );
  }

  if (loading || (user && profile === null)) {
    return (
      <Shell title={t("title")} subtitle={t("subtitle")}>
        <div className="grid gap-4 sm:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>
        <Skeleton className="mt-6 h-64 rounded-2xl" />
      </Shell>
    );
  }

  if (!user || !isAdmin) {
    return (
      <Shell title={t("title")} subtitle={t("subtitle")}>
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-border bg-card/60 p-10 text-center backdrop-blur">
          <Banner>{t("notAdmin")}</Banner>
          <Button asChild variant="outline">
            <Link href="/">{tCommon("backHome")}</Link>
          </Button>
        </div>
      </Shell>
    );
  }

  const dateFormat = new Intl.DateTimeFormat(
    locale === "he" ? "he-IL" : "en-US",
    { dateStyle: "short", timeStyle: "short" }
  );

  return (
    <Shell title={t("title")} subtitle={t("subtitle")}>
      <div className="grid gap-4 sm:grid-cols-3">
        <StatCard
          icon={<Users className="size-5" />}
          label={t("stats.totalUsers")}
          value={userCount}
        />
        <StatCard
          icon={<Inbox className="size-5" />}
          label={t("stats.totalMessages")}
          value={messages?.length ?? null}
        />
        <StatCard
          icon={<TrendingUp className="size-5" />}
          label={t("stats.weekMessages")}
          value={messages ? weekCount : null}
        />
      </div>

      <Card className="mt-6 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="font-heading text-base">
            {t("chartTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex h-36 items-end gap-1.5" dir="ltr">
            {chartData.map((day) => (
              <div
                key={day.key}
                className="group flex flex-1 flex-col items-center gap-1"
                title={`${day.label}: ${day.count}`}
              >
                <span className="text-[10px] tabular-nums text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100">
                  {day.count}
                </span>
                <div
                  className="w-full rounded-t-md bg-brand-gradient transition-all"
                  style={{
                    height: `${Math.max(6, (day.count / maxCount) * 100)}%`,
                    opacity: day.count === 0 ? 0.15 : 1,
                  }}
                />
                <span className="text-[10px] text-muted-foreground">
                  {day.label}
                </span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6 bg-card/60 backdrop-blur">
        <CardHeader>
          <CardTitle className="font-heading text-base">
            {t("messagesTitle")}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!messages || messages.length === 0 ? (
            <p className="py-8 text-center text-sm text-muted-foreground">
              {t("noMessages")}
            </p>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t("table.name")}</TableHead>
                    <TableHead>{t("table.phone")}</TableHead>
                    <TableHead>{t("table.package")}</TableHead>
                    <TableHead className="min-w-56">
                      {t("table.message")}
                    </TableHead>
                    <TableHead>{t("table.date")}</TableHead>
                    <TableHead>{t("table.status")}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {messages.map((message) => (
                    <TableRow key={message.id}>
                      <TableCell className="font-medium">
                        {message.name}
                      </TableCell>
                      <TableCell dir="ltr">
                        <a
                          href={`https://wa.me/${message.phone.replace(/\D/g, "").replace(/^0/, "972")}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-brand-2 hover:underline"
                        >
                          {message.phone}
                        </a>
                      </TableCell>
                      <TableCell>{message.package ?? "—"}</TableCell>
                      <TableCell
                        className="max-w-72 truncate"
                        title={message.message}
                      >
                        {message.message}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {dateFormat.format(new Date(message.created_at))}
                      </TableCell>
                      <TableCell>
                        {message.status === "new" ? (
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => markHandled(message.id)}
                            className="h-7 gap-1.5 text-xs"
                          >
                            <Badge className="bg-brand-gradient text-white">
                              {t("statusNew")}
                            </Badge>
                            {t("markHandled")}
                          </Button>
                        ) : (
                          <Badge variant="secondary">
                            {t("statusHandled")}
                          </Badge>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </CardContent>
      </Card>
    </Shell>
  );
}

function Banner({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="flex items-start justify-center gap-2 rounded-lg border border-amber-500/30 bg-amber-500/10 p-4 text-sm text-amber-600 dark:text-amber-400"
      role="alert"
    >
      <TriangleAlert className="mt-0.5 size-4 shrink-0" />
      {children}
    </p>
  );
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode;
  label: string;
  value: number | null;
}) {
  return (
    <div className="rounded-2xl border border-border bg-card/60 p-6 backdrop-blur">
      <span className="mb-3 inline-flex size-10 items-center justify-center rounded-xl bg-secondary text-brand-2">
        {icon}
      </span>
      <p className="font-heading text-3xl font-extrabold text-gradient">
        {value === null ? "…" : value}
      </p>
      <p className="mt-1 text-sm text-muted-foreground">{label}</p>
    </div>
  );
}

function Shell({
  title,
  subtitle,
  children,
}: {
  title: string;
  subtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="relative min-h-svh px-4 pb-24 pt-32 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-heading text-3xl font-bold md:text-4xl">{title}</h1>
        <p className="mb-8 mt-1 text-muted-foreground">{subtitle}</p>
        {children}
      </div>
    </section>
  );
}
