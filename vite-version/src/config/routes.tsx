import { lazy } from 'react'
import { AuthRedirect } from '@/components/router/auth-redirect'

// Lazy load components for better performance
const Landing = lazy(() => import('@/app/landing/page'))
const Dashboard = lazy(() => import('@/app/dashboard/page'))
const Dashboard2 = lazy(() => import('@/app/dashboard-2/page'))
const Mail = lazy(() => import('@/app/mail/page'))
const Tasks = lazy(() => import('@/app/tasks/page'))
const Chat = lazy(() => import('@/app/chat/page'))
const Calendar = lazy(() => import('@/app/calendar/page'))
const Users = lazy(() => import('@/app/users/page'))
const FAQs = lazy(() => import('@/app/faqs/page'))
const Pricing = lazy(() => import('@/app/pricing/page'))

// Auth pages
const SignIn = lazy(() => import('@/app/auth/SignIn/page'))
const SignUp = lazy(() => import('@/app/auth/SignUp/page'))
const ForgotPassword = lazy(() => import('@/app/auth/ForgotPassword/page'))

// Error pages
const Unauthorized = lazy(() => import('@/app/errors/unauthorized/page'))
const Forbidden = lazy(() => import('@/app/errors/forbidden/page'))
const NotFound = lazy(() => import('@/app/errors/not-found/page'))
const InternalServerError = lazy(() => import('@/app/errors/internal-server-error/page'))
const UnderMaintenance = lazy(() => import('@/app/errors/under-maintenance/page'))

// Settings pages
const UserSettings = lazy(() => import('@/app/settings/user/page'))
const AccountSettings = lazy(() => import('@/app/settings/account/page'))
const BillingSettings = lazy(() => import('@/app/settings/billing/page'))
const AppearanceSettings = lazy(() => import('@/app/settings/appearance/page'))
const NotificationSettings = lazy(() => import('@/app/settings/notifications/page'))
const ConnectionSettings = lazy(() => import('@/app/settings/connections/page'))

export interface RouteConfig {
  path: string
  element: React.ReactNode
  protected?: boolean
  children?: RouteConfig[]
}

export const routes: RouteConfig[] = [
  // Default route - redirect based on auth status
  {
    path: "/",
    element: <AuthRedirect />
  },

  // Landing Page
  {
    path: "/landing",
    element: <Landing />
  },

  // Dashboard Routes
  {
    path: "/dashboard",
    element: <Dashboard />,
    protected: true
  },
  {
    path: "/dashboard-2",
    element: <Dashboard2 />,
    protected: true
  },

  // Application Routes
  {
    path: "/mail",
    element: <Mail />,
    protected: true
  },
  {
    path: "/tasks",
    element: <Tasks />,
    protected: true
  },
  {
    path: "/chat",
    element: <Chat />,
    protected: true
  },
  {
    path: "/calendar",
    element: <Calendar />,
    protected: true
  },

  // Content Pages
  {
    path: "/users",
    element: <Users />,
    protected: true
  },
  {
    path: "/faqs",
    element: <FAQs />
  },
  {
    path: "/pricing",
    element: <Pricing />
  },

  // Authentication Routes
  {
    path: "/SignIn",
    element: <SignIn />
  },
  {
    path: "/SignUp",
    element: <SignUp />
  },
  {
    path: "/ForgotPassword",
    element: <ForgotPassword />
  },

  // Error Pages
  {
    path: "/errors/unauthorized",
    element: <Unauthorized />
  },
  {
    path: "/errors/forbidden",
    element: <Forbidden />
  },
  {
    path: "/errors/not-found",
    element: <NotFound />
  },
  {
    path: "/errors/internal-server-error",
    element: <InternalServerError />
  },
  {
    path: "/errors/under-maintenance",
    element: <UnderMaintenance />
  },

  // Settings Routes
  {
    path: "/settings/user",
    element: <UserSettings />,
    protected: true
  },
  {
    path: "/settings/account",
    element: <AccountSettings />,
    protected: true
  },
  {
    path: "/settings/billing",
    element: <BillingSettings />,
    protected: true
  },
  {
    path: "/settings/appearance",
    element: <AppearanceSettings />,
    protected: true
  },
  {
    path: "/settings/notifications",
    element: <NotificationSettings />,
    protected: true
  },
  {
    path: "/settings/connections",
    element: <ConnectionSettings />,
    protected: true
  },

  // Catch-all route for 404
  {
    path: "*",
    element: <NotFound />
  }
]
