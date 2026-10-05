import React, { useState, useEffect } from 'react';
import { ASSETS, FEST_EVENTS } from '../data/festData';
import { FestEvent, TabType } from '../types';

interface FestHomeProps {
  onNavigate: (tab: TabType) => void;
  onSelectEventForCheckout: (event: FestEvent) => void;
  onOpenVenueModal: (venue: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const FestHome: React.FC<FestHomeProps> = ({
  onNavigate,
  onSelectEventForCheckout,
  onOpenVenueModal,
  onShowToast
}) => {
  // Realtime ticking countdown timer to Fest April 16, 2026
  const [timeLeft, setTimeLeft] = useState({
    days: 8,
    hours: 14,
    mins: 32,
    secs: 18
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.secs > 0) {
          return { ...prev, secs: prev.secs - 1 };
        } else if (prev.mins > 0) {
          return { ...prev, mins: prev.mins - 1, secs: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, mins: 59, secs: 59 };
        } else if (prev.days > 0) {
          return { ...prev, days: prev.days - 1, hours: 23, mins: 59, secs: 59 };
        }
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const [activeCategory, setActiveCategory] = useState<string>('all');

  const hackathonEvent = FEST_EVENTS.find((e) => e.id === 'hack-a-renaissance')!;
  const starNightEvent = FEST_EVENTS.find((e) => e.id === 'star-pro-nite')!;
  const roboWarsEvent = FEST_EVENTS.find((e) => e.id === 'robosumo-maze')!;
  const panacheEvent = FEST_EVENTS.find((e) => e.id === 'panache-fashion')!;

  const handleWhatsAppDesk = () => {
    onShowToast('Opening JECRC 24/7 Student Desk on WhatsApp (+91 98290 12345)...', 'support_agent');
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24">
      {/* Live Flash Notification Ticker */}
      <div className="w-full bg-[#533200] text-[#e39100] px-gutter py-2.5 flex items-center justify-between shadow-xs">
        <div className="flex items-center gap-2 min-w-0">
          <span className="flex h-2.5 w-2.5 relative flex-shrink-0">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#ffddb8] opacity-75" />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#ffddb8]" />
          </span>
          <p className="font-label-sm text-label-sm truncate tracking-wide text-xs">
            <span className="uppercase font-bold text-[#ffddb8]">Flash:</span> Early bird passes for Battle of Bands closing in 4 hours! 850+ booked today.
          </p>
        </div>
        <span className="material-symbols-outlined text-[16px] text-[#ffddb8] flex-shrink-0 ml-1">
          bolt
        </span>
      </div>

      {/* Hero Section */}
      <section className="relative px-gutter pt-4 pb-6 overflow-hidden">
        {/* Ambient Background Accent Glows */}
        <div className="absolute -top-12 -right-12 w-64 h-64 bg-[#316bf3]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-28 -left-16 w-56 h-56 bg-[#ffb95f]/15 rounded-full blur-3xl pointer-events-none" />

        <div className="relative flex flex-col items-center text-center">
          {/* Presenter Super-Badge */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#dce9ff] text-[#002546] mb-3 shadow-xs font-bold">
            <span className="material-symbols-outlined text-[15px] text-[#0051d5]">verified</span>
            <span className="font-label-sm text-label-sm tracking-wider uppercase text-[11px]">
              JECRC UNIVERSITY • JAIPUR PRESENTS
            </span>
          </div>

          {/* Mega Title */}
          <h1 className="font-headline-lg-mobile text-[26px] leading-[32px] text-[#002546] font-extrabold tracking-tight mb-1.5">
            RENAISSANCE <span className="text-[#0051d5]">&amp;</span> TECHNOZION <span className="text-[#533200]">'26</span>
          </h1>

          {/* Subtext */}
          <p className="font-body-md text-body-md text-[#42474f] max-w-sm mb-5 text-sm leading-relaxed">
            North India's Largest Annual Techno-Cultural Festival • <span className="font-bold text-[#002546]">April 16–19, 2026</span>
          </p>

          {/* Digital Countdown Pill Container */}
          <div className="w-full max-w-md bg-white p-3.5 rounded-xl shadow-md mb-5 border border-[#e5eeff]">
            <div className="flex items-center justify-between mb-2 px-1">
              <div className="flex items-center gap-1.5">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                  schedule
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-wider text-[#42474f] font-bold text-[11px]">
                  Live Fest Countdown
                </span>
              </div>
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] font-label-sm text-label-sm font-bold text-[10px]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" /> Stage 1
              </span>
            </div>

            <div className="grid grid-cols-4 gap-2 text-center" id="countdown-grid">
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="block font-headline-md text-xl text-[#002546] font-extrabold">
                  {String(timeLeft.days).padStart(2, '0')}
                </span>
                <span className="block font-label-sm text-[10px] text-[#42474f] uppercase tracking-wider font-bold">
                  Days
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="block font-headline-md text-xl text-[#002546] font-extrabold">
                  {String(timeLeft.hours).padStart(2, '0')}
                </span>
                <span className="block font-label-sm text-[10px] text-[#42474f] uppercase tracking-wider font-bold">
                  Hours
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="block font-headline-md text-xl text-[#002546] font-extrabold">
                  {String(timeLeft.mins).padStart(2, '0')}
                </span>
                <span className="block font-label-sm text-[10px] text-[#42474f] uppercase tracking-wider font-bold">
                  Mins
                </span>
              </div>
              <div className="bg-[#eff4ff] p-2 rounded-lg">
                <span className="block font-headline-md text-xl text-[#0051d5] font-extrabold">
                  {String(timeLeft.secs).padStart(2, '0')}
                </span>
                <span className="block font-label-sm text-[10px] text-[#42474f] uppercase tracking-wider font-bold">
                  Secs
                </span>
              </div>
            </div>
          </div>

          {/* Quick Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-2.5 w-full max-w-md mb-5">
            <button
              onClick={() => onSelectEventForCheckout(hackathonEvent)}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#533200] hover:bg-[#361f00] text-white font-label-lg text-sm font-bold shadow-md active:scale-95 transition-all cursor-pointer"
            >
              <span>Claim Fest Pass</span>
              <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
            </button>
            <button
              onClick={() => onNavigate('events')}
              className="w-full flex items-center justify-center gap-2 px-5 py-3.5 rounded-lg bg-[#0d3b66] hover:bg-[#002546] text-white font-label-lg text-sm font-bold shadow-xs active:scale-95 transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">rocket_launch</span>
              <span>Explore 45+ Events</span>
            </button>
          </div>

          {/* Fest Key Metrics Row */}
          <div className="w-full overflow-x-auto no-scrollbar py-1">
            <div className="flex gap-2 min-w-max px-0.5">
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#002546] shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#533200]">
                  military_tech
                </span>
                <span className="font-label-md text-xs font-bold">₹15 Lakh+ Prize Pool</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#002546] shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                  groups
                </span>
                <span className="font-label-md text-xs font-bold">12,000+ Footfall</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#002546] shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                  domain
                </span>
                <span className="font-label-md text-xs font-bold">50+ Colleges</span>
              </div>
              <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#e5eeff] text-[#002546] shadow-xs">
                <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                  local_fire_department
                </span>
                <span className="font-label-md text-xs font-bold">4 Days of Thrill</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Interactive Category Filter Chips */}
      <section className="px-gutter mb-6">
        <div className="flex items-center justify-between mb-2.5">
          <h2 className="font-headline-sm text-base text-[#002546] font-bold">Discover Events</h2>
          <button
            onClick={() => onNavigate('schedule')}
            className="font-label-sm text-xs text-[#0051d5] font-bold flex items-center hover:underline cursor-pointer"
          >
            View Schedule <span className="material-symbols-outlined text-[14px] ml-0.5">chevron_right</span>
          </button>
        </div>

        {/* Scrolling Filter Pills */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-1">
          {[
            { id: 'all', label: 'All (45+)', icon: 'apps' },
            { id: 'technical', label: 'Technical (18)', icon: 'terminal' },
            { id: 'cultural', label: 'Cultural (14)', icon: 'theater_comedy' },
            { id: 'sports', label: 'Esports (6)', icon: 'sports_esports' },
            { id: 'workshops', label: 'Workshops (8)', icon: 'school' }
          ].map((cat) => {
            const isSelected = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => {
                  setActiveCategory(cat.id);
                  if (cat.id !== 'all') {
                    onShowToast(`Filtered by ${cat.label}`, 'filter_list');
                  }
                }}
                className={`flex items-center gap-1.5 px-4 py-2 rounded-full font-label-md text-xs font-semibold whitespace-nowrap transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#002546] text-white shadow-sm'
                    : 'bg-[#dce9ff] text-[#42474f] hover:bg-[#cbdbf5]'
                }`}
              >
                <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                <span>{cat.label}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* Flagship Mega Highlights */}
      <section className="px-gutter mb-6">
        <div className="flex items-center justify-between mb-3">
          <div>
            <h2 className="font-headline-sm text-base text-[#002546] font-extrabold flex items-center gap-1.5">
              <span
                className="material-symbols-outlined text-[#ffb95f] text-[20px]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                stars
              </span>
              Flagship Mega Arenas
            </h2>
            <p className="font-body-sm text-xs text-[#42474f]">
              The biggest crowd-pullers of Technozion &amp; Renaissance
            </p>
          </div>
          <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-[11px] font-extrabold">
            4 Major
          </span>
        </div>

        {/* Cards Grid */}
        <div className="flex flex-col gap-3.5">
          {/* Card 1: Hack-a-Renaissance */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-[#e5eeff]">
            <div className="relative h-44 w-full">
              <img
                className="w-full h-full object-cover"
                alt="Hackathon arena"
                src={ASSETS.hackathonCrowd}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002546]/85 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#002546] text-white font-label-sm text-[10px] font-bold shadow-sm">
                  Technical • Hackathon
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-[10px] font-extrabold flex items-center gap-1">
                  <span className="material-symbols-outlined text-[12px]">timer</span> 36 Hours
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="text-white">
                  <span className="font-label-sm text-[10px] text-[#a4c9fc] block uppercase font-bold">
                    Prizepool
                  </span>
                  <span className="font-headline-sm text-lg font-extrabold text-[#ffddb8]">
                    ₹2,50,000 INR
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#002546] font-label-sm text-[10px] font-bold shadow-sm">
                  AI &amp; Web3
                </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col">
              <h3 className="font-headline-sm text-base text-[#002546] font-bold mb-1">
                Hack-a-Renaissance 2026
              </h3>
              <p className="font-body-sm text-xs text-[#42474f] line-clamp-2 mb-3">
                Build disruptive decentralized protocols and autonomous AI agents in North India's benchmark 36-hour sprint. Mentorship by industry veterans.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff]">
                <button
                  onClick={() => onOpenVenueModal('Innovation Lab & Audi')}
                  className="flex items-center gap-1 text-[#42474f] font-body-sm text-xs hover:text-[#0051d5] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                    location_on
                  </span>
                  <span className="truncate max-w-[150px] font-medium">Central Auditorium</span>
                </button>
                <button
                  onClick={() => onSelectEventForCheckout(hackathonEvent)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#0051d5] hover:bg-[#316bf3] text-white font-label-sm text-xs font-bold active:scale-95 transition-transform cursor-pointer"
                >
                  Register Team
                </button>
              </div>
            </div>
          </article>

          {/* Card 2: Celebrity Star Night */}
          <article className="bg-white rounded-xl shadow-md overflow-hidden flex flex-col border border-[#e5eeff]">
            <div className="relative h-44 w-full">
              <img
                className="w-full h-full object-cover"
                alt="Celebrity star night"
                src={ASSETS.celebrityConcert}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#002546]/85 via-transparent to-transparent" />
              <div className="absolute top-3 left-3 flex gap-1.5">
                <span className="px-2.5 py-1 rounded-full bg-[#533200] text-white font-label-sm text-[10px] font-bold shadow-sm">
                  Cultural Mega Showcase
                </span>
                <span className="px-2.5 py-1 rounded-full bg-[#dbe1ff] text-[#00174b] font-label-sm text-[10px] font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-ping" /> Live Concert
                </span>
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex justify-between items-end">
                <div className="text-white">
                  <span className="font-label-sm text-[10px] text-[#a4c9fc] block uppercase font-bold">
                    Day 4 Grand Finale
                  </span>
                  <span className="font-headline-sm text-base font-extrabold text-white">
                    Celebrity Star Night
                  </span>
                </div>
                <span className="px-2.5 py-1 rounded-full bg-white text-[#533200] font-label-sm text-[10px] font-bold shadow-sm">
                  Pass Required
                </span>
              </div>
            </div>
            <div className="p-3.5 flex flex-col">
              <h3 className="font-headline-sm text-base text-[#002546] font-bold mb-1">
                Star Pro-Nite &amp; EDM Symphony
              </h3>
              <p className="font-body-sm text-xs text-[#42474f] line-clamp-2 mb-3">
                An electrifying night featuring top chart-topping Bollywood playback icon and international DJ lineup under the Jaipur starlight.
              </p>
              <div className="flex items-center justify-between pt-2 border-t border-[#e5eeff]">
                <button
                  onClick={() => onOpenVenueModal('Main Stage Ground')}
                  className="flex items-center gap-1 text-[#42474f] font-body-sm text-xs hover:text-[#0051d5] cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                    stadium
                  </span>
                  <span className="font-medium">University Football Ground</span>
                </button>
                <button
                  onClick={() => onSelectEventForCheckout(starNightEvent)}
                  className="px-3.5 py-1.5 rounded-lg bg-[#533200] hover:bg-[#361f00] text-white font-label-sm text-xs font-bold active:scale-95 transition-transform cursor-pointer"
                >
                  Book Pass
                </button>
              </div>
            </div>
          </article>

          {/* Card 3 & 4 in Bento Row */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* RoboWars */}
            <article className="bg-white rounded-xl shadow-md p-3.5 flex flex-col justify-between border border-[#e5eeff]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#0051d5] font-label-sm text-[10px] font-bold">
                    Combat Tech
                  </span>
                  <span className="font-label-sm text-[11px] font-bold text-[#533200]">
                    ₹1.8L Pool
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm text-[#002546] font-bold mb-1">
                  RoboWars &amp; Drone Prix
                </h4>
                <p className="font-body-sm text-xs text-[#42474f] mb-3">
                  Heavyweight metal clash in the high-tensile steel arena &amp; night FPV obstacle drone race.
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onOpenVenueModal('Workshop Quad')}
                  className="flex items-center gap-1 text-[#42474f] font-label-sm text-[11px] truncate cursor-pointer hover:text-[#0051d5]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                    pin_drop
                  </span>
                  <span>Audi-1 Quad</span>
                </button>
                <button
                  onClick={() => onSelectEventForCheckout(roboWarsEvent)}
                  className="px-2.5 py-1 rounded bg-[#dbe1ff] text-[#00174b] font-label-sm text-xs font-bold cursor-pointer hover:bg-[#b4c5ff]"
                >
                  View Rules
                </button>
              </div>
            </article>

            {/* Panache Fashion */}
            <article className="bg-white rounded-xl shadow-md p-3.5 flex flex-col justify-between border border-[#e5eeff]">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#002546] font-label-sm text-[10px] font-bold">
                    Runway Glory
                  </span>
                  <span className="font-label-sm text-[11px] font-bold text-[#533200]">
                    ₹1.2L Pool
                  </span>
                </div>
                <h4 className="font-headline-sm text-sm text-[#002546] font-bold mb-1">
                  Panache - Fashion Spectacle
                </h4>
                <p className="font-body-sm text-xs text-[#42474f] mb-3">
                  The premier inter-collegiate fashion runway contest showcasing avant-garde cultural fusion couture.
                </p>
              </div>
              <div className="flex items-center justify-between pt-1">
                <button
                  onClick={() => onOpenVenueModal('Open Air Amphitheatre')}
                  className="flex items-center gap-1 text-[#42474f] font-label-sm text-[11px] truncate cursor-pointer hover:text-[#0051d5]"
                >
                  <span className="material-symbols-outlined text-[16px] text-[#0051d5]">
                    theater_comedy
                  </span>
                  <span>Open Amphitheatre</span>
                </button>
                <button
                  onClick={() => onSelectEventForCheckout(panacheEvent)}
                  className="px-2.5 py-1 rounded bg-[#dbe1ff] text-[#00174b] font-label-sm text-xs font-bold cursor-pointer hover:bg-[#b4c5ff]"
                >
                  Register Crew
                </button>
              </div>
            </article>
          </div>
        </div>
      </section>

      {/* Live Campus Guide & Quick Info Module */}
      <section className="px-gutter mb-6">
        <div className="bg-[#dce9ff] rounded-xl p-4 shadow-sm flex flex-col gap-3 border border-[#b4c5ff]">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-[#002546] flex items-center justify-center text-white flex-shrink-0 shadow-sm">
              <span className="material-symbols-outlined text-[20px]">pin_drop</span>
            </div>
            <div className="flex flex-col min-w-0">
              <h3 className="font-headline-sm text-sm font-bold text-[#002546] leading-tight">
                JECRC University Campus
              </h3>
              <p className="font-body-sm text-xs text-[#42474f] mt-0.5 leading-relaxed">
                Plot No. IS-2036 to 2039, Ramchandrapura Industrial Area, Sitapura Extension, Jaipur, Rajasthan 303905
              </p>
            </div>
          </div>
          <div className="flex flex-col sm:flex-row gap-2 pt-1">
            <button
              onClick={() => onOpenVenueModal('Central Lawn')}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-white text-[#002546] font-label-sm text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                navigation
              </span>
              <span>Get Directions &amp; Transit</span>
            </button>
            <button
              onClick={handleWhatsAppDesk}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-lg bg-[#ffddb8] text-[#2a1700] font-label-sm text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">support_agent</span>
              <span>Student WhatsApp Desk</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
