import React, { useState } from 'react';
import { ArabiSignature } from './ArabiSignature';
import { ThemeMode } from '../types';

interface SignatureSwitchProps {
  isArmed: boolean;
  onToggle: (armed: boolean) => void;
  theme: ThemeMode;
}

export const SignatureSwitch: React.FC<SignatureSwitchProps> = ({
  isArmed,
  onToggle,
  theme,
}) => {
  const [showStatusToast, setShowStatusToast] = useState(false);

  // Synthesize a subtle mechanical relay click sound using Web Audio API
  const playMechanicalClick = () => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(isArmed ? 280 : 420, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(80, ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.08, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.045);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start();
      osc.stop(ctx.currentTime + 0.05);
    } catch {
      // AudioContext unavailable or blocked by autoplay policy; silent fallback
    }
  };

  const handleToggle = () => {
    playMechanicalClick();
    const nextState = !isArmed;
    onToggle(nextState);
    setShowStatusToast(true);
    setTimeout(() => {
      setShowStatusToast(false);
    }, 3800);
  };

  const isNoir = theme === 'noir';

  return (
    <div className="relative inline-flex items-center gap-2.5 select-none z-30">
      {/* Hardware Interface Container */}
      <button
        type="button"
        role="switch"
        aria-checked={isArmed}
        aria-label="Otherwise signature switch: Toggle experimental dormant mode"
        onClick={handleToggle}
        className={`group relative flex items-center p-0.5 rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#2946D3] ${
          isNoir
            ? 'bg-[#181A22] border border-[#2A2E3D] hover:border-[#3E455B] shadow-inner'
            : 'bg-[#E5DDCB] border border-[#C5BBA5] hover:border-[#A89E88] shadow-inner'
        }`}
        style={{
          width: '56px',
          height: '28px',
        }}
      >
        {/* Track groove line */}
        <div
          className={`absolute left-2 right-2 h-[2px] rounded-full pointer-events-none ${
            isNoir ? 'bg-[#0E0F14]' : 'bg-[#D3C9B5]'
          }`}
        />

        {/* Sliding Square Switch Head containing Arabi's signature */}
        <div
          className={`relative z-10 flex items-center justify-center w-[22px] h-[22px] rounded-[2px] transition-transform duration-200 ease-out shadow-sm ${
            isArmed ? 'translate-x-[28px]' : 'translate-x-[1px]'
          } ${
            isNoir
              ? isArmed
                ? 'bg-[#2946D3] text-[#F1EBDD] border border-[#3E5DEB]'
                : 'bg-[#222530] text-[#D8D2C4] border border-[#333748] group-hover:border-[#4B526B]'
              : isArmed
                ? 'bg-[#2946D3] text-[#F1EBDD] border border-[#1E36AA]'
                : 'bg-[#FAF6EC] text-[#101116] border border-[#C8BEA8] group-hover:border-[#9E937D]'
          }`}
        >
          {/* Signature glyph inside switch head */}
          <ArabiSignature
            className="w-3.5 h-3.5"
            color="currentColor"
            strokeWidth={2.4}
          />
        </div>
      </button>

      {/* Tiny "OTHERWISE" Hardware Label beside the switch */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-editorial-mono text-[9px] tracking-[0.24em] font-medium uppercase transition-colors duration-150 ${
              isArmed
                ? 'text-[#2946D3]'
                : isNoir
                  ? 'text-[#F1EBDD]/65 group-hover:text-[#F1EBDD]'
                  : 'text-[#101116]/65 group-hover:text-[#101116]'
            }`}
          >
            OTHERWISE
          </span>

          {/* Micro Status Indicator Dot */}
          <span
            className={`inline-block w-1.5 h-1.5 rounded-full transition-colors duration-200 ${
              isArmed ? 'bg-[#E83B2E]' : isNoir ? 'bg-[#3A3F52]' : 'bg-[#C2B79F]'
            }`}
            title={isArmed ? 'Status: Armed' : 'Status: Inert'}
          />
        </div>

        {/* Micro subtext indication */}
        <span
          className={`font-editorial-mono text-[8px] tracking-[0.15em] uppercase ${
            isNoir ? 'text-[#F1EBDD]/35' : 'text-[#101116]/35'
          }`}
        >
          {isArmed ? 'ARMED · DORMANT' : 'STANDBY'}
        </span>
      </div>

      {/* Subtle Hardware Status Toast (appears discreetly when flipped) */}
      {showStatusToast && (
        <div
          role="status"
          className={`absolute left-0 top-[38px] w-64 p-2.5 rounded-sm text-left shadow-lg border backdrop-blur-xs transition-opacity duration-200 ${
            isNoir
              ? 'bg-[#14161D] border-[#2946D3]/40 text-[#F1EBDD]'
              : 'bg-[#F9F5EC] border-[#2946D3]/40 text-[#101116]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-editorial-mono uppercase tracking-[0.16em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
            <span className="font-semibold text-[#2946D3]">
              {isArmed ? 'OTHERWISE // ARMED' : 'OTHERWISE // STANDBY'}
            </span>
          </div>
          <p
            className={`mt-1 text-[11px] leading-snug font-editorial-sans ${
              isNoir ? 'text-[#F1EBDD]/75' : 'text-[#101116]/75'
            }`}
          >
            {isArmed
              ? 'Hardware toggle engaged. Creative layer structured and standing by underneath this editorial layer.'
              : 'Switched to primary editorial layer. System idle.'}
          </p>
        </div>
      )}
    </div>
  );
};
