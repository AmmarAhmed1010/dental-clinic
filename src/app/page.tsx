import Link from "next/link";
import Image from "next/image";
import {
  ArrowUpRight,
  ArrowRight,
  Check,
  Leaf,
  Heart,
  MessageCircle,
} from "lucide-react";
import {
  TreatmentGrid,
  DentistGrid,
  VisitCTA,
  FAQ,
} from "@/components/sections";
import { SoftReveal } from "@/components/interactive";
export default function Home() {
  return (
    <>
      <section className="clinic-hero">
        <div className="clinic-hero-copy">
          <p className="clinic-eyebrow">
            <span /> A CALMER KIND OF DENTISTRY
          </p>
          <h1>
            Good care.
            <br />A gentle <em>touch.</em>
          </h1>
          <p>
            Room to ask questions. Time to feel comfortable.
            <br />
            Dental care that puts you at the centre.
          </p>
          <Link className="clinic-button" href="/booking">
            Let’s plan your visit <ArrowUpRight size={18} />
          </Link>
          <div className="hero-reassurance">
            <Check size={15} />
            <span>Clear choices. No rush. One step at a time.</span>
          </div>
        </div>
        <div className="clinic-hero-visual">
          <div className="curved-photo">
            <Image
              src="/assets/clinic.jpg"
              alt="Illustrative modern dental treatment room"
              fill
              loading="eager"
              sizes="(max-width:700px) 90vw, 50vw"
            />
          </div>
          <div className="visit-note">
            <span className="note-icon">
              <Leaf size={20} />
            </span>
            <div>
              <strong>Come as you are.</strong>
              <p>We’ll take care of the next step.</p>
            </div>
          </div>
          <span className="stock-caption">ILLUSTRATIVE CLINIC PHOTOGRAPHY</span>
        </div>
      </section>
      <section className="care-values">
        <div>
          <Heart size={22} />
          <span>Care that listens</span>
        </div>
        <div>
          <MessageCircle size={22} />
          <span>Clear conversations</span>
        </div>
        <div>
          <Leaf size={22} />
          <span>A more comfortable visit</span>
        </div>
      </section>
      <section className="clinic-treatments">
        <SoftReveal className="clinic-section-heading">
          <div>
            <p className="clinic-eyebrow">CARE FOR EVERY CHAPTER</p>
            <h2>
              A little care.
              <br />A lot to smile about.
            </h2>
          </div>
          <div>
            <p>
              From everyday check-ups to a conversation
              <br />
              about your next step. Explore your options.
            </p>
            <Link className="quiet-link" href="/treatments">
              All treatments <ArrowRight size={17} />
            </Link>
          </div>
        </SoftReveal>
        <TreatmentGrid />
      </section>
      <section className="approach-section">
        <div className="approach-photo">
          <Image
            src="/assets/care.jpg"
            alt="Illustrative dental care photograph"
            fill
            sizes="(max-width:700px) 90vw, 50vw"
          />
          <span>STOCK PHOTOGRAPHY · DEMO PRACTICE</span>
        </div>
        <SoftReveal className="approach-copy">
          <p className="clinic-eyebrow">THE STILL APPROACH</p>
          <h2>
            We see the person
            <br />
            <em>behind the smile.</em>
          </h2>
          <p>
            Feeling comfortable starts with feeling heard. Our concept practice
            is built around unhurried conversations, clear explanations and
            thoughtful choices.
          </p>
          <p>
            We’ve designed a visit experience with space for questions, from
            learning about care to finding an appointment time.
          </p>
          <Link className="quiet-link" href="/about">
            Get to know our approach <ArrowUpRight size={17} />
          </Link>
        </SoftReveal>
      </section>
      <section className="people-section">
        <div className="clinic-section-heading">
          <div>
            <p className="clinic-eyebrow">FAMILIAR FACES, THOUGHTFUL CARE</p>
            <h2>
              People first.
              <br />
              Always.
            </h2>
          </div>
          <p>
            Meet the fictional team behind this demo.
            <br />
            Illustrative profiles, with care at their heart.
          </p>
        </div>
        <DentistGrid />
      </section>
      <FAQ />
      <VisitCTA />
    </>
  );
}
