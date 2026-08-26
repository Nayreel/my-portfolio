/**
 * Client-side utility for triggering direct file downloads from public directory.
 */
export function downloadResumePdf(
  fileUrl: string = "/Lee_Ryan_Garcia_Resume.pdf",
  fileName: string = "Lee_Ryan_Garcia_Resume.pdf"
) {
  if (typeof window === "undefined") return;

  const link = document.createElement("a");
  link.href = fileUrl;
  link.setAttribute("download", fileName);
  link.setAttribute("target", "_blank");
  link.setAttribute("rel", "noopener noreferrer");
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
