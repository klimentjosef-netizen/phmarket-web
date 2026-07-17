// A single rendered section of a legal document (HTML version of the PDF).
export type LegalSection = {
  /** URL anchor id, e.g. "sekce-1" */
  id: string;
  /** Section heading as printed in the document; null for the lead block. */
  heading: string | null;
  /** Pre-rendered, sanitized HTML body of the section. */
  html: string;
};
