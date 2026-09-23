/** Local previews must never create real customer enquiries. */
export function isLocalPreview(): boolean {
  if (typeof window === "undefined") return false;
  const host = window.location.hostname.toLowerCase().replace(/^\[|\]$/g, "");
  return (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local") ||
    host === "::1" ||
    host === "0.0.0.0" ||
    /^127\./.test(host) ||
    /^10\./.test(host) ||
    /^192\.168\./.test(host) ||
    /^172\.(1[6-9]|2\d|3[01])\./.test(host)
  );
}

export const PREVIEW_FORM_MESSAGE =
  "Vorschau: Ihre Eingaben wurden geprüft. In dieser lokalen Kopie wird keine Anfrage versendet.";

export const FORM_ERROR_MESSAGE =
  "Der Versand konnte nicht bestätigt werden. Ihre Eingaben bleiben erhalten. Bitte versuchen Sie es später erneut oder rufen Sie uns unter 08261 7597176 an.";

/** A success state is permitted only after the endpoint confirms the request. */
export async function submitForm(url: string, body: BodyInit, contentType: string): Promise<void> {
  if (isLocalPreview()) throw new Error(PREVIEW_FORM_MESSAGE);
  const controller = new AbortController();
  const timeout = window.setTimeout(() => controller.abort(), 20000);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body,
      signal: controller.signal,
    });
    if (!response.ok) throw new Error(`Form submission failed: ${response.status}`);
  } finally {
    window.clearTimeout(timeout);
  }
}
