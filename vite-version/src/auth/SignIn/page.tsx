import { Login } from "./components/login"
import { Logo } from "@/components/logo"

export default function LoginPage() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="/" className="flex items-center gap-2 font-medium">
            <div className="text-primary-foreground flex size-8 items-center justify-center rounded-md">
              <Logo size={24} />
            </div>
            Ascendtrix IT Solutions
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-md">
            <Login />
          </div>
        </div>
      </div>
      <div className="bg-muted relative hidden lg:block">
        <img
          src="/ascentrix-logo.png"
          alt="Ascendtrix Logo"
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137 h-100 dark:brightness-[0.95]"
        />
    </div>
    </div>
  )
}
