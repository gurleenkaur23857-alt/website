import React from 'react';
import { TabType } from '../types';

interface BottomNavProps {
  currentTab: TabType;
  onTabChange: (tab: TabType) => void;
  passCount: number;
}

export const BottomNav: React.FC<BottomNavProps> = ({ currentTab, onTabChange, passCount }) => {
  const navItems: { id: TabType; label: string; icon: string; badge?: number }[] = [
    { id: 'home', label: 'Home', icon: 'celebration' },
    { id: 'events', label: 'Events', icon: 'explore' },
    { id: 'schedule', label: 'Schedule', icon: 'calendar_today' },
    { id: 'passes', label: 'Passes', icon: 'qr_code_2', badge: passCount },
    { id: 'portal', label: 'Portal', icon: 'account_circle' }
  ];

  return (
    <nav className="fixed bottom-0 w-full z-50 pb-safe bg-[#f8f9ff]/95 backdrop-blur-xl border-t border-[#e5eeff] shadow-[0_-4px_16px_rgba(13,59,102,0.06)]">
      <div className="flex justify-around items-center h-16 px-space-2xs max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = currentTab === item.id;
          return (
            <button
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`flex flex-col items-center justify-center min-w-[56px] min-h-[44px] py-1 transition-all relative cursor-pointer active:scale-95 ${
                isActive
                  ? 'text-[#316bf3] font-bold'
                  : 'text-[#42474f] hover:text-[#0b1c30] font-medium'
              }`}
            >
              <div className="relative flex items-center justify-center">
                <span
                  className="material-symbols-outlined text-[22px] transition-transform duration-150"
                  style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                >
                  {item.icon}
                </span>
                {item.badge && item.badge > 0 ? (
                  <span className="absolute -top-1 -right-2 w-4 h-4 rounded-full bg-[#316bf3] text-white text-[9px] font-bold flex items-center justify-center">
                    {item.badge}
                  </span>
                ) : null}
              </div>
              <span className="font-label-sm text-[11px] mt-0.5 tracking-tight">
                {item.label}
              </span>
              {isActive && (
                <span className="w-1 h-1 rounded-full bg-[#316bf3] mt-0.5 absolute -bottom-0.5"></span>
              )}
            </button>
          );
        })}
      </div>
    </nav>
  );
};
