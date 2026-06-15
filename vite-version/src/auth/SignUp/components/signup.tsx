"use client"

import { useState } from "react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { toast } from "sonner"

export function Signup({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    const firstName = String(data.get("firstName") ?? "").trim()
    const lastName = String(data.get("lastName") ?? "").trim()
    const email = String(data.get("email") ?? "").trim()
    const password = String(data.get("password") ?? "")
    const confirm = String(data.get("confirmPassword") ?? "")

    if (password !== confirm) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)
    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          emailAddress: email,
          username: email,
          password
        })
      })

      if (res.status === 201) {
        toast.success("Account created")
        //window.location.href = "/templates/dashboard/shadcn-dashboard-landing-template/auth/sign-in-2"
        return
      } else if (res.status === 409) {
        toast.error("Username already exists")
      } else {
        toast.error("Signup failed")
      }
    } catch (err) {
      toast.error("Signup error")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form className={cn("flex flex-col gap-6", className)} onSubmit={handleSubmit} {...props}>
      <div className="flex flex-col items-center gap-2 text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm text-balance">Enter your information to create a new account</p>
      </div>

      <div className="grid gap-6">
        <div className="grid grid-cols-2 gap-3">
          <div className="grid gap-3">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" required />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" required />
          </div>
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input id="email" name="email" type="email" required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input id="password" name="password" type="password" required />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input id="confirmPassword" name="confirmPassword" type="password" required />
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox id="terms" required />
          <Label htmlFor="terms" className="text-sm">
            I agree to the {" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Terms of Service
            </a>{" "}
            and {" "}
            <a href="#" className="underline underline-offset-4 hover:text-primary">
              Privacy Policy
            </a>
          </Label>
        </div>

        <Button type="submit" className="w-full cursor-pointer" disabled={loading}>
          {loading ? "Creating..." : "Create Account"}
        </Button>
      </div>

      <div className="text-center text-sm">
        Already have an account? {" "}
        <a href="/templates/dashboard/shadcn-dashboard-landing-template/auth/sign-in-2" className="underline underline-offset-4">
          Sign in
        </a>
      </div>
    </form>
  )
}
