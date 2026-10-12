"use client";
import { useSyncExternalStore } from "react";
import { localBookingRepository, STORAGE_KEY } from "./booking-repository";
import { nextDates, type Reservation } from "./scheduling";
type Snapshot = {
  dates: string[];
  reservations: Reservation[];
  ready: boolean;
  storageError: boolean;
};
const empty: Snapshot = {
  dates: [],
  reservations: [],
  ready: false,
  storageError: false,
};
let snapshot = empty;
const listeners = new Set<() => void>();
function load() {
  try {
    snapshot = {
      dates: nextDates(),
      reservations: localBookingRepository.list(),
      ready: true,
      storageError: false,
    };
  } catch {
    snapshot = {
      dates: nextDates(),
      reservations: [],
      ready: true,
      storageError: true,
    };
  }
}
function subscribe(listener: () => void) {
  listeners.add(listener);
  load();
  const changed = (e: StorageEvent) => {
    if (e.key === STORAGE_KEY) refreshBookings();
  };
  window.addEventListener("storage", changed);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", changed);
  };
}
export function refreshBookings() {
  load();
  listeners.forEach((l) => l());
}
export function useBookingSnapshot() {
  return useSyncExternalStore(
    subscribe,
    () => snapshot,
    () => empty,
  );
}
