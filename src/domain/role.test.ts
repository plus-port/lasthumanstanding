import { describe, expect, it } from 'vitest';
import { requiredQualificationsFor, type Role } from './role';

const forkliftOperator: Role = {
  id: 'role-forklift-operator',
  name: 'Forklift operator',
  requiredQualificationIds: ['forklift-licence', 'safety-briefing'],
};

const shiftLead: Role = {
  id: 'role-shift-lead',
  name: 'Shift lead',
  requiredQualificationIds: ['safety-briefing', 'first-aid'],
};

describe('requiredQualificationsFor', () => {
  it('is empty for an Employee with no Roles', () => {
    expect(requiredQualificationsFor([])).toEqual([]);
  });

  it('lists the Required Qualifications of a single Role', () => {
    expect(requiredQualificationsFor([forkliftOperator])).toEqual([
      'forklift-licence',
      'safety-briefing',
    ]);
  });

  it('unions Roles and names a shared Qualification once', () => {
    expect(requiredQualificationsFor([forkliftOperator, shiftLead])).toEqual([
      'forklift-licence',
      'safety-briefing',
      'first-aid',
    ]);
  });

  it('is empty for a Role with no Required Qualifications', () => {
    expect(requiredQualificationsFor([{ ...shiftLead, requiredQualificationIds: [] }])).toEqual([]);
  });
});
