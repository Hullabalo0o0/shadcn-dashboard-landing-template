"use client"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { toast } from "sonner"

import { useForm } from "@tanstack/react-form"
import { loginSchema } from "@/schemas/auth.schema"
import { useZodForm } from "@/lib/forms/useZodForm"

export function Login({
  className,
  ...props
}: React.ComponentProps<"form">) {

  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },

    validators: {
      onChange: ({ value }) => {
        const result = loginSchema.safeParse(value)

        if (result.success) return undefined

        const issue = result.error.issues[0]

        return issue.message
      },
    },

    onSubmit: async ({ value }) => {
      try {
        const res = await fetch("/api/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username: value.email,
            password: value.password,
          }),
        })

        if (!res.ok) {
          toast.error("Login failed")
          return
        }

        const json = await res.json()

        if (!json?.token) {
          toast.error("Invalid login response")
          return
        }

        localStorage.setItem("token", json.token)

        if (json.user) {
          localStorage.setItem("user", JSON.stringify(json.user))
        }

        toast.success("Logged in")
        window.location.href = "/dashboard"
      } catch {
        toast.error("Login error")
      }
    },
  })

  const getError = (field: any) => field.state.meta.errors?.[0]

  return (
    <form
      className={cn("flex flex-col gap-6", className)}
      noValidate
      onSubmit={(e) => {
        e.preventDefault()
        form.handleSubmit()
      }}
      {...props}
    >
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Login to your account</h1>
        <p className="text-muted-foreground text-sm text-balance">
          Enter your email below to login to your account
        </p>
      </div>

      <div className="grid gap-6">
        {/* EMAIL */}
        <form.Field
          name="email"
          children={(field) => (
            <div className="grid gap-3">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              {getError(field) && (
                <p className="text-sm text-red-500">
                  {getError(field)}
                </p>
              )}
            </div>
          )}
        />

        {/* PASSWORD */}
        <form.Field
          name="password"
          children={(field) => (
            <div className="grid gap-3">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>

                <a
                  href="/ForgotPassword"
                  className="ml-auto text-sm underline-offset-4 hover:underline"
                >
                  Forgot your password?
                </a>
              </div>

              <Input
                id="password"
                type="password"
                value={field.state.value}
                onChange={(e) => field.handleChange(e.target.value)}
                onBlur={field.handleBlur}
              />

              {getError(field) && (
                <p className="text-sm text-red-500">
                  {getError(field)}
                </p>
              )}
            </div>
          )}
        />

        {/* SUBMIT BUTTON */}
        <form.Subscribe
          selector={(state) => state}
          children={(state) => (
            <Button
              type="submit"
              className="w-full cursor-pointer"
              disabled={state.isSubmitting}
              onClick={form.handleSubmit}
            >
              {state.isSubmitting ? "Logging in..." : "Login"}
            </Button>
          )}
        />
      </div>

      <div className="text-center text-sm">
        Don&apos;t have an account?{" "}
        <a href="/SignUp" className="underline underline-offset-4">
          Sign up
        </a>
      </div>
    </form>
  )
}
