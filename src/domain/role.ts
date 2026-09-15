// Pure domain rules for Roles. No I/O here; see docs/domain.md.

export interface Role {
  id: string;
  name: string;
  /** The Qualifications an Employee must prove to be ready for this Role. */
  requiredQualificationIds: string[];
}

/**
 * The Required Qualifications an Employee must cover across every Role they hold,
 * each Qualification once, in first-seen order. Readiness later checks each one
 * against a valid Certificate.
 */
export function requiredQualificationsFor(roles: readonly Role[]): string[] {
  const seen = new Set<string>();
  for (const role of roles) {
    for (const qualificationId of role.requiredQualificationIds) {
      seen.add(qualificationId);
    }
  }
  return [...seen];
}
