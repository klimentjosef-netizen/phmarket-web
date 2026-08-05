"use client";

import { useState } from "react";
import {
  COVERAGE,
  FLAGS,
  MAP_LABELS,
  MAP_SHAPES,
  MAP_VIEW_BOX,
  type CoverageCode,
} from "@/lib/coverage";

type Props = {
  /** Nazev zeme v aktualnim jazyce, klic = kod statu. */
  names: Record<CoverageCode, string>;
  ariaLabel: string;
};

const NEIGHBOURS = MAP_SHAPES.filter((s) => !s.active);
const ACTIVE_SHAPES = MAP_SHAPES.filter((s) => s.active);

export default function CoverageMap({ names, ariaLabel }: Props) {
  /** Zvyraznena zeme pri najeti mysi. Cistě dekorativni, obsah funguje i bez toho. */
  const [hovered, setHovered] = useState<CoverageCode | null>(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,3fr)_minmax(0,2fr)] gap-10 lg:gap-14 items-center">
      <div className="relative">
        <svg
          viewBox={MAP_VIEW_BOX}
          role="img"
          aria-label={ariaLabel}
          className="w-full h-auto"
        >
          {/* Okolní státy pod maskou, aby se ořez výřezu neprojevil jako obdélník. */}
          <g mask="url(#coverage-fade)">
            {NEIGHBOURS.map((shape) => (
              <path
                key={shape.iso}
                d={shape.d}
                fill="#eceef1"
                stroke="#ffffff"
                strokeWidth={2.5}
                strokeLinejoin="round"
              />
            ))}
          </g>

          <g filter="url(#coverage-shadow)">
            {ACTIVE_SHAPES.map((shape) => (
              <path
                key={shape.iso}
                d={shape.d}
                fill={
                  hovered === shape.iso
                    ? "url(#coverage-hover)"
                    : "url(#coverage-active)"
                }
                stroke="#ffffff"
                strokeWidth={2.5}
                strokeLinejoin="round"
                className="transition-[fill] duration-300"
                onMouseEnter={() => setHovered(shape.iso as CoverageCode)}
                onMouseLeave={() => setHovered(null)}
              />
            ))}
          </g>

          {COVERAGE.map((iso) => (
            <text
              key={iso}
              x={MAP_LABELS[iso][0]}
              y={MAP_LABELS[iso][1]}
              textAnchor="middle"
              dominantBaseline="middle"
              className="fill-white font-bold pointer-events-none select-none"
              style={{ fontSize: 34, letterSpacing: "0.06em" }}
            >
              {iso}
            </text>
          ))}

          <defs>
            <linearGradient id="coverage-active" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#4B916D" />
              <stop offset="100%" stopColor="#186E31" />
            </linearGradient>
            <linearGradient id="coverage-hover" x1="0" y1="0" x2="0.6" y2="1">
              <stop offset="0%" stopColor="#5FA57F" />
              <stop offset="100%" stopColor="#1F8540" />
            </linearGradient>

            <filter
              id="coverage-shadow"
              x="-10%"
              y="-10%"
              width="120%"
              height="120%"
            >
              <feDropShadow
                dx="0"
                dy="10"
                stdDeviation="14"
                floodColor="#0D4F3D"
                floodOpacity="0.18"
              />
            </filter>

            <filter
              id="coverage-blur"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
            >
              <feGaussianBlur stdDeviation="30" />
            </filter>
            <mask id="coverage-fade">
              <rect x={-60} y={-60} width={1120} height={949} fill="#000000" />
              <rect
                x={70}
                y={70}
                width={860}
                height={689}
                fill="#ffffff"
                filter="url(#coverage-blur)"
              />
            </mask>
          </defs>
        </svg>
      </div>

      <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3">
        {COVERAGE.map((iso) => (
          <li
            key={iso}
            onMouseEnter={() => setHovered(iso)}
            onMouseLeave={() => setHovered(null)}
            className={`flex items-center gap-3 rounded-xl border bg-white px-4 py-3 transition-all duration-200 ${
              hovered === iso
                ? "border-primary/40 shadow-md shadow-primary/10 -translate-y-0.5"
                : "border-gray-100 shadow-sm"
            }`}
          >
            <span aria-hidden className="text-2xl leading-none shrink-0">
              {FLAGS[iso]}
            </span>
            <span className="font-semibold text-dark min-w-0 truncate">
              {names[iso]}
            </span>
            <span className="ml-auto shrink-0 text-xs font-semibold text-primary/60 tracking-wider">
              {iso}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
