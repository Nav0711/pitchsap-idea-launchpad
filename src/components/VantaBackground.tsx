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
          highlightColor: isDark ? 0xaf1bd4 : 0xe0aaff,
          midtoneColor: isDark ? 0x1e1ebb : 0xc77dff,
          lowlightColor: isDark ? 0x8900a2 : 0x9d4edd,
          baseColor: isDark ? 0x000000 : 0xffffff,
          blurFactor: 0.50,
          speed: 2.5,
          zoom: 3
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
      className="absolute inset-0 w-full h-full min-h-screen -z-50 pointer-events-none" 
    />
  );
};
