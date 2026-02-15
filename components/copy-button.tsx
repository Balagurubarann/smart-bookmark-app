"use client"

import { useState } from "react";
import { Copy, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function CopyButton({ text }: { text: string }) {

	const [isCopied, setIsCopied] = useState<boolean>(false);

	const copy = async () => {

		await navigator.clipboard.writeText(text);
		setIsCopied(true);
		toast.success("URL Copied")
		setTimeout(() => setIsCopied(false), 2000);
	}

	return (
		<Button 
			variant="outline"
			onClick={copy}
		>
			{ isCopied ? <Check size={16} />: <Copy size={16} /> }
		</Button>
	)

}
