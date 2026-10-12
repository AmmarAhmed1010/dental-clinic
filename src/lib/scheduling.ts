export const CLINIC_TIMEZONE = "Asia/Karachi";
export type Treatment = { id: string; duration: number };
export type Dentist = {
  id: string;
  treatments: string[];
  days: number[];
  start: number;
  end: number;
};
export type Reservation = {
  id: string;
  dentist: string;
  treatment: string;
  date: string;
  start: number;
  duration: number;
};
export type Slot = { start: number; available: boolean; reason: string };
export function clinicDate(now = new Date()) {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: CLINIC_TIMEZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  return `${parts.find((p) => p.type === "year")!.value}-${parts.find((p) => p.type === "month")!.value}-${parts.find((p) => p.type === "day")!.value}`;
}
export function nextDates(count = 21, now = new Date()) {
  const today = clinicDate(now);
  return Array.from({ length: count }, (_, i) => {
    const d = new Date(`${today}T12:00:00Z`);
    d.setUTCDate(d.getUTCDate() + i + 1);
    return d.toISOString().slice(0, 10);
  });
}
export function timeLabel(minutes: number) {
  return `${String(Math.floor(minutes / 60)).padStart(2, "0")}:${String(minutes % 60).padStart(2, "0")}`;
}
export function displayDate(date: string) {
  return new Intl.DateTimeFormat("en-GB", {
    weekday: "short",
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: CLINIC_TIMEZONE,
  }).format(new Date(`${date}T12:00:00+05:00`));
}
export function overlaps(
  a: { start: number; duration: number },
  b: { start: number; duration: number },
) {
  return a.start < b.start + b.duration && b.start < a.start + a.duration;
}
export function validDate(date: string) {
  return (
    /^\d{4}-\d{2}-\d{2}$/.test(date) &&
    !Number.isNaN(Date.parse(`${date}T12:00:00Z`)) &&
    new Date(`${date}T12:00:00Z`).toISOString().slice(0, 10) === date
  );
}
export function getSlots(
  dentist: Dentist,
  treatment: Treatment,
  date: string,
  reservations: Reservation[],
  now = new Date(),
): Slot[] {
  if (
    !validDate(date) ||
    date <= clinicDate(now) ||
    !dentist.treatments.includes(treatment.id) ||
    !dentist.days.includes(new Date(`${date}T12:00:00Z`).getUTCDay())
  )
    return [];
  const busy = [
    { start: 780, duration: 60 },
    {
      start: dentist.id === "d1" ? 600 : dentist.id === "d2" ? 690 : 900,
      duration: dentist.id === "d1" ? 60 : 30,
    },
    ...reservations.filter((r) => r.dentist === dentist.id && r.date === date),
  ];
  const result: Slot[] = [];
  for (
    let start = dentist.start;
    start + treatment.duration <= dentist.end;
    start += 30
  ) {
    const unavailable = busy.some((r) =>
      overlaps({ start, duration: treatment.duration }, r),
    );
    result.push({
      start,
      available: !unavailable,
      reason: unavailable ? "Unavailable" : "",
    });
  }
  return result;
}
export function sanitizeReservations(
  raw: unknown,
  dentists: Dentist[],
  treatments: Treatment[],
): Reservation[] {
  if (!Array.isArray(raw)) return [];
  return raw.filter(
    (r): r is Reservation =>
      !!r &&
      typeof r === "object" &&
      typeof r.id === "string" &&
      dentists.some(
        (d) => d.id === r.dentist && d.treatments.includes(r.treatment),
      ) &&
      treatments.some(
        (t) => t.id === r.treatment && t.duration === r.duration,
      ) &&
      validDate(r.date) &&
      Number.isInteger(r.start) &&
      r.start >= 0 &&
      r.start < 1440,
  );
}
export function reserve(
  reservations: Reservation[],
  request: Omit<Reservation, "id" | "duration">,
  dentists: Dentist[],
  treatments: Treatment[],
  now = new Date(),
) {
  const d = dentists.find((d) => d.id === request.dentist);
  const t = treatments.find((t) => t.id === request.treatment);
  if (
    !d ||
    !t ||
    !getSlots(d, t, request.date, reservations, now).some(
      (s) => s.start === request.start && s.available,
    )
  )
    throw new Error(
      "That time is no longer available. Please choose another slot.",
    );
  const reservation: Reservation = {
    ...request,
    duration: t.duration,
    id: `ST-${crypto.randomUUID().slice(0, 8).toUpperCase()}`,
  };
  return { reservation, reservations: [...reservations, reservation] };
}
