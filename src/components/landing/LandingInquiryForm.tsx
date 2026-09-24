"use client";

import { useEffect, useId, useRef, useState, type FormEvent } from "react";
import { ArrowLeft, ArrowRight, Check, CheckCircle2, MapPin, ShieldCheck } from "lucide-react";
import type { LandingPage } from "@/content/landing-pages/types";
import { FORM_ERROR_MESSAGE, isLocalPreview, PREVIEW_FORM_MESSAGE, submitForm } from "@/lib/formSubmission";
import { trackFormSubmit } from "@/lib/tracking";
import styles from "./LandingInquiryForm.module.css";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
type Props = Pick<LandingPage, "slug" | "cta" | "projectType" | "qualifier" | "category">;
type Step = 1 | 2 | 3;
type ContactValues = { postal: string; name: string; email: string; phone: string; company: string; message: string; consent: boolean };
type FieldErrors = Partial<Record<keyof ContactValues, string>>;
const initialValues: ContactValues = { postal: "", name: "", email: "", phone: "", company: "", message: "", consent: false };
const postalError = "Bitte geben Sie eine fünfstellige Postleitzahl ein.";

/** A changed campaign must start with its own form state. */
export default function LandingInquiryForm(props: Props) {
  return <InquirySteps key={props.slug} {...props} />;
}

function InquirySteps({ slug, cta, projectType, qualifier, category }: Props) {
  const id = useId();
  const inFlight = useRef(false);
  const focusStep = useRef(false);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const postalRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const phoneRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState<Step>(1);
  const [values, setValues] = useState<ContactValues>(initialValues);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [projectChoice, setProjectChoice] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    if (!focusStep.current) return;
    focusStep.current = false;
    headingRef.current?.focus({ preventScroll: true });
  }, [step]);

  useEffect(() => {
    if (sent) successRef.current?.focus({ preventScroll: true });
  }, [sent]);

  useEffect(() => {
    const selectChoice = (event: Event) => {
      if (inFlight.current || sent) return;
      const choice: unknown = (event as CustomEvent).detail;
      if (typeof choice !== "string" || !qualifier.options.includes(choice)) return;
      setProjectChoice(choice);
      setError("");
      setPreview(false);
      focusStep.current = true;
      setStep(2);
    };
    window.addEventListener("alab-project-choice", selectChoice);
    return () => window.removeEventListener("alab-project-choice", selectChoice);
  }, [qualifier.options, sent]);

  function updateValue<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues(previous => ({ ...previous, [key]: value }));
    setFieldErrors(previous => ({ ...previous, [key]: undefined }));
    setError("");
    setPreview(false);
  }

  function goTo(nextStep: Step) {
    if (inFlight.current) return;
    setError("");
    setPreview(false);
    focusStep.current = true;
    setStep(nextStep);
  }

  function continueFromLocation() {
    if (!/^[0-9]{5}$/.test(values.postal.trim())) {
      setFieldErrors(previous => ({ ...previous, postal: postalError }));
      postalRef.current?.focus();
      return;
    }
    setFieldErrors(previous => ({ ...previous, postal: undefined }));
    goTo(3);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Only the explicit final button may send; Enter in a contact field cannot submit.
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    if (step !== 3 || submitter !== submitRef.current || inFlight.current || sent) return;
    setError("");
    setPreview(false);

    if (!/^[0-9]{5}$/.test(values.postal.trim())) {
      setFieldErrors(previous => ({ ...previous, postal: postalError }));
      goTo(2);
      return;
    }
    const nextErrors: FieldErrors = {};
    if (!values.name.trim()) nextErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (!values.email.trim() || !emailRef.current?.validity.valid) nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    // Pflichtfeld für den persönlichen Rückruf: mindestens 6 Ziffern (Formatierung wie +49, Leerzeichen, / erlaubt)
    if (values.phone.replace(/\D/g, "").length < 6) nextErrors.phone = "Bitte geben Sie eine Telefonnummer für den Rückruf an.";
    if (!values.consent) nextErrors.consent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu, damit wir Ihre Anfrage bearbeiten können.";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.email) emailRef.current?.focus();
      else if (nextErrors.phone) phoneRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }
    if (isLocalPreview()) {
      setPreview(true);
      return;
    }

    const payload = new URLSearchParams({
      Name: values.name.trim(),
      PLZ: values.postal.trim(),
      Email: values.email.trim(),
      Telefon: values.phone.trim(),
      Projektangabe: projectChoice,
      Nachricht: values.message.trim(),
      Consent: "1",
    });
    if (category === "gewerbe") payload.set("Firma", values.company.trim());
    payload.set("Projektart", projectType);
    payload.set("Produkt", projectType);
    payload.set("Quelle", `Landingpage – ${projectType}`);
    payload.set("Landingpage", slug);
    payload.set("Seite", `${window.location.origin}/lp/${slug}`);
    payload.set("Qualifizierungsfrage", qualifier.label);
    payload.set("Zeitstempel", new Date().toISOString());
    inFlight.current = true;
    setSending(true);
    try {
      await submitForm(MAKE_URL, payload.toString(), "application/x-www-form-urlencoded;charset=UTF-8");
      // Always report the lead like every other site form; without consent, Consent Mode limits GTM to cookieless pings.
      trackFormSubmit({ formId: `landing-${slug}`, formType: "lead", formLocation: slug });
      setSent(true);
      setValues(initialValues);
      setProjectChoice("");
    } catch {
      setError(FORM_ERROR_MESSAGE);
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  }

  if (sent) {
    return <div className={`${styles.card} ${styles.success}`} role="status" aria-live="polite">
      <CheckCircle2 size={44} aria-hidden="true" />
      <h3 ref={successRef} tabIndex={-1}>Vielen Dank für Ihre Anfrage.</h3>
      <p>Ihre Angaben sind eingegangen. Wir melden uns persönlich bei Ihnen und besprechen die nächsten Schritte für Ihr Vorhaben.</p>
    </div>;
  }

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate aria-busy={sending} aria-labelledby={`${id}-title`} aria-describedby={`${id}-note`} onKeyDown={event => {
      if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement)) return;
      event.preventDefault();
      if (step === 2) continueFromLocation();
    }}>
      <div className={styles.progressHeading}><span>Schritt {step} von 3</span><span>{step === 1 ? "Ihr Vorhaben" : step === 2 ? "Ihr Standort" : "Ihre Kontaktdaten"}</span></div>
      <div className={styles.progress} role="progressbar" aria-label="Fortschritt der Anfrage" aria-valuemin={0} aria-valuemax={3} aria-valuenow={step} aria-valuetext={`Schritt ${step} von 3`}><span style={{ width: `${step / 3 * 100}%` }} /></div>
      <h3 className={styles.title} ref={headingRef} id={`${id}-title`} tabIndex={-1}>{step === 1 ? qualifier.label : step === 2 ? "Wo möchten Sie Ihr Projekt umsetzen?" : "Wie können wir Sie erreichen?"}</h3>
      <p className={styles.intro}>{step === 1 ? "Wählen Sie die passende Ausgangslage. Sie können diesen Schritt auch überspringen." : step === 2 ? "Mit Ihrer Postleitzahl können wir Ihr Vorhaben regional einordnen." : "Wir melden uns persönlich und besprechen Ihr Vorhaben mit Ihnen."}</p>

      {step === 1 && <>
        <div className={styles.tiles} role="group" aria-labelledby={`${id}-title`}>
          {qualifier.options.map(option => <button key={option} type="button" className={`${styles.tile} ${projectChoice === option ? styles.selected : ""}`} aria-pressed={projectChoice === option} onClick={() => setProjectChoice(option)}>
            <span className={styles.choiceMark} aria-hidden="true">{projectChoice === option && <Check size={14} strokeWidth={3} />}</span>
            <span>{option}</span>
          </button>)}
        </div>
        <button className={styles.primary} type="button" disabled={!projectChoice} onClick={() => goTo(2)}>Weiter<ArrowRight size={20} aria-hidden="true" /></button>
        <button className={styles.skip} type="button" onClick={() => { setProjectChoice(""); goTo(2); }}>Diesen Schritt überspringen</button>
      </>}

      {step === 2 && <>
        {projectChoice && <p className={styles.summary}><CheckCircle2 size={17} aria-hidden="true" /><span>{projectChoice}</span></p>}
        <div className={styles.location}>
          <span className={styles.locationIcon}><MapPin size={27} aria-hidden="true" /></span>
          <label className={styles.field} htmlFor={`${id}-postal`}>Postleitzahl des Projekts *
            <input ref={postalRef} id={`${id}-postal`} name="PLZ" autoComplete="postal-code" inputMode="numeric" pattern="[0-9]{5}" maxLength={5} required value={values.postal} onChange={event => updateValue("postal", event.target.value)} aria-invalid={!!fieldErrors.postal} aria-describedby={fieldErrors.postal ? `${id}-postal-error` : undefined} placeholder="z. B. 87719" />
            {fieldErrors.postal && <span className={styles.fieldError} id={`${id}-postal-error`} role="alert">{fieldErrors.postal}</span>}
          </label>
        </div>
        <div className={styles.actions}><button className={styles.back} type="button" onClick={() => goTo(1)}><ArrowLeft size={18} aria-hidden="true" />Zurück</button><button className={styles.primary} type="button" onClick={continueFromLocation}>Weiter<ArrowRight size={20} aria-hidden="true" /></button></div>
      </>}

      {step === 3 && <>
        <p className={styles.summary}><MapPin size={17} aria-hidden="true" /><span>Projektstandort: {values.postal}{projectChoice ? ` · ${projectChoice}` : ""}</span></p>
        <fieldset className={styles.contactFields} disabled={sending}>
          <legend className={styles.srOnly}>Kontaktdaten für Ihre Anfrage</legend>
          <div className={styles.fields}>
            <label className={styles.field} htmlFor={`${id}-name`}>Ihr Name *
              <input ref={nameRef} id={`${id}-name`} name="Name" autoComplete="name" required maxLength={120} value={values.name} onChange={event => updateValue("name", event.target.value)} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? `${id}-name-error` : undefined} placeholder="Vor- und Nachname" />
              {fieldErrors.name && <span className={styles.fieldError} id={`${id}-name-error`} role="alert">{fieldErrors.name}</span>}
            </label>
            <label className={styles.field} htmlFor={`${id}-email`}>E-Mail *
              <input ref={emailRef} id={`${id}-email`} name="Email" type="email" autoComplete="email" required maxLength={254} value={values.email} onChange={event => updateValue("email", event.target.value)} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? `${id}-email-error` : undefined} placeholder="name@beispiel.de" />
              {fieldErrors.email && <span className={styles.fieldError} id={`${id}-email-error`} role="alert">{fieldErrors.email}</span>}
            </label>
            <label className={`${styles.field} ${category !== "gewerbe" ? styles.fullWidth : ""}`} htmlFor={`${id}-phone`}>Telefon *
              <input ref={phoneRef} id={`${id}-phone`} name="Telefon" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} value={values.phone} onChange={event => updateValue("phone", event.target.value)} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? `${id}-phone-error` : undefined} placeholder="Für einen persönlichen Rückruf" />
              {fieldErrors.phone && <span className={styles.fieldError} id={`${id}-phone-error`} role="alert">{fieldErrors.phone}</span>}
            </label>
            {category === "gewerbe" && <label className={styles.field} htmlFor={`${id}-company`}>Unternehmen (optional)
              <input id={`${id}-company`} name="Firma" autoComplete="organization" maxLength={160} value={values.company} onChange={event => updateValue("company", event.target.value)} />
            </label>}
            <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-message`}>Was sollten wir noch wissen? (optional)
              <textarea id={`${id}-message`} name="Nachricht" rows={3} maxLength={2500} value={values.message} onChange={event => updateValue("message", event.target.value)} placeholder="Zum Beispiel Bestandssituation, gewünschter Umfang oder geplanter Zeitraum." />
            </label>
          </div>
          <label className={styles.consent} htmlFor={`${id}-consent`}>
            <input ref={consentRef} id={`${id}-consent`} name="Consent" type="checkbox" value="1" required checked={values.consent} onChange={event => updateValue("consent", event.target.checked)} aria-invalid={!!fieldErrors.consent} aria-describedby={fieldErrors.consent ? `${id}-consent-error` : undefined} />
            <span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu. Hinweise in der <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>. *</span>
          </label>
          {fieldErrors.consent && <p className={styles.fieldError} id={`${id}-consent-error`} role="alert">{fieldErrors.consent}</p>}
        </fieldset>
        {preview && <p className={styles.preview} role="status">{PREVIEW_FORM_MESSAGE}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button ref={submitRef} className={styles.primary} type="submit" disabled={sending}>{sending ? "Anfrage wird gesendet …" : cta}<ArrowRight size={20} aria-hidden="true" /></button>
        <button className={styles.skip} type="button" disabled={sending} onClick={() => goTo(2)}><ArrowLeft size={16} aria-hidden="true" />Zurück zum Standort</button>
      </>}

      <p className={styles.note} id={`${id}-note`}><ShieldCheck size={15} aria-hidden="true" /><span>Unverbindlich anfragen · Direkt bei ALAB Energiesysteme{step > 1 && <><br />Mit * markierte Angaben sind erforderlich.</>}</span></p>
    </form>
  );
}
