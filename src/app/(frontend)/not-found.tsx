import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-8xl font-bold text-[var(--primary)] mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-[var(--foreground)] mb-4">Page Not Found</h2>
      <p className="text-[var(--muted-foreground)] mb-8 max-w-md">
        The page you are looking for does not exist or has been moved.
      </p>
      <Button asChild>
        <Link href="/">Go Home</Link>
      </Button>
    </div>
  );
}
