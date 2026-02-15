"use client";

import { getAllBookmark } from "@/lib/supabase/actions/bookmark";
import { useEffect, useState } from "react";

export default function Bookmark() {

	const [bookmarks, setBookmarks] = useState<any[]>([]);

	useEffect(() => {

		async function getBookmark() {
			const bookmarkResponse = await getAllBookmark();
			setBookmarks(bookmarkResponse);
		}

		getBookmark();
	}, [bookmarks])

	return { bookmarks }
}
