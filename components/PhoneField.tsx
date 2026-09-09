"use client";

import { useEffect, useRef, useState } from "react";
import {
  COUNTRY_CODES,
  PHONE_PATTERN,
  PHONE_TITLE,
} from "../lib/countryCodes";

function flagUrl(iso: string) {
  return `https://flagcdn.com/24x18/${iso}.png`;
}

// Selector de código de país con banderas reales (no emoji: en Windows los
// <select> nativos no renderizan los emoji de bandera, se ven como texto).
export function PhoneField({
  code,
  onCodeChange,
  number,
  onNumberChange,
  name = "whatsapp",
  required = true,
}: {
  code: string;
  onCodeChange: (code: string) => void;
  number: string;
  onNumberChange: (number: string) => void;
  name?: string;
  required?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);
  const current = COUNTRY_CODES.find((c) => c.code === code) ?? COUNTRY_CODES[0];

  useEffect(() => {
    function onOutsideClick(e: MouseEvent) {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onOutsideClick);
    return () => document.removeEventListener("mousedown", onOutsideClick);
  }, []);

  return (
    <div ref={wrapRef} style={{ display: "flex", gap: 8, position: "relative" }}>
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        aria-haspopup="listbox"
        aria-expanded={open}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 6,
          width: 96,
          flexShrink: 0,
          background: "#272527",
          border: "1px solid rgba(255,255,255,.18)",
          borderRadius: 6,
          color: "#fff",
          padding: "0 10px",
          cursor: "pointer",
          font: "inherit",
          height: "100%",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={flagUrl(current.iso)}
          width={20}
          height={15}
          alt=""
          style={{ borderRadius: 2, display: "block" }}
        />
        <span>{current.code}</span>
      </button>

      {open && (
        <div
          role="listbox"
          style={{
            position: "absolute",
            top: "calc(100% + 6px)",
            left: 0,
            zIndex: 30,
            background: "#1c1a1b",
            border: "1px solid rgba(255,255,255,.18)",
            borderRadius: 10,
            overflow: "hidden",
            minWidth: 190,
            boxShadow: "0 20px 45px rgba(0,0,0,.45)",
          }}
        >
          {COUNTRY_CODES.map((c) => (
            <div
              key={c.code}
              role="option"
              aria-selected={c.code === code}
              onClick={() => {
                onCodeChange(c.code);
                setOpen(false);
              }}
              style={{
                display: "flex",
                alignItems: "center",
                gap: 10,
                padding: "9px 14px",
                cursor: "pointer",
                color: "#fff",
                fontSize: 13,
                background: c.code === code ? "rgba(255,255,255,.06)" : "transparent",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,.1)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background =
                  c.code === code ? "rgba(255,255,255,.06)" : "transparent";
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={flagUrl(c.iso)}
                width={20}
                height={15}
                alt=""
                style={{ borderRadius: 2, display: "block" }}
              />
              <span style={{ fontWeight: 700 }}>{c.code}</span>
              <span style={{ color: "#9f9f9f" }}>{c.name}</span>
            </div>
          ))}
        </div>
      )}

      <input
        required={required}
        name={name}
        type="tel"
        inputMode="tel"
        pattern={PHONE_PATTERN}
        title={PHONE_TITLE}
        placeholder="11 2345 6789"
        value={number}
        onChange={(e) => onNumberChange(e.target.value)}
        style={{ flex: 1 }}
      />
    </div>
  );
}
