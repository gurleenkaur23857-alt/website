import React from 'react';
import { ASSETS } from '../data/festData';
import { TabType } from '../types';

interface HeaderProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  onOpenDrawer: () => void;
  isCheckoutOpen?: boolean;
  onCloseCheckout?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentTab,
  onTabChange,
  onOpenDrawer,
  isCheckoutOpen,
  onCloseCheckout
}) => {
  const getSubTitle = () => {
    if (isCheckoutOpen) return 'Pass Checkout';
    switch (currentTab) {
      case 'home':
        return 'Fest Home';
      case 'schedule':
        return 'Timeline Schedule';
      case 'events':
        return 'Events Directory';
      case 'passes':
      case 'portal':
        return 'Dashboard';
      default:
        return 'Fest Home';
    }
  };

  return (
    <header className="fixed top-0 w-full z-50 pt-safe bg-[#f8f9ff]/85 backdrop-blur-xl border-b border-[#e5eeff] shadow-[0_1px_8px_rgba(0,0,0,0.04)] transition-all">
      <div className="h-16 px-gutter max-w-lg mx-auto flex items-center justify-between gap-space-xs">
        {/* Left branding */}
        <div className="flex items-center gap-2 min-w-0">
          {isCheckoutOpen ? (
            <button
              onClick={onCloseCheckout}
              aria-label="Go back"
              className="w-10 h-10 flex items-center justify-center text-[#002546] rounded-full hover:bg-[#dce9ff] active:scale-95 transition-all -ml-1 cursor-pointer"
            >
              <span className="material-symbols-outlined text-2xl">arrow_back</span>
            </button>
          ) : null}

          <div
            onClick={() => onTabChange('home')}
            className="flex items-center gap-2 cursor-pointer select-none"
          >
            <img
              alt="JECRC University Logo"
              className="h-8 w-auto object-contain flex-shrink-0"
              src={ASSETS.logo}
            />
            <div className="flex flex-col min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="font-headline-sm text-[17px] text-[#002546] font-extrabold tracking-tight truncate leading-tight">
                  JECRC
                </span>
                <span className="px-1.5 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] text-[10px] font-extrabold tracking-wider uppercase">
                  Jaipur Campus
                </span>
              </div>
              <span className="font-label-sm text-[11px] text-[#42474f] font-semibold truncate">
                {getSubTitle()}
              </span>
            </div>
          </div>
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-1 flex-shrink-0">
          <button
            onClick={() => onTabChange('portal')}
            aria-label="User Profile"
            className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-[#dce9ff] active:scale-95 transition-all cursor-pointer"
          >
            <img
              alt="Profile"
              className="w-8 h-8 rounded-full object-cover ring-2 ring-[#ffddb8] shadow-xs"
              src={ASSETS.aryanPortrait}
            />
          </button>
          <button
            onClick={onOpenDrawer}
            aria-label="Open Menu Drawer"
            className="w-10 h-10 flex items-center justify-center text-[#002546] rounded-full hover:bg-[#dce9ff] active:scale-95 transition-all cursor-pointer"
          >
            <span className="material-symbols-outlined text-2xl">menu</span>
          </button>
        </div>
      </div>
    </header>
  );
};
