import React, { useState } from 'react';
import { FEST_EVENTS } from '../data/festData';
import { FestEvent, TabType } from '../types';

interface EventsDirectoryProps {
  onNavigate: (tab: TabType) => void;
  onSelectEventForCheckout: (event: FestEvent) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const EventsDirectory: React.FC<EventsDirectoryProps> = ({
  onNavigate: _onNavigate,
  onSelectEventForCheckout,
  onShowToast
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'technical' | 'cultural' | 'sports' | 'workshops'>('all');
  const [isFilterDrawerOpen, setIsFilterDrawerOpen] = useState(false);
  const [selectedDays, setSelectedDays] = useState<number[]>([]);
  const [selectedVenues, setSelectedVenues] = useState<string[]>([]);
  const [selectedFeeType, setSelectedFeeType] = useState<'all' | 'free' | 'paid'>('all');
  const [isCustomFilterActive, setIsCustomFilterActive] = useState(false);
  const [bookmarkedIds, setBookmarkedIds] = useState<Record<string, boolean>>({});

  const toggleBookmark = (eventId: string, title: string) => {
    setBookmarkedIds((prev) => {
      const isMarked = !prev[eventId];
      onShowToast(
        isMarked ? `Saved "${title}" to your schedule!` : `Removed "${title}" from saved list`,
        isMarked ? 'bookmark_added' : 'bookmark_remove'
      );
      return { ...prev, [eventId]: isMarked };
    });
  };

  const handleApplyFilters = () => {
    setIsFilterDrawerOpen(false);
    const hasFilter = selectedDays.length > 0 || selectedVenues.length > 0 || selectedFeeType !== 'all';
    setIsCustomFilterActive(hasFilter);
    if (hasFilter) {
      onShowToast('Custom filters applied', 'tune');
    }
  };

  const handleResetFilters = () => {
    setSelectedDays([]);
    setSelectedVenues([]);
    setSelectedFeeType('all');
    setIsCustomFilterActive(false);
    setSelectedCategory('all');
    setSearchQuery('');
    onShowToast('All filters cleared', 'refresh');
  };

  const filteredEvents = FEST_EVENTS.filter((event) => {
    // Category filter
    if (selectedCategory !== 'all' && event.category !== selectedCategory) {
      return false;
    }
    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const match =
        event.title.toLowerCase().includes(q) ||
        event.description.toLowerCase().includes(q) ||
        event.venue.toLowerCase().includes(q) ||
        event.tags.some((t) => t.toLowerCase().includes(q));
      if (!match) return false;
    }
    // Day filter
    if (selectedDays.length > 0 && !selectedDays.includes(event.day)) {
      return false;
    }
    // Venue filter
    if (selectedVenues.length > 0 && !selectedVenues.includes(event.venueCode)) {
      return false;
    }
    // Fee filter
    if (selectedFeeType === 'free' && !event.isFreeForJECRC) {
      return false;
    }
    if (selectedFeeType === 'paid' && event.isFreeForJECRC) {
      return false;
    }
    return true;
  });

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24">
      {/* Search & Sticky Filter Header */}
      <div className="sticky top-16 z-30 bg-[#f8f9ff]/95 backdrop-blur-md px-gutter pt-space-xs pb-space-sm shadow-xs flex flex-col gap-space-sm border-b border-[#e5eeff]">
        {/* Search Bar & Drawer Trigger */}
        <div className="flex items-center gap-space-xs w-full">
          <div className="relative flex-1 flex items-center bg-white rounded-xl shadow-xs px-space-sm py-2 border border-[#c3c6d0]">
            <span className="material-symbols-outlined text-[#737780] text-[20px] mr-2">
              search
            </span>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search events (e.g., Hackathon, Cricket, Dance)..."
              className="w-full bg-transparent text-[#0b1c30] font-body-md text-sm placeholder:text-[#737780] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="text-[#737780] hover:text-[#0b1c30] p-1"
              >
                <span className="material-symbols-outlined text-[18px]">close</span>
              </button>
            )}
          </div>

          <button
            onClick={() => setIsFilterDrawerOpen(true)}
            aria-label="Open advanced filters"
            className="flex items-center justify-center h-10 w-10 rounded-xl bg-[#dce9ff] text-[#002546] hover:bg-[#b4c5ff] active:scale-95 transition-all flex-shrink-0 relative shadow-xs cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">tune</span>
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#316bf3]" />
          </button>
        </div>

        {/* Horizontal Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 -mx-gutter px-gutter">
          {[
            { id: 'all', label: 'All Events', count: '46', icon: '' },
            { id: 'technical', label: 'Technical', icon: 'terminal' },
            { id: 'cultural', label: 'Cultural', icon: 'theater_comedy' },
            { id: 'sports', label: 'Sports & Esports', icon: 'sports_esports' },
            { id: 'workshops', label: 'Workshops & Talks', icon: 'lightbulb' }
          ].map((cat) => {
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-3.5 py-1.5 rounded-full font-label-md text-xs whitespace-nowrap flex-shrink-0 flex items-center gap-1 transition-all cursor-pointer font-bold ${
                  isSelected
                    ? 'bg-[#002546] text-white shadow-sm'
                    : 'bg-[#eff4ff] text-[#42474f] hover:bg-[#dce9ff]'
                }`}
              >
                {cat.icon && (
                  <span className="material-symbols-outlined text-[16px]">{cat.icon}</span>
                )}
                <span>{cat.label}</span>
                {cat.count && (
                  <span className="px-1.5 py-0.2 rounded-full bg-white/20 text-[10px]">
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>

      {/* Live Pulse & Metrics Summary Banner */}
      <div className="px-gutter pt-space-xs pb-space-2xs">
        <div className="flex items-center justify-between bg-[#dce9ff] rounded-xl px-space-md py-2.5 border border-[#b4c5ff]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-2.5 w-2.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#0051d5] opacity-75" />
              <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-[#316bf3]" />
            </span>
            <span className="font-label-sm text-[11px] text-[#002546] uppercase tracking-wide font-extrabold">
              Live Registrations Open
            </span>
          </div>
          <div className="flex items-center gap-1 font-label-sm text-xs text-[#42474f]">
            <span className="material-symbols-outlined text-[16px] text-[#533200]">
              emoji_events
            </span>
            <span className="font-bold text-[#0b1c30]">₹7.5L+</span> in Total Prizes
          </div>
        </div>
      </div>

      {/* Filter Active Status Bar */}
      {isCustomFilterActive && (
        <div className="px-gutter pt-space-2xs">
          <div className="flex items-center justify-between bg-[#d3e4ff] text-[#001c38] px-space-sm py-1.5 rounded-lg text-xs font-bold">
            <div className="flex items-center gap-1.5">
              <span className="material-symbols-outlined text-[16px]">filter_alt</span>
              <span>Custom Filters Active ({filteredEvents.length} events)</span>
            </div>
            <button
              onClick={handleResetFilters}
              className="text-[#204874] hover:text-[#001c38] flex items-center cursor-pointer"
            >
              <span className="material-symbols-outlined text-[14px]">close</span>
            </button>
          </div>
        </div>
      )}

      {/* Events List Stream */}
      <div className="flex flex-col gap-space-md px-gutter py-space-sm">
        {filteredEvents.map((item) => {
          const isBookmarked = !!bookmarkedIds[item.id];
          return (
            <article
              key={item.id}
              className="group bg-white rounded-2xl shadow-md overflow-hidden flex flex-col transition-all hover:shadow-lg border border-[#e5eeff]"
            >
              {/* Media Header & Badges */}
              <div className="relative w-full h-44 bg-[#eff4ff] overflow-hidden">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#002546]/90 via-[#002546]/30 to-transparent" />

                {/* Category & Flagship Chips */}
                <div className="absolute top-3 left-3 flex items-center gap-1.5 flex-wrap">
                  <span className="px-2.5 py-1 rounded-full bg-[#316bf3] text-white font-label-sm text-[10px] uppercase tracking-wider shadow-xs flex items-center gap-1 font-bold">
                    <span className="material-symbols-outlined text-[13px]">
                      {item.category === 'technical'
                        ? 'code'
                        : item.category === 'cultural'
                        ? 'mic_external_on'
                        : item.category === 'sports'
                        ? 'sports_esports'
                        : 'psychology'}
                    </span>
                    {item.subCategory || item.category}
                  </span>
                  {item.isFlagship && (
                    <span className="px-2.5 py-1 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-[10px] uppercase tracking-wider font-extrabold shadow-xs">
                      ★ Flagship
                    </span>
                  )}
                </div>

                {/* Bookmark Button */}
                <button
                  onClick={() => toggleBookmark(item.id, item.title)}
                  aria-label={`Bookmark ${item.title}`}
                  className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/80 backdrop-blur-md text-[#002546] flex items-center justify-center hover:bg-white active:scale-90 transition-all shadow-xs cursor-pointer"
                >
                  <span
                    className="material-symbols-outlined text-[19px]"
                    style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                  >
                    {isBookmarked ? 'bookmark' : 'bookmark_border'}
                  </span>
                </button>

                {/* Prize Pool Overlay on Image Bottom */}
                <div className="absolute bottom-2.5 left-3 right-3 flex items-center justify-between text-white">
                  <div className="flex items-center gap-1 bg-[#002546]/80 backdrop-blur-md px-2.5 py-1 rounded-lg">
                    <span className="material-symbols-outlined text-[16px] text-[#ffb95f]">
                      workspace_premium
                    </span>
                    <span className="font-headline-sm text-sm font-bold text-[#ffddb8]">
                      {item.prizePool}
                    </span>
                    <span className="font-label-sm text-[10px] opacity-80">Pool</span>
                  </div>
                  <span className="font-label-sm text-[10px] bg-white/20 backdrop-blur-md px-2 py-0.5 rounded text-white font-bold">
                    Day {item.day}
                  </span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-space-md flex flex-col gap-space-xs">
                <h2 className="font-headline-sm text-base text-[#002546] font-bold tracking-tight">
                  {item.title}
                </h2>

                {/* Metadata Details */}
                <div className="flex flex-col gap-1.5 py-1">
                  <div className="flex items-center gap-2 text-[#42474f] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                      calendar_clock
                    </span>
                    <span className="font-semibold text-[#0b1c30]">{item.dateStr}</span>
                    <span className="text-[#c3c6d0]">•</span>
                    <span>{item.duration}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#42474f] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                      location_on
                    </span>
                    <span className="truncate">{item.venue}</span>
                  </div>
                  <div className="flex items-center gap-2 text-[#42474f] font-body-sm text-xs">
                    <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                      groups
                    </span>
                    <span>{item.teamSize}</span>
                  </div>
                </div>

                {/* Registration CTA & Fee */}
                <div className="pt-space-xs flex items-center justify-between gap-space-sm border-t border-[#e5eeff]">
                  <div className="flex flex-col">
                    <span className="font-label-sm text-[11px] text-[#42474f]">Registration</span>
                    <span className="font-label-md text-xs font-bold text-[#0051d5]">
                      {item.isFreeForJECRC ? 'Free Entry (JECRC)' : item.entryFee}
                    </span>
                  </div>
                  <button
                    onClick={() => onSelectEventForCheckout(item)}
                    className="flex items-center gap-1.5 px-space-md py-2.5 rounded-lg bg-[#002546] hover:bg-[#0d3b66] text-white font-label-lg text-xs font-bold transition-transform active:scale-95 shadow-xs cursor-pointer"
                  >
                    <span>Register Now</span>
                    <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                  </button>
                </div>
              </div>
            </article>
          );
        })}

        {/* Empty State */}
        {filteredEvents.length === 0 && (
          <div className="flex flex-col items-center justify-center text-center px-gutter py-space-xl">
            <div className="w-16 h-16 rounded-full bg-[#eff4ff] flex items-center justify-center text-[#737780] mb-space-sm">
              <span className="material-symbols-outlined text-4xl">search_off</span>
            </div>
            <h3 className="font-headline-sm text-base text-[#002546] font-bold mb-1">
              No matching events found
            </h3>
            <p className="font-body-md text-xs text-[#42474f] max-w-xs mb-space-md">
              Try searching for other keywords like "Hackathon", "Dance", or reset active filters.
            </p>
            <button
              onClick={handleResetFilters}
              className="px-space-md py-2.5 rounded-lg bg-[#0051d5] text-white font-label-md text-xs font-bold cursor-pointer"
            >
              Reset All Filters
            </button>
          </div>
        )}
      </div>

      {/* Advanced Filters Drawer / Bottom Sheet Modal */}
      {isFilterDrawerOpen && (
        <div className="fixed inset-0 z-50 bg-[#002546]/60 backdrop-blur-sm flex flex-col justify-end">
          <div className="bg-white rounded-t-3xl p-gutter flex flex-col max-h-[80vh] overflow-y-auto shadow-2xl max-w-lg mx-auto w-full">
            <div className="w-12 h-1.5 bg-[#c3c6d0]/60 rounded-full mx-auto mb-space-sm flex-shrink-0" />
            <div className="flex items-center justify-between pb-space-sm border-b border-[#e5eeff]">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-[#002546] text-[22px]">tune</span>
                <h3 className="font-headline-sm text-base text-[#002546] font-bold">
                  Filter Fest Events
                </h3>
              </div>
              <button
                onClick={() => setIsFilterDrawerOpen(false)}
                className="w-9 h-9 flex items-center justify-center rounded-full text-[#42474f] hover:bg-[#e5eeff] transition-colors"
              >
                <span className="material-symbols-outlined text-[20px]">close</span>
              </button>
            </div>

            <div className="flex flex-col gap-space-md py-space-md">
              {/* Fest Day Filter */}
              <div className="flex flex-col gap-2">
                <span className="font-label-lg text-xs font-bold text-[#002546]">Fest Day</span>
                <div className="grid grid-cols-4 gap-2">
                  {[1, 2, 3, 4].map((d) => {
                    const isSelected = selectedDays.includes(d);
                    return (
                      <button
                        key={d}
                        onClick={() => {
                          setSelectedDays((prev) =>
                            isSelected ? prev.filter((x) => x !== d) : [...prev, d]
                          );
                        }}
                        className={`py-2 px-1 text-center rounded-xl font-label-md text-xs font-bold transition-colors cursor-pointer ${
                          isSelected
                            ? 'bg-[#002546] text-white'
                            : 'bg-[#eff4ff] text-[#0b1c30] hover:bg-[#dce9ff]'
                        }`}
                      >
                        Day {d} (Apr {15 + d})
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Venue Selection */}
              <div className="flex flex-col gap-2">
                <span className="font-label-lg text-xs font-bold text-[#002546]">Campus Venues</span>
                <div className="flex flex-wrap gap-2">
                  {[
                    { code: 'audi', label: 'Main Auditorium' },
                    { code: 'oat', label: 'Open Air Amphitheatre' },
                    { code: 'labs', label: 'Central Block Labs' },
                    { code: 'sports', label: 'Block B Esports Hub' },
                    { code: 'mech', label: 'Robotics Mech Arena' }
                  ].map((v) => {
                    const isSelected = selectedVenues.includes(v.code);
                    return (
                      <button
                        key={v.code}
                        onClick={() => {
                          setSelectedVenues((prev) =>
                            isSelected ? prev.filter((x) => x !== v.code) : [...prev, v.code]
                          );
                        }}
                        className={`px-3 py-1.5 rounded-full font-label-sm text-xs font-bold cursor-pointer transition-colors ${
                          isSelected
                            ? 'bg-[#002546] text-white'
                            : 'bg-[#eff4ff] text-[#42474f] hover:bg-[#dce9ff]'
                        }`}
                      >
                        {v.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Fee / Registration Type */}
              <div className="flex flex-col gap-2">
                <span className="font-label-lg text-xs font-bold text-[#002546]">
                  Registration Type
                </span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setSelectedFeeType(selectedFeeType === 'free' ? 'all' : 'free')}
                    className={`py-2.5 px-3 rounded-xl font-label-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      selectedFeeType === 'free'
                        ? 'bg-[#002546] text-white'
                        : 'bg-[#eff4ff] text-[#0b1c30]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#0051d5]">
                      check_circle
                    </span>
                    <span>Free to Enter</span>
                  </button>
                  <button
                    onClick={() => setSelectedFeeType(selectedFeeType === 'paid' ? 'all' : 'paid')}
                    className={`py-2.5 px-3 rounded-xl font-label-md text-xs font-bold flex items-center justify-center gap-1.5 transition-colors cursor-pointer ${
                      selectedFeeType === 'paid'
                        ? 'bg-[#002546] text-white'
                        : 'bg-[#eff4ff] text-[#0b1c30]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px] text-[#533200]">
                      payments
                    </span>
                    <span>Paid Flagship</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-space-sm pt-space-sm border-t border-[#e5eeff]">
              <button
                onClick={handleResetFilters}
                className="flex-1 py-3 rounded-xl bg-[#eff4ff] text-[#0b1c30] font-label-lg text-xs font-bold hover:bg-[#dce9ff] transition-colors cursor-pointer"
              >
                Reset All
              </button>
              <button
                onClick={handleApplyFilters}
                className="flex-1 py-3 rounded-xl bg-[#002546] hover:bg-[#0d3b66] text-white font-label-lg text-xs font-bold transition-colors shadow-md cursor-pointer"
              >
                Show Results
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
