import { describe, expect, it } from 'vitest';
import { isValidOn, type Certificate } from './certificate';

const forklift: Certificate = {
  qualificationId: 'forklift',
  issuedOn: new Date('2026-01-01'),
  expiresOn: new Date('2027-01-01'),
};

describe('isValidOn', () => {
  it('is valid between issue and expiry', () => {
    expect(isValidOn(forklift, new Date('2026-06-01'))).toBe(true);
  });

  it('is not valid before issue', () => {
    expect(isValidOn(forklift, new Date('2025-12-31'))).toBe(false);
  });

  it('is not valid on or after expiry', () => {
    expect(isValidOn(forklift, new Date('2027-01-01'))).toBe(false);
  });

  it('never expires when expiresOn is null', () => {
    expect(isValidOn({ ...forklift, expiresOn: null }, new Date('2099-01-01'))).toBe(true);
  });
});
