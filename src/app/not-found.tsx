import Link from "next/link";
export default function NotFound() {
  return (
    <section className="clinic-page-hero">
      <p className="clinic-eyebrow">404 / LET’S FIND YOUR WAY</p>
      <h1>
        Take a breath.
        <br />
        Start <em>here.</em>
      </h1>
      <Link className="clinic-button" href="/">
        Back to Still Dental →
      </Link>
    </section>
  );
}
