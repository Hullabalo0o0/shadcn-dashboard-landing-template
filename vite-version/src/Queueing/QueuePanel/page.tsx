"use client"

import { BarberCard } from "./components/barber-card"

const barbers = [
  {
    id: 1,
    name: "Pandak",
    role: "Professional Kalbo Specialist",
    customers: [
      { id: 1, name: "Juan Dela Cruz" },
      { id: 2, name: "Maria Santos" },
      { id: 3, name: "Alex Rivera" },
      { id: 4, name: "John Doe" },
      { id: 5, name: "Jexter" },
    ],
  },
  {
    id: 2,
    name: "Christoper",
    role: "Panot Expert",
    customers: [{ id: 4, name: "John Lim" }],
  },
  {
    id: 3,
    name: "Tuklaw",
    role: "Beard Specialist",
    customers: [
      { id: 4, name: "Ana Martinez" },
      { id: 5, name: "Carlos Reyes" },
    ],
  },
  {
    id: 4,
    name: "Bato",
    role: "Bato Specialist",
    customers: [
      { id: 6, name: "John Doe" },
      { id: 7, name: "Maria Lopez" },
    ],
  },{
    id: 5,
    name: "Marlboro",
    role: "Marlboro Specialist",
    customers: [
      { id: 6, name: "Garcia Lopez" },
      { id: 7, name: "Mario Garcia" },
    ],
  },
]

const skippedCustomers = [
  { id: 101, name: "Miguel Santos", barber: "Pandak" },
  { id: 102, name: "Anna Cruz", barber: "Christoper" },
]

export default function QueueingPage() {
  return (
    <div className="min-h-screen bg-background flex flex-col">

      {/* Header */}
      <header className="border-b">
        <div className="mx-auto w-full max-w-7xl py-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold">
            JEXTER'S BARBER SHOP QUEUEING SYSTEM
          </h1>
        </div>
      </header>

      {/* Main Layout */}
      <main className="flex-1 w-full max-w-10xl mx-auto px-4 py-10 grid grid-cols-1 lg:grid-cols-4 gap-6">

        {/* LEFT: BARBERS PANEL */}
      <div className="lg:col-span-3 border rounded-lg p-4">

        {/* Header inside panel */}
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-muted-foreground">
            Barbers
          </h2>

          <span className="text-xs text-muted-foreground">
            {barbers.length} active
          </span>
        </div>

        {/* Grid inside bounded box */}
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 auto-rows-fr">
          {barbers.map((barber) => (
            <BarberCard key={barber.id} barber={barber} />
          ))}
        </div>

      </div>

        {/* RIGHT: SKIPPED PANEL */}
        <div className="border rounded-lg p-4 h-fit">

          <h2 className="text-sm font-semibold text-muted-foreground mb-4">
            Skipped Customers
          </h2>

          <div className="space-y-2 max-h-[500px] overflow-y-auto no-scrollbar">

            {skippedCustomers.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center">
                No skipped customers
              </p>
            ) : (
              skippedCustomers.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center justify-between rounded-md border px-2 py-1"
                >

                  <span className="text-xs font-medium">
                    {c.name}
                  </span>

                  <span className="text-[10px] text-muted-foreground">
                    from {c.barber}
                  </span>

                </div>
              ))
            )}

          </div>

        </div>

      </main>

    </div>
  )
}