"use client";

import { deleteBookmark } from "@/lib/supabase/actions/bookmark";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";

export default function BookmarkDeleteButton({ bookmarkId }: { bookmarkId: string }) {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

	return (
		<Button 
      variant="outline" 
      className="cursor-pointer"
      disabled={isPending}
      onClick={() => {
        startTransition(() => {
          deleteBookmark(bookmarkId)
          .then(() => {
            router.refresh();
          })
          .then(() => {
            toast.success("Bookmark deleted successfully")
          })
          .catch((err) => {
            toast.error(err.message || "Failed to delete bookmark")
          })
        })
      }}
    >
          <Trash size={"18"} className="text-red-600" />
        </Button>
	)

}
