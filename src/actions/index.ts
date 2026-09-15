// Astro Actions: every mutation enters here. Thin: validate, call src/db, return.
// Pages redirect on success; errors come back through Astro.getActionResult.

import { ActionError, defineAction } from 'astro:actions';
import { z } from 'astro/zod';
import * as people from '../db/people';
import { qualifications, roles } from '../db/schema';

// Astro hands an empty form field to zod as null, so the type error carries the message too.
const required = (message: string) => z.string({ error: message }).trim().min(1, message);
const requiredName = (label: string) => required(`${label} is required.`).max(120);

export const server = {
  addEmployee: defineAction({
    accept: 'form',
    input: z.object({
      fullName: requiredName('Full name'),
      siteId: required('Site is required.'),
    }),
    handler: async (input) => ({ id: await people.insertEmployee(input) }),
  }),

  addQualification: defineAction({
    accept: 'form',
    input: z.object({ name: requiredName('Name') }),
    handler: async ({ name }) => {
      if (await people.nameExists(qualifications, name)) {
        throw new ActionError({
          code: 'CONFLICT',
          message: `Qualification "${name}" already exists.`,
        });
      }
      return { id: await people.insertQualification(name) };
    },
  }),

  addRole: defineAction({
    accept: 'form',
    input: z.object({
      name: requiredName('Name'),
      requiredQualificationIds: z.array(z.string()).default([]),
    }),
    handler: async (input) => {
      if (await people.nameExists(roles, input.name)) {
        throw new ActionError({
          code: 'CONFLICT',
          message: `Role "${input.name}" already exists.`,
        });
      }
      return { id: await people.insertRole(input) };
    },
  }),

  giveRole: defineAction({
    accept: 'form',
    input: z.object({
      employeeId: required('Employee is required.'),
      roleId: required('Pick a Role.'),
    }),
    handler: async ({ employeeId, roleId }) => {
      await people.giveRole(employeeId, roleId);
    },
  }),

  removeRole: defineAction({
    accept: 'form',
    input: z.object({
      employeeId: required('Employee is required.'),
      roleId: required('Pick a Role.'),
    }),
    handler: async ({ employeeId, roleId }) => {
      await people.removeRole(employeeId, roleId);
    },
  }),
};
