import { useEffect, useRef, useState } from "react";

const INTERACTIVE_SELECTOR =
  'a, button, [role="button"], input, textarea, select, label, summary, [data-cursor="hover"], .card-hover, .cursor-pointer';

// Trail dots: first follows fast, each subsequent one lags more
const DOTS = [
  { size: 14, ease: 0.9 },
  { size: 10, ease: 0.5 },
  { size: 6, ease: 0.32 },
];

const CustomCursor = () => {
  const refs = useRef<(HTMLDivElement | null)[]>([]);
  const mouse = useRef({ x: -100, y: -100 });
  const positions = useRef(DOTS.map(() => ({ x: -100, y: -100 })));
  const [enabled, setEnabled] = useState(false);
  const [hovering, setHovering] = useState(false);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const isFinePointer =
      window.matchMedia("(pointer: fine)").matches &&
      window.matchMedia("(hover: hover)").matches;
    if (!isFinePointer) return;
    setEnabled(true);
    document.documentElement.classList.add("custom-cursor-active");

    const state = { visible: false, hover: false };

    const onMove = (e: MouseEvent) => {
      mouse.current.x = e.clientX;
      mouse.current.y = e.clientY;
      if (!state.visible) {
        state.visible = true;
        setVisible(true);
      }
      const target = e.target as HTMLElement | null;
      const isInteractive = !!target?.closest(INTERACTIVE_SELECTOR);
      if (isInteractive !== state.hover) {
        state.hover = isInteractive;
        setHovering(isInteractive);
      }
    };

    const onLeave = () => {
      state.visible = false;
      setVisible(false);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseleave", onLeave);

    let raf = 0;
    const animate = () => {
      let prevX = mouse.current.x;
      let prevY = mouse.current.y;
      for (let i = 0; i < DOTS.length; i++) {
        const p = positions.current[i];
        p.x += (prevX - p.x) * DOTS[i].ease;
        p.y += (prevY - p.y) * DOTS[i].ease;
        const el = refs.current[i];
        if (el) {
          el.style.transform = `translate3d(${p.x}px, ${p.y}px, 0) translate(-50%, -50%)`;
        }
        prevX = p.x;
        prevY = p.y;
      }
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", onLeave);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-active");
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      {DOTS.map((dot, i) => {
        const scale = hovering ? 1.35 : 1;
        const opacity = visible ? 1 - i * 0.13 : 0;
        return (
          <div
            key={i}
            ref={(el) => (refs.current[i] = el)}
            aria-hidden
            className="pointer-events-none fixed left-0 top-0 z-[9999] rounded-full will-change-transform"
            style={{
              width: dot.size * scale,
              height: dot.size * scale,
              background: "hsl(var(--primary))",
              boxShadow:
                i === 0 ? "0 0 10px hsl(var(--primary) / 0.5)" : undefined,
              opacity,
              transition:
                "width 220ms cubic-bezier(0.22,1,0.36,1), height 220ms cubic-bezier(0.22,1,0.36,1), opacity 200ms ease",
            }}
          />
        );
      })}
    </>
  );
};

export default CustomCursor;
