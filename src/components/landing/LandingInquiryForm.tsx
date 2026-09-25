"use client";

import { useEffect, useId, useMemo, useRef, useState, type FormEvent } from "react";
import { Check, CheckCircle2, ChevronLeft, Info, Mail, MapPin, Pencil, Phone, ShieldCheck, Video } from "lucide-react";
import type { LandingPage } from "@/content/landing-pages/types";
import { FORM_ERROR_MESSAGE, isLocalPreview, PREVIEW_FORM_MESSAGE, submitForm } from "@/lib/formSubmission";
import { trackFormSubmit } from "@/lib/tracking";
import { buildQuestions, deZahl, estimate, formatRange, summarize, UNKNOWN, type Answers, type Question } from "./estimate";
import styles from "./LandingInquiryForm.module.css";

const MAKE_URL = "https://hook.eu2.make.com/yloo9gmjoxtsua7r2g5z6af9lqs0ei3y";
type Props = Pick<LandingPage, "slug" | "cta" | "projectType" | "qualifier" | "category">;
type Stage = "question" | "result" | "channel" | "contact";
type Channel = "telefon" | "email" | "video";
type ContactValues = { name: string; email: string; phone: string; company: string; message: string; consent: boolean };
type FieldErrors = Partial<Record<keyof ContactValues | "answer", string>>;

const initialContact: ContactValues = { name: "", email: "", phone: "", company: "", message: "", consent: false };
const CHANNELS: { value: Channel; label: string; hint: string; icon: typeof Phone }[] = [
  { value: "telefon", label: "Telefonisch", hint: "Kurzer Rückruf", icon: Phone },
  { value: "email", label: "Per E-Mail", hint: "Rückfragen und Angebot schriftlich", icon: Mail },
  { value: "video", label: "Videogespräch", hint: "Termin per Video-Link", icon: Video },
];
const channelLabel = (channel: Channel | "") => CHANNELS.find(option => option.value === channel)?.label ?? "";
const TRUST = ["Kostenfrei", "Unverbindlich", "Persönlicher Ansprechpartner"];

/** A changed campaign must start with its own form state. */
export default function LandingInquiryForm(props: Props) {
  return <InquirySteps key={props.slug} {...props} />;
}

function InquirySteps(page: Props) {
  const { slug, projectType, qualifier, category } = page;
  const id = useId();
  const inFlight = useRef(false);
  const focusStep = useRef(false);
  const advanceTimer = useRef<number | undefined>(undefined);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const nameRef = useRef<HTMLInputElement>(null);
  const channelFieldRef = useRef<HTMLInputElement>(null);
  const consentRef = useRef<HTMLInputElement>(null);
  const submitRef = useRef<HTMLButtonElement>(null);
  const successRef = useRef<HTMLHeadingElement>(null);
  const offerRef = useRef<HTMLDivElement>(null);
  const [answers, setAnswers] = useState<Answers>({});
  const [stage, setStage] = useState<Stage>("question");
  const [index, setIndex] = useState(0);
  const [editing, setEditing] = useState(false);
  const [channel, setChannel] = useState<Channel | "">("");
  const [contact, setContact] = useState<ContactValues>(initialContact);
  const [showMessage, setShowMessage] = useState(false);
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(false);

  const questions = useMemo(() => buildQuestions(page, answers), [page, answers]);
  const question: Question | undefined = questions[index];
  const result = useMemo(() => estimate(page, answers), [page, answers]);
  const totalSteps = questions.length + 3;
  // Gewerbe und Elektro zeigen bewusst keinen Richtpreis.
  const showsPrice = category === "waermepumpe" || category === "photovoltaik";
  const position = stage === "question" ? index + 1 : stage === "result" ? questions.length + 1 : stage === "channel" ? questions.length + 2 : totalSteps;

  useEffect(() => () => window.clearTimeout(advanceTimer.current), []);

  useEffect(() => {
    if (!focusStep.current) return;
    focusStep.current = false;
    const heading = headingRef.current;
    heading?.focus({ preventScroll: true });
    // Keep the new step in view below the sticky header; on the result the offer button must be visible at first glance.
    const top = heading?.getBoundingClientRect().top ?? 0;
    const bottom = (stage === "result" ? offerRef.current ?? heading : heading)?.getBoundingClientRect().bottom ?? 0;
    if (top < 150 || bottom > window.innerHeight - 90) {
      let delta = top - 160;
      // On small screens the offer button wins over the top of the step.
      const overflow = bottom - delta - (window.innerHeight - 24);
      if (overflow > 0) delta += overflow;
      const smooth = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      window.scrollBy({ top: delta, behavior: smooth ? "smooth" : "auto" });
    }
  }, [stage, index]);

  useEffect(() => {
    if (sent) successRef.current?.focus({ preventScroll: true });
  }, [sent]);

  useEffect(() => {
    const selectChoice = (event: Event) => {
      if (inFlight.current || sent) return;
      const choice: unknown = (event as CustomEvent).detail;
      if (typeof choice !== "string" || !qualifier.options.includes(choice)) return;
      setAnswers(previous => ({ ...previous, vorhaben: choice }));
      show("question", 1);
    };
    window.addEventListener("alab-project-choice", selectChoice);
    return () => window.removeEventListener("alab-project-choice", selectChoice);
  }, [qualifier.options, sent]);

  function show(nextStage: Stage, nextIndex = index) {
    window.clearTimeout(advanceTimer.current);
    setFieldErrors({});
    setError("");
    setPreview(false);
    focusStep.current = true;
    setStage(nextStage);
    setIndex(nextIndex);
  }

  /** Save an answer and drop answers of questions that no longer apply (e.g. after changing the first choice). */
  function commit(questionId: string, value: string): Answers {
    const draft = { ...answers, [questionId]: value };
    const valid = new Set(buildQuestions(page, draft).map(item => item.id));
    const next = Object.fromEntries(Object.entries(draft).filter(([key]) => valid.has(key)));
    setAnswers(next);
    return next;
  }

  function advance(next: Answers) {
    const list = buildQuestions(page, next);
    const complete = list.every(item => next[item.id]);
    if ((editing && complete) || index >= list.length - 1) {
      setEditing(false);
      show("result");
    } else {
      show("question", index + 1);
    }
  }

  function choose(value: string) {
    if (!question) return;
    const next = commit(question.id, value);
    window.clearTimeout(advanceTimer.current);
    // Short pause so the selection is visible before the next question appears.
    advanceTimer.current = window.setTimeout(() => advance(next), 220);
  }

  function continueFromInput() {
    if (!question || question.kind === "choice") return;
    const raw = (answers[question.id] ?? "").trim();
    if (question.kind === "postal") {
      if (!/^[0-9]{5}$/.test(raw)) {
        setFieldErrors({ answer: "Bitte geben Sie eine fünfstellige Postleitzahl ein." });
        inputRef.current?.focus();
        return;
      }
    } else {
      const value = Number(raw);
      if (raw !== UNKNOWN && (!raw || value < question.min || value > question.max)) {
        setFieldErrors({ answer: `Bitte geben Sie einen Wert zwischen ${question.min.toLocaleString("de-DE")} und ${question.max.toLocaleString("de-DE")} ${question.unit} ein.` });
        inputRef.current?.focus();
        return;
      }
    }
    advance(commit(question.id, raw));
  }

  function back() {
    if (stage === "contact") return show("channel");
    if (stage === "channel") return show("result");
    if (stage === "result") return show("question", questions.length - 1);
    if (index > 0) show("question", index - 1);
  }

  function editQuestion(questionId: string) {
    const target = questions.findIndex(item => item.id === questionId);
    if (target < 0) return;
    setEditing(true);
    show("question", target);
  }

  function chooseChannel(value: Channel) {
    setChannel(value);
    window.clearTimeout(advanceTimer.current);
    advanceTimer.current = window.setTimeout(() => show("contact"), 220);
  }

  function updateContact<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setContact(previous => ({ ...previous, [key]: value }));
    setFieldErrors(previous => ({ ...previous, [key]: undefined }));
    setError("");
    setPreview(false);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    // Only the explicit final button may send; Enter in a question field cannot submit.
    const submitter = (event.nativeEvent as SubmitEvent).submitter;
    if (stage !== "contact" || submitter !== submitRef.current || inFlight.current || sent || !channel) return;
    setError("");
    setPreview(false);

    const nextErrors: FieldErrors = {};
    if (!contact.name.trim()) nextErrors.name = "Bitte geben Sie Ihren Namen ein.";
    if (channel === "telefon" && contact.phone.replace(/\D/g, "").length < 6) nextErrors.phone = "Bitte geben Sie eine Telefonnummer für den Rückruf an.";
    if (channel !== "telefon" && (!contact.email.trim() || !channelFieldRef.current?.validity.valid)) nextErrors.email = "Bitte geben Sie eine gültige E-Mail-Adresse ein.";
    if (!contact.consent) nextErrors.consent = "Bitte stimmen Sie der Verarbeitung Ihrer Angaben zu, damit wir Ihre Anfrage bearbeiten können.";
    setFieldErrors(nextErrors);
    if (Object.keys(nextErrors).length) {
      if (nextErrors.name) nameRef.current?.focus();
      else if (nextErrors.phone || nextErrors.email) channelFieldRef.current?.focus();
      else consentRef.current?.focus();
      return;
    }
    if (isLocalPreview()) {
      setPreview(true);
      return;
    }

    const angaben = summarize(page, answers);
    const richtpreis = result.range ? `ca. ${formatRange(result.range)} (${result.basis})` : "kein Richtpreis angezeigt";
    const nachricht = [
      contact.message.trim(),
      `Kontaktwunsch: ${channelLabel(channel)}`,
      `Richtpreis (Ersteinschätzung): ${richtpreis}`,
      "Angaben:",
      ...angaben.map(item => `- ${item.label}: ${item.value}`),
    ].filter(Boolean).join("\n");

    const payload = new URLSearchParams({
      Name: contact.name.trim(),
      PLZ: answers.plz ?? "",
      Email: contact.email.trim(),
      Telefon: contact.phone.trim(),
      Projektangabe: answers.vorhaben ?? "",
      Nachricht: nachricht,
      Consent: "1",
    });
    if (category === "gewerbe") payload.set("Firma", contact.company.trim());
    payload.set("Projektart", projectType);
    payload.set("Produkt", projectType);
    payload.set("Quelle", `Landingpage – ${projectType}`);
    payload.set("Landingpage", slug);
    payload.set("Seite", `${window.location.origin}/lp/${slug}`);
    payload.set("Qualifizierungsfrage", qualifier.label);
    payload.set("Kontaktwunsch", channelLabel(channel));
    payload.set("Richtpreis", richtpreis);
    payload.set("Objektangaben", angaben.map(item => `${item.label}: ${item.value}`).join("\n"));
    payload.set("Zeitstempel", new Date().toISOString());
    inFlight.current = true;
    setSending(true);
    try {
      await submitForm(MAKE_URL, payload.toString(), "application/x-www-form-urlencoded;charset=UTF-8");
      // Always report the lead like every other site form; without consent, Consent Mode limits GTM to cookieless pings.
      trackFormSubmit({ formId: `landing-${slug}`, formType: "lead", formLocation: slug });
      setSent(true);
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
      <h3 ref={successRef} tabIndex={-1}>Vielen Dank, Ihre Anfrage ist bei uns.</h3>
      <p>{channel === "telefon" ? "Wir melden uns telefonisch bei Ihnen und stimmen die Analyse Ihres Objekts ab."
        : channel === "video" ? "Wir senden Ihnen per E-Mail einen Terminvorschlag für das Videogespräch."
        : "Wir melden uns per E-Mail bei Ihnen und stimmen die Analyse Ihres Objekts ab."}</p>
      {result.range && <p className={styles.successPrice}>Ihre Ersteinschätzung: ca. {formatRange(result.range)}</p>}
    </div>;
  }

  const stepLabel = stage === "question" ? `Frage ${index + 1} von ${questions.length}` : stage === "result" ? (result.range ? "Ihre Ersteinschätzung" : "Ihre Auswertung") : stage === "channel" ? "Fast geschafft" : "Letzter Schritt";
  const title = stage === "question" ? question?.title
    : stage === "result" ? (result.range
      ? <>Nach Auswertung Ihrer Angaben könnte <span className={styles.nowrap}>{result.subject}</span> ca. <span className={styles.pricePhrase}>{deZahl(result.range[0])} – {deZahl(result.range[1])}&nbsp;€</span> kosten.</>
      : result.title ?? "Danke, Ihre Angaben sind vollständig.")
    : stage === "channel" ? "Wie möchten Sie Ihr genaues Angebot besprechen?"
    : "Wohin dürfen wir uns melden?";

  return (
    <form className={styles.card} onSubmit={handleSubmit} noValidate aria-busy={sending} aria-labelledby={`${id}-title`} aria-describedby={`${id}-note`} onKeyDown={event => {
      if (event.key !== "Enter" || !(event.target instanceof HTMLInputElement) || event.target.type === "checkbox") return;
      event.preventDefault();
      if (stage === "question") continueFromInput();
    }}>
      <div className={styles.progressHeading}><span>{stepLabel}</span>{stage === "question" && index > 0 && <button type="button" className={styles.backLink} onClick={back}><ChevronLeft size={15} aria-hidden="true" />Zurück</button>}</div>
      <div className={styles.progress} role="progressbar" aria-label="Fortschritt der Anfrage" aria-valuemin={0} aria-valuemax={totalSteps} aria-valuenow={position} aria-valuetext={stepLabel}><span style={{ width: `${position / totalSteps * 100}%` }} /></div>
      <h3 className={styles.title} ref={headingRef} id={`${id}-title`} tabIndex={-1}>{title}</h3>

      {stage === "question" && question && <>
        {question.hint && <p className={styles.intro}>{question.hint}</p>}
        {question.kind === "choice" && <div className={styles.tiles} role="group" aria-labelledby={`${id}-title`}>
          {question.options.map(option => {
            const selected = answers[question.id] === option.value;
            return <button key={option.value} type="button" className={`${styles.tile} ${selected ? styles.selected : ""}`} aria-pressed={selected} onClick={() => choose(option.value)}>
              <span className={styles.choiceMark} aria-hidden="true">{selected && <Check size={14} strokeWidth={3} />}</span>
              <span>{option.label}</span>
            </button>;
          })}
        </div>}
        {question.kind !== "choice" && <>
          <div className={styles.location}>
            {question.kind === "postal" && <span className={styles.locationIcon}><MapPin size={27} aria-hidden="true" /></span>}
            <label className={styles.field} htmlFor={`${id}-answer`}>{question.kind === "postal" ? "Postleitzahl" : question.short}
              <span className={styles.inputWrap}>
                <input ref={inputRef} id={`${id}-answer`} name={question.id} autoComplete={question.kind === "postal" ? "postal-code" : "off"} inputMode="numeric" maxLength={question.kind === "postal" ? 5 : 7}
                  value={answers[question.id] === UNKNOWN ? "" : answers[question.id] ?? ""}
                  onChange={event => { setAnswers(previous => ({ ...previous, [question.id]: event.target.value.replace(/\D/g, "") })); setFieldErrors({}); }}
                  aria-invalid={!!fieldErrors.answer} aria-describedby={fieldErrors.answer ? `${id}-answer-error` : undefined}
                  placeholder={question.kind === "postal" ? "z. B. 87719" : question.placeholder} />
                {question.kind === "number" && <span className={styles.unit} aria-hidden="true">{question.unit}</span>}
              </span>
              {fieldErrors.answer && <span className={styles.fieldError} id={`${id}-answer-error`} role="alert">{fieldErrors.answer}</span>}
            </label>
          </div>
          <button className={styles.primary} type="button" onClick={continueFromInput}>{index === questions.length - 1 && showsPrice ? "Richtpreis anzeigen" : "Weiter"}</button>
          {question.kind === "number" && <button className={styles.skip} type="button" onClick={() => advance(commit(question.id, UNKNOWN))}>{question.unknownLabel}</button>}
        </>}
      </>}

      {stage === "result" && <>
        {result.range ? <p className={styles.basis}>{result.basis}</p> : result.note && <p className={styles.explain}>{result.note}</p>}
        {/* Hauptziel dieser Stufe: das genaue Angebot, nicht der Richtpreis */}
        <div className={styles.offer} ref={offerRef}>
          <p className={styles.offerText}>{result.range ? "Der genaue Preis kann darunter oder darüber liegen. " : ""}Ihr genaues Angebot erhalten Sie nach einer kurzen Analyse Ihres Objekts.</p>
          <button className={`${styles.primary} ${styles.ctaMain}`} type="button" onClick={() => show("channel")}>Genaues Angebot kostenfrei anfordern</button>
          <ul className={styles.trust}>{TRUST.map(item => <li key={item}><Check size={14} strokeWidth={2.6} aria-hidden="true" />{item}</li>)}</ul>
        </div>
        <div className={styles.details}>
          {(result.facts.length > 0 || (result.range && result.note)) && <section>
            <p className={styles.detailTitle}>Grundlage der Schätzung</p>
            {result.facts.length > 0 && <ul className={styles.facts}>{result.facts.map(fact => <li key={fact}>{fact}</li>)}</ul>}
            {result.range && result.note && <p className={styles.notice}><Info size={15} aria-hidden="true" /><span>{result.note}</span></p>}
          </section>}
          <section className={styles.answers}>
            <p className={styles.detailTitle}>Ihre Angaben</p>
            <dl>
              {summarize(page, answers).map(item => <div key={item.id}>
                <dt>{item.label}</dt>
                <dd><span>{item.value}</span><button type="button" onClick={() => editQuestion(item.id)} aria-label={`${item.label} ändern`}><Pencil size={13} aria-hidden="true" /></button></dd>
              </div>)}
            </dl>
          </section>
        </div>
        <button className={styles.skip} type="button" onClick={back}><ChevronLeft size={16} aria-hidden="true" />Zurück</button>
        {result.range && <p className={styles.disclaimer}>Unverbindliche Ersteinschätzung auf Basis Ihrer Angaben. Sie ersetzt kein Angebot.</p>}
      </>}

      {stage === "channel" && <>
        <p className={styles.intro}>Für Ihr genaues Angebot analysieren wir Ihr Objekt. Wählen Sie, wie wir dazu Kontakt aufnehmen sollen.</p>
        <div className={`${styles.tiles} ${styles.channelTiles}`} role="group" aria-labelledby={`${id}-title`}>
          {CHANNELS.map(option => {
            const Icon = option.icon;
            const selected = channel === option.value;
            return <button key={option.value} type="button" className={`${styles.tile} ${styles.channelTile} ${selected ? styles.selected : ""}`} aria-pressed={selected} onClick={() => chooseChannel(option.value)}>
              <span className={styles.channelIcon} aria-hidden="true"><Icon size={21} /></span>
              <span className={styles.channelText}><strong>{option.label}</strong><small>{option.hint}</small></span>
            </button>;
          })}
        </div>
        <button className={styles.skip} type="button" onClick={back}><ChevronLeft size={16} aria-hidden="true" />Zurück zur Ersteinschätzung</button>
      </>}

      {stage === "contact" && channel && <>
        <p className={styles.intro}>{channel === "telefon" ? "Nur Name und Telefonnummer – wir rufen Sie an." : channel === "video" ? "Nur Name und E-Mail – wir senden Ihnen einen Terminvorschlag mit Link." : "Nur Name und E-Mail – wir melden uns schriftlich."}</p>
        <fieldset className={styles.contactFields} disabled={sending}>
          <legend className={styles.srOnly}>Kontaktdaten für Ihre Anfrage</legend>
          <div className={styles.fields}>
            <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-name`}>Ihr Name *
              <input ref={nameRef} id={`${id}-name`} name="Name" autoComplete="name" required maxLength={120} value={contact.name} onChange={event => updateContact("name", event.target.value)} aria-invalid={!!fieldErrors.name} aria-describedby={fieldErrors.name ? `${id}-name-error` : undefined} placeholder="Vor- und Nachname" />
              {fieldErrors.name && <span className={styles.fieldError} id={`${id}-name-error`} role="alert">{fieldErrors.name}</span>}
            </label>
            {channel === "telefon" ? <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-phone`}>Telefon *
              <input ref={channelFieldRef} id={`${id}-phone`} name="Telefon" type="tel" autoComplete="tel" inputMode="tel" required maxLength={40} value={contact.phone} onChange={event => updateContact("phone", event.target.value)} aria-invalid={!!fieldErrors.phone} aria-describedby={fieldErrors.phone ? `${id}-phone-error` : undefined} placeholder="Für den Rückruf" />
              {fieldErrors.phone && <span className={styles.fieldError} id={`${id}-phone-error`} role="alert">{fieldErrors.phone}</span>}
            </label> : <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-email`}>E-Mail *
              <input ref={channelFieldRef} id={`${id}-email`} name="Email" type="email" autoComplete="email" required maxLength={254} value={contact.email} onChange={event => updateContact("email", event.target.value)} aria-invalid={!!fieldErrors.email} aria-describedby={fieldErrors.email ? `${id}-email-error` : undefined} placeholder="name@beispiel.de" />
              {fieldErrors.email && <span className={styles.fieldError} id={`${id}-email-error`} role="alert">{fieldErrors.email}</span>}
            </label>}
            {category === "gewerbe" && <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-company`}>Unternehmen (optional)
              <input id={`${id}-company`} name="Firma" autoComplete="organization" maxLength={160} value={contact.company} onChange={event => updateContact("company", event.target.value)} />
            </label>}
            {showMessage ? <label className={`${styles.field} ${styles.fullWidth}`} htmlFor={`${id}-message`}>Ihre Anmerkung (optional)
              <textarea id={`${id}-message`} name="Nachricht" rows={3} maxLength={2500} value={contact.message} onChange={event => updateContact("message", event.target.value)} placeholder="Zum Beispiel gewünschter Zeitraum oder beste Erreichbarkeit." />
            </label> : <button type="button" className={styles.addMessage} onClick={() => setShowMessage(true)}>+ Anmerkung hinzufügen</button>}
          </div>
          <label className={styles.consent} htmlFor={`${id}-consent`}>
            <input ref={consentRef} id={`${id}-consent`} name="Consent" type="checkbox" value="1" required checked={contact.consent} onChange={event => updateContact("consent", event.target.checked)} aria-invalid={!!fieldErrors.consent} aria-describedby={fieldErrors.consent ? `${id}-consent-error` : undefined} />
            <span>Ich stimme der Verarbeitung meiner Angaben zur Bearbeitung meiner Anfrage zu. Hinweise in der <a href="/datenschutz" target="_blank" rel="noopener noreferrer">Datenschutzerklärung</a>. *</span>
          </label>
          {fieldErrors.consent && <p className={styles.fieldError} id={`${id}-consent-error`} role="alert">{fieldErrors.consent}</p>}
        </fieldset>
        {preview && <p className={styles.preview} role="status">{PREVIEW_FORM_MESSAGE}</p>}
        {error && <p className={styles.error} role="alert">{error}</p>}
        <button ref={submitRef} className={styles.primary} type="submit" disabled={sending}>{sending ? "Anfrage wird gesendet …" : "Kostenfreies Angebot anfordern"}</button>
        <button className={styles.skip} type="button" disabled={sending} onClick={back}><ChevronLeft size={16} aria-hidden="true" />Kontaktweg ändern</button>
      </>}

      <p className={styles.note} id={`${id}-note`}><ShieldCheck size={15} aria-hidden="true" /><span>Unverbindlich und direkt bei ALAB Energiesysteme.{stage === "contact" && " Mit * markierte Angaben sind erforderlich."}</span></p>
    </form>
  );
}
