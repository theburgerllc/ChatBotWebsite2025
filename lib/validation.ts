import { z } from "zod";

const validPlans = ["BASIC", "STARTER", "GROWTH"] as const;
export type PlanId = typeof validPlans[number];

export function validatePlan(plan: string): plan is PlanId {
  return validPlans.includes(plan.toUpperCase() as PlanId);
}

export const contactFormSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(10, "Message must be at least 10 characters"),
  phone: z.string().optional(),
  company: z.string().optional()
});

export type ContactFormData = z.infer<typeof contactFormSchema>;
