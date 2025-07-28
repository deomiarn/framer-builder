import { type FormEvent, useState } from "react";
import { Button } from "@/shared/ui/button";
import { useAuthCtx } from "../AuthContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card.tsx";
import { Input } from "@/shared/ui/input.tsx";

export default function LoginPage() {
  const { signIn } = useAuthCtx();
  const [email, setEmail] = useState("");

  async function submit(e: FormEvent) {
    e.preventDefault();
    if (email) await signIn(email);
  }

  return (
    <div className="grid min-h-screen place-items-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-center">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={submit} className="space-y-4">
            <Input
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Button className="w-full" type="submit">
              Send Magic Link
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
