import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowUpRight, Check, MapPin, Clock, Heart } from "lucide-react";
import { treatments } from "@/lib/content";
import {
  TreatmentGrid,
  DentistGrid,
  VisitCTA,
  FAQ,
} from "@/components/sections";
import { Booking, ContactForm } from "@/components/interactive";
const routes = [
  "about",
  "dentists",
  "treatments",
  "booking",
  "testimonials",
  "contact",
  ...treatments.map((t) => `treatments/${t.id}`),
];
export function generateStaticParams() {
  return routes.map((r) => ({ slug: r.split("/") }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const key = slug.join("/");
  const t = treatments.find((t) => key === `treatments/${t.id}`);
  return {
    title:
      t?.name ??
      ({
        about: "Our approach",
        dentists: "Our people",
        treatments: "Your care",
        booking: "Plan your visit",
        testimonials: "Illustrative patient stories",
        contact: "Visit information",
      }[key] ||
        "Page"),
    description:
      t?.description ??
      "Discover Still Dental, a fictional practice and local appointment demo.",
  };
}
export default async function Page({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;
  const key = slug.join("/");
  if (!routes.includes(key)) notFound();
  const t = treatments.find((t) => key === `treatments/${t.id}`);
  if (key === "booking") return <Booking />;
  if (t)
    return (
      <>
        <section className="clinic-page-hero treatment-hero">
          <div>
            <Link className="clinic-eyebrow" href="/treatments">
              ← EXPLORE ALL CARE
            </Link>
            <h1>
              {t.name}
              <em>.</em>
            </h1>
            <p>{t.description}</p>
            <Link className="clinic-button" href="/booking">
              Plan a demo visit <ArrowUpRight size={18} />
            </Link>
            <span className="treatment-duration">
              <Clock size={16} />
              {t.duration} minute demo appointment
            </span>
          </div>
          <div className="treatment-hero-photo">
            <Image
              src="/assets/care.jpg"
              alt="Illustrative dental care photograph"
              fill
              sizes="45vw"
            />
            <span>ILLUSTRATIVE PHOTOGRAPHY</span>
          </div>
        </section>
        <section className="treatment-information">
          <div>
            <p className="clinic-eyebrow">UNDERSTANDING YOUR CARE</p>
            <h2>
              A clear place
              <br />
              to start.
            </h2>
            <p>{t.detail}</p>
            <p className="small-note">
              General information for a fictional demo. A real clinician would
              assess suitability and explain costs, risks and alternatives
              before treatment.
            </p>
          </div>
          <div>
            <p className="clinic-eyebrow">WHAT A VISIT MAY INCLUDE</p>
            {t.expect.map((e, i) => (
              <div className="expectation" key={e}>
                <span>0{i + 1}</span>
                <h3>{e}</h3>
                <Check size={18} />
              </div>
            ))}
          </div>
        </section>
        <FAQ />
        <VisitCTA />
      </>
    );
  if (key === "treatments")
    return (
      <>
        <section className="clinic-page-hero">
          <p className="clinic-eyebrow">CARE, CLEARLY EXPLAINED</p>
          <h1>
            A good place
            <br />
            to <em>begin.</em>
          </h1>
          <p>
            Explore everyday care, family visits and consultations.
            <br />A clear conversation is always the first step.
          </p>
        </section>
        <section className="clinic-treatments treatment-index">
          <TreatmentGrid />
        </section>
        <FAQ />
        <VisitCTA />
      </>
    );
  if (key === "dentists")
    return (
      <>
        <section className="clinic-page-hero">
          <p className="clinic-eyebrow">OUR PEOPLE / FICTIONAL DEMO TEAM</p>
          <h1>
            A friendly face.
            <br />A thoughtful <em>approach.</em>
          </h1>
          <p>
            Meet the demo profiles behind our appointment flow.
            <br />
            These fictional dentists and stock portraits do not represent actual
            practitioners.
          </p>
        </section>
        <section className="people-section">
          <DentistGrid />
        </section>
        <VisitCTA />
      </>
    );
  if (key === "contact")
    return (
      <>
        <section className="clinic-page-hero">
          <p className="clinic-eyebrow">VISIT INFORMATION</p>
          <h1>
            Your next step,
            <br />
            <em>made simple.</em>
          </h1>
          <p>
            This is a fictional Karachi practice and booking demonstration.
            <br />
            No physical clinic or real contact service is represented.
          </p>
        </section>
        <section className="contact-layout">
          <div className="visit-information">
            <div className="visit-information-card">
              <MapPin size={25} />
              <h2>Karachi, by concept.</h2>
              <p>
                Our demo takes its timezone and welcoming character from
                Karachi. There is no real clinic address to visit.
              </p>
            </div>
            <div className="visit-information-card">
              <Clock size={25} />
              <h2>A little flexibility.</h2>
              <p>
                Demo scheduling: Monday–Saturday, with individual dentist
                availability. Sunday is closed. Slots use Asia/Karachi
                (UTC+05:00).
              </p>
            </div>
            <Link className="clinic-button" href="/booking">
              Try the booking experience <ArrowUpRight size={17} />
            </Link>
          </div>
          <ContactForm />
        </section>
      </>
    );
  if (key === "testimonials")
    return (
      <>
        <section className="clinic-page-hero">
          <p className="clinic-eyebrow">ILLUSTRATIVE PATIENT STORIES</p>
          <h1>
            Comfort starts
            <br />
            with <em>being heard.</em>
          </h1>
          <p>
            Sample stories showing the intended care experience.
            <br />
            These are fictional examples, not verified patient reviews.
          </p>
        </section>
        <section className="patient-stories">
          {[
            [
              "A little room for questions.",
              "I wanted to understand the options before making a decision. Having everything explained step by step made the visit feel easier.",
              "Sample story / first visit",
            ],
            [
              "Finding time for care.",
              "Choosing a treatment, a dentist and a time in one place helped me picture what the visit would look like.",
              "Sample story / booking experience",
            ],
            [
              "Starting with the everyday.",
              "A calm conversation about daily habits was a helpful way to begin thinking about my dental routine.",
              "Sample story / preventive care",
            ],
          ].map(([title, quote, label]) => (
            <article key={title}>
              <Heart size={24} />
              <h2>{title}</h2>
              <blockquote>{quote}</blockquote>
              <p>{label} · Fictional illustrative content</p>
            </article>
          ))}
        </section>
        <VisitCTA />
      </>
    );
  return (
    <>
      <section className="clinic-page-hero">
        <p className="clinic-eyebrow">THE STILL APPROACH</p>
        <h1>
          A little more care.
          <br />A little more <em>calm.</em>
        </h1>
        <p>
          Our fictional practice explores a simple idea:
          <br />
          great care begins with a comfortable conversation.
        </p>
      </section>
      <section className="approach-section">
        <div className="approach-photo">
          <Image
            src="/assets/clinic.jpg"
            alt="Illustrative modern dental room"
            fill
            sizes="50vw"
          />
          <span>ILLUSTRATIVE STOCK PHOTOGRAPHY</span>
        </div>
        <div className="approach-copy">
          <p className="clinic-eyebrow">ROOM TO FEEL AT EASE</p>
          <h2>
            Unhurried.
            <br />
            Understood.
            <br />
            <em>Looked after.</em>
          </h2>
          <p>
            The Still Dental concept puts people at the centre of the visit:
            readable information, clear choices and space to ask questions.
          </p>
          <p>
            Every part of this demonstration, from browsing care to choosing a
            time, is designed to make the next step understandable.
          </p>
        </div>
      </section>
      <section className="care-principles">
        {[
          ["Listen first", "Give concerns room before jumping to a plan."],
          [
            "Explain clearly",
            "Use familiar words and make choices easy to understand.",
          ],
          [
            "Move together",
            "Help people take the next step at a pace that feels comfortable.",
          ],
        ].map(([title, copy], i) => (
          <div key={title}>
            <span>0{i + 1}</span>
            <h3>{title}</h3>
            <p>{copy}</p>
          </div>
        ))}
      </section>
      <FAQ />
      <VisitCTA />
    </>
  );
}
