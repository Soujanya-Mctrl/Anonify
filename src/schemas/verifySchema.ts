import { z } from 'zod';

export const verifySchema = z.object({
    code: z.string()
        .min(6, "Verification code must be exactly 6 characters long")
        .max(6, "Verification code must be exactly 6 characters long")
})
    .refine(data => data.code.length === 6, {
        message: "Verification code must be exactly 6 characters long"
    });