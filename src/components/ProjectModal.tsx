import React, { useEffect } from 'react';
import { Project, ThemeMode } from '../types';
import { X, ExternalLink, ArrowRight } from 'lucide-react';

interface ProjectModalProps {
  project: Project | null;
  isOpen: boolean;
  onClose: () => void;
  onEdit?: (project: Project) => void;
  theme: ThemeMode;
}

export const ProjectModal: React.FC<ProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onEdit,
  theme,
}) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  const isNoir = theme === 'noir';

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-6 bg-black/75 backdrop-blur-xs transition-opacity duration-200"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-3xl rounded-sm border p-6 md:p-8 shadow-2xl max-h-[90vh] overflow-y-auto ${
          isNoir
            ? 'bg-[#101116] border-[#2A2E3D] text-[#F1EBDD]'
            : 'bg-[#F1EBDD] border-[#D1C7B2] text-[#101116]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Row */}
        <div className="flex items-center justify-between pb-4 border-b border-current/10">
          <div className="flex items-center gap-3">
            <span className="font-editorial-mono text-[10px] tracking-[0.2em] uppercase text-[#2946D3]">
              Project Specification
            </span>
            <span className="text-[10px] opacity-40">/</span>
            <span className="font-editorial-mono text-[10px] tracking-[0.16em] uppercase opacity-70">
              {project.category}
            </span>
          </div>

          <div className="flex items-center gap-3">
            {project.isEditable && onEdit && (
              <button
                type="button"
                onClick={() => {
                  onClose();
                  onEdit(project);
                }}
                className="font-editorial-mono text-[10px] tracking-wider uppercase text-[#2946D3] hover:underline"
              >
                [Edit Data]
              </button>
            )}
            <button
              type="button"
              onClick={onClose}
              className={`p-1.5 rounded-sm transition-colors ${
                isNoir ? 'hover:bg-white/10 text-[#F1EBDD]' : 'hover:bg-black/10 text-[#101116]'
              }`}
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Project Title & Tagline */}
        <div className="mt-6">
          <h2 className="font-editorial-serif text-3xl md:text-4xl tracking-tight leading-tight">
            {project.title}
          </h2>
          <p className="mt-2 text-sm md:text-base font-editorial-sans opacity-80 max-w-xl">
            {project.tagline}
          </p>
        </div>

        {/* Project Image Frame (if exists) */}
        {project.image && (
          <div className="mt-6 overflow-hidden rounded-sm border border-current/10">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-auto object-cover max-h-[380px]"
              referrerPolicy="no-referrer"
            />
          </div>
        )}

        {/* Metadata Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 py-5 my-6 border-y border-current/10 font-editorial-mono text-[11px]">
          <div>
            <span className="block opacity-50 uppercase tracking-widest text-[9px]">Timeline</span>
            <span className="font-medium mt-1 block">{project.year}</span>
          </div>
          <div>
            <span className="block opacity-50 uppercase tracking-widest text-[9px]">Status</span>
            <span className="font-medium mt-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#2946D3]" />
              {project.status}
            </span>
          </div>
          <div>
            <span className="block opacity-50 uppercase tracking-widest text-[9px]">Role</span>
            <span className="font-medium mt-1 block">Lead Design & Strategy</span>
          </div>
          <div>
            <span className="block opacity-50 uppercase tracking-widest text-[9px]">Origin</span>
            <span className="font-medium mt-1 block">Chittagong, BD</span>
          </div>
        </div>

        {/* Project Overview */}
        <div className="space-y-4 font-editorial-sans text-xs md:text-sm leading-relaxed opacity-90">
          <div>
            <h4 className="font-editorial-mono text-[10px] tracking-[0.2em] uppercase mb-1 text-[#2946D3]">
              Overview & Problem Architecture
            </h4>
            <p>{project.description}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-3">
            <div>
              <h4 className="font-editorial-mono text-[10px] tracking-[0.2em] uppercase mb-2 opacity-60">
                Core Focus Vectors
              </h4>
              <ul className="space-y-1.5 font-editorial-sans text-xs">
                {project.focus.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#E83B2E]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h4 className="font-editorial-mono text-[10px] tracking-[0.2em] uppercase mb-2 opacity-60">
                Primary Deliverables
              </h4>
              <ul className="space-y-1.5 font-editorial-sans text-xs">
                {project.deliverables.map((item, i) => (
                  <li key={i} className="flex items-center gap-2">
                    <span className="w-1 h-1 rounded-full bg-[#2946D3]" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Action Link Footer */}
        {project.linkUrl && (
          <div className="mt-8 pt-4 border-t border-current/10 flex items-center justify-between">
            <span className="font-editorial-mono text-[10px] opacity-60">
              Direct Reference Link
            </span>
            <a
              href={project.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-editorial-sans text-xs font-medium text-[#2946D3] hover:underline"
            >
              {project.linkText || 'Open External Asset'}
              <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        )}
      </div>
    </div>
  );
};
