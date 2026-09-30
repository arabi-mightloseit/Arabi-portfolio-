import React, { useState } from 'react';
import { ArabiSignature } from './ArabiSignature';
import { ThemeMode } from '../types';
import { playMechanicalRelay } from '../utils/audio';

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

  const handleToggle = () => {
    const nextState = !isArmed;
    playMechanicalRelay(nextState);
    onToggle(nextState);
    setShowStatusToast(true);
    setTimeout(() => {
      setShowStatusToast(false);
    }, 3800);
  };

  const isNoir = theme === 'noir';

  return (
    <div className="relative inline-flex items-center gap-3 select-none z-30">
      {/* Hardware Interface Container - Enlarged & High Contrast */}
      <button
        type="button"
        role="switch"
        aria-checked={isArmed}
        aria-label="Toggle between Section L (unimaginative) and Section W (Artistic)"
        onClick={handleToggle}
        className={`group relative flex items-center p-0.5 rounded-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#3D5CFF] cursor-pointer ${
          isNoir
            ? 'bg-[#0B0C12] border-2 border-[#48506E] hover:border-[#6C77A3] shadow-[inset_0_2px_6px_rgba(0,0,0,0.9)]'
            : 'bg-[#DDD2BB] border-2 border-[#8E7F63] hover:border-[#695D46] shadow-[inset_0_2px_5px_rgba(0,0,0,0.18)]'
        }`}
        style={{
          width: '76px',
          height: '38px',
        }}
      >
        {/* Track groove line */}
        <div
          className={`absolute left-2.5 right-2.5 h-[3px] rounded-full pointer-events-none ${
            isNoir ? 'bg-[#181B26] border-b border-[#2E354A]' : 'bg-[#C6BC9F] border-b border-[#FAF5EA]'
          }`}
        />

        {/* Sliding Switch Head containing Arabi's signature */}
        <div
          className={`relative z-10 flex items-center justify-center w-[32px] h-[30px] rounded-[3px] transition-transform duration-200 ease-out shadow-md ${
            isArmed ? 'translate-x-[36px]' : 'translate-x-[2px]'
          } ${
            isNoir
              ? isArmed
                ? 'bg-[#3D5CFF] text-[#F1EBDD] border-2 border-[#8BA0FF] shadow-[0_0_14px_rgba(61,92,255,0.7)]'
                : 'bg-[#24283A] text-white border-2 border-[#7685B5] shadow-[0_2px_8px_rgba(0,0,0,0.7)] group-hover:border-[#9CABDC]'
              : isArmed
                ? 'bg-[#2946D3] text-[#F1EBDD] border-2 border-[#12268A] shadow-[0_2px_8px_rgba(41,70,211,0.35)]'
                : 'bg-[#FAF6EC] text-[#101116] border-2 border-[#685D45] shadow-[0_2px_6px_rgba(0,0,0,0.2)] group-hover:border-[#3E3626]'
          }`}
        >
          {/* Signature glyph inside switch head */}
          <ArabiSignature
            className="w-[26px] h-[24px] p-0.5"
            theme={theme}
            variant={isArmed ? 'light' : isNoir ? 'light' : 'dark'}
          />
        </div>
      </button>

      {/* Section L / Section W Hardware Label beside the switch */}
      <div className="flex flex-col justify-center">
        <div className="flex items-center gap-1.5">
          <span
            className={`font-editorial-mono text-[11px] sm:text-xs tracking-[0.2em] font-bold uppercase transition-colors duration-150 ${
              isArmed
                ? isNoir
                  ? 'text-[#5577FF]'
                  : 'text-[#2946D3]'
                : isNoir
                  ? 'text-[#F1EBDD]/90 group-hover:text-[#F1EBDD]'
                  : 'text-[#101116]/90 group-hover:text-[#101116]'
            }`}
          >
            {isArmed ? 'SECTION W' : 'SECTION L'}
          </span>

          {/* Micro Status Indicator Dot */}
          <span
            className={`inline-block w-2 h-2 rounded-full transition-colors duration-200 ${
              isArmed ? 'bg-[#E83B2E] shadow-[0_0_6px_#E83B2E]' : isNoir ? 'bg-[#4B526B]' : 'bg-[#ABA085]'
            }`}
            title={isArmed ? 'Section W: Artistic' : 'Section L: Unimaginative'}
          />
        </div>

        {/* Subtext indication */}
        <span
          className={`font-editorial-mono text-[9px] sm:text-[10px] tracking-[0.16em] uppercase font-semibold ${
            isArmed
              ? isNoir
                ? 'text-[#8BA0FF]'
                : 'text-[#2946D3]'
              : isNoir
                ? 'text-[#F1EBDD]/60'
                : 'text-[#101116]/60'
          }`}
        >
          {isArmed ? 'ARTISTIC' : 'UNIMAGINATIVE'}
        </span>
      </div>

      {/* Subtle Hardware Status Toast */}
      {showStatusToast && (
        <div
          role="status"
          className={`absolute left-0 top-[42px] w-64 p-2.5 rounded-sm text-left shadow-lg border backdrop-blur-xs transition-opacity duration-200 z-50 ${
            isNoir
              ? 'bg-[#14161D] border-[#3D5CFF]/40 text-[#F1EBDD]'
              : 'bg-[#F9F5EC] border-[#2946D3]/40 text-[#101116]'
          }`}
        >
          <div className="flex items-center gap-1.5 text-[10px] font-editorial-mono uppercase tracking-[0.16em]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
            <span className={`font-semibold ${isNoir ? 'text-[#5577FF]' : 'text-[#2946D3]'}`}>
              {isArmed ? 'SECTION W // ARTISTIC' : 'SECTION L // UNIMAGINATIVE'}
            </span>
          </div>
          <p
            className={`mt-1 text-[11px] leading-snug font-editorial-sans ${
              isNoir ? 'text-[#F1EBDD]/75' : 'text-[#101116]/75'
            }`}
          >
            {isArmed
              ? 'Creative layer engaged: Section W artistic vector activated.'
              : 'Minimalist baseline engaged: Section L unimaginative vector active.'}
          </p>
        </div>
      )}
    </div>
  );
};
