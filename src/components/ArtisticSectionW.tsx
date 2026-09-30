import React, { useState, useRef, useEffect } from 'react';
import { motion, useScroll, useTransform, useMotionTemplate } from 'framer-motion';
import artisticHeroPhoto from '../assets/images/1790705221151~2.jpg';
import signaturePng from '../assets/images/20260117_020006-removebg-preview.png';
import { ThemeMode } from '../types';
import { Clock, ArrowUpRight, Sparkles, Sliders, ExternalLink } from 'lucide-react';
import { playDarkAmbient } from '../utils/audio';

interface ArtisticSectionWProps {
  theme: ThemeMode;
  bdTime: string;
}

// Precise SVG bezier paths tracing the natural handwriting sequence of Arabi's signature
const path1 =
  'M 195 46 C 240 36 278 44 284 72 C 288 98 250 95 200 88 C 150 80 90 76 22 75';
const path2 =
  'M 40 110 C 75 108 115 118 150 118 C 180 118 195 145 225 130 C 260 132 305 138 355 140';
const path3 =
  'M 110 155 C 140 172 175 168 210 174 C 255 180 300 192 355 190 M 130 165 C 160 195 200 190 240 175';
const path4 =
  'M 105 215 C 145 238 180 258 215 264 C 255 264 315 240 360 242 C 360 242 355 276 290 288 C 200 282 150 275 110 240';

export const ArtisticSectionW: React.FC<ArtisticSectionWProps> = ({
  theme,
  bdTime,
}) => {
  const [isTouched, setIsTouched] = useState(false);
  const isDark = theme === 'noir';

  // 60% black / 30% off-white / 10% electric blue (#3D5CFF)
  const electricBlueText = 'text-[#3D5CFF]';

  // Outer scroll-gate container ref (tall scroll distance creating the animation timeline)
  const scrollGateRef = useRef<HTMLDivElement>(null);

  // Framer Motion useScroll connected directly to the scroll gate
  // Preserves Lenis smooth scrolling without creating a competing listener
  const { scrollYProgress } = useScroll({
    target: scrollGateRef,
    offset: ['start start', 'end end'],
  });

  // Dedicated progress clamped cleanly between 0 and 1
  const progress = useTransform(scrollYProgress, [0, 1], [0, 1], {
    clamp: true,
  });

  // Hero photograph blur: starts at 0px blur (completely sharp),
  // progressively increases to 12px blur, and reverses continuously on scroll up
  const photoBlur = useTransform(progress, [0, 0.98], [0, 12], {
    clamp: true,
  });
  const filterBlur = useMotionTemplate`blur(${photoBlur}px)`;

  // Handwriting stroke drawing sequence (physically progressive and 100% reversible):
  // Stroke 1: Top flourish & upper cross (progress 0.05 -> 0.35)
  const stroke1Length = useTransform(progress, [0.05, 0.35], [0, 1], {
    clamp: true,
  });
  // Stroke 2: Main middle signature letterforms (progress 0.28 -> 0.60)
  const stroke2Length = useTransform(progress, [0.28, 0.6], [0, 1], {
    clamp: true,
  });
  // Stroke 3: Middle descent and loops (progress 0.52 -> 0.80)
  const stroke3Length = useTransform(progress, [0.52, 0.8], [0, 1], {
    clamp: true,
  });
  // Stroke 4: Grand lower underline flourish (progress 0.72 -> 0.96)
  const stroke4Length = useTransform(progress, [0.72, 0.96], [0, 1], {
    clamp: true,
  });

  // Decisive completion snap at progress >= 0.98:
  // Snaps cleanly to 100% complete state with zero partially drawn stroke artifacts
  const snapCompletion = useTransform(progress, [0.965, 0.98], [0, 1], {
    clamp: true,
  });

  // Signature overall visibility (starts invisible, reveals as pen touches paper)
  const signatureOpacity = useTransform(progress, [0.02, 0.1], [0, 1], {
    clamp: true,
  });

  // Micro telemetry readout for current progress
  const progressPercent = useTransform(progress, (v) => Math.round(v * 100));

  const handleTouch = () => {
    setIsTouched(true);
    playDarkAmbient();
    setTimeout(() => setIsTouched(false), 900);
  };

  return (
    <div
      className={`min-h-screen relative flex flex-col justify-start transition-colors duration-700 ${
        isDark ? 'bg-[#06070A] text-[#F1EBDD]' : 'bg-[#F1EBDD] text-[#06070A]'
      }`}
    >
      {/* Background ambient phosphor aura - 10% electric blue tone */}
      <div
        className="fixed inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 65% 40%, rgba(61, 92, 255, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      {/* DEDICATED SCROLL-GATE CONTAINER:
          Substantially taller than viewport (240vh) so it creates the hidden animation timeline.
          The sticky hero inside remains visually pinned at top while user scrolls through progress 0 -> 1.
          No overflow:hidden hijacking, fully compatible with Lenis and native touch scrolling. */}
      <div
        ref={scrollGateRef}
        className="relative w-full h-[240vh] sm:h-[260vh]"
      >
        {/* Sticky Hero Visual: Pinned inside viewport for the duration of the transition */}
        <div className="sticky top-14 md:top-16 h-[calc(100dvh-3.5rem)] md:h-[calc(100dvh-4rem)] w-full overflow-hidden flex flex-col justify-between max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-2 pb-6 z-10">
          {/* Top Swiss Telemetry Baseline */}
          <div
            className={`border-b pb-3 flex flex-wrap items-center justify-between gap-3 text-xs font-editorial-mono tracking-[0.2em] uppercase opacity-85 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <div className="flex items-center gap-2.5">
              <span className="w-2 h-2 rounded-full bg-[#E83B2E] animate-pulse" />
              <span className="font-bold">SECTION W // ARTISTIC</span>
              <span className="opacity-40">·</span>
              <span>CHITTAGONG 22.3569° N, 91.7832° E</span>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Clock className={`w-3.5 h-3.5 ${electricBlueText}`} />
                {bdTime ? `${bdTime} BST` : 'GMT+6'}
              </span>
              <span className="opacity-40">·</span>
              <span className={electricBlueText}>
                TRANSITION // <motion.span>{progressPercent}</motion.span>%
              </span>
            </div>
          </div>

          {/* HERO GRID: Typographic Restraint + Hero Photograph + Hand-drawn Signature Reveal */}
          <div className="flex-1 grid grid-cols-1 md:grid-cols-12 gap-6 md:gap-12 items-center my-auto py-2">
            {/* Left Column: Swiss Typographic Grid & Intent */}
            <div className="md:col-span-6 space-y-5 order-2 md:order-1">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[11px] font-editorial-mono tracking-[0.28em] uppercase opacity-70">
                    DIGITAL EXHIBITION
                  </span>
                  <span className="text-xs opacity-40">/</span>
                  <span
                    className={`text-[11px] font-editorial-mono tracking-[0.2em] uppercase font-bold ${electricBlueText}`}
                  >
                    LIQUID SCREEN
                  </span>
                </div>

                <div className="space-y-1">
                  <span className="block font-editorial-mono text-sm sm:text-base tracking-[0.24em] uppercase opacity-80 font-semibold">
                    SIFAT SIDDIQUE
                  </span>
                  <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl lg:text-8xl tracking-tight leading-[0.94] font-normal">
                    ARABI
                  </h1>
                </div>
              </div>

              <div className="space-y-3 font-editorial-sans text-base sm:text-lg leading-relaxed opacity-90 max-w-lg">
                <p className="font-editorial-serif text-xl sm:text-2xl leading-snug text-current">
                  "A digital exhibition of a person, not a conventional portfolio."
                </p>
                <p className="text-sm sm:text-base opacity-75 font-normal leading-relaxed">
                  Scroll down to calibrate the liquid screen. The photograph defocuses into dreamlike suspension as the authentic handwritten signature is revealed.
                </p>
              </div>

              {/* Scroll Gate Interaction Prompt */}
              <div className="pt-1 flex items-center gap-2.5 text-xs font-editorial-mono tracking-wider uppercase opacity-75">
                <motion.span
                  className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF]"
                  animate={{ scale: [1, 1.4, 1], opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                />
                <span className={electricBlueText}>
                  Scroll to draw signature & reveal exhibition
                </span>
              </div>
            </div>

            {/* Right Column: Hero Image with Scroll-driven Blur & Exact SVG Mask Signature Reveal */}
            <div className="md:col-span-6 flex flex-col items-center md:items-end justify-center order-1 md:order-2">
              <div
                onClick={handleTouch}
                className="relative cursor-pointer select-none w-full max-w-[260px] sm:max-w-[320px] md:max-w-[360px] flex items-center justify-center"
              >
                {/* Ethereal background ambient glow */}
                <div
                  className={`absolute -inset-10 pointer-events-none rounded-full blur-3xl transition-opacity duration-700 ${
                    isTouched ? 'opacity-70 scale-105' : 'opacity-40 scale-100'
                  }`}
                  style={{
                    background:
                      'radial-gradient(circle, rgba(61, 92, 255, 0.35) 0%, rgba(139, 92, 246, 0.2) 48%, transparent 75%)',
                  }}
                  aria-hidden="true"
                />

                {/* Hero Image Container: Borderless Pixel-by-Pixel Dissolve */}
                <div className="relative w-full overflow-hidden rounded-sm">
                  {/* Hero Photograph: Blur mapped continuously to scroll progress (0px -> 12px) */}
                  <motion.img
                    src={artisticHeroPhoto}
                    alt="Sifat Siddique Arabi digital exhibition portrait"
                    className="w-full h-auto object-cover block select-none"
                    style={{
                      filter: filterBlur,
                      maskImage:
                        'radial-gradient(ellipse 84% 88% at 50% 50%, black 52%, rgba(0, 0, 0, 0.94) 68%, rgba(0, 0, 0, 0.6) 82%, rgba(0, 0, 0, 0.18) 94%, transparent 100%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse 84% 88% at 50% 50%, black 52%, rgba(0, 0, 0, 0.94) 68%, rgba(0, 0, 0, 0.6) 82%, rgba(0, 0, 0, 0.18) 94%, transparent 100%)',
                    }}
                    referrerPolicy="no-referrer"
                    draggable={false}
                  />

                  {/* Micro subpixel matrix blend overlay */}
                  <div
                    className="absolute inset-0 pointer-events-none opacity-20 mix-blend-screen"
                    style={{
                      backgroundImage:
                        'radial-gradient(circle, rgba(61, 92, 255, 0.4) 0.5px, transparent 0.8px)',
                      backgroundSize: '3px 3px',
                      maskImage:
                        'radial-gradient(ellipse at center, transparent 55%, black 92%)',
                      WebkitMaskImage:
                        'radial-gradient(ellipse at center, transparent 55%, black 92%)',
                    }}
                    aria-hidden="true"
                  />

                  {/* SCROLL-GATED HANDWRITTEN SIGNATURE REVEAL:
                      Uses the authentic signature image asset without altering its geometry or proportions.
                      Progressively drawn in natural handwriting sequence via an SVG stroke mask.
                      Fully continuous, reversible, and snaps cleanly to 100% at progress >= 0.98. */}
                  <motion.div
                    className="absolute inset-0 flex items-center justify-center p-3 pointer-events-none z-20"
                    style={{ opacity: signatureOpacity }}
                  >
                    <div className="w-[88%] max-w-[310px]">
                      <svg
                        viewBox="0 0 386 309"
                        className="w-full h-auto overflow-visible select-none"
                        aria-label="Real handwritten signature of Sifat Siddique Arabi"
                      >
                        <defs>
                          <mask
                            id="arabi-hero-signature-mask"
                            maskUnits="userSpaceOnUse"
                            x="0"
                            y="0"
                            width="386"
                            height="309"
                          >
                            {/* Initially black: hides entire signature until strokes draw */}
                            <rect width="386" height="309" fill="black" />

                            {/* Stroke 1: Top flourish and upper leftward stroke */}
                            <motion.path
                              d={path1}
                              style={{ pathLength: stroke1Length }}
                              stroke="white"
                              strokeWidth={64}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />

                            {/* Stroke 2: Main middle signature letterforms */}
                            <motion.path
                              d={path2}
                              style={{ pathLength: stroke2Length }}
                              stroke="white"
                              strokeWidth={64}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />

                            {/* Stroke 3: Middle descent and loops */}
                            <motion.path
                              d={path3}
                              style={{ pathLength: stroke3Length }}
                              stroke="white"
                              strokeWidth={64}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />

                            {/* Stroke 4: Grand lower sweep & flourish finish */}
                            <motion.path
                              d={path4}
                              style={{ pathLength: stroke4Length }}
                              stroke="white"
                              strokeWidth={64}
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              fill="none"
                            />

                            {/* Decisive completion snap: guarantees 100% full unmasking at progress >= 0.98 */}
                            <motion.rect
                              width="386"
                              height="309"
                              fill="white"
                              style={{ opacity: snapCompletion }}
                            />
                          </mask>
                        </defs>

                        {/* Authentic signature asset preserved with exact geometry & imperfections */}
                        <g mask="url(#arabi-hero-signature-mask)">
                          <image
                            href={signaturePng}
                            width="386"
                            height="309"
                            preserveAspectRatio="xMidYMid meet"
                            style={{
                              filter: isDark
                                ? 'brightness(0) invert(1) drop-shadow(0 0 8px rgba(61,92,255,0.9)) drop-shadow(0 0 18px rgba(61,92,255,0.45))'
                                : 'brightness(0) drop-shadow(0 2px 6px rgba(0,0,0,0.35))',
                            }}
                          />
                        </g>
                      </svg>
                    </div>
                  </motion.div>

                  {/* Brief light pulse on touch */}
                  {isTouched && (
                    <motion.div
                      initial={{ opacity: 0.4 }}
                      animate={{ opacity: 0 }}
                      transition={{ duration: 0.8, ease: 'easeOut' }}
                      className="absolute inset-0 pointer-events-none"
                      style={{
                        background:
                          'radial-gradient(circle at center, rgba(61, 92, 255, 0.35) 0%, transparent 70%)',
                      }}
                      aria-hidden="true"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Bottom baseline ticker */}
          <div
            className={`border-t pt-2 flex items-center justify-between text-[11px] font-editorial-mono tracking-[0.2em] uppercase opacity-70 ${
              isDark ? 'border-white/10' : 'border-black/10'
            }`}
          >
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF]" />
              <span>Scroll down to complete signature</span>
            </span>
            <span className="hidden sm:inline opacity-60">
              LAYER 02 // ARTISTIC SYSTEM
            </span>
          </div>
        </div>
      </div>

      {/* FOLLOWING WEBSITE CONTENT:
          Naturally begins and scrolls into view only AFTER the hero transition gate has been traversed.
          When scrolling upward from below, re-entering the hero pins the hero again and reverses the transition. */}
      <div className="relative z-10 w-full max-w-5xl mx-auto px-4 sm:px-6 md:px-8 py-16 sm:py-24 space-y-24">
        {/* Section divider with Swiss precision */}
        <div
          className={`border-b pb-4 flex items-center justify-between text-xs font-editorial-mono tracking-[0.22em] uppercase opacity-80 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="flex items-center gap-2">
            <Sparkles className={`w-3.5 h-3.5 ${electricBlueText}`} />
            <span className="font-bold">EXHIBITION ROOM 01 // SELECTED WORKS</span>
          </div>
          <span className={electricBlueText}>3 ARTIFACTS</span>
        </div>

        {/* Selected Works Inventory */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: NOIRÉ */}
          <div
            className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
              isDark
                ? 'bg-[#0B0D14] border-white/10 hover:border-[#3D5CFF]/60'
                : 'bg-[#FAF5EC] border-black/10 hover:border-[#2946D3]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-editorial-mono tracking-[0.2em] uppercase opacity-60">
                01 / BRAND & SYSTEM
              </span>
              <span className={`text-xs font-editorial-mono font-bold ${electricBlueText}`}>
                2025–2026
              </span>
            </div>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-normal mb-3">
              NOIRÉ
            </h3>
            <p className="text-sm font-editorial-sans opacity-75 leading-relaxed mb-6">
              A restrained luxury and design experiment exploring minimal commerce, monochrome typography, and direct distribution unit economics.
            </p>
            <div className="flex items-center gap-2 text-xs font-editorial-mono tracking-wider uppercase opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF]" />
              <span>Chittagong Staging</span>
            </div>
          </div>

          {/* Card 2: Remainder */}
          <div
            className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
              isDark
                ? 'bg-[#0B0D14] border-white/10 hover:border-[#3D5CFF]/60'
                : 'bg-[#FAF5EC] border-black/10 hover:border-[#2946D3]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-editorial-mono tracking-[0.2em] uppercase opacity-60">
                02 / RESEARCH
              </span>
              <span className={`text-xs font-editorial-mono font-bold ${electricBlueText}`}>
                ACTIVE
              </span>
            </div>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-normal mb-3">
              Remainder
            </h3>
            <p className="text-sm font-editorial-sans opacity-75 leading-relaxed mb-6">
              Critical analytical monograph examining market incentives, South Asian venture bottlenecks, and simplicity over hyper-growth paradigms.
            </p>
            <div className="flex items-center gap-2 text-xs font-editorial-mono tracking-wider uppercase opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF]" />
              <span>Open Repository</span>
            </div>
          </div>

          {/* Card 3: Delta Freight */}
          <div
            className={`p-6 sm:p-8 rounded-sm border transition-all duration-300 ${
              isDark
                ? 'bg-[#0B0D14] border-white/10 hover:border-[#3D5CFF]/60'
                : 'bg-[#FAF5EC] border-black/10 hover:border-[#2946D3]/60'
            }`}
          >
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-editorial-mono tracking-[0.2em] uppercase opacity-60">
                03 / PROTOCOL
              </span>
              <span className={`text-xs font-editorial-mono font-bold ${electricBlueText}`}>
                2026
              </span>
            </div>
            <h3 className="font-editorial-serif text-2xl sm:text-3xl font-normal mb-3">
              Delta Freight
            </h3>
            <p className="text-sm font-editorial-sans opacity-75 leading-relaxed mb-6">
              Streamlined documentation and customs status tracking prototype for regional maritime transshipment at the Port of Chittagong.
            </p>
            <div className="flex items-center gap-2 text-xs font-editorial-mono tracking-wider uppercase opacity-80">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF]" />
              <span>Maritime Dispatcher</span>
            </div>
          </div>
        </div>

        {/* Exhibition Room 02: Analytical Manifesto */}
        <div
          className={`p-8 sm:p-12 rounded-sm border space-y-6 ${
            isDark ? 'bg-[#080A10] border-white/10' : 'bg-[#F6EFE0] border-black/10'
          }`}
        >
          <div className="flex items-center justify-between">
            <span className="text-xs font-editorial-mono tracking-[0.22em] uppercase opacity-60">
              EXHIBITION ROOM 02 // MANIFESTO
            </span>
            <span className={`text-xs font-editorial-mono ${electricBlueText}`}>
              CHITTAGONG EMISSION
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight">
            "Software that lasts outlasts software that races."
          </h2>

          <p className="font-editorial-sans text-base sm:text-lg opacity-80 leading-relaxed max-w-2xl">
            Operating from Chittagong, Bangladesh. Creating digital architectures and physical products with deliberate restraint, severe typographic discipline, and respect for the human on the other side of the glass.
          </p>

          <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-editorial-mono tracking-wider uppercase opacity-75">
            <span>22.3569° N, 91.7832° E</span>
            <span>·</span>
            <span>20 YEARS OLD</span>
            <span>·</span>
            <span className={electricBlueText}>SIFAT SIDDIQUE ARABI</span>
          </div>
        </div>

        {/* Colophon & Authentic Signature Mark */}
        <div
          className={`pt-12 border-t flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 pb-20 text-xs font-editorial-mono tracking-[0.18em] uppercase opacity-75 ${
            isDark ? 'border-white/10' : 'border-black/10'
          }`}
        >
          <div className="space-y-1">
            <div className="font-bold">SECTION W // DIGITAL EXHIBITION</div>
            <div className="opacity-60">
              EDITORIAL GROTESK + BOLD RESTRAINED SERIF
            </div>
          </div>

          <div className="flex items-center gap-4">
            <span className="opacity-60">AUTHENTICATED BY</span>
            <img
              src={signaturePng}
              alt="Arabi signature"
              className={`h-7 w-auto select-none pointer-events-none ${
                isDark ? 'brightness-0 invert' : 'brightness-0'
              }`}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
