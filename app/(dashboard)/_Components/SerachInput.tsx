"use client";

import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { useRouter } from "next/navigation";
import qs from "query-string";
import { useEffect, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

export default function SearchInput() {
  const router = useRouter();

  // 🔹 1. Immediate input state (for fast UI typing)
  const [input, setInput] = useState("");

  // 🔹 2. Debounced value (updates after 500ms of no typing)
  const [debouncedValue] = useDebounceValue(input, 500);

  // 🔹 3. Effect runs ONLY when debounced value changes
  useEffect(() => {
    // 👉 If input is empty, go back to base URL
    if (!debouncedValue) {
      router.replace("/");
      return;
    }

    // 👉 Build URL with query param (?search=...)
    const url = qs.stringifyUrl(
      {
        url: "/",
        query: {
          search: debouncedValue,
        },
      },
      {
        skipEmptyString: true, // remove empty values
        skipNull: true,
      }
    );

    // 👉 Use replace instead of push to avoid history spam
    router.replace(url);
  }, [debouncedValue, router]);

  // 🔹 4. Handle typing (instant update)
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    setInput(e.target.value);
  };

  return (
    <div className="w-full relative">
      {/* 🔹 Search Icon inside input */}
      <Search className="absolute top-1/2 left-3 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />

      {/* 🔹 Controlled Input */}
      <Input
        value={input} // always controlled
        onChange={handleChange}
        placeholder="Search boards"
        className="w-full max-w-[516px] pl-9"
      />
    </div>
  );
}