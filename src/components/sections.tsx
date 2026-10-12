import Image from "next/image";
import Link from "next/link";
import {
  ArrowUpRight,
  ScanLine,
  Sparkles,
  Sun,
  Grid2X2,
  Heart,
  Smile,
  Plus,
} from "lucide-react";
import { treatments, dentists } from "@/lib/content";
import { Mark } from "./interactive";
const icons = [ScanLine, Sparkles, Sun, Grid2X2, Heart, Smile];
export function TreatmentGrid({ limit = 6 }: { limit?: number }) {
  return (
    <div className="treatment-grid">
      {treatments.slice(0, limit).map((t, i) => {
        const Icon = icons[i];
        return (
          <Link
            className="treatment-card"
            key={t.id}
            href={`/treatments/${t.id}`}
          >
            <Icon size={27} strokeWidth={1.5} />
            <p className="clinic-eyebrow">{t.category}</p>
            <h3>{t.name}</h3>
            <p>{t.description}</p>
            <span>
              Explore treatment <ArrowUpRight size={17} />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
export function DentistGrid() {
  return (
    <div className="dentist-grid">
      {dentists.map((d) => (
        <article className="dentist-card" key={d.id}>
          <div>
            <Image
              src={`/assets/${d.image}`}
              alt={`Illustrative stock portrait for fictional ${d.name}`}
              fill
              sizes="(max-width:700px) 90vw, 33vw"
            />
            <span>FICTIONAL PROFILE · STOCK PHOTO</span>
          </div>
          <h3>{d.name}</h3>
          <p className="dentist-role">{d.role}</p>
          <p>{d.description}</p>
          <Link className="quiet-link" href="/booking">
            Plan a demo visit <ArrowUpRight size={16} />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function VisitCTA() {
  return (
    <section className="visit-cta">
      <div>
        <p className="clinic-eyebrow">WE’LL TAKE IT ONE STEP AT A TIME</p>
        <h2>
          Your next visit
          <br />
          starts with <em>hello.</em>
        </h2>
      </div>
      <div>
        <p>
          A simple booking flow, a clear plan,
          <br />
          and a little room to feel at ease.
        </p>
        <Link className="clinic-button" href="/booking">
          Book a demo visit <ArrowUpRight size={18} />
        </Link>
      </div>
    </section>
  );
}
export function FAQ() {
  return (
    <section className="faq-section">
      <div>
        <p className="clinic-eyebrow">GOOD TO KNOW</p>
        <h2>
          A few things
          <br />
          you might be wondering.
        </h2>
        <p>
          Clarity helps you feel more comfortable.
          <br />
          Here’s what this demo experience includes.
        </p>
      </div>
      <div>
        {[
          [
            "What happens at a first visit?",
            "A first visit generally starts with a discussion of your concerns and an assessment. A clinician explains findings and any further investigations or care options. The exact visit depends on your needs.",
          ],
          [
            "Can I choose my dentist?",
            "Yes. The demo booking flow lists dentists eligible for your selected treatment. Profiles are fictional and do not represent licensed practitioners.",
          ],
          [
            "How long is an appointment?",
            "The demo uses visits of 30, 45 or 60 minutes depending on the treatment. The booking summary shows the duration and availability accounts for the full visit.",
          ],
          [
            "Is this a real appointment booking?",
            "No. This is a frontend demonstration. A confirmation is saved only as a reservation in your browser and is not sent to a clinic. Contact details are not stored.",
          ],
        ].map(([q, a]) => (
          <details key={q}>
            <summary>
              {q}
              <Plus size={18} />
            </summary>
            <p>{a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
export function Footer() {
  return (
    <footer className="clinic-footer">
      <div className="clinic-footer-main">
        <div>
          <Link className="clinic-brand" href="/">
            <Mark />
            <span>
              still<span className="brand-sub">DENTAL</span>
            </span>
          </Link>
          <p>
            Thoughtful care.
            <br />A calmer kind of dentistry.
          </p>
        </div>
        <div>
          <h3>Find your way</h3>
          <Link href="/about">Our approach</Link>
          <Link href="/treatments">Treatments</Link>
          <Link href="/dentists">Our people</Link>
          <Link href="/testimonials">Patient stories</Link>
        </div>
        <div>
          <h3>Plan your visit</h3>
          <Link href="/booking">Book a demo visit</Link>
          <Link href="/contact">Visit information</Link>
          <span>Mon–Sat · demo schedules vary</span>
          <span>Sunday · closed</span>
        </div>
        <div>
          <h3>A considered concept</h3>
          <p>
            Fictional Karachi practice.
            <br />
            Illustrative photography and profiles.
            <br />
            No real appointments or clinical services.
          </p>
        </div>
      </div>
      <div className="clinic-footer-bottom">
        <span>© 2026 Still Dental · Demonstration website</span>
        <span>Made with a little more care.</span>
        <a href="#main">Back to top ↑</a>
      </div>
    </footer>
  );
}
