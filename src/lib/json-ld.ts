// Serializes JSON-LD for an inline <script>. Escaping "<" stops a value that
// contains "</script>" (a title or FAQ answer quoting HTML) from closing the
// tag early and spilling markup into the page.
export function serializeJsonLd(data: object): string {
  return JSON.stringify(data).replace(/</g, "\\u003c");
}
