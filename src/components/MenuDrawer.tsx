import React from 'react';
import { ASSETS } from '../data/festData';
import { TabType } from '../types';

interface MenuDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (tab: TabType) => void;
  onOpenVenueModal: (venue: string) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const MenuDrawer: React.FC<MenuDrawerProps> = ({
  isOpen,
  onClose,
  onNavigate,
  onOpenVenueModal,
  onShowToast
}) => {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-[#002546]/60 backdrop-blur-xs z-50 transition-opacity"
        onClick={onClose}
      />
      <div className="fixed inset-y-0 right-0 z-50 w-full max-w-xs bg-white text-[#0b1c30] shadow-2xl p-5 flex flex-col justify-between animate-in slide-in-from-right duration-200 overflow-y-auto">
        <div>
          {/* Top close & brand */}
          <div className="flex items-center justify-between pb-4 border-b border-[#e5eeff]">
            <div className="flex items-center gap-2">
              <img src={ASSETS.logo} alt="JECRC" className="h-7 w-auto object-contain" />
              <div>
                <h3 className="font-headline-sm text-base font-extrabold text-[#002546] leading-tight">
                  Renaissance '26
                </h3>
                <span className="text-[10px] uppercase font-bold text-[#ffb95f] tracking-wider">
                  Jaipur Campus
                </span>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-9 h-9 rounded-full bg-[#eff4ff] hover:bg-[#dce9ff] flex items-center justify-center text-[#42474f] cursor-pointer"
            >
              <span className="material-symbols-outlined text-xl">close</span>
            </button>
          </div>

          {/* User Quick Info */}
          <div className="my-4 p-3 bg-[#eff4ff] rounded-xl flex items-center gap-3">
            <img
              src={ASSETS.aryanPortrait}
              alt="Aryan Sharma"
              className="w-10 h-10 rounded-full object-cover ring-2 ring-[#ffddb8]"
            />
            <div className="min-w-0 flex-1">
              <h4 className="font-headline-sm text-sm font-bold text-[#002546] truncate">
                Aryan Sharma
              </h4>
              <p className="font-body-sm text-xs text-[#42474f] truncate">
                22BCON349 • 3 Passes
              </p>
            </div>
            <button
              onClick={() => {
                onNavigate('portal');
                onClose();
              }}
              className="text-[#0051d5] text-xs font-bold hover:underline"
            >
              View
            </button>
          </div>

          {/* Navigation Links */}
          <div className="space-y-1">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#737780] px-2 block mb-1">
              Navigation
            </span>
            {[
              { id: 'home', label: 'Fest Home', icon: 'celebration' },
              { id: 'events', label: 'Explore 45+ Events', icon: 'explore' },
              { id: 'schedule', label: 'Timeline & Schedule', icon: 'calendar_today' },
              { id: 'passes', label: 'Digital QR Passes', icon: 'qr_code_2' },
              { id: 'portal', label: 'Student & Admin Portal', icon: 'dashboard' }
            ].map((link) => (
              <button
                key={link.id}
                onClick={() => {
                  onNavigate(link.id as TabType);
                  onClose();
                }}
                className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#002546] hover:bg-[#eff4ff] transition-colors cursor-pointer text-left"
              >
                <span className="material-symbols-outlined text-xl text-[#0051d5]">
                  {link.icon}
                </span>
                <span>{link.label}</span>
              </button>
            ))}
          </div>

          {/* Campus Utilities & Fast Links */}
          <div className="mt-5 space-y-1 pt-4 border-t border-[#e5eeff]">
            <span className="text-[11px] uppercase font-bold tracking-wider text-[#737780] px-2 block mb-1">
              Campus Utilities
            </span>
            <button
              onClick={() => {
                onOpenVenueModal('Central Lawn');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#002546] hover:bg-[#eff4ff] transition-colors cursor-pointer text-left"
            >
              <span className="material-symbols-outlined text-xl text-[#0051d5]">
                map
              </span>
              <span>Interactive Campus Radar</span>
            </button>
            <button
              onClick={() => {
                onShowToast('Connecting to SSID: JECRC_CAMPUS_HIGH_SPEED (Password: technozion2026)', 'wifi');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#002546] hover:bg-[#eff4ff] transition-colors cursor-pointer text-left"
            >
              <span className="material-symbols-outlined text-xl text-[#0051d5]">
                wifi
              </span>
              <span>Fest High-Speed Wi-Fi</span>
            </button>
            <button
              onClick={() => {
                onShowToast('Official Fest Guidebook PDF downloaded', 'download');
                onClose();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-semibold text-[#002546] hover:bg-[#eff4ff] transition-colors cursor-pointer text-left"
            >
              <span className="material-symbols-outlined text-xl text-[#0051d5]">
                picture_as_pdf
              </span>
              <span>Download Rulebook PDF</span>
            </button>
          </div>
        </div>

        {/* Emergency & Support Footer */}
        <div className="pt-4 border-t border-[#e5eeff] space-y-2">
          <div className="p-3 bg-[#ffdad6]/40 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-[#ba1a1a]">local_hospital</span>
              <span className="text-xs font-bold text-[#ba1a1a]">Emergency SOS</span>
            </div>
            <a
              href="tel:0141650001"
              className="text-xs font-extrabold text-[#ba1a1a] bg-white px-2.5 py-1 rounded shadow-xs"
            >
              Call 24/7
            </a>
          </div>
          <p className="text-[10px] text-[#737780] text-center">
            JECRC University • Sitapura Extension, Jaipur 303905
          </p>
        </div>
      </div>
    </>
  );
};
