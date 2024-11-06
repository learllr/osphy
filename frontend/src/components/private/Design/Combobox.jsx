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

export default function Combobox({ subjects, onSelect, placeholder }) {
  const [open, setOpen] = React.useState(false)
  const [value, setValue] = React.useState("")

  const handleSelect = (currentValue) => {
    setValue(currentValue === value ? "" : currentValue)
    setOpen(false)
    if (onSelect) onSelect(currentValue)
  }

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {value
            ? subjects.find((subject) => subject.value === value)?.label
            : "Sélectionnez un sujet..."}
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder={placeholder} />
          <CommandList>
            <CommandEmpty>Aucun sujet trouvé.</CommandEmpty>
            <CommandGroup>
              {subjects.map((subject) => (
                <CommandItem
                  key={subject.value}
                  value={subject.value}
                  onSelect={() => handleSelect(subject.value)}
                >
                  {subject.label}
                  <Check
                    className={cn(
                      "ml-auto",
                      value === subject.value ? "opacity-100" : "opacity-0"
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
