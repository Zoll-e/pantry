import { ResultAsync } from 'neverthrow';
import { z } from 'zod';

import { db } from '@pantry/db';
import { users, insertUserSchema } from '@pantry/db/schema';

type ValidUser = z.infer<typeof insertUserSchema>;

export const createUserController = (userData: ValidUser) => {
  return ResultAsync.fromPromise(db.insert(users).values(userData).returning(), (error) => {
    const err = error as Error;

    if (err.message.includes('unique constraint') || err.message.includes('23505')) {
      return new Error('A user with this email already exists.');
    }

    return new Error(`Database insertion failed: ${err.message}`);
  });
};
