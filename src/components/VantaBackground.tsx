import { useEffect, useRef } from "react";
import { useTheme } from "@/hooks/use-theme";

declare global {
  interface Window {
    VANTA: any;
  }
}

export const VantaBackground = () => {
  const vantaRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    let vantaEffect: any;

    const initVanta = () => {
      if (window.VANTA && vantaRef.current) {
        // Destroy existing effect if theme changes
        if (vantaEffect) vantaEffect.destroy();

        const isDark = theme === "dark";

        vantaEffect = window.VANTA.FOG({
          el: vantaRef.current,
          mouseControls: true,
          touchControls: true,
          gyroControls: false,
          minHeight: 200.00,
          minWidth: 200.00,
          highlightColor: isDark ? 0xaf1bd4 : 0x7b2cbf,
          midtoneColor: isDark ? 0x1e1ebb : 0x5a189a,
          lowlightColor: isDark ? 0x8900a2 : 0x3c096c,
          baseColor: isDark ? 0x000000 : 0x10002b,
          blurFactor: 0.50,
          speed: 2,
          zoom: 0.5
        });
      }
    };

    // Initialize after a tiny delay to ensure window.VANTA is loaded from CDN
    const timeoutId = setTimeout(() => {
      if (window.VANTA) {
        initVanta();
      }
    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (vantaEffect) vantaEffect.destroy();
    };
  }, [theme]); // Re-run exact configuration when theme changes

  return (
    <div 
      ref={vantaRef}
      // Absolute inset-0 makes it stick to the parent relative container and flow with scroll height
      className="absolute inset-0 w-full h-full -z-10 pointer-events-none" 
    />
  );
};
