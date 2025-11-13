/**
 * Only this part will be rendered on the /dashboard route
 * The layout.tsx file in the same folder wraps this page
 * and wont be re-rendered when navigating within /dashboard/*
 */

export default function Page() {
  return <p>Dashboard Page</p>;
}