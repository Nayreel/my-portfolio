import { z } from "zod";

export const contactSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, { message: "Name must be at least 2 characters." })
    .max(100, { message: "Name must not exceed 100 characters." })
    .regex(/^[a-zA-Z\s'.\-\u00C0-\u024F\u1E00-\u1EFF]+$/, {
      message: "Name contains invalid characters.",
    }),
  email: z
    .string()
    .trim()
    .min(5, { message: "Email is required." })
    .max(254, { message: "Email must not exceed 254 characters." })
    .email({ message: "Please enter a valid email address." }),
  roleType: z
    .string()
    .trim()
    .min(2, { message: "Please select a topic or inquiry type." })
    .max(100, { message: "Inquiry type is too long." }),
  message: z
    .string()
    .trim()
    .min(5, { message: "Message must be at least 5 characters." })
    .max(3000, { message: "Message must not exceed 3,000 characters." }),
  honeypot: z
    .string()
    .max(0, { message: "Spam detected." })
    .optional()
    .or(z.literal("")),
});

export type ContactSchemaInput = z.infer<typeof contactSchema>;

export function sanitizeHtml(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}
