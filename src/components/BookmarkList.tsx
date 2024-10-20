import { Bookmark } from '../types';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';

interface BookmarkListProps {
  bookmarks: Bookmark[];
}

export function BookmarkList({ bookmarks }: BookmarkListProps) {
  return (
    <ScrollArea className="h-[400px] w-full rounded-md border p-4 mt-6">
      <div className="space-y-4">
        {bookmarks.map((bookmark) => (
          <Card key={bookmark.id} className="text-center">
            <CardHeader>
              <CardTitle>{bookmark.title}</CardTitle>
              <CardDescription>
                <a href={bookmark.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                  {bookmark.url}
                </a>
              </CardDescription>
            </CardHeader>
            {bookmark.description && (
              <CardContent>
                <p>{bookmark.description}</p>
              </CardContent>
            )}
          </Card>
        ))}
      </div>
    </ScrollArea>
  );
}