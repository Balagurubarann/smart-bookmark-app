"use client";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { LogoutButton } from "./logout-button";

export default function Navbar() {

	const { user, loading } = useCurrentUser();

	return (
		<div className="h-header border-b bg-background py-4 px-6">
			
			<nav className="h-full container mx-auto px-4 flex justify-between items-center">
				<Link href="/" className="text-xl">
					Smart Bookmaker
				</Link>

				{
					loading || user === null ? (
						<Button asChild>
							<Link href="/auth/login">
								Sign In
							</Link>
						</Button>
					): (
						<div className="flex items-center gap-8">
							<div className="hidden md:flex gap-2 items-center">
								<Image
									src={user?.user_metadata?.avatar_url}
									alt={""}
									width="30"
									height="30"
									className="rounded-full"
								/>
								<span className="text-muted-foreground text-sm">
									{ user?.user_metadata?.name ?? user.email }
								</span>
							</div>
							<LogoutButton />
						</div>
					)
				}
			</nav>

		</div>
	)

}
