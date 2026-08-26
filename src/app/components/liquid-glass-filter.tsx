"use client";

export default function LiquidGlassFilter() {
  return (
    <svg
      className="pointer-events-none fixed inset-0 h-0 w-0 opacity-0"
      aria-hidden="true"
    >
      <defs>
        {/* Optical edge refraction displacement filter */}
        <filter
          id="liquid-refraction"
          x="-20%"
          y="-20%"
          width="140%"
          height="140%"
          filterUnits="objectBoundingBox"
          primitiveUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feTurbulence
            type="fractalNoise"
            baseFrequency="0.015 0.03"
            numOctaves="2"
            result="noise"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="noise"
            scale="12"
            xChannelSelector="R"
            yChannelSelector="G"
            result="displaced"
          />
          <feGaussianBlur in="displaced" stdDeviation="0.5" result="blurred" />
          <feMerge>
            <feMergeNode in="blurred" />
          </feMerge>
        </filter>

        {/* Subtle chromatic aberration glass edge filter */}
        <filter
          id="liquid-refraction-edge"
          x="-10%"
          y="-10%"
          width="120%"
          height="120%"
        >
          <feTurbulence
            type="turbulence"
            baseFrequency="0.02"
            numOctaves="1"
            result="turb"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="turb"
            scale="6"
            xChannelSelector="R"
            yChannelSelector="G"
          />
        </filter>
      </defs>
    </svg>
  );
}
