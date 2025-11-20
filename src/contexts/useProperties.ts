// Re-export the hook from the core module to keep it in a separate file
// (prevents React Fast Refresh errors when exporting non-components from a file
// that also exports components).
export { useProperties } from "./propertyCore";
