import logo from "@/assets/ultra-vision-logo.png.asset.json";

export function Logo({ className = "h-8" }: { className?: string }) {
  return (
    <img
      src={logo.url}
      alt="ULTRA VISION — agence créative growth"
      className={`${className} w-auto object-contain mix-blend-screen`}
      loading="eager"
      decoding="async"
    />
  );
}
