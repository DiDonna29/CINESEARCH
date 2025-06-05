'use client';

import { Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useLikes } from '@/contexts/LikesProvider';
import type { ContentItem } from '@/lib/types';
import { cn } from '@/lib/utils';

interface LikeButtonProps {
  item: ContentItem;
  className?: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ item, className }) => {
  const { addLike, removeLike, isLiked } = useLikes();
  const liked = isLiked(item.id);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation(); // Prevent card click when liking
    e.preventDefault();
    if (liked) {
      removeLike(item.id);
    } else {
      addLike(item);
    }
  };

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={handleLike}
      className={cn('text-muted-foreground hover:text-accent focus:text-accent', liked && 'text-accent', className)}
      aria-label={liked ? 'Unlike' : 'Like'}
    >
      <Heart fill={liked ? 'currentColor' : 'none'} className="h-5 w-5" />
    </Button>
  );
};

export default LikeButton;
