import { Star, StarHalf } from 'lucide-react';

interface StarRatingProps {
  rating?: number;
  maxRating?: number;
  size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating = 0, maxRating = 10, size = 20 }) => {
  const fullStars = Math.floor(rating / (maxRating / 5));
  const halfStar = (rating / (maxRating / 5)) % 1 >= 0.5 ? 1 : 0;
  const emptyStars = 5 - fullStars - halfStar;

  return (
    <div className="flex items-center flex-nowrap shrink-0 overflow-hidden" aria-label={`Rating: ${rating} out of ${maxRating}`}>
      <div className="flex items-center shrink-0">
        {[...Array(fullStars)].map((_, i) => (
          <Star key={`full-${i}`} fill="currentColor" className="text-accent shrink-0" size={size} />
        ))}
        {halfStar === 1 && <StarHalf key="half" fill="currentColor" className="text-accent shrink-0" size={size} />}
        {[...Array(emptyStars < 0 ? 0 : emptyStars)].map((_, i) => (
          <Star key={`empty-${i}`} className="text-muted-foreground/30 shrink-0" size={size} />
        ))}
      </div>
      {rating > 0 && (
        <span className="ml-2 text-sm font-bold text-foreground whitespace-nowrap shrink-0">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  );
};

export default StarRating;
