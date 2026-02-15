"use client"

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

export default function RealtimeRefresh() {

	const router = useRouter();
	const supabase = createClient();

	useEffect(() => {

		const channel = supabase
			.channel('schema-db-changes')
			.on(
				'postgres_changes',
				{ event: '*', schema: 'public', table: 'bookmark' },
				() => {
					router.refresh();
				}
			)
			.subscribe();

			return () => {
				supabase.removeChannel(channel);
			}

	}, [supabase, router]);

	return null;
}
