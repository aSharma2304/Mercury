type Subscriber = {
  id: string
  name: string
  email: string
  added_on: Date
}

export const subscribers: Subscriber[] = [
  {
    id: "728ed52f",
    name: "Anthony",
    email: "m@example.com",
    added_on: new Date("2024-01-12"), // YYYY-MM-DD
  },
  {
    id: "728ed52h",
    name: "Donald",
    email: "donald@example.com",
    added_on: new Date(2024, 4, 20), // year, monthIndex, day → May 20, 2024
  },
]
