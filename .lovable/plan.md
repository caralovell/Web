

# Edits: clean Nosotros section + add stats counter

## 1. Remove ClientStrip (`src/pages/Index.tsx`)
- Remove the `ClientStrip` import and its `<ClientStrip />` usage. Final order: Navbar → Hero → Nosotros → StatsSection (new) → Soluciones → Contacto → Footer.

## 2. Rework `src/components/NosotrosSection.tsx`
- Remove the "— LÍNEA DIGITAL" label block.
- Replace the rotating-word `<h2>` with a single static heading: **"Línea Digital"** in neutral gray (`text-[#6B7280]`), keeping the same large size (`text-[40px] lg:text-[56px] font-bold`).
- Replace the paragraph text with: *"Un espacio tiene que poder conectar con el cliente. Gracias a digitalizarlo podemos ofrecer una experiencia única."*
- Remove the 4 differentiator cards entirely (`differentiators` array, `Zap/Globe/Layers/Cpu` imports, `useState/useEffect`, `cycleWords`).
- Replace the right-side `iaImage` with a placeholder: dashed-border rounded box, light gray background (`bg-muted/30 border-2 border-dashed border-muted-foreground/30`), centered `+` icon (Lucide `Plus`) plus text "Contenido próximamente".
- Drop the `iaImage` import.

## 3. New `src/components/StatsSection.tsx`
- 3 stats horizontal row: `150+ Proyectos`, `50+ Clientes`, `20+ Colaboradores`.
- Large bold numbers (`text-[56px] font-bold`), small uppercase label below.
- Thin vertical dividers (`border-l border-border`) between items.
- **Count-up animation**: `useRef` on the section + `IntersectionObserver` to trigger once when visible. Use `requestAnimationFrame` to animate from 0 → target over ~1.6s with easeOut, then append `+`.
- Render between `NosotrosSection` and `SolucionesSection` in `Index.tsx`.

## Files touched
1. `src/pages/Index.tsx` — remove ClientStrip, add StatsSection
2. `src/components/NosotrosSection.tsx` — strip label/cards/image, simplify heading & text, add placeholder box
3. `src/components/StatsSection.tsx` — new file with animated counter

## Technical notes
- Counter: single `useEffect` with one `IntersectionObserver` (threshold 0.3, `disconnect` after first trigger). Each stat animates in parallel via `requestAnimationFrame`, stored in `useState` array `[0,0,0]` updated each frame.
- ClientStrip component file remains on disk (not deleted), just unreferenced — keeps it minimal-credit.

