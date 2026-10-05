import React from 'react';
import { VENUE_DETAILS, ASSETS } from '../data/festData';

interface VenueModalProps {
  venueName: string | null;
  onClose: () => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const VenueModal: React.FC<VenueModalProps> = ({ venueName, onClose, onShowToast }) => {
  if (!venueName) return null;

  const detail = VENUE_DETAILS[venueName] || {
    name: venueName,
    code: 'campus',
    gate: 'Gate 2 (Academic Arena)',
    landmark: 'JECRC Main Campus, Sitapura, Jaipur',
    image: ASSETS.campusAerial,
    description: 'Active festival zone equipped with technical staging, student desks, and volunteer marshals.',
    coords: '26.7822° N, 75.8752° E'
  };

  const handleNavigate = () => {
    onShowToast(`GPS route to ${detail.name} locked! Follow Campus Gate signs`, 'directions_walk');
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-[#213145]/50 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-x-0 bottom-0 z-50 max-w-lg mx-auto bg-[#ffffff] rounded-t-2xl shadow-2xl p-gutter pb-8 flex flex-col gap-3 animate-in slide-in-from-bottom duration-300">
        <div className="w-10 h-1 bg-[#c3c6d0] rounded-full mx-auto" />
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-full bg-[#dce9ff] flex items-center justify-center text-[#0051d5] flex-shrink-0">
              <span className="material-symbols-outlined text-[24px]">location_on</span>
            </div>
            <div>
              <h4 className="font-headline-sm text-base text-[#002546] font-bold leading-tight">
                {detail.name}
              </h4>
              <span className="font-body-sm text-xs text-[#42474f]">{detail.landmark}</span>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-[#42474f] hover:bg-[#e5eeff] transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">close</span>
          </button>
        </div>

        <div
          className="w-full h-44 bg-cover bg-center rounded-xl overflow-hidden shadow-inner relative"
          style={{ backgroundImage: `url('${detail.image}')` }}
        >
          <div className="absolute inset-0 bg-gradient-to-t from-[#002546]/70 via-transparent to-transparent flex items-end p-3">
            <span className="text-white text-xs font-semibold flex items-center gap-1">
              <span className="material-symbols-outlined text-sm">my_location</span>
              {detail.coords}
            </span>
          </div>
        </div>

        <p className="font-body-sm text-xs text-[#42474f] leading-relaxed">
          {detail.description}
        </p>

        <div className="flex items-center justify-between gap-2 pt-1 border-t border-[#e5eeff]">
          <div className="flex flex-col">
            <span className="font-label-sm text-[11px] text-[#42474f]">Recommended Gate</span>
            <span className="font-label-md text-sm text-[#002546] font-bold">{detail.gate}</span>
          </div>
          <button
            onClick={handleNavigate}
            className="px-4 py-2.5 rounded-lg bg-[#002546] text-white font-label-md text-xs font-bold shadow-sm active:scale-95 transition-transform flex items-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-[16px]">directions_walk</span>
            <span>Navigate</span>
          </button>
        </div>
      </div>
    </>
  );
};
