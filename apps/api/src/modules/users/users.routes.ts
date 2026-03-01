import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import z from 'zod';

import { insertUserSchema } from '@pantry/db/schema';
import { createUserController } from './users.controller';

const usersApp = new Hono();

usersApp.post(
  '/',
  zValidator('json', insertUserSchema, (result, c) => {
    if (!result.success) {
      const zodError = result.error;
      return c.json(
        {
          success: false,
          message: 'Validation failed',
          errors: z.treeifyError(zodError),
        },
        400,
      );
    }
  }),
  async (c) => {
    const validUser = c.req.valid('json');
    const result = await createUserController(validUser);

    if (result.isErr()) {
      return c.json({ success: false, message: result.error.message }, 409);
    }

    return c.json(
      {
        success: true,
        message: 'User created successfully!',
        user: result.value[0],
      },
      201,
    );
  },
);

export default usersApp;
