// Joins class names, skipping empty values. Shared by the brand primitives.
export function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}
