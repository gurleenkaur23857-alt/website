import React, { useState } from 'react';
import { SCHEDULE_DAYS } from '../data/festData';
import { TabType } from '../types';

interface TimelineScheduleProps {
  onNavigate: (tab: TabType) => void;
  onOpenVenueModal: (venue: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const TimelineSchedule: React.FC<TimelineScheduleProps> = ({
  onNavigate: _onNavigate,
  onOpenVenueModal,
  onShowToast
}) => {
  const [selectedDay, setSelectedDay] = useState<number>(1);
  const [bookmarkedEvents, setBookmarkedEvents] = useState<Record<string, boolean>>({
    'd1-2': true // Hack-a-renaissance bookmarked by default
  });
  const [allSynced, setAllSynced] = useState<boolean>(false);
  const [downloadingGuide, setDownloadingGuide] = useState<boolean>(false);
  const [downloadedGuide, setDownloadedGuide] = useState<boolean>(false);
  const [filterType, setFilterType] = useState<string>('all');
  const [showFilterDialog, setShowFilterDialog] = useState<boolean>(false);

  const currentDayEvents = SCHEDULE_DAYS[selectedDay] || [];

  const filteredEvents = currentDayEvents.filter((ev) => {
    if (filterType === 'all') return true;
    if (filterType === 'flagship') return ev.tag || ev.requiresPass;
    if (filterType === 'upcoming') return ev.status === 'upcoming';
    if (filterType === 'bookmarked') return bookmarkedEvents[ev.id];
    return true;
  });

  const toggleBookmark = (id: string, title: string) => {
    setBookmarkedEvents((prev) => {
      const isMarked = !prev[id];
      onShowToast(
        isMarked ? `Added "${title}" to your Fest itinerary` : `Removed "${title}" from itinerary`,
        isMarked ? 'bookmark_added' : 'bookmark_remove'
      );
      return { ...prev, [id]: isMarked };
    });
  };

  const handleSyncAll = () => {
    const updated: Record<string, boolean> = { ...bookmarkedEvents };
    currentDayEvents.forEach((item) => {
      updated[item.id] = true;
    });
    setBookmarkedEvents(updated);
    setAllSynced(true);
    onShowToast(`All ${currentDayEvents.length} Day ${selectedDay} sessions synced to Calendar!`, 'notifications_active');
  };

  const handleDownloadGuide = () => {
    setDownloadingGuide(true);
    setTimeout(() => {
      setDownloadingGuide(false);
      setDownloadedGuide(true);
      onShowToast('Renaissance 2026 Guide PDF (4.2 MB) saved to device', 'picture_as_pdf');
    }, 900);
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24">
      {/* Title & Filter Header */}
      <div className="px-gutter pt-space-md pb-space-sm bg-[#f8f9ff]">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-space-2xs">
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] font-label-sm text-[11px] font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0051d5] animate-pulse" />
              FEST ARCHIVE 2026
            </span>
            <span className="font-body-sm text-xs text-[#42474f] font-semibold">
              JECRC Renaissance
            </span>
          </div>
          <button
            onClick={() => setShowFilterDialog(true)}
            className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#e5eeff] text-[#002546] font-label-md text-xs font-bold active:scale-95 transition-transform cursor-pointer hover:bg-[#dce9ff]"
          >
            <span className="material-symbols-outlined text-[16px]">filter_list</span>
            <span>Filter</span>
          </button>
        </div>

        <div className="mt-space-sm">
          <h1 className="font-display-lg-mobile text-[28px] leading-[34px] font-extrabold text-[#002546] tracking-tight">
            Timeline &amp; Stages
          </h1>
          <p className="font-body-md text-sm text-[#42474f] mt-0.5">
            Explore 4 days of tech collisions, keynotes &amp; night arenas
          </p>
        </div>
      </div>

      {/* Sticky Day Tabs */}
      <div className="sticky top-16 z-40 bg-[#f8f9ff]/95 backdrop-blur-md px-gutter py-space-xs shadow-xs border-b border-[#e5eeff]">
        <div className="flex gap-2 overflow-x-auto no-scrollbar scroll-smooth py-1">
          {[
            { day: 1, label: 'Day 1 (Apr 16) • Inauguration & Hack' },
            { day: 2, label: 'Day 2 (Apr 17) • Tech & Esports' },
            { day: 3, label: 'Day 3 (Apr 18) • Cultural & Arts' },
            { day: 4, label: 'Day 4 (Apr 19) • Grand Star Night' }
          ].map((tab) => {
            const isSelected = selectedDay === tab.day;
            return (
              <button
                key={tab.day}
                onClick={() => setSelectedDay(tab.day)}
                className={`flex-shrink-0 flex items-center gap-1.5 px-3.5 py-2 rounded-full font-label-md text-xs font-bold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[#0d3b66] text-white shadow-sm'
                    : 'bg-[#e5eeff] text-[#42474f] hover:bg-[#dce9ff]'
                }`}
              >
                {isSelected && <span className="w-2 h-2 rounded-full bg-[#ffb95f]" />}
                <span className="whitespace-nowrap">{tab.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Campus Live Radar Bar */}
      <div className="px-gutter pt-space-xs pb-space-sm">
        <div className="flex items-center justify-between bg-[#eff4ff] border border-[#dce9ff] rounded-xl p-3 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-[#0051d5] text-[20px] animate-pulse">
              my_location
            </span>
            <div className="flex flex-col">
              <span className="font-label-sm text-[10px] text-[#42474f] uppercase tracking-wider font-bold">
                Campus Live Radar
              </span>
              <span className="font-label-md text-xs text-[#0b1c30] font-bold">
                {selectedDay === 1
                  ? 'Innovation Lab • Live Stream On'
                  : selectedDay === 2
                  ? 'Esports Arena • Live Bracket 5v5'
                  : selectedDay === 3
                  ? 'Amphitheatre • Dance Trials Live'
                  : 'Main Ground • Mega Pro-Nite Setup'}
              </span>
            </div>
          </div>
          <button
            onClick={handleSyncAll}
            className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-white text-[#0051d5] font-label-md text-xs font-bold shadow-xs active:scale-95 transition-transform cursor-pointer border border-[#dce9ff]"
          >
            <span className="material-symbols-outlined text-[16px]">
              {allSynced ? 'check_circle' : 'notifications_active'}
            </span>
            <span>{allSynced ? 'Synced!' : 'Sync All'}</span>
          </button>
        </div>
      </div>

      {/* Timeline Rail & Events */}
      <div className="px-gutter py-space-xs flex flex-col relative">
        {/* Continuous vertical timeline track */}
        <div className="absolute left-[31px] top-6 bottom-8 w-[2px] bg-[#dce9ff] rounded-full" />

        <div className="flex flex-col gap-space-md">
          {filteredEvents.map((item) => {
            const isBookmarked = !!bookmarkedEvents[item.id];
            const isHappening = item.status === 'happening';
            const isCompleted = item.status === 'completed';

            return (
              <div key={item.id} className="relative flex items-start gap-3 group">
                {/* Node & Timestamp column */}
                <div className="flex flex-col items-center flex-shrink-0 z-10 w-9">
                  <div
                    className={`w-8 h-8 rounded-full flex items-center justify-center shadow-xs transition-all ${
                      isHappening
                        ? 'bg-[#316bf3] text-white shadow-md animate-bounce ring-4 ring-[#dbe1ff]'
                        : isCompleted
                        ? 'bg-[#dce9ff] text-[#002546]'
                        : 'bg-[#e5eeff] text-[#42474f]'
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">{item.icon}</span>
                  </div>
                  <span
                    className={`font-label-sm text-[11px] mt-1.5 font-bold ${
                      isHappening ? 'text-[#0051d5]' : 'text-[#42474f]'
                    }`}
                  >
                    {item.time}
                  </span>
                  <span
                    className={`font-body-sm text-[10px] font-semibold ${
                      isHappening ? 'text-[#0051d5]' : 'text-[#737780]'
                    }`}
                  >
                    {item.period}
                  </span>
                </div>

                {/* Event Card Content */}
                <div
                  className={`flex-1 rounded-xl p-4 shadow-sm flex flex-col gap-2 relative overflow-hidden border ${
                    isHappening
                      ? 'bg-white border-[#316bf3]/50 shadow-md ring-1 ring-[#316bf3]/20'
                      : 'bg-white border-[#e5eeff]'
                  }`}
                >
                  {isHappening && (
                    <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#ffddb8]/40 to-transparent rounded-bl-full pointer-events-none" />
                  )}

                  {/* Header badges & bookmark icon */}
                  <div className="flex items-center justify-between gap-2">
                    {item.statusLabel ? (
                      <span
                        className={`px-2.5 py-0.5 rounded-full font-label-sm text-[10px] font-bold flex items-center gap-1 ${
                          isHappening
                            ? 'bg-[#ffddb8] text-[#2a1700]'
                            : item.requiresPass
                            ? 'bg-[#ffddb8] text-[#2a1700]'
                            : 'bg-[#dce9ff] text-[#002546]'
                        }`}
                      >
                        {isHappening && (
                          <span className="w-1.5 h-1.5 rounded-full bg-[#361f00] animate-ping" />
                        )}
                        {item.statusLabel}
                      </span>
                    ) : isCompleted ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#e5eeff] text-[#42474f] font-label-sm text-[10px] font-bold">
                        Completed
                      </span>
                    ) : (
                      <span className="px-2 py-0.5 rounded-full bg-[#dbe1ff] text-[#00174b] font-label-sm text-[10px] font-bold">
                        Upcoming
                      </span>
                    )}

                    <button
                      onClick={() => toggleBookmark(item.id, item.title)}
                      aria-label="Bookmark session"
                      className={`p-1 transition-colors cursor-pointer ${
                        isBookmarked ? 'text-[#0051d5]' : 'text-[#737780] hover:text-[#0051d5]'
                      }`}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: isBookmarked ? "'FILL' 1" : "'FILL' 0" }}
                      >
                        {isBookmarked ? 'bookmark' : 'calendar_add_on'}
                      </span>
                    </button>
                  </div>

                  {/* Title and subtitle */}
                  <div>
                    {item.tag && (
                      <span className="font-label-sm text-[10px] text-[#0051d5] font-bold tracking-wider uppercase block">
                        {item.tag}
                      </span>
                    )}
                    <h3 className="font-headline-sm text-base text-[#002546] font-bold leading-tight">
                      {item.title}
                    </h3>
                    <p className="font-body-md text-xs text-[#42474f] mt-0.5 leading-relaxed">
                      {item.subtitle}
                    </p>
                  </div>

                  {/* Banner image if available */}
                  {item.image && (
                    <div
                      className="w-full h-32 rounded-lg bg-cover bg-center relative overflow-hidden shadow-inner my-1"
                      style={{ backgroundImage: `url('${item.image}')` }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-t from-[#002546]/80 via-transparent to-transparent flex items-end p-2.5">
                        {item.countdownRemaining && (
                          <span className="font-label-sm text-xs text-white font-bold flex items-center gap-1">
                            <span className="material-symbols-outlined text-[15px]">timer</span>
                            {item.countdownRemaining}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Venue location pill & audience info */}
                  <div className="flex items-center justify-between gap-2 pt-1 flex-wrap border-t border-[#e5eeff]">
                    <button
                      onClick={() => onOpenVenueModal(item.venue)}
                      className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#e5eeff] text-[#002546] font-label-md text-xs font-bold active:scale-95 transition-transform hover:bg-[#dce9ff] cursor-pointer"
                    >
                      <span className="material-symbols-outlined text-[14px] text-[#0051d5]">
                        pin_drop
                      </span>
                      <span>{item.venue}</span>
                    </button>
                    <span className="font-body-sm text-xs text-[#737780] font-semibold flex items-center gap-1">
                      {item.audience}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Guide PDF Download Card */}
      <div className="px-gutter pt-space-lg pb-space-md flex flex-col gap-3">
        <div className="bg-[#e5eeff] p-4 rounded-xl flex items-center justify-between gap-3 shadow-xs border border-[#dce9ff]">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-[#002546] text-white flex items-center justify-center flex-shrink-0 shadow-xs">
              <span className="material-symbols-outlined text-[22px]">picture_as_pdf</span>
            </div>
            <div className="flex flex-col min-w-0">
              <span className="font-headline-sm text-sm text-[#002546] font-bold truncate">
                Renaissance 2026 Guide
              </span>
              <span className="font-body-sm text-xs text-[#42474f]">
                Full PDF Schedule, Rules &amp; Maps (4.2 MB)
              </span>
            </div>
          </div>
          <button
            onClick={handleDownloadGuide}
            className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#0051d5] hover:bg-[#316bf3] text-white active:scale-95 transition-transform shadow-xs flex-shrink-0 cursor-pointer"
          >
            <span
              className={`material-symbols-outlined text-[20px] ${
                downloadingGuide ? 'animate-spin' : ''
              }`}
            >
              {downloadedGuide ? 'check' : downloadingGuide ? 'sync' : 'download'}
            </span>
          </button>
        </div>

        <div className="text-center py-2">
          <p className="font-label-sm text-[11px] text-[#737780]">
            JECRC University Fest Coordination Committee • All Timelines Subject to Stage Clears
          </p>
        </div>
      </div>

      {/* Filter Mode Dialog */}
      {showFilterDialog && (
        <div className="fixed inset-0 z-50 bg-[#002546]/60 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="bg-white w-full max-w-xs rounded-2xl p-4 shadow-2xl animate-in zoom-in-95 duration-150 border border-[#e5eeff]">
            <div className="flex items-center justify-between mb-3 pb-2 border-b border-[#e5eeff]">
              <h3 className="font-headline-sm text-base font-bold text-[#002546]">
                Filter Timeline
              </h3>
              <button
                onClick={() => setShowFilterDialog(false)}
                className="text-[#737780] hover:text-[#0b1c30]"
              >
                <span className="material-symbols-outlined text-xl">close</span>
              </button>
            </div>
            <div className="space-y-1.5">
              {[
                { id: 'all', label: 'All Sessions' },
                { id: 'flagship', label: 'Flagship & Pass Required' },
                { id: 'upcoming', label: 'Upcoming Only' },
                { id: 'bookmarked', label: 'My Bookmarked Sessions' }
              ].map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => {
                    setFilterType(opt.id);
                    setShowFilterDialog(false);
                    onShowToast(`Showing: ${opt.label}`, 'filter_list');
                  }}
                  className={`w-full text-left px-3 py-2.5 rounded-lg text-xs font-bold flex items-center justify-between cursor-pointer ${
                    filterType === opt.id
                      ? 'bg-[#002546] text-white'
                      : 'bg-[#eff4ff] text-[#42474f] hover:bg-[#dce9ff]'
                  }`}
                >
                  <span>{opt.label}</span>
                  {filterType === opt.id && (
                    <span className="material-symbols-outlined text-sm">check</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
