"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { CircleCheck, LoaderCircle, Send } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getSupabase, isSupabaseConfigured } from "@/lib/supabase/client";
import { whatsappLink } from "@/lib/site";

const PHONE_RE = /^[\d+\-\s()]{9,15}$/;
const PACKAGES = ["basic", "business", "premium"] as const;

type Errors = Partial<Record<"name" | "phone" | "message", string>>;

export function ContactForm() {
  const t = useTranslations("contact.form");
  const tPlans = useTranslations("pricing.plans");

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [pkg, setPkg] = useState<string>("");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [submitError, setSubmitError] = useState<string | null>(null);

  const validate = (): boolean => {
    const next: Errors = {};
    if (!name.trim()) next.name = t("errors.nameRequired");
    if (!phone.trim()) next.phone = t("errors.phoneRequired");
    else if (!PHONE_RE.test(phone.trim())) next.phone = t("errors.phoneInvalid");
    if (!message.trim()) next.message = t("errors.messageRequired");
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const reset = () => {
    setName("");
    setPhone("");
    setPkg("");
    setMessage("");
    setErrors({});
    setSubmitError(null);
    setStatus("idle");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);
    if (!validate()) return;

    const packageName = pkg ? tPlans(`${pkg}.name`) : null;

    if (!isSupabaseConfigured) {
      // No backend connected yet — hand the inquiry to WhatsApp instead.
      const text = `${name} | ${phone}${packageName ? ` | ${packageName}` : ""}\n${message}`;
      window.open(whatsappLink(text), "_blank", "noopener,noreferrer");
      setStatus("success");
      return;
    }

    setStatus("sending");
    const supabase = getSupabase()!;
    const { error } = await supabase.from("contact_messages").insert({
      name: name.trim(),
      phone: phone.trim(),
      message: message.trim(),
      package: packageName,
    });

    if (error) {
      setStatus("idle");
      setSubmitError(t("errors.generic"));
      return;
    }
    setStatus("success");
  };

  return (
    <div className="relative rounded-3xl border border-border bg-card/60 p-8 backdrop-blur md:p-10">
      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            key="success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center gap-4 py-10 text-center"
            role="status"
          >
            <span className="flex size-16 items-center justify-center rounded-full bg-brand-gradient text-white glow-sm">
              <CircleCheck className="size-8" />
            </span>
            <h3 className="font-heading text-2xl font-bold">
              {t("successTitle")}
            </h3>
            <p className="max-w-sm text-muted-foreground">{t("successDesc")}</p>
            <Button variant="outline" onClick={reset} className="mt-2">
              {t("sendAnother")}
            </Button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onSubmit={handleSubmit}
            noValidate
            className="space-y-5"
          >
            <h2 className="font-heading text-xl font-bold md:text-2xl">
              {t("title")}
            </h2>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="contact-name">{t("name")}</Label>
                <Input
                  id="contact-name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("namePlaceholder")}
                  aria-invalid={Boolean(errors.name)}
                  autoComplete="name"
                />
                {errors.name && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.name}
                  </p>
                )}
              </div>
              <div className="space-y-2">
                <Label htmlFor="contact-phone">{t("phone")}</Label>
                <Input
                  id="contact-phone"
                  type="tel"
                  dir="ltr"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder={t("phonePlaceholder")}
                  aria-invalid={Boolean(errors.phone)}
                  autoComplete="tel"
                  className="text-start"
                />
                {errors.phone && (
                  <p className="text-sm text-destructive" role="alert">
                    {errors.phone}
                  </p>
                )}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-package">{t("package")}</Label>
              <Select value={pkg} onValueChange={setPkg}>
                <SelectTrigger id="contact-package" className="w-full">
                  <SelectValue placeholder={t("packagePlaceholder")} />
                </SelectTrigger>
                <SelectContent>
                  {PACKAGES.map((key) => (
                    <SelectItem key={key} value={key}>
                      {tPlans(`${key}.name`)} — ₪{tPlans(`${key}.price`)}
                    </SelectItem>
                  ))}
                  <SelectItem value="none">{t("packageNone")}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="contact-message">{t("message")}</Label>
              <Textarea
                id="contact-message"
                rows={5}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t("messagePlaceholder")}
                aria-invalid={Boolean(errors.message)}
              />
              {errors.message && (
                <p className="text-sm text-destructive" role="alert">
                  {errors.message}
                </p>
              )}
            </div>

            {submitError && (
              <p className="text-sm text-destructive" role="alert">
                {submitError}
              </p>
            )}

            {!isSupabaseConfigured && (
              <p className="text-xs text-muted-foreground">
                {t("whatsappFallback")}
              </p>
            )}

            <Button
              type="submit"
              disabled={status === "sending"}
              className="w-full bg-brand-gradient font-semibold text-white shadow-md transition-all hover:brightness-110"
              size="lg"
            >
              {status === "sending" ? (
                <>
                  <LoaderCircle className="size-4 animate-spin" />
                  {t("sending")}
                </>
              ) : (
                <>
                  <Send className="size-4 rtl:-scale-x-100" />
                  {t("submit")}
                </>
              )}
            </Button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
