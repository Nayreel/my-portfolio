"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, Loader2, AlertCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";
import { DEVELOPER_PROFILE } from "@/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";
import { contactSchema } from "@/lib/validations/contact";
import {
  ContactFormData,
  ContactFormErrors,
  ContactApiResponse,
} from "@/types/contact";

const INITIAL_FORM_STATE: ContactFormData = {
  name: "",
  email: "",
  message: "",
  roleType: "Software Engineer Role",
  honeypot: "",
};

export function ContactPreview() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [contactForm, setContactForm] =
    useState<ContactFormData>(INITIAL_FORM_STATE);
  const [formErrors, setFormErrors] = useState<ContactFormErrors>({});

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    toast.success("Email copied to clipboard", {
      description: DEVELOPER_PROFILE.email,
    });
  };

  const handleInputChange = (field: keyof ContactFormData, value: string) => {
    setContactForm((prev) => ({ ...prev, [field]: value }));
    // Clear error for that field as user types
    if (formErrors[field as keyof ContactFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Client-side Zod validation
    const validationResult = contactSchema.safeParse(contactForm);
    if (!validationResult.success) {
      const fieldErrors: ContactFormErrors = {};
      for (const issue of validationResult.error.issues) {
        const fieldName = issue.path[0] as keyof ContactFormErrors;
        if (fieldName && !fieldErrors[fieldName]) {
          fieldErrors[fieldName] = issue.message;
        }
      }
      setFormErrors(fieldErrors);
      toast.error("Please resolve the validation errors before sending.");
      return;
    }

    setFormErrors({});
    setIsSubmitting(true);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contactForm),
      });

      const data: ContactApiResponse = await response.json();

      if (!response.ok || !data.success) {
        if (data.errors) {
          const apiFieldErrors: ContactFormErrors = {};
          for (const [key, messages] of Object.entries(data.errors)) {
            if (messages && messages.length > 0) {
              apiFieldErrors[key as keyof ContactFormErrors] = messages[0];
            }
          }
          setFormErrors(apiFieldErrors);
        }
        throw new Error(data.message || "Failed to dispatch message.");
      }

      setContactSubmitted(true);
      setContactForm(INITIAL_FORM_STATE);
      toast.success("Message Dispatched!", {
        description:
          "Thanks for reaching out! Lee Ryan will reply to your message shortly.",
      });

      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : "An unexpected error occurred. Please try again.";
      toast.error("Transmission Failed", {
        description: errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-2xl mx-auto space-y-6 sm:space-y-8 p-3.5 sm:p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Dispatch</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Get in Touch with Lee Ryan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Interested in hiring me for a Software Engineering role, n8n
            workflow automation, or full-stack Next.js web application
            development? Drop a message below.
          </p>
        </div>

        {contactSubmitted ? (
          <Card className="p-8 bg-emerald-500/10 border-emerald-500/30 text-center space-y-4 text-white">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">
              Message Dispatched!
            </h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
              Thanks for reaching out! Your message was delivered. You can also
              write directly to{" "}
              <span className="text-sky-300 font-mono">
                {DEVELOPER_PROFILE.email}
              </span>{" "}
              or call{" "}
              <span className="text-emerald-300 font-mono">
                {DEVELOPER_PROFILE.phone}
              </span>
              .
            </p>
            <Button
              onClick={() => setContactSubmitted(false)}
              className="bg-emerald-500 hover:bg-emerald-400 cursor-pointer text-black font-semibold text-xs"
            >
              Send Another Message
            </Button>
          </Card>
        ) : (
          <Card className="bg-[#16171b] border-[#272930] p-4 sm:p-6 lg:p-8 shadow-xl text-white">
            <form onSubmit={handleFormSubmit} className="space-y-5" noValidate>
              {/* Invisible Honeypot Spam Trap */}
              <div className="hidden" aria-hidden="true">
                <label htmlFor="company_website_input">
                  Leave this field blank
                </label>
                <input
                  id="company_website_input"
                  type="text"
                  name="honeypot"
                  value={contactForm.honeypot}
                  onChange={(e) =>
                    handleInputChange("honeypot", e.target.value)
                  }
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Your Name <span className="text-sky-400">*</span>
                  </label>
                  <Input
                    value={contactForm.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="e.g. John Doe"
                    disabled={isSubmitting}
                    className={`bg-[#121214] text-xs text-white transition-colors ${
                      formErrors.name
                        ? "border-rose-500 focus-visible:ring-rose-500"
                        : "border-[#2d303d] focus-visible:border-sky-500"
                    }`}
                  />
                  {formErrors.name && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{formErrors.name}</span>
                    </p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Your Email <span className="text-sky-400">*</span>
                  </label>
                  <Input
                    type="email"
                    value={contactForm.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="john@company.com"
                    disabled={isSubmitting}
                    className={`bg-[#121214] text-xs text-white transition-colors ${
                      formErrors.email
                        ? "border-rose-500 focus-visible:ring-rose-500"
                        : "border-[#2d303d] focus-visible:border-sky-500"
                    }`}
                  />
                  {formErrors.email && (
                    <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-mono">
                      <AlertCircle className="w-3 h-3 flex-shrink-0" />
                      <span>{formErrors.email}</span>
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Topic / Inquiry Type <span className="text-sky-400">*</span>
                </label>
                <select
                  value={contactForm.roleType}
                  onChange={(e) =>
                    handleInputChange("roleType", e.target.value)
                  }
                  disabled={isSubmitting}
                  className={`w-full bg-[#121214] border rounded-md px-3 py-2 text-xs text-white focus:outline-none transition-colors ${
                    formErrors.roleType
                      ? "border-rose-500 focus:border-rose-500"
                      : "border-[#2d303d] focus:border-sky-500"
                  }`}
                >
                  <option value="Software Engineer Role">
                    Full-Time Software Engineer Role
                  </option>
                  <option value="n8n Workflow Automation">
                    n8n Workflow & ERP/CRM Automation
                  </option>
                  <option value="Next.js Web Application">
                    Next.js Web Application Development
                  </option>
                  <option value="Technical Coffee Chat">
                    Technical Coffee Chat / Collaboration
                  </option>
                  <option value="Other Project Inquiry">
                    Other Project Inquiry
                  </option>
                </select>
                {formErrors.roleType && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{formErrors.roleType}</span>
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Message <span className="text-sky-400">*</span>
                </label>
                <Textarea
                  rows={4}
                  value={contactForm.message}
                  onChange={(e) => handleInputChange("message", e.target.value)}
                  placeholder="Tell me about your project, team, or role requirements..."
                  disabled={isSubmitting}
                  className={`bg-[#121214] text-xs text-white transition-colors ${
                    formErrors.message
                      ? "border-rose-500 focus-visible:ring-rose-500"
                      : "border-[#2d303d] focus-visible:border-sky-500"
                  }`}
                />
                {formErrors.message && (
                  <p className="text-[11px] text-rose-400 flex items-center gap-1 mt-1 font-mono">
                    <AlertCircle className="w-3 h-3 flex-shrink-0" />
                    <span>{formErrors.message}</span>
                  </p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20 disabled:opacity-60 transition-all cursor-pointer"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-3.5 h-3.5 mr-2 animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-3.5 h-3.5 mr-2" />
                    <span>Send Message to Lee Ryan</span>
                  </>
                )}
              </Button>
            </form>
          </Card>
        )}

        {/* Social Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 pt-2">
          <Button
            type="button"
            variant="ghost"
            size="xs"
            onClick={handleCopyEmail}
            className="flex items-center space-x-1 hover:text-sky-400 hover:bg-transparent p-0 h-auto font-normal text-xs text-zinc-400 transition-colors cursor-pointer"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{DEVELOPER_PROFILE.email}</span>
          </Button>
          <a
            href="https://github.com/Nayreel"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5 text-sky-400" />
            <span>GitHub (Nayreel)</span>
          </a>
          <a
            href="https://linkedin.com/in/el015"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
          >
            <LinkedinIcon className="w-3.5 h-3.5" />
            <span>LinkedIn (/in/el015)</span>
          </a>
        </div>
      </div>
    </ScrollArea>
  );
}
