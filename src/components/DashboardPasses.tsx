import React, { useState } from 'react';
import { ASSETS } from '../data/festData';
import { UserPass, TabType } from '../types';

interface DashboardPassesProps {
  userPasses: UserPass[];
  onOpenScanner: () => void;
  onNavigate: (tab: TabType) => void;
  checkedInCount: number;
  onShowToast: (msg: string, icon?: string) => void;
}

export const DashboardPasses: React.FC<DashboardPassesProps> = ({
  userPasses,
  onOpenScanner,
  onNavigate: _onNavigate,
  checkedInCount,
  onShowToast
}) => {
  const [roleMode, setRoleMode] = useState<'student' | 'admin'>('student');
  const [selectedPassIndex, setSelectedPassIndex] = useState<number>(0);

  const activePass = userPasses[selectedPassIndex] || userPasses[0];

  const handleAddToWallet = () => {
    onShowToast('Pass added to Google Wallet successfully!', 'wallet');
  };

  const handleDownloadPDF = () => {
    onShowToast(`Downloading Pass ${activePass?.passId || '#JECRC'} as PDF...`, 'picture_as_pdf');
  };

  return (
    <div className="flex flex-col w-full max-w-lg mx-auto pb-24 px-gutter py-space-sm space-y-space-md">
      {/* Student Hero Mini-Banner & Identity */}
      <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-[#002546] to-[#0d3b66] p-space-md shadow-md text-white">
        <div className="absolute -right-6 -bottom-6 w-32 h-32 rounded-full bg-[#0051d5]/20 blur-2xl pointer-events-none" />
        <div className="flex items-center gap-space-sm relative z-10">
          <div className="relative flex-shrink-0">
            <img
              className="w-14 h-14 rounded-full object-cover ring-2 ring-[#ffddb8] shadow-sm"
              alt="Aryan Sharma"
              src={ASSETS.aryanPortrait}
            />
            <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-emerald-500 rounded-full border-2 border-[#002546]" />
          </div>
          <div className="flex flex-col min-w-0 flex-1">
            <div className="flex items-center justify-between gap-1">
              <h2 className="font-headline-sm text-base truncate text-white font-bold">
                Aryan Sharma
              </h2>
              <span className="px-2 py-0.5 rounded-full bg-[#ffddb8] text-[#2a1700] font-label-sm text-[10px] font-extrabold uppercase tracking-wider flex-shrink-0">
                Verified
              </span>
            </div>
            <p className="font-body-sm text-xs text-[#a4c9fc] truncate">
              B.Tech CSE (3rd Year) • 22BCON349
            </p>
            <div className="flex items-center gap-1.5 mt-0.5 text-[#d3e4ff] font-label-sm text-[11px]">
              <span className="material-symbols-outlined text-[14px]">school</span>
              <span className="truncate">JECRC University • Jaipur</span>
            </div>
          </div>
        </div>
      </div>

      {/* Role View Segmented Switcher */}
      <div className="w-full bg-[#dce9ff] p-1 rounded-xl flex items-center justify-between shadow-inner">
        <button
          onClick={() => setRoleMode('student')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs text-center transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
            roleMode === 'student'
              ? 'bg-white text-[#002546] shadow-xs'
              : 'text-[#42474f] hover:text-[#002546]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">confirmation_number</span>
          <span>My Passes ({userPasses.length})</span>
        </button>
        <button
          onClick={() => setRoleMode('admin')}
          className={`flex-1 py-2 px-3 rounded-lg font-label-md text-xs text-center transition-all duration-200 flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
            roleMode === 'admin'
              ? 'bg-white text-[#002546] shadow-xs'
              : 'text-[#42474f] hover:text-[#002546]'
          }`}
        >
          <span className="material-symbols-outlined text-[16px]">monitoring</span>
          <span>Admin View</span>
        </button>
      </div>

      {/* STUDENT VIEW CONTENT */}
      {roleMode === 'student' && (
        <div className="flex flex-col space-y-space-md animate-in fade-in duration-200">
          {/* Multi-pass selector if user has more than 1 pass */}
          {userPasses.length > 1 && (
            <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
              {userPasses.map((p, idx) => (
                <button
                  key={p.id}
                  onClick={() => setSelectedPassIndex(idx)}
                  className={`px-3 py-1.5 rounded-full text-xs font-bold whitespace-nowrap cursor-pointer transition-all ${
                    selectedPassIndex === idx
                      ? 'bg-[#002546] text-white shadow-xs'
                      : 'bg-[#eff4ff] text-[#42474f] hover:bg-[#dce9ff]'
                  }`}
                >
                  {p.eventName.slice(0, 20)}...
                </button>
              ))}
            </div>
          )}

          {/* Holographic Digital Ticket Card */}
          <div className="relative rounded-xl p-[2px] bg-gradient-to-br from-[#0051d5] via-[#ffb95f] to-[#316bf3] shadow-xl">
            <div className="rounded-[10px] bg-white p-space-md flex flex-col space-y-space-sm relative overflow-hidden">
              <div className="absolute -right-8 -top-8 w-40 h-40 rounded-full bg-[#dbe1ff]/30 blur-3xl pointer-events-none" />

              {/* Ticket Header Zone */}
              <div className="flex items-start justify-between gap-space-xs relative z-10">
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[11px] text-[#0051d5] uppercase tracking-widest font-extrabold flex items-center gap-1">
                    <span className="material-symbols-outlined text-[14px]">stars</span>
                    {activePass?.trackLabel || 'Official University Delegate'}
                  </span>
                  <h3 className="font-headline-md text-xl text-[#002546] font-extrabold leading-tight mt-0.5">
                    {activePass?.eventName || 'All-Access Fest Pass'}
                  </h3>
                  <span className="font-label-md text-xs text-[#42474f] font-semibold mt-0.5">
                    Pass ID: {activePass?.passId || '#JECRC-2026-94812'}
                  </span>
                </div>
                <div className="flex items-center gap-1 bg-emerald-50 text-emerald-800 px-2.5 py-1 rounded-full text-xs font-extrabold flex-shrink-0 shadow-xs border border-emerald-200">
                  <span className="w-2 h-2 rounded-full bg-emerald-600 animate-pulse" />
                  <span>VERIFIED</span>
                </div>
              </div>

              {/* Holographic QR Scanner Box */}
              <div className="flex flex-col items-center justify-center bg-[#eff4ff] rounded-xl p-space-md relative overflow-hidden my-space-xs border border-[#dce9ff]">
                <div className="absolute inset-x-4 top-0 h-0.5 bg-gradient-to-r from-transparent via-[#0051d5] to-transparent animate-[bounce_2.5s_infinite]" />
                <div className="p-3 bg-white rounded-xl shadow-md border-0 relative">
                  {/* Clean SVG Vector QR Code */}
                  <svg className="w-36 h-36" fill="none" viewBox="0 0 140 140" xmlns="http://www.w3.org/2000/svg">
                    <rect fill="#FFFFFF" height="140" rx="6" width="140" />
                    <rect fill="#0D3B66" height="36" rx="4" width="36" x="10" y="10" />
                    <rect fill="#FFFFFF" height="24" rx="2" width="24" x="16" y="16" />
                    <rect fill="#0D3B66" height="12" rx="1" width="12" x="22" y="22" />
                    <rect fill="#0D3B66" height="36" rx="4" width="36" x="94" y="10" />
                    <rect fill="#FFFFFF" height="24" rx="2" width="24" x="100" y="16" />
                    <rect fill="#0D3B66" height="12" rx="1" width="12" x="106" y="22" />
                    <rect fill="#0D3B66" height="36" rx="4" width="36" x="10" y="94" />
                    <rect fill="#FFFFFF" height="24" rx="2" width="24" x="16" y="100" />
                    <rect fill="#0D3B66" height="12" rx="1" width="12" x="22" y="106" />
                    <rect fill="#0D3B66" height="6" width="6" x="52" y="14" />
                    <rect fill="#0D3B66" height="6" width="6" x="64" y="14" />
                    <rect fill="#F59E0B" height="6" width="10" x="76" y="14" />
                    <rect fill="#0D3B66" height="6" width="14" x="52" y="26" />
                    <rect fill="#0D3B66" height="10" width="6" x="72" y="26" />
                    <rect fill="#0D3B66" height="10" width="6" x="14" y="52" />
                    <rect fill="#0D3B66" height="6" width="8" x="26" y="52" />
                    <rect fill="#0D3B66" height="14" width="14" x="38" y="52" />
                    <rect fill="#0D3B66" height="24" rx="4" width="24" x="58" y="44" />
                    <circle cx="70" cy="56" fill="#FFDDB8" r="6" />
                    <rect fill="#0D3B66" height="6" width="14" x="90" y="52" />
                    <rect fill="#F59E0B" height="6" width="16" x="110" y="52" />
                    <rect fill="#0D3B66" height="16" width="8" x="90" y="64" />
                    <rect fill="#0D3B66" height="6" width="12" x="104" y="64" />
                    <rect fill="#0D3B66" height="18" width="8" x="122" y="64" />
                    <rect fill="#0D3B66" height="6" width="12" x="52" y="74" />
                    <rect fill="#0D3B66" height="6" width="14" x="70" y="74" />
                    <rect fill="#0D3B66" height="6" width="16" x="14" y="74" />
                    <rect fill="#0D3B66" height="6" width="32" x="52" y="86" />
                    <rect fill="#0D3B66" height="16" width="8" x="52" y="98" />
                    <rect fill="#0D3B66" height="8" width="18" x="66" y="98" />
                    <rect fill="#0D3B66" height="18" width="6" x="90" y="88" />
                    <rect fill="#0D3B66" height="6" width="14" x="102" y="88" />
                    <rect fill="#0D3B66" height="6" width="8" x="122" y="88" />
                    <rect fill="#0D3B66" height="26" width="8" x="102" y="100" />
                    <rect fill="#0D3B66" height="8" width="14" x="116" y="100" />
                    <rect fill="#0D3B66" height="14" width="28" x="66" y="112" />
                    <rect fill="#0D3B66" height="12" width="14" x="116" y="114" />
                  </svg>
                </div>
                <span className="font-label-sm text-xs text-[#42474f] mt-2 flex items-center gap-1 font-semibold text-center">
                  <span className="material-symbols-outlined text-[15px] text-[#0051d5]">
                    crop_free
                  </span>
                  Present at Academic Block A &amp; Main Amphitheatre Gates
                </span>
              </div>

              {/* Delegate Tracks */}
              <div className="space-y-space-xs pt-1">
                <div className="flex items-center justify-between text-xs font-bold text-[#42474f]">
                  <span>DELEGATE TRACKS</span>
                  <span className="text-[#0051d5]">3 Events Granted</span>
                </div>
                <div className="grid grid-cols-1 gap-1.5">
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#0051d5] text-[18px]">
                        terminal
                      </span>
                      <span className="font-label-md text-xs font-bold text-[#002546] truncate">
                        JU Innovate 36h Hackathon
                      </span>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-[#42474f] flex-shrink-0">
                      Lab 402
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#533200] text-[18px]">
                        mic
                      </span>
                      <span className="font-label-md text-xs font-bold text-[#002546] truncate">
                        Celebrity Star Night (VIP Enclosure)
                      </span>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-[#42474f] flex-shrink-0">
                      Stadium
                    </span>
                  </div>
                  <div className="flex items-center justify-between px-3 py-2 rounded-lg bg-[#eff4ff] border border-[#dce9ff]">
                    <div className="flex items-center gap-2 min-w-0">
                      <span className="material-symbols-outlined text-[#316bf3] text-[18px]">
                        sports_esports
                      </span>
                      <span className="font-label-md text-xs font-bold text-[#002546] truncate">
                        Inter-Collegiate Esports Arena
                      </span>
                    </div>
                    <span className="font-label-sm text-xs font-bold text-[#42474f] flex-shrink-0">
                      Auditorium
                    </span>
                  </div>
                </div>
              </div>

              {/* Pass Action CTA Buttons */}
              <div className="pt-space-xs grid grid-cols-2 gap-2">
                <button
                  onClick={handleAddToWallet}
                  className="py-2.5 px-3 rounded-lg bg-[#002546] hover:bg-[#0d3b66] text-white font-label-md text-xs font-bold flex items-center justify-center gap-1.5 shadow-xs active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">wallet</span>
                  <span>Add to Wallet</span>
                </button>
                <button
                  onClick={handleDownloadPDF}
                  className="py-2.5 px-3 rounded-lg bg-[#dce9ff] text-[#002546] font-label-md text-xs font-bold flex items-center justify-center gap-1.5 hover:bg-[#cbdbf5] active:scale-95 transition-transform cursor-pointer"
                >
                  <span className="material-symbols-outlined text-[18px]">download</span>
                  <span>Download PDF</span>
                </button>
              </div>
            </div>
          </div>

          {/* Festive Campus Live Spotlight Card */}
          <div className="relative rounded-xl overflow-hidden shadow-xs border border-[#e5eeff]">
            <div
              className="bg-cover bg-center w-full h-32 relative"
              style={{ backgroundImage: `url('${ASSETS.campusNight}')` }}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-[#002546] via-[#002546]/60 to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                <div className="text-white">
                  <span className="font-label-sm text-[10px] uppercase font-bold text-[#ffddb8] tracking-wider">
                    Campus Live Stage
                  </span>
                  <p className="font-headline-sm text-base font-bold text-white">
                    RoboWars Arena Kickoff
                  </p>
                </div>
                <span className="px-2 py-1 rounded-full bg-[#316bf3] text-white font-label-sm text-xs font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                  Live
                </span>
              </div>
            </div>
          </div>

          {/* Help & Campus Emergency Booth Section */}
          <div className="rounded-xl bg-white p-space-md shadow-xs space-y-space-xs border border-[#e5eeff]">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-[#ffdad6] text-[#ba1a1a] flex items-center justify-center">
                  <span className="material-symbols-outlined text-[16px]">local_hospital</span>
                </div>
                <h4 className="font-headline-sm text-sm font-bold text-[#002546]">
                  Campus Emergency &amp; Help
                </h4>
              </div>
              <span className="font-label-sm text-xs text-[#0051d5] font-bold">24/7 On-Duty</span>
            </div>
            <p className="font-body-sm text-xs text-[#42474f]">
              Quick assistance during symposium hours across all JECRC zones.
            </p>
            <div className="grid grid-cols-2 gap-2 pt-1">
              <a
                href="tel:0141650000"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors border border-[#dce9ff]"
              >
                <span className="material-symbols-outlined text-[#0051d5] text-[20px]">
                  local_police
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[10px] text-[#42474f]">Campus Control</span>
                  <span className="font-label-md text-xs font-bold text-[#002546] truncate">
                    +91 141-650000
                  </span>
                </div>
              </a>
              <a
                href="tel:0141650001"
                className="flex items-center gap-2 p-2.5 rounded-lg bg-[#eff4ff] hover:bg-[#dce9ff] transition-colors border border-[#dce9ff]"
              >
                <span className="material-symbols-outlined text-[#ba1a1a] text-[20px]">
                  medical_services
                </span>
                <div className="flex flex-col min-w-0">
                  <span className="font-label-sm text-[10px] text-[#42474f]">Medical Room</span>
                  <span className="font-label-md text-xs font-bold text-[#002546] truncate">
                    +91 141-650001
                  </span>
                </div>
              </a>
            </div>
          </div>
        </div>
      )}

      {/* ADMIN QUICK ANALYTICS VIEW */}
      {roleMode === 'admin' && (
        <div className="flex flex-col space-y-space-md animate-in fade-in duration-200">
          {/* Quick Gate Scanner Action Card */}
          <div className="rounded-xl p-space-md bg-[#316bf3] text-white shadow-md flex items-center justify-between">
            <div className="flex flex-col min-w-0 pr-2">
              <span className="font-label-sm text-[10px] uppercase tracking-wider text-[#dbe1ff] font-bold">
                Marshal Security Duty
              </span>
              <h3 className="font-headline-sm text-base font-bold text-white leading-tight mt-0.5">
                Express Gate Verifier
              </h3>
              <p className="font-body-sm text-xs text-[#dbe1ff] mt-0.5">
                Scan badges at Entry Gate 1 &amp; 2
              </p>
            </div>
            <button
              onClick={onOpenScanner}
              className="flex-shrink-0 px-3.5 py-2.5 rounded-lg bg-white text-[#0051d5] font-label-md text-xs font-bold shadow-xs flex items-center gap-1.5 active:scale-95 transition-transform cursor-pointer"
            >
              <span className="material-symbols-outlined text-[18px]">qr_code_scanner</span>
              <span>Launch Scanner</span>
            </button>
          </div>

          {/* Live Fest Metrics Bento Grid */}
          <div className="grid grid-cols-2 gap-space-xs">
            {/* Metric 1 */}
            <div className="rounded-xl p-space-md bg-white shadow-xs border border-[#e5eeff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs text-[#42474f] font-semibold">
                  Total Registered
                </span>
                <span className="material-symbols-outlined text-[#0051d5] text-[20px]">groups</span>
              </div>
              <div className="mt-2">
                <span className="font-display-lg-mobile text-2xl font-extrabold text-[#002546] leading-none">
                  4,820
                </span>
                <div className="flex items-center gap-1 text-emerald-700 font-label-sm text-xs mt-1 font-bold">
                  <span className="material-symbols-outlined text-[14px]">trending_up</span>
                  <span>+18% today</span>
                </div>
              </div>
            </div>

            {/* Metric 2 */}
            <div className="rounded-xl p-space-md bg-white shadow-xs border border-[#e5eeff] flex flex-col justify-between">
              <div className="flex items-center justify-between">
                <span className="font-label-sm text-xs text-[#42474f] font-semibold">
                  Gate Checked-In
                </span>
                <span className="material-symbols-outlined text-[#533200] text-[20px]">
                  how_to_reg
                </span>
              </div>
              <div className="mt-2">
                <span className="font-display-lg-mobile text-2xl font-extrabold text-[#002546] leading-none">
                  {1240 + checkedInCount}
                </span>
                <div className="flex items-center gap-1 text-[#42474f] font-label-sm text-[11px] mt-1 truncate">
                  <span>{(((1240 + checkedInCount) / 4820) * 100).toFixed(1)}% of 4,820 passes</span>
                </div>
              </div>
            </div>
          </div>

          {/* Flagship Events Live Breakdown */}
          <div className="rounded-xl bg-white p-space-md shadow-xs space-y-space-sm border border-[#e5eeff]">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-headline-sm text-sm text-[#002546] font-bold">
                  Flagship Track Breakdown
                </h4>
                <p className="font-body-sm text-xs text-[#42474f]">
                  Real-time enrolled attendee capacity
                </p>
              </div>
              <span className="material-symbols-outlined text-[#737780]">donut_large</span>
            </div>

            {/* Progress Track List */}
            <div className="space-y-3 pt-1">
              <div>
                <div className="flex items-center justify-between font-label-md text-xs mb-1">
                  <span className="font-bold text-[#002546] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0051d5]" />
                    Celebrity Star Night
                  </span>
                  <span className="font-bold text-[#0b1c30]">
                    3,200 <span className="font-normal text-[#737780]">/ 3,500</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#0051d5] rounded-full" style={{ width: '91%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-label-md text-xs mb-1">
                  <span className="font-bold text-[#002546] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ffb95f]" />
                    Cultural &amp; Drama Fest
                  </span>
                  <span className="font-bold text-[#0b1c30]">
                    1,150 <span className="font-normal text-[#737780]">/ 1,500</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#ffb95f] rounded-full" style={{ width: '76%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-label-md text-xs mb-1">
                  <span className="font-bold text-[#002546] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#0d3b66]" />
                    JU Innovate Hackathon
                  </span>
                  <span className="font-bold text-[#0b1c30]">
                    640 <span className="font-normal text-[#737780]">/ 700</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#0d3b66] rounded-full" style={{ width: '91%' }} />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between font-label-md text-xs mb-1">
                  <span className="font-bold text-[#002546] flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#316bf3]" />
                    Inter-Collegiate Esports
                  </span>
                  <span className="font-bold text-[#0b1c30]">
                    480 <span className="font-normal text-[#737780]">/ 500</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-[#eff4ff] overflow-hidden">
                  <div className="h-full bg-[#316bf3] rounded-full" style={{ width: '96%' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Active Gate Staff Photo Gallery Widget */}
          <div className="rounded-xl p-space-md bg-[#eff4ff] shadow-xs flex items-center justify-between border border-[#dce9ff]">
            <div className="flex items-center gap-2">
              <div className="flex -space-x-2">
                <img
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  alt="Security Marshal"
                  src={ASSETS.marshal1}
                />
                <img
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  alt="Coordinator"
                  src={ASSETS.marshal2}
                />
                <img
                  className="w-8 h-8 rounded-full object-cover ring-2 ring-white"
                  alt="Volunteer"
                  src={ASSETS.marshal3}
                />
              </div>
              <div className="flex flex-col ml-1">
                <span className="font-label-md text-xs font-bold text-[#002546]">
                  18 Marshals Active
                </span>
                <span className="font-body-sm text-[11px] text-[#42474f]">
                  Gate A, Gate B &amp; VIP Gate
                </span>
              </div>
            </div>
            <span className="px-2 py-1 rounded bg-[#dce9ff] text-[#002546] font-label-sm text-[10px] font-bold">
              Live Sync
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
