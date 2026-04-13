/**
 * Typed wrapper around useActor that provides the backend's createActor function.
 * All service hooks import from here instead of calling useActor directly.
 */
import { useActor } from "@caffeineai/core-infrastructure";
import { createActor } from "../backend";
import type { backendInterface } from "../backend";

export function useBackendActor() {
  return useActor<backendInterface>(createActor);
}

export type BackendActor = backendInterface | null;
