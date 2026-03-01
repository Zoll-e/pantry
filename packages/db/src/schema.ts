import {
  pgTable,
  serial,
  varchar,
  timestamp,
  integer,
  text,
  primaryKey,
} from 'drizzle-orm/pg-core';
import { createInsertSchema } from 'drizzle-zod';

export const roles = pgTable('roles', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 50 }).notNull().unique(),
});

export const users = pgTable('users', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull(),
  email: varchar('email', { length: 100 }).notNull().unique(),
  password: varchar('password_hash', { length: 255 }).notNull(),
  role_id: integer('role_id')
    .references(() => roles.id)
    .notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const recipes = pgTable('recipes', {
  id: serial('id').primaryKey(),
  author_id: integer('author_id')
    .references(() => users.id)
    .notNull(),
  name: varchar('name', { length: 200 }).notNull(),
  description: text('description').notNull(),
  images: text('images').array().notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const comments = pgTable('comments', {
  id: serial('id').primaryKey(),
  recipe_id: integer('recipe_id')
    .references(() => recipes.id)
    .notNull(),
  user_id: integer('user_id')
    .references(() => users.id)
    .notNull(),
  content: text('content').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
});

export const likes = pgTable(
  'likes',
  {
    recipe_id: integer('recipe_id')
      .references(() => recipes.id)
      .notNull(),
    user_id: integer('user_id')
      .references(() => users.id)
      .notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.recipe_id, table.user_id] }),
    };
  },
);

export const ingredients = pgTable('ingredients', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 100 }).notNull().unique(),
});

export const recipeIngredients = pgTable(
  'recipe_ingredients',
  {
    recipe_id: integer('recipe_id')
      .references(() => recipes.id)
      .notNull(),
    ingredient_id: integer('ingredient_id')
      .references(() => ingredients.id)
      .notNull(),
    amount: varchar('amount', { length: 100 }).notNull(),
    unit: varchar('unit', { length: 50 }).notNull(),
  },
  (table) => {
    return {
      pk: primaryKey({ columns: [table.recipe_id, table.ingredient_id] }),
    };
  },
);

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});
