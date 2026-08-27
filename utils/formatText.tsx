import React from "react";

/**
 * Parses markdown-like text and returns formatted React nodes.
 * Converts:
 * - ***bold italic*** -> <strong><em>...</em></strong>
 * - **bold** -> <strong>...</strong>
 * - *italic* -> <em>...</em>
 * - `code` -> <code>...</code>
 * - [label](url) -> <a ...>...</a>
 * Strips remaining unclosed/stray asterisks.
 */
export function renderFormattedText(text: string): React.ReactNode {
  if (!text) return null;

  // Match inline markdown tokens: ***bold-italic***, **bold**, *italic*, `code`, [text](url)
  const tokenRegex =
    /(\*\*\*[^*]+\*\*\*|\*\*[^*]+\*\*|\*[^*]+\*|`[^`]+`|\[[^\]]+\]\([^)]+\))/g;
  const parts = text.split(tokenRegex);

  return parts.map((part, index) => {
    if (!part) return null;

    // Bold + Italic: ***text***
    if (part.startsWith("***") && part.endsWith("***") && part.length > 6) {
      const content = part.slice(3, -3);
      return (
        <strong key={index} className="font-semibold text-[#f0f1f7]">
          <em className="italic">{content}</em>
        </strong>
      );
    }

    // Bold: **text**
    if (part.startsWith("**") && part.endsWith("**") && part.length > 4) {
      const content = part.slice(2, -2);
      return (
        <strong key={index} className="font-semibold text-[#f0f1f7]">
          {content}
        </strong>
      );
    }

    // Italic: *text*
    if (part.startsWith("*") && part.endsWith("*") && part.length > 2) {
      const content = part.slice(1, -1);
      return (
        <em key={index} className="italic text-[#c4c6d4]">
          {content}
        </em>
      );
    }

    // Inline Code: `code`
    if (part.startsWith("`") && part.endsWith("`") && part.length > 2) {
      const content = part.slice(1, -1);
      return (
        <code
          key={index}
          className="px-1.5 py-0.5 rounded bg-[#1c1d24] text-sky-300 font-mono text-[11px] border border-[#2b2d38]"
        >
          {content}
        </code>
      );
    }

    // Markdown Link: [label](url)
    const linkMatch = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (linkMatch) {
      const [, label, url] = linkMatch;
      return (
        <a
          key={index}
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sky-400 hover:text-sky-300 underline underline-offset-2 transition-colors font-medium"
        >
          {label}
        </a>
      );
    }

    // Strip any accidental stray double/triple asterisks
    const sanitized = part.replace(/\*{2,3}/g, "");
    return <React.Fragment key={index}>{sanitized}</React.Fragment>;
  });
}
