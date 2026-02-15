import z from "zod";

export const userSchema = z.object({
	fullname: z.string().min(3).max(255).trim(),
	email: z.string().email("Please enter a valid email"),
	image_url: z.string().optional(),
})
