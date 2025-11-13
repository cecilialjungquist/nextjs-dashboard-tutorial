import DashboardSkeleton from '@/app/ui/skeletons';

// This is a special Next.js file built on top of React Suspense
// It allows you to show a loading state while your async
// server components are fetching data

export default function Loading() {
  return <DashboardSkeleton />;
}