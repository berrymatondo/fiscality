"use client";

import { useRef, useState, type ChangeEvent } from "react";

function sanitizeRaw(input: string): string {
  const negative = input.trim().startsWith("-");
  let value = input.replace(/[^\d,]/g, "");
  const firstComma = value.indexOf(",");
  if (firstComma !== -1) {
    value = value.slice(0, firstComma + 1) + value.slice(firstComma + 1).replace(/,/g, "");
  }
  return negative && value ? `-${value}` : value;
}

function formatDisplay(raw: string): string {
  if (!raw) return "";
  const negative = raw.startsWith("-");
  const body = negative ? raw.slice(1) : raw;
  const [intPart, decPart] = body.split(",");
  const groupedInt = (intPart || "").replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  const formatted = decPart !== undefined ? `${groupedInt},${decPart}` : groupedInt;
  return negative ? `-${formatted}` : formatted;
}

export function toNumericString(raw: string): string {
  return raw.replace(",", ".");
}

export function AmountInput({
  name,
  defaultValue,
  placeholder,
  onRawChange,
}: {
  name: string;
  defaultValue?: unknown;
  placeholder?: string;
  onRawChange?: (raw: string) => void;
}) {
  const initial = defaultValue !== null && defaultValue !== undefined && defaultValue !== "" ? String(defaultValue).replace(".", ",") : "";
  const [raw, setRaw] = useState(sanitizeRaw(initial));
  const inputRef = useRef<HTMLInputElement>(null);

  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    const el = e.target;
    const caret = el.selectionStart ?? el.value.length;
    const keptBeforeCaret = el.value.slice(0, caret).replace(/[^\d,-]/g, "").length;
    const cleaned = sanitizeRaw(el.value);
    setRaw(cleaned);
    onRawChange?.(cleaned);
    requestAnimationFrame(() => {
      if (!inputRef.current) return;
      const formatted = formatDisplay(cleaned);
      let kept = 0;
      let pos = formatted.length;
      for (let i = 0; i < formatted.length; i++) {
        if (/[\d,-]/.test(formatted[i])) kept++;
        if (kept === keptBeforeCaret) {
          pos = i + 1;
          break;
        }
      }
      inputRef.current.setSelectionRange(pos, pos);
    });
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        type="text"
        inputMode="decimal"
        value={formatDisplay(raw)}
        onChange={handleChange}
        placeholder={placeholder}
        className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
      />
      <input type="hidden" name={name} value={toNumericString(raw)} />
    </div>
  );
}
