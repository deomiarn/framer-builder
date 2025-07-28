import { cn } from "@/shared/lib/utils";

interface SuccessCardProps {
  title: string;
  subtitle?: string;
  className?: string;
}

export function SuccessCard({ title, subtitle, className }: SuccessCardProps) {
  return (
    <div
      className={cn(
        "flex items-start gap-3 rounded-lg border border-green-300/50 bg-green-50 px-4 py-3 text-green-900",
        className,
      )}
    >
      <div className="space-y-2 w-full text-center">
        <p className="font-medium">{title}</p>
        {subtitle && <p className="text-sm">{subtitle}</p>}
      </div>
    </div>
  );
}
