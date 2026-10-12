"use client";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  Menu,
  X,
  ArrowUpRight,
  ArrowRight,
  ArrowLeft,
  Check,
  CalendarDays,
  Clock,
  UserRound,
  ShieldCheck,
  RotateCcw,
} from "lucide-react";
import { motion, useReducedMotion } from "motion/react";
import { dentists, treatments } from "@/lib/content";
import {
  getSlots,
  displayDate,
  timeLabel,
  type Reservation,
} from "@/lib/scheduling";
import { localBookingRepository } from "@/lib/booking-repository";
import { useBookingSnapshot, refreshBookings } from "@/lib/booking-store";

export function Mark() {
  return (
    <svg viewBox="0 0 40 40" width="34" height="34" aria-hidden="true">
      <path
        d="M20 20C3 18 3 3 14 6c7 2 6 14 6 14ZM20 20c2-17 17-17 14-6-2 7-14 6-14 6ZM20 20c17 2 17 17 6 14-7-2-6-14-6-14ZM20 20C18 37 3 37 6 26c2-7 14-6 14-6Z"
        fill="currentColor"
      />
    </svg>
  );
}
export function Header() {
  const menuButton = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const path = usePathname();
  return (
    <>
      <div className="clinic-topbar">
        <span>A little more comfort. A little less worry.</span>
        <span>Karachi concept practice · Fictional demo</span>
      </div>
      <header className="clinic-header">
        <Link className="clinic-brand" href="/" aria-label="Still Dental home">
          <Mark />
          <span>
            still<span className="brand-sub">DENTAL</span>
          </span>
        </Link>
        <nav
          className={open ? "clinic-navigation open" : "clinic-navigation"}
          aria-label="Main navigation"
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setOpen(false);
              menuButton.current?.focus();
            }
          }}
        >
          {[
            ["Our approach", "/about"],
            ["Treatments", "/treatments"],
            ["Our people", "/dentists"],
            ["Visit us", "/contact"],
          ].map(([label, href]) => (
            <Link
              key={href}
              href={href}
              aria-current={path === href ? "page" : undefined}
              onClick={() => setOpen(false)}
            >
              {label}
            </Link>
          ))}
        </nav>
        <Link className="booking-link" href="/booking">
          Book a visit <ArrowUpRight size={16} />
        </Link>
        <button
          ref={menuButton}
          className="clinic-menu"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X /> : <Menu />}
        </button>
      </header>
    </>
  );
}
export function SoftReveal({
  children,
  className = "",
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={false}
      whileInView={reduce ? {} : { opacity: [0.8, 1] }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
    >
      {children}
    </motion.div>
  );
}
export function ContactForm() {
  const [message, setMessage] = useState("");
  return (
    <form
      className="clinic-form"
      onSubmit={(e) => {
        e.preventDefault();
        setMessage(
          "Thanks for trying the demo. Your message has not been sent to a clinic.",
        );
      }}
    >
      <h2>A question before your visit?</h2>
      <label>
        Your name
        <input name="name" required minLength={2} autoComplete="name" />
      </label>
      <label>
        Email address
        <input name="email" required type="email" autoComplete="email" />
      </label>
      <label>
        Your message
        <textarea name="message" required minLength={10} rows={4} />
      </label>
      <p className="small-note">Demo form. Please use sample details.</p>
      <button className="clinic-button" type="submit">
        Preview message <ArrowRight size={17} />
      </button>
      <p role="status" className="booking-status">
        {message}
      </p>
    </form>
  );
}

export function Booking() {
  const confirmationHeading = useRef<HTMLHeadingElement>(null);
  const [step, setStep] = useState(0);
  const [treatment, setTreatment] = useState(treatments[0].id);
  const [dentist, setDentist] = useState("");
  const { dates, reservations, ready, storageError } = useBookingSnapshot();
  const [pickedDate, setDate] = useState("");
  const date = pickedDate || dates[0] || "";
  const [time, setTime] = useState<number | null>(null);
  const [confirmation, setConfirmation] = useState<Reservation | null>(null);
  useEffect(() => {
    if (confirmation) {
      confirmationHeading.current?.focus();
      window.scrollTo({ top: 0, behavior: "instant" });
    }
  }, [confirmation]);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const selectedTreatment = treatments.find((t) => t.id === treatment)!;
  const eligible = dentists.filter((d) => d.treatments.includes(treatment));
  const selectedDentist = dentists.find((d) => d.id === dentist);
  const slots = selectedDentist
    ? getSlots(selectedDentist, selectedTreatment, date, reservations)
    : [];
  function next() {
    setError("");
    if (step === 1 && !dentist) {
      setError("Choose a dentist to continue.");
      return;
    }
    if (
      step === 2 &&
      (time === null || !slots.some((s) => s.start === time && s.available))
    ) {
      setError("Choose an available appointment time.");
      return;
    }
    setStep(step + 1);
  }
  function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (time === null || !selectedDentist) return;
    setBusy(true);
    try {
      const booking = localBookingRepository.create({
        dentist,
        treatment,
        date,
        start: time,
      });
      setConfirmation(booking);
      refreshBookings();
      setError("");
    } catch (e) {
      setError(
        e instanceof Error
          ? e.message
          : "Unable to save the demo booking. Please try again.",
      );
      refreshBookings();
      setTime(null);
      setStep(2);
    } finally {
      setBusy(false);
    }
  }
  function reset() {
    try {
      localBookingRepository.reset();
      refreshBookings();
      setError("Demo reservations cleared.");
      setTime(null);
    } catch {
      setError("Unable to clear browser storage.");
    }
  }
  if (confirmation)
    return (
      <section className="booking-confirmation">
        <span className="success-symbol">
          <Check size={30} />
        </span>
        <p className="clinic-eyebrow">DEMO VISIT CONFIRMED</p>
        <h1 ref={confirmationHeading} tabIndex={-1}>
          A little peace
          <br />
          of mind.
        </h1>
        <p>
          Demo appointment — not sent to a clinic.
          <br />
          This reservation exists only in this browser.
        </p>
        <div className="confirmation-details">
          <span>YOUR DEMO REFERENCE</span>
          <strong>{confirmation.id}</strong>
          <div>
            <CalendarDays size={20} />
            <span>
              {displayDate(confirmation.date)}
              <small>
                {timeLabel(confirmation.start)}–
                {timeLabel(confirmation.start + confirmation.duration)} ·
                Asia/Karachi (PKT)
              </small>
            </span>
          </div>
          <div>
            <UserRound size={20} />
            <span>
              {selectedDentist?.name}
              <small>Fictional dentist profile</small>
            </span>
          </div>
          <div>
            <Clock size={20} />
            <span>
              {selectedTreatment.name}
              <small>{confirmation.duration} minute demo visit</small>
            </span>
          </div>
        </div>
        <button
          className="clinic-button"
          onClick={() => {
            setConfirmation(null);
            setStep(0);
            setTime(null);
          }}
        >
          Plan another demo visit <ArrowRight size={17} />
        </button>
        <Link className="quiet-link" href="/">
          Back to Still Dental
        </Link>
      </section>
    );
  return (
    <section className="booking-page">
      <div className="booking-heading">
        <p className="clinic-eyebrow">A LITTLE TIME FOR YOU</p>
        <h1>Let’s plan your visit.</h1>
        <p>Choose the care you need and a time that suits you.</p>
      </div>
      <div className="demo-banner">
        <ShieldCheck size={18} />
        <p>
          Demo booking · No real clinic appointment. Use sample contact details.
          Slots use Asia/Karachi time.
        </p>
      </div>
      <div className="booking-layout">
        <div className="booking-panel">
          <ol className="booking-steps" aria-label="Booking progress">
            {["Your care", "Your dentist", "Your time", "Your details"].map(
              (s, i) => (
                <li
                  key={s}
                  className={
                    i === step ? "current" : i < step ? "complete" : ""
                  }
                  aria-current={i === step ? "step" : undefined}
                >
                  <span>{i < step ? <Check size={13} /> : i + 1}</span>
                  {s}
                </li>
              ),
            )}
          </ol>
          <div className="booking-step-content">
            {step === 0 && (
              <>
                <p className="clinic-eyebrow">STEP 01 / YOUR CARE</p>
                <h2>How can we help?</h2>
                <p className="step-description">
                  Select the visit you’d like to explore.
                </p>
                <div className="care-options">
                  {treatments.map((t) => (
                    <button
                      key={t.id}
                      aria-pressed={treatment === t.id}
                      className={
                        treatment === t.id
                          ? "care-option selected"
                          : "care-option"
                      }
                      onClick={() => {
                        setTreatment(t.id);
                        setDentist("");
                        setTime(null);
                      }}
                    >
                      <div>
                        <strong>{t.name}</strong>
                        <span>
                          {t.duration} minutes · {t.category.toLowerCase()}
                        </span>
                      </div>
                      <span className="option-radio">
                        {treatment === t.id && <Check size={13} />}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 1 && (
              <>
                <p className="clinic-eyebrow">STEP 02 / YOUR DENTIST</p>
                <h2>A friendly face.</h2>
                <p className="step-description">
                  Choose a demo dentist who offers{" "}
                  {selectedTreatment.name.toLowerCase()}.
                </p>
                <div className="care-options">
                  {eligible.map((d) => (
                    <button
                      key={d.id}
                      aria-pressed={dentist === d.id}
                      className={
                        dentist === d.id
                          ? "care-option selected"
                          : "care-option"
                      }
                      onClick={() => {
                        setDentist(d.id);
                        setTime(null);
                      }}
                    >
                      <div>
                        <strong>{d.name}</strong>
                        <span>{d.role} · Fictional profile</span>
                      </div>
                      <span className="option-radio">
                        {dentist === d.id && <Check size={13} />}
                      </span>
                    </button>
                  ))}
                </div>
              </>
            )}
            {step === 2 && (
              <>
                <p className="clinic-eyebrow">STEP 03 / YOUR TIME</p>
                <h2>Room in your day.</h2>
                <p className="step-description">
                  All times are Asia/Karachi (PKT, UTC+05:00). Sunday is closed;
                  individual schedules vary.
                </p>
                <label className="date-label">
                  Appointment date
                  <select
                    value={date}
                    onChange={(e) => {
                      setDate(e.target.value);
                      setTime(null);
                      setError("");
                    }}
                  >
                    {dates.map((d) => (
                      <option key={d} value={d}>
                        {displayDate(d)}
                      </option>
                    ))}
                  </select>
                </label>
                <p className="slot-label">
                  Available appointment times · {selectedTreatment.duration}{" "}
                  minutes
                </p>
                {slots.length ? (
                  <div className="time-slots">
                    {slots.map((s) => (
                      <button
                        key={s.start}
                        disabled={!s.available}
                        aria-label={`${timeLabel(s.start)}${s.available ? "" : " unavailable"}`}
                        aria-pressed={time === s.start}
                        className={time === s.start ? "selected" : ""}
                        onClick={() => setTime(s.start)}
                      >
                        {timeLabel(s.start)}
                        {!s.available && <small>Unavailable</small>}
                      </button>
                    ))}
                  </div>
                ) : (
                  <div className="no-slots">
                    This dentist isn’t available on this date. Please choose
                    another day.
                  </div>
                )}
                <p className="small-note">
                  Grey slots include existing reservations and the daily break.
                  Treatment duration is included in availability checks.
                </p>
              </>
            )}
            {step === 3 && (
              <form
                className="clinic-form"
                id="patient-details"
                onSubmit={submit}
              >
                <p className="clinic-eyebrow">STEP 04 / YOUR DETAILS</p>
                <h2>Just a few details.</h2>
                <p className="step-description">
                  These fields demonstrate validation. Your personal details are
                  not stored or sent.
                </p>
                <label>
                  Full name
                  <input
                    name="name"
                    required
                    minLength={2}
                    maxLength={100}
                    autoComplete="name"
                    placeholder="Alex Morgan"
                  />
                </label>
                <div className="form-pair">
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      autoComplete="email"
                      placeholder="alex@example.com"
                    />
                  </label>
                  <label>
                    Phone number
                    <input
                      name="phone"
                      type="tel"
                      pattern="[+0-9 ()-]{7,20}"
                      required
                      autoComplete="tel"
                      placeholder="0300 1234567"
                    />
                  </label>
                </div>
                <label className="demo-consent">
                  <input type="checkbox" required />I understand this is a
                  simulated visit, not an appointment with a real clinic.
                </label>
              </form>
            )}
            <p className="booking-status" role="alert">
              {error ||
                (storageError
                  ? "Browser storage is unavailable. Demo reservations cannot be saved."
                  : "")}
            </p>
            <div className="booking-actions">
              {step > 0 ? (
                <button
                  className="quiet-link"
                  onClick={() => {
                    setStep(step - 1);
                    setError("");
                  }}
                >
                  <ArrowLeft size={16} />
                  Back
                </button>
              ) : (
                <span />
              )}
              {step < 3 ? (
                <button
                  className="clinic-button"
                  disabled={!ready}
                  onClick={next}
                >
                  Continue <ArrowRight size={17} />
                </button>
              ) : (
                <button
                  className="clinic-button"
                  form="patient-details"
                  type="submit"
                  disabled={busy}
                >
                  {busy ? "Saving demo…" : "Confirm demo visit"}{" "}
                  <Check size={17} />
                </button>
              )}
            </div>
          </div>
        </div>
        <aside className="appointment-summary">
          <span className="summary-mark">
            <Mark />
          </span>
          <p className="clinic-eyebrow">YOUR VISIT, AT A GLANCE</p>
          <h2>
            A moment
            <br />
            for your smile.
          </h2>
          <div>
            <span>Care</span>
            <strong>{selectedTreatment.name}</strong>
          </div>
          <div>
            <span>Dentist</span>
            <strong>
              {selectedDentist?.name || "Choose in the next step"}
            </strong>
          </div>
          <div>
            <span>When</span>
            <strong>
              {date ? displayDate(date) : "Choose a day"}
              {time !== null && (
                <small>
                  {timeLabel(time)} · {selectedTreatment.duration} minutes
                </small>
              )}
            </strong>
          </div>
          <p>
            <ShieldCheck size={17} />
            Your contact details stay in the form and are not saved.
          </p>
          <p className="summary-demo">
            Local demo only. Reservations persist in this browser. Availability
            is rechecked at confirmation; shared server storage is needed for
            real multi-user booking.
          </p>
        </aside>
      </div>
      <div className="booking-reset">
        <p>
          {reservations.length} saved demo reservation
          {reservations.length === 1 ? "" : "s"} in this browser.
        </p>
        <button className="quiet-link" onClick={reset}>
          <RotateCcw size={14} />
          Reset demo reservations
        </button>
      </div>
    </section>
  );
}
