export const dynamic = "force-dynamic";

import { Bookmark as BookmarkIcon, Star } from "lucide-react";
import { 
  Empty,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
  EmptyDescription,
  EmptyContent
} from "@/components/ui/empty";
import { 
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { getAllBookmark } from "@/lib/supabase/actions/bookmark";
import Link from "next/link";
import CopyButton from "@/components/copy-button";
import BookmarkDeleteButton from "@/components/bookmark-delete-button";
import RealtimeRefresh from "@/components/realtime-refresh";

type Bookmark = {
  id: string;
  title: string;
  url: string;
  description: string | null;
  is_favourite: boolean;
}

type BookmarkWithError = {
  error: boolean;
  message: string;
  data: Bookmark[] | null;
}

export default async function Home() {

  const bookmarks: BookmarkWithError = await getAllBookmark();
  const hasBookmarks = bookmarks.data && bookmarks.data.length > 0;

  return (
    <div className="container mx-auto w-screen px-4 py-8 space-y-8">

      <RealtimeRefresh />

      {
        hasBookmarks && (
          <div className="flex justify-center md:justify-start">
            <Button  asChild>
              <Link href="/bookmark/create">
                Add Bookmark
                <BookmarkIcon className="ml-4" />
              </Link>
            </Button>
          </div>
        )
      }

        {
          hasBookmarks ? (
            <>
              <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4 place-items-center">
                {
                  bookmarks.data!.map((bookmark, index) => {
                    return (
                      <Card className="md:w-[55vmin] w-[65vmin]" key={index}>
                        <CardHeader>
                          <CardTitle className="flex gap-2 items-center justify-between">
                            <div className="flex gap-2 items-center">
                              <Link href={bookmark.url} className="font-medium" target="_blank">
                                {
                                  bookmark.title
                                }
                              </Link>
                              <span>
                                { 
                                  bookmark.is_favourite && (
                                    <Star className="text-sky-600" size={"18"} />
                                  ) 
                                } 
                              </span>
                            </div>

                            <BookmarkDeleteButton bookmarkId={bookmark.id} />

                          </CardTitle>
                          <CardDescription>
                            {bookmark.description
                                ? `${bookmark.description.slice(0, 25)}...`
                                : "No description found"}
                          </CardDescription>
                        </CardHeader>
                        <CardContent className="">
                            <div className="flex gap-2 items-center">
                              <p className="text-muted-foreground">
                                { bookmark.url.slice(0, 20) }...
                              </p>
                              <CopyButton text={bookmark.url || ""} />
                            </div>
                        </CardContent>
                      </Card>
                    )
                  }) 
                }
              </div>
            </>
          ): (
            <>
              <Empty className="border border-dashed">
        
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <BookmarkIcon />
                  </EmptyMedia>
                  <EmptyTitle className="text-3xl">
                    No Bookmarks Found
                  </EmptyTitle>
                  <EmptyDescription>
                    Create new bookmarks. Own your Knowledge
                  </EmptyDescription>
                </EmptyHeader>
                <EmptyContent>
                  <Button asChild>
                    <Link href="bookmark/create">
                      Create Bookmark
                    </Link>
                  </Button>
                </EmptyContent>

              </Empty>
            </>
          )
        }

    </div>
  );
}
