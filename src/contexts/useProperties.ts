// Re-export the hook from the provider module to ensure it uses the same
// context instance as `PropertyProvider` (avoids duplicate contexts).
export { useProperties } from "./PropertyContext";
