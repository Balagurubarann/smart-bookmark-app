import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import type { User } from "@supabase/supabase-js";

export function useCurrentUser() {

	const [user, setUser] = useState<User | null>(null);
	const [loading, setLoading] = useState<boolean>(true);

	useEffect(() => {

		const supabase = createClient();

		supabase.auth.getUser()

			.then(({ data }) => {
				setUser(data.user);
			})
			.finally(() => {
				setLoading(false);
			})

		const { data } = supabase.auth.onAuthStateChange((_, session) => {
			setUser(session?.user ?? null);
		});

		return () => {
			data.subscription.unsubscribe()
		}

	}, []);

	return { user, loading };
}
