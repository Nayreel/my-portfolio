"use client";

import React, { useState } from "react";
import { Mail, Send, CheckCircle } from "lucide-react";
import { GithubIcon, LinkedinIcon } from "@/components/icons";
import confetti from "canvas-confetti";
import { DEVELOPER_PROFILE } from "@/data";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { toast } from "@/components/ui/toast";

export function ContactPreview() {
  const [contactSubmitted, setContactSubmitted] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: "",
    email: "",
    message: "",
    roleType: "Software Engineer Role",
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(DEVELOPER_PROFILE.email);
    toast.success("Email copied to clipboard", {
      description: DEVELOPER_PROFILE.email,
    });
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setContactSubmitted(true);
    toast.success("Message Dispatched!", {
      description:
        "Thanks for reaching out! Lee Ryan will reply to your message shortly.",
    });
    confetti({
      particleCount: 90,
      spread: 70,
      origin: { y: 0.6 },
    });
  };

  return (
    <ScrollArea className="flex-1 w-full bg-[#121214] text-white min-h-0">
      <div className="max-w-2xl mx-auto space-y-8 p-6 lg:p-10">
        <div>
          <div className="inline-flex items-center space-x-1.5 text-xs text-sky-400 font-mono uppercase tracking-wider mb-1">
            <Mail className="w-3.5 h-3.5" />
            <span>Direct Dispatch</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight">
            Get in Touch with Lee Ryan
          </h1>
          <p className="text-xs sm:text-sm text-zinc-400 mt-2">
            Interested in hiring me for a Software Engineering role, n8n workflow automation,
            or full-stack Next.js web application development? Drop a message below.
          </p>
        </div>

        {contactSubmitted ? (
          <Card className="p-8 bg-emerald-500/10 border-emerald-500/30 text-center space-y-4 text-white">
            <div className="w-12 h-12 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-white">Message Dispatched!</h3>
            <p className="text-xs sm:text-sm text-zinc-300 max-w-md mx-auto">
              Thanks for reaching out! Your message was received. You can also write
              directly to{" "}
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
              className="bg-emerald-500 hover:bg-emerald-400 text-black font-semibold text-xs"
            >
              Send Another Message
            </Button>
          </Card>
        ) : (
          <Card className="bg-[#16171b] border-[#272930] p-6 lg:p-8 shadow-xl text-white">
            <form onSubmit={handleFormSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Your Name
                  </label>
                  <Input
                    required
                    value={contactForm.name}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, name: e.target.value })
                    }
                    placeholder="e.g. John Doe"
                    className="bg-[#121214] border-[#2d303d] text-xs text-white"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-mono text-zinc-300">
                    Your Email
                  </label>
                  <Input
                    type="email"
                    required
                    value={contactForm.email}
                    onChange={(e) =>
                      setContactForm({ ...contactForm, email: e.target.value })
                    }
                    placeholder="john@company.com"
                    className="bg-[#121214] border-[#2d303d] text-xs text-white"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">
                  Topic / Inquiry Type
                </label>
                <select
                  value={contactForm.roleType}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, roleType: e.target.value })
                  }
                  className="w-full bg-[#121214] border border-[#2d303d] rounded-md px-3 py-2 text-xs text-white focus:outline-none focus:border-sky-500"
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
                </select>
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-mono text-zinc-300">Message</label>
                <Textarea
                  rows={4}
                  required
                  value={contactForm.message}
                  onChange={(e) =>
                    setContactForm({ ...contactForm, message: e.target.value })
                  }
                  placeholder="Tell me about your project, team, or role requirements..."
                  className="bg-[#121214] border-[#2d303d] text-xs text-white"
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-sky-500 hover:bg-sky-400 text-black font-bold text-xs shadow-md shadow-sky-500/20"
              >
                <Send className="w-3.5 h-3.5 mr-2" />
                <span>Send Message to Lee Ryan</span>
              </Button>
            </form>
          </Card>
        )}

        {/* Social Quick Links */}
        <div className="flex flex-wrap items-center justify-center gap-6 text-xs text-zinc-400 pt-2">
          <button
            onClick={handleCopyEmail}
            className="flex items-center space-x-1 hover:text-sky-400 transition-colors"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>{DEVELOPER_PROFILE.email}</span>
          </button>
          <a
            href="https://github.com/Nayreel"
            target="_blank"
            rel="noreferrer"
            className="flex items-center space-x-1 hover:text-white transition-colors"
          >
            <GithubIcon className="w-3.5 h-3.5" />
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
