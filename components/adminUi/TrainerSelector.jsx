"use client"

import * as React from "react"
import { Check, ChevronsUpDown } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Input } from "../ui/input"

export default function ComboboxDemo({ onSelect }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")
  const [loading, setLoading] = React.useState(true)
  const [trainers, setTrainers] = React.useState([])

  // Function to get initials from name
  const getInitials = (name) => {
    if (!name) return ""
    const parts = name.split(" ")
    return parts.length > 1
      ? `${parts[0][0]}${parts[parts.length - 1][0]}`
      : name.substring(0, 2)
  }

  React.useEffect(() => {
    async function fetchTrainers() {
      try {
        const res = await fetch("/api/user/trainer")
        const data = await res.json()

        if (res.ok) {
          setTrainers(data.trainers || [])
        } else {
          throw new Error(data.error || "Failed to load trainers")
        }
      } catch (err) {
        console.error("Error fetching trainers:", err)
      } finally {
        setLoading(false)
      }
    }

    fetchTrainers()
  }, [])

  if (loading) {
    return <Input disabled className="w-full bg-gray-100" value="Loading..." />
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild className={"w-full"}>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between capitalize"
        >
          {value ? (
            <div className="flex items-center gap-2">
              <Avatar className="h-5 w-5">
                <AvatarFallback className="text-xs">
                  {getInitials(value)}
                </AvatarFallback>
              </Avatar>
              <span>{value}</span>
            </div>
          ) : (
            "Select trainer..."
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[400px] p-0">
        <Command className="w-full">
          <CommandInput placeholder="Search trainer..." />
          <CommandList>
            <CommandEmpty>No trainer found.</CommandEmpty>
            <CommandGroup>
              {trainers.map((trainer) => (
                <CommandItem
                  key={trainer.id}
                  value={trainer.name}
                  onSelect={(currentValue) => {
                    const selectedValue =
                      currentValue === value ? "" : currentValue
                    setValue(selectedValue)
                    if (onSelect) {
                      onSelect(selectedValue ? trainer?.id : null)
                    }
                    setOpen(false)
                  }}
                  className="flex items-center gap-2"
                >
                  <Avatar className="h-6 w-6">
                    <AvatarFallback className="text-xs">
                      {getInitials(trainer.name)}
                    </AvatarFallback>
                  </Avatar>
                  <span>{trainer.name}</span>
                  <Check
                    className={cn(
                      "ml-auto h-4 w-4",
                      value === trainer.name ? "opacity-100" : "opacity-0"
                    )}
                  />
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
