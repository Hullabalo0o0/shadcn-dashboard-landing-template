import {
  CheckCircle2,
  Circle,
  Clock,
  PlayCircle,
} from "lucide-react"

import { AlertTriangle, Minus, ArrowDown } from "lucide-react"

export const categories = [
  {
    value: "bug",
    label: "Bug",
  },
  {
    value: "feature",
    label: "Feature",
  },
  {
    value: "documentation",
    label: "Docs",
  },
  {
    value: "improvement",
    label: "Improvement",
  },
  {
    value: "refactor",
    label: "Refactor",
  },
]

export const statuses = [
  {
    value: "pending",
    label: "Pending",
    icon: Clock,
  },
  {
    value: "todo",
    label: "Todo",
    icon: Circle,
  },
  {
    value: "in progress",
    label: "In Progress",
    icon: PlayCircle,
  },
  {
    value: "completed",
    label: "Completed",
    icon: CheckCircle2,
  },
]

export const priorities = [
  {
    label: "High",
    value: "high",
    icon: AlertTriangle,
  },
  {
    label: "Medium",
    value: "medium",
    icon: Minus,
  },
  {
    label: "Low",
    value: "low",
    icon: ArrowDown,
  },
]