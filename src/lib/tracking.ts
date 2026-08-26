/**
 * Zentrales Conversion-Tracking für alle Lead-Formulare.
 *
 * Der GTM-Container GTM-NJZV7GTH feuert die Google-Ads-Lead-Conversion
 * (AW-17194318925, Label DWwlCOuZmLscEM348YZA) und das GA4-Event
 * `generate_lead` auf genau diesen Trigger:
 *
 *   Custom Event `form_submit`  UND  Data-Layer-Variable `form_status` = "success"
 *
 * Jedes Formular muss deshalb nach erfolgreichem Absenden trackFormSubmit()
 * aufrufen. Ohne diesen Push wird in Google Ads keine Lead-Conversion gezählt.
 */

type FormSubmitPayload = {
  /** Eindeutige Kennung des Formulars, z. B. "footer-schnellkontakt" */
  formId: string;
  /** Grobe Kategorie, z. B. "lead" | "kontakt" | "rechner" */
  formType: string;
  /** Wo das Formular steht, z. B. "gebaeudeenergie" | "footer" | "lp-pv-angebot" */
  formLocation: string;
  /** Optionaler Lead-Wert in EUR für wertbasiertes Bidding */
  value?: number;
};

export function trackFormSubmit({
  formId,
  formType,
  formLocation,
  value,
}: FormSubmitPayload) {
  if (typeof window === "undefined") return;
  try {
    const w = window as unknown as { dataLayer?: object[] };
    w.dataLayer = w.dataLayer || [];
    w.dataLayer.push({
      event: "form_submit",
      form_status: "success",
      form_id: formId,
      form_type: formType,
      form_location: formLocation,
      page_path: window.location.pathname,
      ...(value != null ? { value, currency: "EUR" } : {}),
    });
  } catch {
    /* Tracking darf den Lead-Versand niemals blockieren */
  }
}
