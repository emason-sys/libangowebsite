"use client";

import { AREAS } from "@/lib/vendors";
import { OUTLINE, project, projectMetro } from "@/lib/geo";

export const METRO_KEY = "__METRO__";

interface BubbleProps {
  x: number;
  y: number;
  r: number;
  areaKey: string;
  count: number;
  label: string;
  labelGap?: number;
  dim?: boolean;
  selected?: boolean;
  onSelect?: (key: string) => void;
}

function Bubble({ x, y, r, areaKey, count, label, labelGap = 13, dim, selected, onSelect }: BubbleProps) {
  const cls = ["bub", dim ? "dim" : "", selected ? "sel" : ""].filter(Boolean).join(" ");
  const interactive = onSelect != null;
  return (
    <g
      className={cls}
      role={interactive ? "button" : undefined}
      tabIndex={interactive ? 0 : undefined}
      aria-label={interactive ? `${label}: ${count} vendors` : undefined}
      onClick={interactive ? () => onSelect(areaKey) : undefined}
      onKeyDown={
        interactive
          ? (e) => {
              if (e.key === "Enter" || e.key === " ") {
                e.preventDefault();
                onSelect(areaKey);
              }
            }
          : undefined
      }
    >
      <circle className="bubble" cx={x} cy={y} r={r} />
      <text className="bubble-count" x={x} y={y}>
        {count}
      </text>
      <text className="bubble-label" x={x} y={y + r + labelGap}>
        {label}
      </text>
    </g>
  );
}

export interface MapProps {
  /** Vendor count per area key (drives bubble size and the number shown). */
  counts: Record<string, number>;
  /** Area keys that match the current filters; others render dimmed. Omit to show all. */
  activeKeys?: Set<string>;
  selectedKey?: string;
  onSelect?: (key: string) => void;
}

export function LiberiaMap({ counts, activeKeys, selectedKey, onSelect }: MapProps) {
  const points = OUTLINE.map(([lon, lat]) => project(lon, lat).map((v) => v.toFixed(1)).join(",")).join(" ");
  const metroAreas = AREAS.filter((a) => a.metro);
  const metroTotal = metroAreas.reduce((s, a) => s + (counts[a.key] ?? 0), 0);
  const metroActive = activeKeys == null || metroAreas.some((a) => activeKeys.has(a.key));
  const [mx, my] = project(-10.82, 6.26);
  return (
    <svg
      viewBox="0 0 440 445"
      role="img"
      aria-label="Map of Liberia with vendor areas"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <polygon className="land" points={points} />
      <Bubble
        x={mx}
        y={my}
        r={10 + Math.sqrt(metroTotal) * 1.1}
        areaKey={METRO_KEY}
        count={metroTotal}
        label="Greater Monrovia"
        dim={!metroActive}
        onSelect={onSelect}
      />
      {AREAS.filter((a) => !a.metro).map((a) => {
        const [x, y] = project(a.lon, a.lat);
        return (
          <Bubble
            key={a.key}
            x={x}
            y={y}
            r={9 + Math.sqrt(counts[a.key] ?? 0) * 1.1}
            areaKey={a.key}
            count={counts[a.key] ?? 0}
            label={a.mapLabel ?? a.label}
            labelGap={12}
            dim={activeKeys != null && !activeKeys.has(a.key)}
            selected={selectedKey === a.key}
            onSelect={onSelect}
          />
        );
      })}
    </svg>
  );
}

export function MetroInset({ counts, activeKeys, selectedKey, onSelect }: MapProps) {
  return (
    <svg
      viewBox="0 0 399 372"
      role="img"
      aria-label="Greater Monrovia vendor areas"
      style={{ width: "100%", height: "auto", display: "block" }}
    >
      <rect className="land" x={4} y={4} width={391} height={364} rx={14} />
      <path
        d="M14 296 Q 120 330 240 348 T 392 362"
        fill="none"
        stroke="var(--map-stroke)"
        strokeWidth={1.2}
        strokeDasharray="4 4"
        opacity={0.6}
      />
      {AREAS.filter((a) => a.metro).map((a) => {
        const [x, y] = projectMetro(a.lon, a.lat);
        return (
          <Bubble
            key={a.key}
            x={x}
            y={y}
            r={11 + Math.sqrt(counts[a.key] ?? 0) * 1.5}
            areaKey={a.key}
            count={counts[a.key] ?? 0}
            label={a.label}
            labelGap={14}
            dim={activeKeys != null && !activeKeys.has(a.key)}
            selected={selectedKey === a.key}
            onSelect={onSelect}
          />
        );
      })}
    </svg>
  );
}
