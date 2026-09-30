import React, { useState } from 'react';
import { motion } from 'framer-motion';
import creativeHeroPhoto from '../assets/images/arabi_matrix_portrait_1790790612582.jpg';
import { ThemeMode } from '../types';
import { Clock } from 'lucide-react';
import { playDarkAmbient } from '../utils/audio';

interface ArtisticSectionWProps {
  theme: ThemeMode;
  bdTime: string;
}

export const ArtisticSectionW: React.FC<ArtisticSectionWProps> = ({
  bdTime,
}) => {
  const [isTouched, setIsTouched] = useState(false);

  // Fixed provided colour shades: 60% black (#06070A) / 30% off-white (#F1EBDD) / 10% electric blue (#3D5CFF)
  const electricBlueText = 'text-[#3D5CFF]';

  const handleTouch = () => {
    setIsTouched(true);
    playDarkAmbient();
    setTimeout(() => setIsTouched(false), 900);
  };

  return (
    <div
      className="min-h-[85vh] relative flex flex-col justify-start transition-colors duration-700 bg-[#06070A] text-[#F1EBDD]"
    >
      {/* Background ambient phosphor aura - 10% electric blue tone */}
      <div
        className="absolute inset-0 pointer-events-none opacity-20"
        style={{
          backgroundImage:
            'radial-gradient(circle at 65% 40%, rgba(61, 92, 255, 0.25) 0%, transparent 65%)',
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 md:px-8 pt-2 sm:pt-4 pb-20 w-full space-y-10 sm:space-y-14">
        {/* Top Swiss Telemetry Baseline */}
        <div className="border-b pb-3 flex flex-wrap items-center justify-between gap-3 text-xs font-editorial-mono tracking-[0.2em] uppercase opacity-80 border-white/10">
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
            <span className={electricBlueText}>EMISSION // 01</span>
          </div>
        </div>

        {/* HERO SECTION: Swiss Typographic Grid + Borderless Pixel-Blended Portrait */}
        <section
          id="hero-creative"
          className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-center pt-2 sm:pt-6"
        >
          {/* Left Column: Swiss Structural Typography & Intent */}
          <div className="md:col-span-6 space-y-6 order-2 md:order-1">
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-editorial-mono tracking-[0.28em] uppercase opacity-70">
                  DIGITAL EXHIBITION
                </span>
                <span className="text-xs opacity-40">/</span>
                <span className={`text-[11px] font-editorial-mono tracking-[0.2em] uppercase font-bold ${electricBlueText}`}>
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
                Transmitted through an imperfect screen. Moving between severe restraint, physical materiality, and living systems from Chittagong.
              </p>
            </div>

            {/* Interaction note */}
            <div className="pt-2 flex items-center gap-2.5 text-xs font-editorial-mono tracking-wider uppercase opacity-70">
              <span className="w-1.5 h-1.5 rounded-full bg-[#3D5CFF] animate-ping" />
              <span>Touch the image to perturb screen state</span>
            </div>
          </div>

          {/* Right Column: Hero Image with Pixel-by-Pixel Background Blend & No Border */}
          <div className="md:col-span-6 flex flex-col items-center md:items-end justify-center order-1 md:order-2">
            <motion.div
              initial={{ opacity: 0, filter: 'blur(16px) brightness(1.25)' }}
              animate={{ opacity: 1, filter: 'blur(0px) brightness(1)' }}
              transition={{
                duration: 1.6,
                ease: [0.16, 1, 0.3, 1],
              }}
              whileHover={{
                scale: 1.018,
                transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
              }}
              whileTap={{
                scale: 0.985,
                transition: { duration: 0.2 },
              }}
              onClick={handleTouch}
              className="relative cursor-pointer select-none w-full max-w-[280px] sm:max-w-[340px] md:max-w-[380px] flex items-center justify-center"
            >
              {/* Soft ethereal ambient glow breathing behind the image */}
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

              {/* The Hero Image: Provided photo, NO BORDER, Pixel-by-Pixel Dissolve into Background */}
              <div className="relative w-full overflow-hidden">
                <img
                  src={creativeHeroPhoto}
                  alt="Sifat Siddique Arabi digital exhibition portrait"
                  className={`w-full h-auto object-cover block transition-all duration-700 ${
                    isTouched ? 'brightness-110 contrast-105' : 'brightness-100 contrast-100'
                  }`}
                  style={{
                    /* Pixel-by-pixel mask: smooth radial edge feathering and stipple dissolution into #06070A */
                    maskImage:
                      'radial-gradient(ellipse 82% 88% at 50% 48%, black 44%, rgba(0, 0, 0, 0.92) 62%, rgba(0, 0, 0, 0.58) 76%, rgba(0, 0, 0, 0.18) 90%, transparent 100%)',
                    WebkitMaskImage:
                      'radial-gradient(ellipse 82% 88% at 50% 48%, black 44%, rgba(0, 0, 0, 0.92) 62%, rgba(0, 0, 0, 0.58) 76%, rgba(0, 0, 0, 0.18) 90%, transparent 100%)',
                  }}
                  referrerPolicy="no-referrer"
                />

                {/* Micro subpixel matrix blend overlay along edges */}
                <div
                  className="absolute inset-0 pointer-events-none opacity-25 mix-blend-screen"
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
            </motion.div>
          </div>
        </section>
      </div>
    </div>
  );
};
