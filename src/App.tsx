/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navigation } from './components/Navigation';
import { ProjectModal } from './components/ProjectModal';
import { EditProjectModal } from './components/EditProjectModal';
import { ArabiSignature } from './components/ArabiSignature';
import { Project, ThemeMode } from './types';
import {
  ArrowUpRight,
  Copy,
  Check,
  Send,
  Sliders,
  MapPin,
  Clock,
  ExternalLink,
} from 'lucide-react';

const INITIAL_PROJECTS: Project[] = [
  {
    id: 'noire',
    title: 'NOIRÉ',
    category: 'Brand & Digital Architecture',
    year: '2025–2026',
    tagline: 'A restrained luxury and design experiment exploring minimal commerce and high-margin product curation.',
    description:
      'NOIRÉ investigates how severe aesthetic reduction influences consumer perceived value in direct-to-consumer commerce. Developed from Chittagong, it pairs austere typography with deliberate physical packaging and digital restraint to test pricing power without conventional advertising noise.',
    focus: [
      'Monochrome typography systems',
      'High-margin physical product staging',
      'Frictionless checkout ergonomics',
      'Direct-to-consumer unit economics',
    ],
    deliverables: [
      'Brand Identity & Guidelines',
      'Editorial Web Store Architecture',
      'Physical Packaging Standards',
      'Direct Distribution Framework',
    ],
    status: 'Complete',
    image: '/src/assets/images/project_noire_1790455623648.jpg',
    linkText: 'Archived Case Brief',
    linkUrl: '#',
    isEditable: false,
  },
  {
    id: 'remainder',
    title: 'Remainder',
    category: 'Critical Research & Editorial Monograph',
    year: '2025–Present',
    tagline: 'An independent analytical publication examining market incentives, friction, and consumer behavior.',
    description:
      'Remainder is an ongoing research initiative and critical commentary examining the unexamined assumptions behind modern venture creation in South Asia. Issues explore supply chain friction, structural bottlenecks, and how simplicity outlasts hyper-growth software paradigms.',
    focus: [
      'First-principles market diagnostics',
      'Structural critiques of tech ecosystems',
      'Minimal editorial distribution',
      'Long-form analytical essays',
    ],
    deliverables: [
      'Quarterly Research Monograph',
      'Distribution Newsletter Architecture',
      'Analytical Mental Model Frameworks',
      'Open Reading Repository',
    ],
    status: 'Active',
    image: '/src/assets/images/project_remainder_1790455636386.jpg',
    linkText: 'Read Selected Chapters',
    linkUrl: '#',
    isEditable: false,
  },
  {
    id: 'placeholder-3',
    title: 'Delta Freight Logistics Protocol',
    category: 'Supply Chain & Systems Engineering',
    year: '2026',
    tagline: 'Streamlined documentation and cargo status tracking prototype for regional maritime transshipment.',
    description:
      'A prototype operating interface designed to reduce customs dwell time and bill-of-lading discrepancies at the Port of Chittagong. Built with minimal tabular interfaces to replace redundant paper ledgers.',
    focus: [
      'Port terminal paperwork normalization',
      'Sub-second status verification',
      'Low-bandwidth mobile utility',
    ],
    deliverables: [
      'Systems Flowchart & Operational Audit',
      'Tabular Web Dispatcher Prototype',
      'Cargo Manifest Data Schema',
    ],
    status: 'In Progress',
    linkText: 'Click [Edit Data] to customize',
    isEditable: true,
  },
  {
    id: 'placeholder-4',
    title: 'Chittagong Design Laboratory',
    category: 'Industrial Design & Tactile Objects',
    year: '2026',
    tagline: 'Exploratory studies in precision hardware enclosures and local metal fabrication.',
    description:
      'An exploratory study into locally milled aluminum and brass everyday carry artifacts. Focused on tactile weight, friction tolerances, and physical durability under coastal humidity.',
    focus: [
      'CNC tooling specifications',
      'Anodized surface finishing',
      'Local artisan tooling integration',
    ],
    deliverables: [
      'Physical Prototyping Specifications',
      'Material Stress Testing Logs',
      'CAD / CAM Toolpaths',
    ],
    status: 'Active',
    linkText: 'Click [Edit Data] to customize',
    isEditable: true,
  },
];

export default function App() {
  // Theme state: defaults to noir (pure black background #101116) as requested, with instant toggle to ivory #F1EBDD
  const [theme, setTheme] = useState<ThemeMode>('noir');
  
  // Signature Switch state for "OTHERWISE" (structure for future creative reveal)
  const [isOtherwiseArmed, setIsOtherwiseArmed] = useState<boolean>(false);

  // Projects state (with localStorage persistence for editable placeholders)
  const [projects, setProjects] = useState<Project[]>(() => {
    try {
      const saved = localStorage.getItem('arabi_portfolio_projects');
      if (saved) return JSON.parse(saved);
    } catch {
      // fallback
    }
    return INITIAL_PROJECTS;
  });

  // Selected project for detail modal
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
  // Project being edited
  const [editingProject, setEditingProject] = useState<Project | null>(null);

  // Email copy state
  const [copiedEmail, setCopiedEmail] = useState(false);

  // Contact form state
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  // Current Chittagong local time calculation
  const [bdTime, setBdTime] = useState('');
  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options: Intl.DateTimeFormatOptions = {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false,
      };
      setBdTime(new Intl.DateTimeFormat('en-GB', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSaveProject = (updated: Project) => {
    const next = projects.map((p) => (p.id === updated.id ? updated : p));
    setProjects(next);
    try {
      localStorage.setItem('arabi_portfolio_projects', JSON.stringify(next));
    } catch {
      // ignore
    }
    if (selectedProject?.id === updated.id) {
      setSelectedProject(updated);
    }
  };

  const handleCopyEmail = (e: React.MouseEvent) => {
    e.preventDefault();
    navigator.clipboard.writeText('arabi.creative@pm.me');
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2400);
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
  };

  const isNoir = theme === 'noir';
  // High-legibility royal blue on noir canvas, calibrated deep royal blue on ivory
  const blueText = isNoir ? 'text-[#5577FF]' : 'text-[#2946D3]';
  const blueBg = isNoir ? 'bg-[#3D5CFF]' : 'bg-[#2946D3]';
  const blueHover = isNoir ? 'hover:bg-[#4E6EFF]' : 'hover:bg-[#2039B0]';
  const blueBorder = isNoir ? 'border-[#3D5CFF]' : 'border-[#2946D3]';

  return (
    <div
      className={`min-h-screen transition-colors duration-200 theme-${theme} selection:bg-[#3D5CFF] selection:text-[#F1EBDD] ${
        isNoir
          ? 'bg-[#101116] text-[#F1EBDD]'
          : 'bg-[#F1EBDD] text-[#101116]'
      }`}
    >
      {/* Top Bar with Top-Left Hardware Switch & 3-Zone Contract */}
      <Navigation
        isArmed={isOtherwiseArmed}
        onToggleArmed={setIsOtherwiseArmed}
        theme={theme}
        onToggleTheme={() => setTheme(isNoir ? 'ivory' : 'noir')}
      />

      {/* Main Content Area */}
      <main className="max-w-4xl mx-auto px-5 sm:px-8 py-12 md:py-20 space-y-24 md:space-y-32">
        
        {/* HERO SECTION */}
        <section id="hero" className="pt-4 md:pt-8">
          {/* Top geographic baseline */}
          <div className="flex flex-wrap items-center gap-2.5 text-xs font-editorial-mono tracking-widest uppercase opacity-65 mb-8">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
              CHITTAGONG, BANGLADESH
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span className="flex items-center gap-1">
              <Clock className={`w-3 h-3 ${blueText}`} />
              {bdTime ? `${bdTime} BST (GMT+6)` : 'GMT+6'}
            </span>
            <span aria-hidden="true" className="opacity-40">·</span>
            <span>20 YEARS OLD</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12 items-start">
            {/* Left Typography Block */}
            <div className="md:col-span-7 space-y-6">
              <div>
                <h1 className="font-editorial-serif text-5xl sm:text-6xl md:text-7xl font-normal tracking-tight leading-[1.05]">
                  ARABI
                </h1>
                <p className={`mt-3 font-editorial-mono text-xs sm:text-sm tracking-[0.16em] uppercase ${blueText} font-medium`}>
                  Entrepreneur / creative director / whatever...
                </p>
              </div>

              <div className="pt-2 text-sm sm:text-base font-editorial-sans leading-relaxed opacity-85 space-y-4">
                <p>
                  I build independent ventures and design minimal systems from Chittagong. My work is defined by severe restraint: stripping away cosmetic trends, questioning industry assumptions, and constructing resilient models from first principles.
                </p>
                <p className="text-xs sm:text-sm opacity-70">
                  Moving between business, design, clothing, photography and whatever else seems worth figuring out.
                </p>
              </div>

              {/* Direct Action Anchors */}
              <div className="pt-4 flex flex-wrap items-center gap-4 text-xs font-editorial-mono tracking-wider uppercase">
                <a
                  href="#projects"
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-sm ${blueBg} text-[#F1EBDD] font-medium ${blueHover} transition-colors`}
                >
                  <span>Selected Work</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </a>

                <a
                  href="#about"
                  className={`inline-flex items-center gap-1 px-3 py-2 rounded-sm border transition-colors ${
                    isNoir
                      ? 'border-[#2A2E3D] hover:border-[#4B526B] text-[#F1EBDD]/80'
                      : 'border-[#CCC1AB] hover:border-[#8E836D] text-[#101116]/80'
                  }`}
                >
                  <span>Read Profile</span>
                </a>
              </div>
            </div>

            {/* Right Photo Block:
                Displaying Arabi's original photo keeping the thick white border without artificial retouching */}
            <div className="md:col-span-5 flex flex-col items-center md:items-end">
              <div className="relative group">
                {/* Thick pure white exhibition border */}
                <div className="p-3 md:p-3.5 bg-white border border-black/15 shadow-sm max-w-[280px] sm:max-w-[320px]">
                  <div className="overflow-hidden bg-[#1A1C24] aspect-[9/16] relative">
                    <img
                      src="/src/assets/images/user_arabi_hero_1790501487356.jpg"
                      alt="Arabi portrait in Chittagong, Bangladesh"
                      className="w-full h-full object-cover object-center"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                  {/* Photo Caption inside the white archival border */}
                  <div className="pt-2.5 pb-0.5 px-0.5 flex items-center justify-between text-[9px] font-editorial-mono text-[#101116] uppercase tracking-widest border-t border-black/10 mt-2">
                    <span className="font-semibold">ARABI</span>
                    <span className="opacity-70">CHITTAGONG · 2026</span>
                  </div>
                </div>

                {/* Subtle photo metadata underneath */}
                <div className="mt-2.5 text-[10px] font-editorial-mono tracking-wider uppercase opacity-50 text-right">
                  Plate 01 · Authentic Print
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className={`h-[1px] w-full ${isNoir ? 'bg-[#202330]' : 'bg-[#D8CEBA]'}`} />

        {/* ABOUT SECTION */}
        <section id="about" className="space-y-6">
          <div className="flex items-center justify-between">
            <span className={`font-editorial-mono text-[10px] tracking-[0.25em] uppercase ${blueText}`}>
              01 / ABOUT
            </span>
            <span className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-40">
              Biography & Background
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl tracking-tight leading-tight">
            I Get Bored Easily, So I Make Things.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-2">
            <div className="md:col-span-8 space-y-4 font-editorial-sans text-sm sm:text-base leading-relaxed opacity-85">
              <p className="text-base sm:text-lg font-editorial-serif leading-snug">
                Some become businesses. Some become designs. Some probably shouldn't have been made at all.
              </p>
              <p className="text-xs sm:text-sm opacity-70">
                Independent by choice. Questioning conventional roadmaps, trying ideas, breaking them, rebuilding them, and retaining only the pieces that genuinely hold value.
              </p>
            </div>

            {/* Quick Metadata Column */}
            <div className="md:col-span-4 space-y-4 font-editorial-mono text-xs border-l pl-5 border-current/15">
              <div>
                <span className="block text-[9px] uppercase tracking-widest opacity-50">Location</span>
                <span className="mt-0.5 block font-medium">Chittagong, Bangladesh</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest opacity-50">Age</span>
                <span className="mt-0.5 block font-medium">20 Years</span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest opacity-50">Discipline</span>
                <span className={`mt-0.5 block font-medium ${blueText}`}>
                  Entrepreneur / creative director / whatever...
                </span>
              </div>
              <div>
                <span className="block text-[9px] uppercase tracking-widest opacity-50">Current Status</span>
                <span className="mt-0.5 flex items-center gap-1.5 font-medium">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
                  Active on independent initiatives
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className={`h-[1px] w-full ${isNoir ? 'bg-[#202330]' : 'bg-[#D8CEBA]'}`} />

        {/* CURRENTLY / INTERESTS SECTION */}
        <section id="interests" className="space-y-8">
          <div className="flex items-center justify-between">
            <span className={`font-editorial-mono text-[10px] tracking-[0.25em] uppercase ${blueText}`}>
              02 / CURRENTLY & PURSUITS
            </span>
            <span className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-40">
              Active Focus Vector
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl tracking-tight leading-tight">
            Current pursuits, active crafts, and exploratory work.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
            {/* Card 1: THE MISSING LINK */}
            <div
              className={`p-6 rounded-sm border transition-colors ${
                isNoir
                  ? 'bg-[#14161F] border-[#222636]'
                  : 'bg-[#ECE4D0] border-[#D6CDBC]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${blueBg}`} />
                <h3 className="font-editorial-mono text-xs uppercase tracking-widest font-semibold">
                  THE MISSING LINK
                </h3>
              </div>
              <p className="font-editorial-sans text-xs sm:text-sm leading-relaxed opacity-85">
                Building an adaptive learning platform for IELTS and SSC/HSC—teaching the shortcuts, patterns and overlooked techniques that conventional courses tend to miss.
              </p>
            </div>

            {/* Card 2: FASHION DESIGNING */}
            <div
              className={`p-6 rounded-sm border transition-colors ${
                isNoir
                  ? 'bg-[#14161F] border-[#222636]'
                  : 'bg-[#ECE4D0] border-[#D6CDBC]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
                <h3 className="font-editorial-mono text-xs uppercase tracking-widest font-semibold">
                  FASHION DESIGNING
                </h3>
              </div>
              <p className="font-editorial-sans text-xs sm:text-sm leading-relaxed opacity-85">
                Learning the craft from the ground up, from pattern-making and construction to developing my own pieces and eventually turning them into something of my own.
              </p>
            </div>

            {/* Card 3: EXPERIMENTING */}
            <div
              className={`p-6 rounded-sm border transition-colors ${
                isNoir
                  ? 'bg-[#14161F] border-[#222636]'
                  : 'bg-[#ECE4D0] border-[#D6CDBC]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className={`w-1.5 h-1.5 rounded-full ${blueBg}`} />
                <h3 className="font-editorial-mono text-xs uppercase tracking-widest font-semibold">
                  EXPERIMENTING
                </h3>
              </div>
              <p className="font-editorial-sans text-xs sm:text-sm leading-relaxed opacity-85">
                Moving between business, design, clothing, photography and whatever else seems worth figuring out.
              </p>
            </div>

            {/* Card 4: LEARNING BY DOING */}
            <div
              className={`p-6 rounded-sm border transition-colors ${
                isNoir
                  ? 'bg-[#14161F] border-[#222636]'
                  : 'bg-[#ECE4D0] border-[#D6CDBC]'
              }`}
            >
              <div className="flex items-center gap-2 mb-3">
                <span className="w-1.5 h-1.5 rounded-full bg-[#E83B2E]" />
                <h3 className="font-editorial-mono text-xs uppercase tracking-widest font-semibold">
                  LEARNING BY DOING
                </h3>
              </div>
              <p className="font-editorial-sans text-xs sm:text-sm leading-relaxed opacity-85">
                Trying things, breaking them, rebuilding them—and keeping the useful parts.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className={`h-[1px] w-full ${isNoir ? 'bg-[#202330]' : 'bg-[#D8CEBA]'}`} />

        {/* SELECTED PROJECTS SECTION */}
        <section id="projects" className="space-y-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <span className={`font-editorial-mono text-[10px] tracking-[0.25em] uppercase ${blueText}`}>
                03 / SELECTED WORK
              </span>
              <h2 className="mt-1 font-editorial-serif text-3xl sm:text-4xl tracking-tight leading-tight">
                Case studies, monographs & active placeholders
              </h2>
            </div>
            <span className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-50">
              4 Selected Archives
            </span>
          </div>

          <div className="space-y-6">
            {projects.map((project, idx) => (
              <div
                key={project.id}
                className={`group p-6 sm:p-7 rounded-sm border transition-all duration-200 ${
                  isNoir
                    ? 'bg-[#13151D] border-[#222636] hover:border-[#383E54]'
                    : 'bg-[#EFE7D5] border-[#D6CDBC] hover:border-[#B2A791]'
                }`}
              >
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                  {/* Left: Index & Meta */}
                  <div className="space-y-2 flex-1">
                    <div className="flex flex-wrap items-center gap-2 text-xs font-editorial-mono">
                      <span className={`${blueText} font-semibold`}>
                        0{idx + 1}
                      </span>
                      <span className="opacity-30">/</span>
                      <span className="uppercase tracking-widest opacity-60">
                        {project.category}
                      </span>
                      <span className="opacity-30">·</span>
                      <span className="opacity-50">{project.year}</span>
                    </div>

                    <h3 className={`font-editorial-serif text-2xl sm:text-3xl tracking-tight group-hover:${blueText} transition-colors`}>
                      {project.title}
                    </h3>

                    <p className="font-editorial-sans text-xs sm:text-sm opacity-80 leading-relaxed max-w-2xl">
                      {project.tagline || project.description}
                    </p>

                    {/* Tag list */}
                    <div className="pt-2 flex flex-wrap gap-2 text-[10px] font-editorial-mono opacity-60">
                      {project.focus.slice(0, 3).map((item, i) => (
                        <span key={i} className="flex items-center gap-1">
                          <span className="w-1 h-1 rounded-full bg-[#E83B2E]" />
                          {item}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Right Actions */}
                  <div className="flex md:flex-col items-center md:items-end justify-between gap-3 pt-2 md:pt-0 shrink-0">
                    <button
                      type="button"
                      onClick={() => setSelectedProject(project)}
                      className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-sm text-xs font-editorial-mono uppercase tracking-wider transition-colors ${
                        isNoir
                          ? `bg-[#1E212D] text-[#F1EBDD] hover:${blueBg}`
                          : `bg-[#DFD7C3] text-[#101116] hover:${blueBg} hover:text-[#F1EBDD]`
                      }`}
                    >
                      <span>Examine Case</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>

                    {project.isEditable && (
                      <button
                        type="button"
                        onClick={() => setEditingProject(project)}
                        className={`inline-flex items-center gap-1 text-[11px] font-editorial-mono uppercase ${blueText} hover:underline`}
                      >
                        <Sliders className="w-3 h-3" />
                        <span>Edit Data</span>
                      </button>
                    )}
                  </div>
                </div>

                {/* Inline project thumbnail preview if image exists */}
                {project.image && (
                  <div
                    onClick={() => setSelectedProject(project)}
                    className="mt-5 overflow-hidden rounded-sm border border-current/10 cursor-pointer max-h-48 relative group/img"
                  >
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover object-center filter grayscale group-hover/img:grayscale-0 transition-all duration-300"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover/img:opacity-100 transition-opacity flex items-center justify-center">
                      <span className="font-editorial-mono text-[10px] tracking-widest uppercase bg-black/80 text-white px-2.5 py-1 rounded-sm">
                        View Specification
                      </span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="p-4 rounded-sm border border-dashed border-current/20 text-center font-editorial-mono text-xs opacity-60">
            Note: Placeholders 03 & 04 can be customized directly using the [Edit Data] button.
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className={`h-[1px] w-full ${isNoir ? 'bg-[#202330]' : 'bg-[#D8CEBA]'}`} />

        {/* APPROACH SECTION */}
        <section id="approach" className="space-y-8">
          <div className="flex items-center justify-between">
            <span className={`font-editorial-mono text-[10px] tracking-[0.25em] uppercase ${blueText}`}>
              04 / WORKING APPROACH
            </span>
            <span className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-40">
              Core Axioms
            </span>
          </div>

          <h2 className="font-editorial-serif text-3xl sm:text-4xl tracking-tight leading-tight">
            Four guiding constraints behind all creative & commercial output.
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
            <div className="space-y-2">
              <span className={`font-editorial-mono text-xs ${blueText} font-semibold`}>
                01. FIRST-PRINCIPLES DIAGNOSTICS
              </span>
              <h3 className="font-editorial-serif text-xl">Deconstruct inherited consensus</h3>
              <p className="font-editorial-sans text-xs sm:text-sm opacity-80 leading-relaxed">
                Most industry practices are habits rather than necessities. We isolate the physical, technical, and psychological truths of a problem before committing capital or design labor.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-editorial-mono text-xs text-[#E83B2E] font-semibold">
                02. SEVERE VISUAL RESTRAINT
              </span>
              <h3 className="font-editorial-serif text-xl">Zero ornamental noise</h3>
              <p className="font-editorial-sans text-xs sm:text-sm opacity-80 leading-relaxed">
                Visual fireworks mask structural weaknesses. By rejecting gratuitous animations, gradients, and bloated cards, the typography and value proposition must stand entirely on their own merit.
              </p>
            </div>

            <div className="space-y-2">
              <span className={`font-editorial-mono text-xs ${blueText} font-semibold`}>
                03. REGIONAL LEVERAGE
              </span>
              <h3 className="font-editorial-serif text-xl">Operating from Chittagong</h3>
              <p className="font-editorial-sans text-xs sm:text-sm opacity-80 leading-relaxed">
                Building from Bangladesh provides an immediate grounding in physical logistics, cost efficiency, and informal commercial realities that Silicon Valley abstractions fail to perceive.
              </p>
            </div>

            <div className="space-y-2">
              <span className="font-editorial-mono text-xs text-[#E83B2E] font-semibold">
                04. PATIENT AUTONOMY
              </span>
              <h3 className="font-editorial-serif text-xl">Enduring unit economics</h3>
              <p className="font-editorial-sans text-xs sm:text-sm opacity-80 leading-relaxed">
                A venture that cannot survive on customer revenue is fundamentally incomplete. We prioritize self-sustaining operational models, conservative leverage, and independent ownership.
              </p>
            </div>
          </div>
        </section>

        {/* SECTION DIVIDER */}
        <div className={`h-[1px] w-full ${isNoir ? 'bg-[#202330]' : 'bg-[#D8CEBA]'}`} />

        {/* CONTACT SECTION */}
        <section id="contact" className="space-y-8">
          <div className="flex items-center justify-between">
            <span className={`font-editorial-mono text-[10px] tracking-[0.25em] uppercase ${blueText}`}>
              05 / DIRECT CORRESPONDENCE
            </span>
            <span className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-40">
              Open Channel
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-12">
            {/* Left Contact Information */}
            <div className="md:col-span-5 space-y-6">
              <div>
                <h2 className="font-editorial-serif text-3xl sm:text-4xl tracking-tight leading-tight">
                  Initiate conversation.
                </h2>
                <p className="mt-2 text-xs sm:text-sm font-editorial-sans opacity-80 leading-relaxed">
                  Available for select venture initiatives, advisory inquiries, and strategic collaborations aligned with our principles.
                </p>
              </div>

              {/* Direct Email with copy button */}
              <div
                className={`p-4 rounded-sm border ${
                  isNoir
                    ? 'bg-[#14161F] border-[#222636]'
                    : 'bg-[#ECE4D0] border-[#D6CDBC]'
                }`}
              >
                <span className="block font-editorial-mono text-[9px] uppercase tracking-widest opacity-50 mb-1">
                  Direct Email Channel
                </span>
                <div className="flex items-center justify-between gap-2">
                  <span className="font-editorial-mono text-xs sm:text-sm font-medium">
                    arabi.creative@pm.me
                  </span>
                  <button
                    type="button"
                    onClick={handleCopyEmail}
                    className="p-1.5 rounded-sm hover:opacity-75 transition-opacity"
                    title="Copy email to clipboard"
                    aria-label="Copy email address"
                  >
                    {copiedEmail ? (
                      <Check className={`w-4 h-4 ${blueText}`} />
                    ) : (
                      <Copy className="w-4 h-4 opacity-60" />
                    )}
                  </button>
                </div>
                {copiedEmail && (
                  <span className={`mt-1 block text-[10px] font-editorial-mono ${blueText}`}>
                    Copied to clipboard.
                  </span>
                )}
              </div>

              {/* Location details */}
              <div className="space-y-2 text-xs font-editorial-mono opacity-70">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-[#E83B2E]" />
                  <span>Chittagong 4000, Bangladesh</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className={`w-3.5 h-3.5 ${blueText}`} />
                  <span>Time Zone: GMT+6 (BST)</span>
                </div>
              </div>

              {/* Signature Colophon Mark */}
              <div className="pt-4 border-t border-current/10">
                <span className="block font-editorial-mono text-[9px] uppercase tracking-widest opacity-40 mb-2">
                  Sign-off Colophon
                </span>
                <div className="flex items-center gap-3">
                  <ArabiSignature
                    className="w-12 h-10 opacity-80"
                    color="currentColor"
                    strokeWidth={2.4}
                  />
                  <div className="font-editorial-mono text-[10px] tracking-wider uppercase opacity-60">
                    <span>ARABI</span>
                    <span className="block text-[8px] opacity-75">Chittagong · 2026</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Contact Form */}
            <div className="md:col-span-7">
              {formSubmitted ? (
                <div
                  className={`p-6 rounded-sm border text-center space-y-3 ${
                    isNoir
                      ? 'bg-[#14161F] border-[#222636]'
                      : 'bg-[#ECE4D0] border-[#D6CDBC]'
                  }`}
                >
                  <div className={`w-8 h-8 rounded-full ${isNoir ? 'bg-[#3D5CFF]/20 text-[#5577FF]' : 'bg-[#2946D3]/15 text-[#2946D3]'} flex items-center justify-center mx-auto`}>
                    <Check className="w-4 h-4" />
                  </div>
                  <h3 className="font-editorial-serif text-xl">Dispatch Received</h3>
                  <p className="font-editorial-sans text-xs opacity-80 max-w-sm mx-auto">
                    Thank you, {contactForm.name || 'Visitor'}. Your correspondence has been logged. Responses are typically returned within 48 business hours.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setFormSubmitted(false);
                      setContactForm({ name: '', email: '', subject: '', message: '' });
                    }}
                    className={`mt-2 text-xs font-editorial-mono uppercase tracking-wider ${blueText} hover:underline`}
                  >
                    Send another note
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={handleContactSubmit}
                  className={`p-6 rounded-sm border space-y-4 text-xs font-editorial-sans ${
                    isNoir
                      ? 'bg-[#13151D] border-[#222636]'
                      : 'bg-[#EFE7D5] border-[#D6CDBC]'
                  }`}
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block mb-1 font-editorial-mono text-[10px] tracking-wider uppercase opacity-75">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={contactForm.name}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, name: e.target.value })
                        }
                        placeholder="e.g. Tariq Rahman"
                        className={`w-full px-3 py-2 rounded-sm border focus:outline-none ${isNoir ? 'focus:border-[#4D6CFA]' : 'focus:border-[#2946D3]'} ${
                          isNoir
                            ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                            : 'bg-[#FAF6EC] border-[#D1C7B2] text-[#101116]'
                        }`}
                      />
                    </div>
                    <div>
                      <label className="block mb-1 font-editorial-mono text-[10px] tracking-wider uppercase opacity-75">
                        Return Email
                      </label>
                      <input
                        type="email"
                        required
                        value={contactForm.email}
                        onChange={(e) =>
                          setContactForm({ ...contactForm, email: e.target.value })
                        }
                        placeholder="tariq@organization.org"
                        className={`w-full px-3 py-2 rounded-sm border focus:outline-none ${isNoir ? 'focus:border-[#4D6CFA]' : 'focus:border-[#2946D3]'} ${
                          isNoir
                            ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                            : 'bg-[#FAF6EC] border-[#D1C7B2] text-[#101116]'
                        }`}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block mb-1 font-editorial-mono text-[10px] tracking-wider uppercase opacity-75">
                      Subject / Intent
                    </label>
                    <input
                      type="text"
                      required
                      value={contactForm.subject}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, subject: e.target.value })
                      }
                      placeholder="e.g. Venture Partnership Inquiry"
                      className={`w-full px-3 py-2 rounded-sm border focus:outline-none ${isNoir ? 'focus:border-[#4D6CFA]' : 'focus:border-[#2946D3]'} ${
                        isNoir
                          ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                          : 'bg-[#FAF6EC] border-[#D1C7B2] text-[#101116]'
                      }`}
                    />
                  </div>

                  <div>
                    <label className="block mb-1 font-editorial-mono text-[10px] tracking-wider uppercase opacity-75">
                      Message Note
                    </label>
                    <textarea
                      rows={4}
                      required
                      value={contactForm.message}
                      onChange={(e) =>
                        setContactForm({ ...contactForm, message: e.target.value })
                      }
                      placeholder="Concise outline of what you'd like to discuss or build together."
                      className={`w-full px-3 py-2 rounded-sm border focus:outline-none ${isNoir ? 'focus:border-[#4D6CFA]' : 'focus:border-[#2946D3]'} ${
                        isNoir
                          ? 'bg-[#181A24] border-[#2E3345] text-[#F1EBDD]'
                          : 'bg-[#FAF6EC] border-[#D1C7B2] text-[#101116]'
                      }`}
                    />
                  </div>

                  <button
                    type="submit"
                    className={`w-full flex items-center justify-center gap-2 py-2.5 rounded-sm ${blueBg} text-[#F1EBDD] font-medium font-editorial-mono uppercase tracking-wider ${blueHover} transition-colors`}
                  >
                    <Send className="w-3.5 h-3.5" />
                    <span>Transmit Correspondence</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`mt-24 border-t py-10 transition-colors duration-200 ${
          isNoir
            ? 'bg-[#0E0F14] border-[#1C1F2B] text-[#F1EBDD]/60'
            : 'bg-[#E7DFCE] border-[#D4C9B4] text-[#101116]/60'
        }`}
      >
        <div className="max-w-4xl mx-auto px-5 sm:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-editorial-mono">
          <div className="flex items-center gap-3">
            <span className="font-semibold text-current opacity-90">ARABI</span>
            <span>·</span>
            <span>Chittagong, Bangladesh</span>
            <span>·</span>
            <span>2026</span>
          </div>

          <div className="flex items-center gap-4 text-[10px] uppercase tracking-wider">
            <span>Layer 01: Editorial Monograph</span>
            <span>·</span>
            <span className={isOtherwiseArmed ? `${blueText} font-semibold` : 'opacity-50'}>
              {isOtherwiseArmed ? 'Otherwise: Armed' : 'Otherwise: Standby'}
            </span>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <ProjectModal
        project={selectedProject}
        isOpen={Boolean(selectedProject)}
        onClose={() => setSelectedProject(null)}
        onEdit={(proj) => setEditingProject(proj)}
        theme={theme}
      />

      {editingProject && (
        <EditProjectModal
          project={editingProject}
          isOpen={Boolean(editingProject)}
          onClose={() => setEditingProject(null)}
          onSave={handleSaveProject}
          theme={theme}
        />
      )}
    </div>
  );
}
