import { useState, useEffect } from 'react';
import { BookmarkList } from './components/BookmarkList';
import { AddBookmarkForm } from './components/AddBookmarkForm';
import { SearchBar } from './components/SearchBar';
import { useToast } from '@/hooks/use-toast';
import { Toaster } from '@/components/ui/toaster';
import { Bookmark } from './types';

function App() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [filteredBookmarks, setFilteredBookmarks] = useState<Bookmark[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchBookmarks();
  }, []);

  const fetchBookmarks = async () => {
    try {
      const response = await fetch('/api/bookmarks');
      if (!response.ok) {
        throw new Error('Failed to fetch bookmarks');
      }
      const data = await response.json();
      setBookmarks(data);
      setFilteredBookmarks(data);
    } catch (error) {
      console.error('Error fetching bookmarks:', error);
      toast({
        title: 'Error',
        description: 'Failed to fetch bookmarks. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleAddBookmark = async (newBookmark: Omit<Bookmark, 'id'>) => {
    try {
      const response = await fetch('/api/bookmarks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newBookmark),
      });

      if (!response.ok) {
        throw new Error('Failed to add bookmark');
      }

      const addedBookmark = await response.json();
      setBookmarks([...bookmarks, addedBookmark]);
      setFilteredBookmarks([...filteredBookmarks, addedBookmark]);
      toast({
        title: 'Success',
        description: 'Bookmark added successfully!',
      });
    } catch (error) {
      console.error('Error adding bookmark:', error);
      toast({
        title: 'Error',
        description: 'Failed to add bookmark. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleSearch = (query: string) => {
    const filtered = bookmarks.filter(
      (bookmark) =>
        bookmark.title.toLowerCase().includes(query.toLowerCase()) ||
        bookmark.url.toLowerCase().includes(query.toLowerCase())
    );
    setFilteredBookmarks(filtered);
  };

  return (
    <div className="container mx-auto p-4 flex flex-col items-center">
      <h1 className="text-3xl font-bold mb-6 text-center">Bookmark Saver</h1>
      <div className="w-full max-w-2xl">
        <AddBookmarkForm onAddBookmark={handleAddBookmark} />
        <SearchBar onSearch={handleSearch} />
        <BookmarkList bookmarks={filteredBookmarks} />
      </div>
      <Toaster />
    </div>
  );
}

export default App;