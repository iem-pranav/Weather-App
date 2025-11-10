import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { ChevronsUpDown } from "lucide-react";

type Props = {
  location: string;
  setLocation: Dispatch<SetStateAction<string>>;
  onSelectLocation: (city: string) => void;
};

const popularLocations = [
  "Bangkok",
  "Tokyo",
  "Seoul",
  "Dubai",
  "Manila",
  "London",
  "New York",
  "Paris",
  "Berlin",
  "Madrid",
  "Rome",
  "Lisbon",
];

export default function LocationDropdown({
  location,
  setLocation,
  onSelectLocation,
}: Props) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const handleSelect = (city: string) => {
    setLocation(city);
    setSearch(city);
    onSelectLocation(city);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[200px] justify-between"
        >
          {location ? location : "Select or Search City"}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="z-9999 w-[200px] p-0">
        <Command>
          <CommandInput
            placeholder="Search city..."
            value={search}
            onValueChange={setSearch}
          />
          <CommandList>
            <CommandEmpty>No city found.</CommandEmpty>
            <CommandGroup heading="Popular">
              {popularLocations.map((city) => (
                <CommandItem
                  key={city}
                  value={city}
                  onSelect={() => handleSelect(city)}
                >
                  {city}
                </CommandItem>
              ))}
            </CommandGroup>
            {search && !popularLocations.includes(search) && (
              <CommandGroup heading="Custom">
                <CommandItem
                  value={search}
                  onSelect={() => handleSelect(search)}
                >
                  {search}
                </CommandItem>
              </CommandGroup>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
