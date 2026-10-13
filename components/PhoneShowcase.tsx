"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

const SCREENS = ["/app-home.png", "/app-vyhodne.png", "/app-kvalita.png"];
const INTERVAL_MS = 4200;

/**
 * Telefon se skutecnymi obrazovkami aplikace na zelenem bloku.
 * Obrazovky se stridaji samy; pri omezenem pohybu jen na kliknuti.
 */
export default function PhoneShowcase({ label }: { label: string }) {
  const [screen, setScreen] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (paused) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const id = setInterval(() => setScreen((s) => (s + 1) % SCREENS.length), INTERVAL_MS);
    return () => clearInterval(id);
  }, [paused]);

  return (
    <div
      className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Zeleny blok za telefonem, stejny prechod jako hlavicka v aplikaci */}
      <div className="absolute inset-x-0 bottom-0 top-10 bg-gradient-to-b from-primary-dark via-primary to-[#3f9a4e]" />

      <div className="relative flex justify-center px-10 pb-10">
        <div className="relative aspect-[640/1391] w-[230px] rounded-[2.6rem] bg-[#0b0f0c] p-[7px] shadow-2xl shadow-black/35 sm:w-[250px] lg:w-[268px]">
          <div className="relative h-full w-full overflow-hidden rounded-[2.2rem] bg-[#f6f8f6]">
            {SCREENS.map((src, i) => (
              <Image
                key={src}
                src={src}
                alt={i === 0 ? label : ""}
                fill
                sizes="(max-width: 640px) 230px, (max-width: 1024px) 250px, 268px"
                className={`object-cover object-top transition-opacity duration-700 ${
                  i === screen ? "opacity-100" : "opacity-0"
                }`}
                priority={i === 0}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Prepinani obrazovek */}
      <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-1.5">
        {SCREENS.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setScreen(i)}
            aria-label={`${label} ${i + 1}`}
            aria-pressed={i === screen}
            className="group py-2"
          >
            <span
              className={`block h-1 transition-[width,background-color] duration-300 ${
                i === screen ? "w-8 bg-white" : "w-4 bg-white/40 group-hover:bg-white/70"
              }`}
            />
          </button>
        ))}
      </div>
    </div>
  );
}
