"use server"

import { signIn } from "@/lib/auth/auth.config"
import { AuthError } from "next-auth"

export async function authenticate(
  prevState: string | undefined,
  formData: FormData,
) {
  try {
    await signIn("credentials", {
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      redirectTo: "/dashboard",
    })
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return "Ungültige Anmeldedaten"
        default:
          return "Ein Fehler ist aufgetreten"
      }
    }
    throw error
  }
}