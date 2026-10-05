import React from 'react';

interface ToastProps {
  message: string | null;
  icon?: string;
}

export const Toast: React.FC<ToastProps> = ({ message, icon = 'check_circle' }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-20 left-1/2 -translate-x-1/2 z-50 bg-[#213145] text-[#eaf1ff] px-4 py-2.5 rounded-full shadow-2xl flex items-center gap-2 transition-all transform animate-in fade-in slide-in-from-bottom-2 duration-200 pointer-events-none max-w-[90vw]">
      <span
        className="material-symbols-outlined text-[19px] text-[#81a6d7]"
        style={{ fontVariationSettings: "'FILL' 1" }}
      >
        {icon}
      </span>
      <span className="font-label-md text-sm font-semibold truncate">{message}</span>
    </div>
  );
};
