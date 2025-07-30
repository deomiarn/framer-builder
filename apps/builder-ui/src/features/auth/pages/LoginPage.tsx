import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/shared/components/ui/card.tsx";
import { EmailLoginForm } from "@/features/auth/components/EmailLoginForm.tsx";

export default function LoginPage() {
  return (
    <div className="grid min-h-screen place-items-center bg-background">
      <Card className="w-96">
        <CardHeader className="space-y-2 text-center">
          <CardTitle>Log in / Sign up</CardTitle>
          <CardDescription>
            Enter your email. We’ll send you a one-click Magic Link to access
            your account.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EmailLoginForm />
        </CardContent>
      </Card>
    </div>
  );
}
