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
				message: "User not authenticated",
				data: null
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
				message: "Failed to fetch bookmark",
				data: bookmarks
			}
		}

		return { 
			error: false,
			message: "Bookmarks fetched successfully",
			data: bookmarks
		};

	} catch (err) {
		if (err instanceof Error) {
	      throw new Error(err.message);
	    }

	    throw new Error("Unexpected error while fetching bookmarks");
	}

}


export async function deleteBookmark(bookmarkId: string) {

	try {

		const user = await getCurrentUser();

		if (user === null) {
			return {
				error: true,
				message: "User not authenticated"
			}
		}

		const supabase = await createClient();

		const { error: bookmarkError } = await supabase.from("bookmark")
		.delete()
		.eq("id", bookmarkId)
		.eq("user_id", user.id)

		if (bookmarkError) {
			return {
				error: true,
				message: "Failed to delete bookmark"
			}
		}

		
		revalidatePath("/");

		return {
	      error: false,
	      message: "Bookmark deleted successfully",
	    };

	} catch (err) {
		 if (err instanceof Error) {
	      throw new Error(err.message);
	    }

	    throw new Error("Unexpected error while deleting bookmark");
	}
}
