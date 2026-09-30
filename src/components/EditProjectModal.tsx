import React, { useState } from 'react';
import { Project, ThemeMode } from '../types';
import { X, Check } from 'lucide-react';

interface EditProjectModalProps {
  project: Project;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updatedProject: Project) => void;
  theme: ThemeMode;
}

export const EditProjectModal: React.FC<EditProjectModalProps> = ({
  project,
  isOpen,
  onClose,
  onSave,
  theme,
}) => {
  const [title, setTitle] = useState(project.title);
  const [category, setCategory] = useState(project.category);
  const [year, setYear] = useState(project.year);
  const [tagline, setTagline] = useState(project.tagline);
  const [description, setDescription] = useState(project.description);
  const [focusStr, setFocusStr] = useState(project.focus.join(', '));
  const [deliverablesStr, setDeliverablesStr] = useState(project.deliverables.join(', '));
  const [linkText, setLinkText] = useState(project.linkText || '');
  const [linkUrl, setLinkUrl] = useState(project.linkUrl || '');

  if (!isOpen) return null;

  const isNoir = theme === 'noir';
  const blueText = isNoir ? 'text-[#5577FF]' : 'text-[#2946D3]';
  const blueBg = isNoir ? 'bg-[#3D5CFF]' : 'bg-[#2946D3]';
  const blueHover = isNoir ? 'hover:bg-[#4E6EFF]' : 'hover:bg-[#2039B0]';
  const blueFocusBorder = isNoir ? 'focus:border-[#4D6CFA]' : 'focus:border-[#2946D3]';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...project,
      title: title.trim() || 'Untitled Project',
      category: category.trim() || 'General',
      year: year.trim() || '2026',
      tagline: tagline.trim(),
      description: description.trim(),
      focus: focusStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      deliverables: deliverablesStr
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean),
      linkText: linkText.trim() || undefined,
      linkUrl: linkUrl.trim() || undefined,
    });
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs"
      onClick={onClose}
    >
      <div
        className={`relative w-full max-w-lg rounded-sm border p-6 shadow-2xl max-h-[90vh] overflow-y-auto ${
          isNoir
            ? 'bg-[#12131A] border-[#2A2E3D] text-[#F1EBDD]'
            : 'bg-[#F9F6EE] border-[#D6CDBC] text-[#101116]'
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between pb-3 border-b border-current/15">
          <div>
            <span className={`font-editorial-mono text-xs sm:text-sm tracking-[0.2em] uppercase font-bold ${blueText}`}>
              Editable Placeholder
            </span>
            <h3 className="font-editorial-serif text-2xl font-normal">
              Edit Project Details
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-sm hover:opacity-70 transition-opacity cursor-pointer"
            aria-label="Close edit modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4.5 text-sm font-editorial-sans">
          <div>
            <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
              Project Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                isNoir
                  ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                  : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
              }`}
              placeholder="e.g. Chittagong Maritime Log"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
                Category
              </label>
              <input
                type="text"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                  isNoir
                    ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                    : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
                }`}
                placeholder="e.g. Supply Chain / Systems"
                required
              />
            </div>
            <div>
              <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
                Year / Timeline
              </label>
              <input
                type="text"
                value={year}
                onChange={(e) => setYear(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                  isNoir
                    ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                    : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
                }`}
                placeholder="e.g. 2026"
                required
              />
            </div>
          </div>

          <div>
            <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
              Brief Tagline
            </label>
            <input
              type="text"
              value={tagline}
              onChange={(e) => setTagline(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                isNoir
                  ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                  : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
              }`}
              placeholder="One-line summary of problem or intent"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
              Description
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                isNoir
                  ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                  : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
              }`}
              placeholder="Concise overview of what this project tackles and what was built."
            />
          </div>

          <div>
            <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
              Core Focus Areas (comma separated)
            </label>
            <input
              type="text"
              value={focusStr}
              onChange={(e) => setFocusStr(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                isNoir
                  ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                  : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
              }`}
              placeholder="e.g. Unit Economics, Minimal UX, Distribution"
            />
          </div>

          <div>
            <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
              Key Deliverables (comma separated)
            </label>
            <input
              type="text"
              value={deliverablesStr}
              onChange={(e) => setDeliverablesStr(e.target.value)}
              className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                isNoir
                  ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                  : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
              }`}
              placeholder="e.g. Financial Model, Design Spec, Prototype"
            />
          </div>

          <div className="grid grid-cols-2 gap-3.5">
            <div>
              <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
                Link Label (optional)
              </label>
              <input
                type="text"
                value={linkText}
                onChange={(e) => setLinkText(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                  isNoir
                    ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                    : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
                }`}
                placeholder="e.g. View Specification"
              />
            </div>
            <div>
              <label className="block mb-1.5 font-editorial-mono text-xs tracking-wider uppercase font-semibold opacity-85">
                Link URL (optional)
              </label>
              <input
                type="text"
                value={linkUrl}
                onChange={(e) => setLinkUrl(e.target.value)}
                className={`w-full px-3.5 py-2 rounded-sm border text-sm sm:text-base focus:outline-none ${blueFocusBorder} ${
                  isNoir
                    ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                    : 'bg-[#FFFFFF] border-[#D1C7B2] text-[#101116]'
                }`}
                placeholder="https://..."
              />
            </div>
          </div>

          <div className="flex items-center justify-end gap-3 pt-4 border-t border-current/15">
            <button
              type="button"
              onClick={onClose}
              className={`px-4 py-2 rounded-sm text-xs sm:text-sm font-editorial-mono uppercase font-semibold transition-colors cursor-pointer ${
                isNoir ? 'hover:bg-white/10 text-white/80' : 'hover:bg-black/10 text-black/80'
              }`}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`flex items-center gap-2 px-5 py-2 rounded-sm ${blueBg} text-[#F1EBDD] font-bold font-editorial-mono uppercase text-xs sm:text-sm tracking-wider ${blueHover} transition-colors cursor-pointer shadow-sm`}
            >
              <Check className="w-4 h-4" />
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
