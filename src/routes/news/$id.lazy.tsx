import { NewsById } from '@/pages/(main)/news/$id';
import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/news/$id')({
  component: NewsById,
});
