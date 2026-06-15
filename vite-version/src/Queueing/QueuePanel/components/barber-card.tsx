"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

type Customer = {
  id: number
  name: string
}

type Barber = {
  id: number
  name: string
  role: string
  customers: Customer[]
}

export function BarberCard({ barber }: { barber: Barber }) {
  return (
    <Card className="hover:shadow-xl transition">
      <CardContent className="p-4 space-y-1">
        <Avatar className="h-40 w-40 mx-auto">
            <AvatarImage
              src={`https://api.dicebear.com/10.x/adventurer/svg?seed=${barber.name}`}
              alt={barber.name}
            />
            <AvatarFallback className="text-lg">
              {barber.name.slice(0, 2).toUpperCase()}
            </AvatarFallback>
        </Avatar>

        {/* Barber Info */}
        <div className="text-center space-y-2">
          <h3 className="text-xl font-bold">{barber.name}</h3>
          <Badge variant="outline" className="text-sm font-medium">
            {barber.role}
          </Badge>
        </div>

        {/* Queue Preview */}
        <div className="border rounded-lg p-3 mt-4 space-y-3">

          {/* Header (inside border) */}
          <div className="flex items-center justify-between">
            <p className="text-xs font-medium text-muted-foreground">
              Current Queue
            </p>

            <span className="text-xs text-muted-foreground">
              {barber.customers.length}{" "}
              {barber.customers.length === 1 ? "customer" : "customers"}
            </span>
          </div>

          {/* Divider */}
          <div className="h-px bg-border" />
            {/* Content */}
            <div className="space-y-2 max-h-55 overflow-y-auto no-scrollbar">

              {barber.customers.length === 0 ? (
                <p className="text-xs text-center text-muted-foreground py-2">
                  No customers in queue
                </p>

              ) : (
                <>
                  {/* Show first 3 customers */}
                  {barber.customers.slice(0, 3).map((c) => (
                    <div
                      key={c.id}
                      className="flex items-center gap-2 rounded-md border px-2 py-1"
                    >
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={`https://api.dicebear.com/10.x/open-peeps/svg?seed=${c.name}`}
                          alt="avatar"
                        />
                        <AvatarFallback className="text-[10px]">
                          {c.name.slice(0, 2).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>

                      <span className="text-sm font-medium truncate">
                        {c.name}
                      </span>
                    </div>
                  ))}

                  {/* Overflow indicator (avatar group style) */}
                  {barber.customers.length > 3 && (
                    <div className="flex items-center gap-2 pt-1">

                      {/* Mini avatar stack */}
                      <div className="flex -space-x-2">
                        {barber.customers.slice(3, 5).map((c) => (
                          <Avatar key={c.id} className="h-10 w-10 border border-background">
                            <AvatarImage
                              src={`https://api.dicebear.com/10.x/open-peeps/svg?seed=${c.name}`}
                              alt={c.name}
                            />
                            <AvatarFallback className="text-[10px]">
                              {c.name.slice(0, 2).toUpperCase()}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                      </div>

                      {/* Count badge */}
                      <div className="text-[10px] px-3 py-0.5 rounded-full bg-muted text-muted-foreground">
                        +{barber.customers.length - 3}
                      </div>

                    </div>
                  )}
                </>
              )}

            </div>
        </div>

      </CardContent>
    </Card>
  )
}