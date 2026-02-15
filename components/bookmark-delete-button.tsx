"use client";

import { deleteBookmark } from "@/lib/supabase/actions/bookmark";
import { Button } from "@/components/ui/button";
import { Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useTransition } from "react";

type Props = {
  bookmarkId: string;
};

export default function BookmarkDeleteButton({ bookmarkId }: Props) {

  const router = useRouter();
  const [isPending, startTransition] = useTransition();


  const handleDelete = () => {
    if (!bookmarkId) return;

    startTransition(() => {
      (async () => {
        try {
          await deleteBookmark(bookmarkId);
          router.refresh();
          toast.success("Bookmark deleted successfully");
        } catch (err: any) {
          toast.error(err?.message || "Failed to delete bookmark");
        }
      })();
    });
  };

	return (
		<Button 
      variant="outline" 
      size="icon"
      className="cursor-pointer disabled:opacity-60"
      disabled={isPending}
      onClick={handleDelete}
    >
          <Trash 
            size={"18"} 
            className={`text-red-600 ${isPending ? "opacity-50" : ""}`}
          />
    </Button>
	)

}
