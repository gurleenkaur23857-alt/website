import React, { useState } from 'react';
import { UserPass } from '../types';
import { ASSETS } from '../data/festData';

interface QRScannerModalProps {
  onClose: () => void;
  onVerifyPass: (pass: UserPass) => void;
  userPasses: UserPass[];
  onShowToast: (msg: string, icon?: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  onClose,
  onVerifyPass,
  userPasses,
  onShowToast
}) => {
  const [scanResult, setScanResult] = useState<UserPass | null>(null);
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = (pass: UserPass) => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setScanResult(pass);
      onVerifyPass(pass);
      onShowToast(`Gate Clearance Approved: ${pass.studentName}`, 'verified');
    }, 900);
  };

  const handleTestPass = () => {
    if (userPasses.length > 0) {
      simulateScan(userPasses[0]);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#002546]/85 backdrop-blur-md flex flex-col justify-between p-4 max-w-lg mx-auto">
      {/* Top Header */}
      <div className="flex items-center justify-between text-white pt-safe">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-[#ffb95f] text-2xl">
            qr_code_scanner
          </span>
          <div>
            <h3 className="font-headline-sm text-lg font-bold">Express Gate Scanner</h3>
            <p className="font-body-sm text-xs text-[#a4c9fc]">Gate 1 &amp; Gate 2 Marshal Station</p>
          </div>
        </div>
        <button
          onClick={onClose}
          className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer"
        >
          <span className="material-symbols-outlined text-2xl">close</span>
        </button>
      </div>

      {/* Camera Viewfinder */}
      <div className="flex-1 flex flex-col items-center justify-center my-4 relative">
        <div className="relative w-64 h-64 rounded-2xl border-2 border-dashed border-[#316bf3] p-4 flex items-center justify-center bg-black/40 shadow-2xl overflow-hidden">
          {/* Laser beam */}
          <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[#0051d5] to-transparent animate-[bounce_2s_infinite] shadow-[0_0_12px_#316bf3]" />

          {/* Corner target reticles */}
          <div className="absolute top-2 left-2 w-5 h-5 border-t-2 border-l-2 border-[#ffddb8]" />
          <div className="absolute top-2 right-2 w-5 h-5 border-t-2 border-r-2 border-[#ffddb8]" />
          <div className="absolute bottom-2 left-2 w-5 h-5 border-b-2 border-l-2 border-[#ffddb8]" />
          <div className="absolute bottom-2 right-2 w-5 h-5 border-b-2 border-r-2 border-[#ffddb8]" />

          {isScanning ? (
            <div className="flex flex-col items-center text-white">
              <span className="material-symbols-outlined text-4xl text-[#ffddb8] animate-spin">
                sync
              </span>
              <span className="text-xs font-bold mt-2">Decoding Badge QR...</span>
            </div>
          ) : (
            <div className="flex flex-col items-center text-center text-white/80 p-2">
              <span className="material-symbols-outlined text-4xl text-[#316bf3] mb-1">
                qr_code_2
              </span>
              <span className="text-xs font-semibold">Align Delegate QR inside viewfinder</span>
            </div>
          )}
        </div>

        {/* Scan Result Overlay Card */}
        {scanResult && (
          <div className="mt-4 w-full bg-white text-[#0b1c30] p-4 rounded-xl shadow-2xl animate-in fade-in slide-in-from-bottom duration-200">
            <div className="flex items-center gap-3">
              <img
                src={ASSETS.aryanPortrait}
                alt={scanResult.studentName}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-500 shadow-sm"
              />
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-headline-sm text-base font-bold text-[#002546] truncate">
                    {scanResult.studentName}
                  </h4>
                  <span className="px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 text-[10px] font-extrabold uppercase">
                    Access Granted
                  </span>
                </div>
                <p className="font-body-sm text-xs text-[#42474f]">
                  {scanResult.rollNumber} • {scanResult.department}
                </p>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs font-bold text-[#0051d5] bg-[#dce9ff] px-2 py-0.5 rounded">
                    {scanResult.trackLabel}
                  </span>
                  <span className="text-[11px] text-[#737780]">{scanResult.venue}</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Simulator Bottom Triggers */}
      <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 flex flex-col gap-2">
        <span className="text-xs font-semibold text-[#a4c9fc] uppercase tracking-wider text-center">
          Marshal Controls / Test Simulator
        </span>
        <div className="grid grid-cols-2 gap-2">
          <button
            onClick={handleTestPass}
            disabled={isScanning}
            className="py-3 px-2 bg-[#0051d5] hover:bg-[#316bf3] text-white rounded-xl text-xs font-bold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">verified</span>
            Scan Aryan's Pass
          </button>
          <button
            onClick={() => {
              const mockPass: UserPass = {
                id: `mock-${Date.now()}`,
                passId: '#JECRC-EXT-55219',
                eventName: 'All-Access Fest Pass',
                studentName: 'Rohan Meena',
                rollNumber: 'MNIT-23EC104',
                affiliation: 'external',
                collegeName: 'MNIT Jaipur',
                department: 'Electronics',
                academicYear: '2nd Year',
                email: 'rohan.m@mnit.ac.in',
                phone: '+91 97845 22100',
                teamType: 'solo',
                hostelNeeded: true,
                qrData: 'JECRC-EXT-55219-ROHAN',
                verified: true,
                purchaseDate: '2026-04-16',
                trackLabel: 'External Delegate',
                venue: 'Academic Block A & Arena'
              };
              simulateScan(mockPass);
            }}
            disabled={isScanning}
            className="py-3 px-2 bg-[#ffddb8] hover:bg-[#ffb95f] text-[#2a1700] rounded-xl text-xs font-extrabold shadow-md active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <span className="material-symbols-outlined text-base">school</span>
            Scan External Delegate
          </button>
        </div>
      </div>
    </div>
  );
};
