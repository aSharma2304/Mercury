"use client";
import { PixelatedCanvas } from "@/components/ui/pixelated-canvas";

export function Hero() {
  return (
    <div className="mx-auto mt-8 flex w-full items-center justify-center">
      <PixelatedCanvas
        src="/white-circle.png"
        width={400}
        height={400}
        cellSize={4}
        dotScale={0.9}
        shape="circle"
        backgroundColor="#000000"
        dropoutStrength={0.1}
        interactive
        distortionStrength={0.1}
        distortionRadius={200}
        distortionMode="repel"
        followSpeed={0.2}
        jitterStrength={4}
        jitterSpeed={1}
        sampleAverage
      />
    </div>
  );
}
