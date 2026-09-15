// Pure domain rules for Certificates. No I/O here; see docs/domain.md → Invariants.

export interface Certificate {
  qualificationId: string;
  issuedOn: Date;
  expiresOn: Date | null;
}

/** A Certificate is valid on a date when issued on or before it and not yet expired. */
export function isValidOn(certificate: Certificate, on: Date): boolean {
  if (certificate.issuedOn > on) return false;
  return certificate.expiresOn === null || certificate.expiresOn > on;
}
