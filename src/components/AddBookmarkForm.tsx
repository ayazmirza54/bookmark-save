import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Bookmark } from '../types';

const formSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  url: z.string().url('Invalid URL'),
  description: z.string().optional(),
});

interface AddBookmarkFormProps {
  onAddBookmark: (bookmark: Omit<Bookmark, 'id'>) => void;
}

export function AddBookmarkForm({ onAddBookmark }: AddBookmarkFormProps) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      url: '',
      description: '',
    },
  });

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    onAddBookmark(values);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center block">Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter bookmark title" {...field} className="text-center" />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="url"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center block">URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com" {...field} className="text-center" />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-center block">Description (optional)</FormLabel>
              <FormControl>
                <Textarea placeholder="Enter a description" {...field} className="text-center" />
              </FormControl>
              <FormMessage className="text-center" />
            </FormItem>
          )}
        />
        <div className="text-center">
          <Button type="submit">Add Bookmark</Button>
        </div>
      </form>
    </Form>
  );
}