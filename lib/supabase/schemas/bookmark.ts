import z from "zod";

export const formSchema = z.object({
    title: z.string().min(3).max(255).trim(),
    url: z.string().trim().url(),
    description: z.string().optional(),
    is_favourite: z.coerce.boolean().default(false)
})
