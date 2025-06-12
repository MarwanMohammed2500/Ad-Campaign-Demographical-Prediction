import { pgTable, text, serial, integer, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

// Prediction schema for form validation
export const predictionSchema = z.object({
  age: z.number().min(1, "Age must be at least 1").max(100, "Age must be less than or equal to 100"),
  salary: z.number().min(1, "Salary must be greater than 0"),
  apiUrl: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
});

export type PredictionInput = z.infer<typeof predictionSchema>;

// API response types
export type PredictionResult = {
  prediction: string;
};
