import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type LoginInput, LoginSchema } from "../types/auth.schema";
import { Input } from "@/shared/ui/input";
import { Button } from "@/shared/ui/button";
import { useAuthCtx } from "@/features/auth/AuthContext.ts";
import { SuccessCard } from "@/features/auth/components/SuccessCard.tsx";
import { ChevronLeftIcon } from "lucide-react";

export function EmailLoginForm() {
  const { signIn } = useAuthCtx();
  const [sent, setSent] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors, isValid, touchedFields, isSubmitted },
  } = useForm<LoginInput>({
    resolver: zodResolver(LoginSchema),
    mode: "onSubmit",
    reValidateMode: "onBlur",
  });

  async function onSubmit({ email }: LoginInput) {
    try {
      await signIn(email);
      setSent(true);
    } catch (e: any) {
      setErrorMsg(e.message ?? "Unknown error");
    }
  }

  if (sent) {
    return (
      <div>
        <SuccessCard
          title="Check your inbox!"
          subtitle="We’ve sent you a sign-in link."
        />
        <Button
          variant="ghost"
          className="mt-4 w-full"
          onClick={() => setSent(false)}
        >
          <ChevronLeftIcon />
          Use another email
        </Button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
      <Input
        type="email"
        placeholder="you@example.com"
        {...register("email")}
      />
      {(isSubmitted || touchedFields.email) && errors.email && (
        <p className="text-destructive text-sm">{errors.email.message}</p>
      )}
      {errorMsg && <p className="text-destructive text-sm">{errorMsg}</p>}
      <Button className="w-full" disabled={!isValid}>
        Send link
      </Button>
      <p className="text-xs text-muted-foreground text-center">
        We’ll automatically create an account if you’re new.
      </p>
    </form>
  );
}
