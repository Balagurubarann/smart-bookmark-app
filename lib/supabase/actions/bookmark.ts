"use server";

import z from "zod";
import { formSchema } from "@/lib/supabase/schemas/bookmark";
import { getCurrentUser } from "@/lib/getCurrentUser";
import { createClient } from "../server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

export async function createBookmark(
	unsafeData: z.infer<typeof formSchema>
) {

	let success = false;

	try {

		/* 

		const { success, data } = formSchema.parse(unsafeData);

		if (!success) {
			return { error: true, message: "Invalid bookmark data" }
		} 

		*/

		success = true;

		const user = await getCurrentUser();

		if (user === null) {
			return {
				error: true,
				message: "User not authenticated"
			}
		}

		const supabase = await createClient();

		const { data: bookmark, error: bookmarkError } = await supabase.from("bookmark").insert({
			title: unsafeData.title,
			url: unsafeData.url,
			description: unsafeData.description || "",
			is_favourite: unsafeData.is_favourite,
			user_id: user.id
		})
		.select("id")
		.single()

		if (bookmarkError || bookmark === null) {
			return {
				error: true,
				message: "Failed to create bookmark"
			}
		}

	} catch (err) {
		console.error(err);

		return {
			error: true,
			message: "Something went wrong"
		}
	}

	if (success) {
		redirect("/")
	}

}

export async function getAllBookmark() {

	try {

		const user = await getCurrentUser();

		if (user === null) {
			return {
				error: true,
				message: "User not authenticated"
			}
		}

		const supabase = await createClient();

		const { data: bookmarks, error: bookmarkError } = await supabase.from("bookmark")
		.select(`
			id,
			title,
			url,
			description,
			is_favourite
		`)
		.eq("user_id", user?.id);

		if (bookmarkError || bookmarks === null) {
			return {
				error: true,
				message: "Failed to fetch bookmark"
			}
		}

		return bookmarks;

	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}

}


export async function deleteBookmark(id: { id: string }) {

	try {

		const user = await getCurrentUser();

		if (user === null) {
			return {
				error: true,
				message: "User not authenticated"
			}
		}

		const supabase = await createClient();

		const { data: bookmarks, error: bookmarkError } = await supabase.from("bookmark")
		.delete()
		.eq("id", id);

		if (bookmarkError || bookmarks === null) {
			return {
				error: true,
				message: "Failed to delete bookmark"
			}
		}

		
		revalidatePath("/bookmark/create")

	} catch (err) {
		console.log(err);
		throw new Error(err.message);
	}
}
