import { dentists, treatments } from "./content";
import { reserve, sanitizeReservations, type Reservation } from "./scheduling";
export interface BookingRepository {
  list(): Reservation[];
  create(request: Omit<Reservation, "id" | "duration">): Reservation;
  reset(): void;
}
export const STORAGE_KEY = "still.booking.v1";
export const localBookingRepository: BookingRepository = {
  list() {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    try {
      return sanitizeReservations(JSON.parse(raw), dentists, treatments);
    } catch {
      return [];
    }
  },
  create(request) {
    const result = reserve(this.list(), request, dentists, treatments);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(result.reservations));
    return result.reservation;
  },
  reset() {
    localStorage.removeItem(STORAGE_KEY);
  },
};
