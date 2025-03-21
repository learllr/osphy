import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UserRound } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import Body from "../common/Body.jsx";
import { useMessageDialog } from "../contexts/MessageDialogContext.jsx";
import { useUser } from "../contexts/UserContext.jsx";
import ResetPasswordDialog from "../dialogs/ResetPasswordDialog.jsx";

export default function Login() {
  const { loginUser } = useUser();
  const { showMessage } = useMessageDialog();

  const [showDialog, setShowDialog] = useState(false);

  const { register, handleSubmit } = useForm({
    defaultValues: { email: "", password: "" },
  });

  const mutation = useMutation(({ email, password }) =>
    loginUser(email, password)
  );

  const onSubmit = (data) => {
    mutation.mutate(data);
  };

  return (
    <Body>
      <section className="flex flex-1 items-center justify-center">
        <div className="container">
          <div className="flex flex-col gap-4 items-center">
            <Card className="w-full max-w-md">
              <CardHeader className="items-center">
                <UserRound className="size-10 rounded-full bg-accent p-2.5 text-muted-foreground" />
                <CardTitle className="text-xl">
                  Connectez-vous avec votre email
                </CardTitle>
                <CardDescription>
                  Entrez vos informations pour vous connecter
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="sarah@exemple.com"
                      {...register("email", { required: "Email requis" })}
                    />
                  </div>
                  <div className="grid gap-2">
                    <div className="flex justify-between">
                      <Label htmlFor="password">Mot de passe</Label>
                      <a
                        href="#"
                        onClick={() => setShowDialog(true)}
                        className="text-sm underline text-primary hover:text-primary/80 font-semibold"
                      >
                        Mot de passe oublié ?
                      </a>
                    </div>
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      placeholder="Entrez votre mot de passe"
                      {...register("password", {
                        required: "Mot de passe requis",
                      })}
                    />
                  </div>
                  <Button
                    type="submit"
                    className="w-full"
                    disabled={mutation.isLoading}
                  >
                    {mutation.isLoading ? "Connexion..." : "Se connecter"}
                  </Button>
                </form>
              </CardContent>
            </Card>

            <div className="flex gap-1 text-sm">
              <p>Vous n'avez pas encore de compte ?</p>
              <Link
                to="/signup"
                className="underline text-primary hover:text-primary/80 font-semibold"
              >
                S'inscrire
              </Link>
            </div>
          </div>
        </div>
      </section>

      <ResetPasswordDialog
        isVisible={showDialog}
        onClose={() => setShowDialog(false)}
      />
    </Body>
  );
}
