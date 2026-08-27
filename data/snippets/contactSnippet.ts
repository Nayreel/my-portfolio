export const CONTACT_CODE_SNIPPET = `"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle, Loader2, AlertCircle, Phone, MapPin } from "lucide-react";

export interface ContactFormData {
  name: string;
  email: string;
  roleType: string;
  message: string;
  honeypot?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  roleType?: string;
  message?: string;
}

const INQUIRY_OPTIONS = [
  { value: "Software Engineer Role", label: "Full-Time Software Engineer Role" },
  { value: "n8n Workflow Automation", label: "n8n Workflow & ERP/CRM Automation" },
  { value: "Next.js Web Application", label: "Next.js Web Application Development" },
  { value: "Technical Coffee Chat", label: "Technical Coffee Chat / Collaboration" },
  { value: "Other Project Inquiry", label: "Other Project Inquiry" },
];

export default function ContactModule() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: "",
    email: "",
    roleType: "Software Engineer Role",
    message: "",
    honeypot: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^\\S+@\\S+\\.\\S+$/.test(formData.email)) {
      newErrors.email = "Please provide a valid email address.";
    }
    if (!formData.message.trim()) newErrors.message = "Message cannot be empty.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setIsSubmitted(true);
        setFormData({ name: "", email: "", roleType: "Software Engineer Role", message: "" });
      }
    } catch (err) {
      console.error("Submission error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="max-w-4xl mx-auto space-y-8 p-6 lg:p-10 text-white">
      <div>
        <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
          <Mail className="w-3.5 h-3.5" />
          <span>Direct Dispatch</span>
        </div>
        <h1 className="text-3xl font-extrabold tracking-tight">Get in Touch with Lee Ryan</h1>
        <p className="text-xs sm:text-sm text-zinc-400 mt-2">
          Interested in hiring me for a Software Engineering role, n8n workflow automation, or full-stack Next.js web application development? Drop a message below.
        </p>
      </div>

      {isSubmitted ? (
        <div className="p-8 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl text-center space-y-4">
          <CheckCircle className="w-12 h-12 text-emerald-400 mx-auto" />
          <h3 className="text-xl font-bold">Message Dispatched!</h3>
          <p className="text-xs sm:text-sm text-zinc-300">
            Thanks for reaching out! Lee Ryan will reply to your message shortly.
          </p>
          <button
            onClick={() => setIsSubmitted(false)}
            className="px-4 py-2 bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs rounded-lg cursor-pointer"
          >
            Send Another Message
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-[#16171b] border border-[#272930] rounded-2xl p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1">Your Name *</label>
              <input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g. John Doe"
                className="w-full bg-[#121214] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              {errors.name && <p className="text-[11px] text-rose-400 mt-1">{errors.name}</p>}
            </div>

            <div>
              <label className="text-xs font-mono text-zinc-300 block mb-1">Your Email *</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="john@company.com"
                className="w-full bg-[#121214] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
              />
              {errors.email && <p className="text-[11px] text-rose-400 mt-1">{errors.email}</p>}
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-1">Topic / Inquiry Type *</label>
            <select
              value={formData.roleType}
              onChange={(e) => setFormData({ ...formData, roleType: e.target.value })}
              className="w-full bg-[#121214] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            >
              {INQUIRY_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-zinc-300 block mb-1">Message *</label>
            <textarea
              rows={4}
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Tell me about your project, team, or role requirements..."
              className="w-full bg-[#121214] border border-[#2d303d] rounded-lg px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
            />
            {errors.message && <p className="text-[11px] text-rose-400 mt-1">{errors.message}</p>}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs py-2.5 rounded-lg flex items-center justify-center space-x-2 cursor-pointer transition-colors disabled:opacity-60"
          >
            {isSubmitting ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
            <span>{isSubmitting ? "Sending..." : "Send Message to Lee Ryan"}</span>
          </button>
        </form>
      )}

      <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 pt-2 font-mono">
        <span className="flex items-center gap-1">✉️ leeryan307@gmail.com</span>
        <span className="flex items-center gap-1">📞 +63 929-834-1434</span>
        <span className="flex items-center gap-1">📍 Olongapo City, Philippines</span>
      </div>
    </section>
  );
}
`;
