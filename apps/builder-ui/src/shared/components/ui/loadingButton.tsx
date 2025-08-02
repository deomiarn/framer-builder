import { forwardRef, type ReactNode } from "react";
import { Button } from "@/shared/components/ui/button.tsx";
import { Loader2Icon } from "lucide-react";

interface LoadingButtonProps extends React.ComponentProps<typeof Button> {
  isLoading?: boolean;
  loadingText?: ReactNode;
}

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  (
    {
      isLoading = false,
      loadingText = "Loading…",
      children,
      disabled,
      ...rest
    },
    ref,
  ) => (
    <Button ref={ref} disabled={disabled || isLoading} {...rest}>
      {isLoading && <Loader2Icon className="h-4 w-4 animate-spin shrink-0" />}
      {isLoading ? loadingText : children}
    </Button>
  ),
);

LoadingButton.displayName = "LoadingButton";

export default LoadingButton;
