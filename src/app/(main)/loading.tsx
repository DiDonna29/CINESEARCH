import SkeletonGrid from '@/components/shared/SkeletonGrid';

export default function Loading() {
  return (
    <div className="space-y-8 animate-pulse">
      <div className="flex items-center justify-between">
        <div className="h-10 w-48 bg-muted rounded"></div>
      </div>
      <SkeletonGrid count={10} />
    </div>
  );
}
