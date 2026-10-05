import React, { useState } from 'react';
import { FestEvent, UserPass } from '../types';

interface PassCheckoutModalProps {
  event: FestEvent | null;
  onClose: () => void;
  onPassGenerated: (newPass: UserPass) => void;
  onShowToast: (msg: string, icon?: string) => void;
}

export const PassCheckoutModal: React.FC<PassCheckoutModalProps> = ({
  event,
  onClose,
  onPassGenerated,
  onShowToast
}) => {
  const currentEventTitle = event ? event.title : 'Hack-a-Renaissance 2026';
  const currentEventCategory = event ? event.category : 'technical';

  const [affiliation, setAffiliation] = useState<'jecrc' | 'external'>('jecrc');
  const [studentName, setStudentName] = useState('Aryan Sharma');
  const [rollNumber, setRollNumber] = useState('22BCON349');
  const [externalCollege, setExternalCollege] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');
  const [academicYear, setAcademicYear] = useState('3rd Year');
  const [email, setEmail] = useState('aryan.sharma22@jecrcu.edu.in');
  const [phone, setPhone] = useState('+91 98290 12345');
  const [teamType, setTeamType] = useState<'solo' | 'team'>('team');
  const [member2, setMember2] = useState('');
  const [member3, setMember3] = useState('');
  const [hostelNeeded, setHostelNeeded] = useState(false);
  const [conductAccepted, setConductAccepted] = useState(true);

  // Success dialog state
  const [generatedPass, setGeneratedPass] = useState<UserPass | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!conductAccepted) {
      onShowToast('Please accept the Festival Code of Conduct', 'warning');
      return;
    }

    const randomSuffix = Math.floor(10000 + Math.random() * 90000);
    const passCode = `#JECRC-2026-${randomSuffix}`;

    const newPass: UserPass = {
      id: `pass-${Date.now()}`,
      passId: passCode,
      eventName: currentEventTitle,
      studentName,
      rollNumber,
      affiliation,
      collegeName: affiliation === 'jecrc' ? 'JECRC University, Jaipur' : externalCollege || 'External University',
      department,
      academicYear,
      email,
      phone,
      teamType,
      teamMembers: teamType === 'team' ? [member2 || 'Member 2', member3 || 'Member 3'].filter(Boolean) : [],
      hostelNeeded,
      qrData: `${passCode}-${studentName.toUpperCase().replace(/\s+/g, '_')}-${currentEventCategory.toUpperCase()}`,
      verified: true,
      purchaseDate: new Date().toISOString().split('T')[0],
      trackLabel: teamType === 'team' ? 'Squad Lead' : 'Official Delegate',
      venue: event?.venue || 'Central Block & Auditorium'
    };

    setGeneratedPass(newPass);
    onPassGenerated(newPass);
    onShowToast(`Pass #${passCode} issued for ${studentName}!`, 'verified');
  };

  const handleDownloadPDF = () => {
    onShowToast('Digital Pass PDF downloaded to device storage', 'file_download');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col pb-24">
      <div className="px-gutter pt-space-xs pb-space-2xl space-y-space-md max-w-lg mx-auto w-full">
        {/* Stepper indicator & Event Header Banner */}
        <div className="bg-[#002546] text-white rounded-xl p-space-md shadow-md relative overflow-hidden">
          <div className="absolute -top-12 -right-12 w-44 h-44 bg-[#316bf3]/20 rounded-full blur-2xl pointer-events-none" />
          <div className="relative z-10 flex flex-col space-y-space-xs">
            <div className="flex items-center justify-between">
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#316bf3]/30 text-[#dbe1ff] text-label-sm font-label-sm backdrop-blur-md">
                <span className="w-1.5 h-1.5 rounded-full bg-[#ffddb8] animate-ping" />
                FEST 2026 LIVE REGISTRATION
              </span>
              <span className="text-label-md font-label-md text-[#a4c9fc] bg-[#0d3b66] px-2 py-0.5 rounded-lg font-bold">
                Step 1 of 2
              </span>
            </div>
            <div className="pt-1">
              <h2 className="text-headline-lg-mobile font-headline-lg-mobile text-white tracking-tight">
                {currentEventTitle}
              </h2>
              <p className="text-body-sm font-body-sm text-[#d3e4ff] flex items-center gap-1 mt-0.5">
                <span className="material-symbols-outlined text-sm">schedule</span>
                {event?.duration || '36-Hour National Flagship Hackathon'}
              </p>
            </div>
            {/* Pricing & Validity Pill Bento */}
            <div className="pt-2 grid grid-cols-2 gap-space-xs">
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg flex flex-col">
                <span className="text-label-sm font-label-sm text-[#a4c9fc]">JECRCians Pass</span>
                <span className="text-headline-sm font-headline-sm text-[#ffddb8] font-extrabold">
                  FREE
                </span>
              </div>
              <div className="bg-white/10 backdrop-blur-md p-2.5 rounded-lg flex flex-col">
                <span className="text-label-sm font-label-sm text-[#a4c9fc]">External Delegates</span>
                <span className="text-headline-sm font-headline-sm text-white font-extrabold">
                  ₹199
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Student Type Segmented Control */}
        <div className="bg-white p-space-xs rounded-xl shadow-xs space-y-space-xs border border-[#e5eeff]">
          <label className="text-label-sm font-label-sm text-[#42474f] uppercase tracking-wider px-1 font-bold">
            Institutional Status
          </label>
          <div className="grid grid-cols-2 p-1 bg-[#e5eeff] rounded-lg gap-1">
            <button
              type="button"
              onClick={() => {
                setAffiliation('jecrc');
                setRollNumber('22BCON349');
                setEmail('aryan.sharma22@jecrcu.edu.in');
              }}
              className={`w-full py-2.5 px-2 rounded-md font-label-md text-label-md transition-all shadow-xs flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
                affiliation === 'jecrc'
                  ? 'bg-[#002546] text-white shadow-sm'
                  : 'text-[#42474f] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-base">verified</span>
              JECRC Student
            </button>
            <button
              type="button"
              onClick={() => {
                setAffiliation('external');
                if (rollNumber === '22BCON349') setRollNumber('EXT-2026-');
              }}
              className={`w-full py-2.5 px-2 rounded-md font-label-md text-label-md transition-all flex items-center justify-center gap-1.5 cursor-pointer font-bold ${
                affiliation === 'external'
                  ? 'bg-[#002546] text-white shadow-sm'
                  : 'text-[#42474f] hover:text-[#0b1c30]'
              }`}
            >
              <span className="material-symbols-outlined text-base">school</span>
              External Delegate
            </button>
          </div>
        </div>

        {/* Main Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-space-md">
          {/* Section: Personal & Academic Credentials */}
          <div className="bg-white p-space-md rounded-xl shadow-xs space-y-space-md border border-[#e5eeff]">
            <div className="flex items-center gap-2 pb-1 border-b border-[#e5eeff]">
              <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#002546]">
                <span className="material-symbols-outlined text-xl">badge</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-[#002546] font-bold">
                  Participant Dossier
                </h3>
                <p className="text-body-sm font-body-sm text-[#42474f]">
                  Verify academic and contact records
                </p>
              </div>
            </div>

            {/* Student Name */}
            <div>
              <label className="text-label-sm font-label-sm text-[#42474f] mb-1 block font-semibold">
                Full Student Name
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                  person
                </span>
                <input
                  type="text"
                  required
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-xs"
                  placeholder="e.g. Aryan Sharma"
                />
              </div>
            </div>

            {/* Roll Number */}
            <div>
              <label className="text-label-sm font-label-sm text-[#42474f] mb-1 block font-semibold">
                {affiliation === 'jecrc'
                  ? 'University Roll / Registration Number'
                  : 'College Identity / Enrollment No.'}
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                  pin
                </span>
                <input
                  type="text"
                  required
                  value={rollNumber}
                  onChange={(e) => setRollNumber(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-xs uppercase tracking-wider"
                  placeholder="e.g. 22BCON349"
                />
              </div>
            </div>

            {/* External College Field */}
            {affiliation === 'external' && (
              <div>
                <label className="text-label-sm font-label-sm text-[#42474f] mb-1 block font-semibold">
                  College / University Name
                </label>
                <div className="relative flex items-center">
                  <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                    apartment
                  </span>
                  <input
                    type="text"
                    required
                    value={externalCollege}
                    onChange={(e) => setExternalCollege(e.target.value)}
                    className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-xs"
                    placeholder="e.g. MNIT Jaipur, IIT Delhi, BITS Pilani"
                  />
                </div>
              </div>
            )}

            {/* Department */}
            <div>
              <label className="text-label-sm font-label-sm text-[#42474f] mb-1 block font-semibold">
                Department / Branch
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                  account_tree
                </span>
                <select
                  value={department}
                  onChange={(e) => setDepartment(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-8 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] appearance-none shadow-xs cursor-pointer font-medium"
                >
                  <option value="Computer Science & Engineering">Computer Science &amp; Engineering</option>
                  <option value="AI & Data Science">AI &amp; Data Science</option>
                  <option value="Electronics & Communication">Electronics &amp; Communication</option>
                  <option value="Mechanical Engineering">Mechanical Engineering</option>
                  <option value="Management Studies">Management Studies (BBA/MBA)</option>
                  <option value="School of Design">School of Design</option>
                </select>
                <span className="material-symbols-outlined absolute right-3 text-[#737780] text-xl pointer-events-none">
                  expand_more
                </span>
              </div>
            </div>

            {/* Academic Year Radio Pills */}
            <div className="space-y-1.5">
              <label className="text-label-sm font-label-sm text-[#42474f] block font-semibold">
                Academic Year
              </label>
              <div className="grid grid-cols-2 gap-2">
                {['1st Year', '2nd Year', '3rd Year', '4th / Postgrad'].map((yr) => {
                  const isSelected = academicYear === yr;
                  return (
                    <button
                      key={yr}
                      type="button"
                      onClick={() => setAcademicYear(yr)}
                      className={`py-2 px-3 text-label-md font-label-md rounded-lg text-center transition-all cursor-pointer font-bold ${
                        isSelected
                          ? 'bg-[#0051d5] text-white shadow-sm'
                          : 'bg-[#e5eeff] text-[#42474f] hover:bg-[#dce9ff]'
                      }`}
                    >
                      {yr}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Official Email */}
            <div>
              <label className="text-label-sm font-label-sm text-[#42474f] mb-1 block font-semibold">
                Official Email Address
              </label>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                  mail
                </span>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-3 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-xs"
                  placeholder="name@jecrcu.edu.in"
                />
              </div>
            </div>

            {/* Phone Number */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="text-label-sm font-label-sm text-[#42474f] font-semibold">
                  Phone Number
                </label>
                <span className="inline-flex items-center gap-1 text-label-sm font-label-sm text-[#0051d5] bg-[#dce9ff] px-2 py-0.5 rounded-full font-bold">
                  <span
                    className="material-symbols-outlined text-xs text-[#0051d5]"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    check_circle
                  </span>
                  OTP Verified
                </span>
              </div>
              <div className="relative flex items-center">
                <span className="material-symbols-outlined absolute left-3 text-[#737780] text-xl pointer-events-none">
                  phone
                </span>
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#eff4ff] text-[#0b1c30] font-body-md text-body-md pl-10 pr-10 py-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0051d5] shadow-xs font-medium"
                />
                <span className="material-symbols-outlined absolute right-3 text-[#0051d5] text-xl">
                  verified_user
                </span>
              </div>
            </div>
          </div>

          {/* Section: Formation & Logistics */}
          <div className="bg-white p-space-md rounded-xl shadow-xs space-y-space-md border border-[#e5eeff]">
            <div className="flex items-center gap-2 pb-1 border-b border-[#e5eeff]">
              <div className="w-8 h-8 rounded-lg bg-[#dce9ff] flex items-center justify-center text-[#002546]">
                <span className="material-symbols-outlined text-xl">diversity_3</span>
              </div>
              <div>
                <h3 className="text-headline-sm font-headline-sm text-[#002546] font-bold">
                  Formation &amp; Logistics
                </h3>
                <p className="text-body-sm font-body-sm text-[#42474f]">
                  Team composition and campus amenities
                </p>
              </div>
            </div>

            {/* Solo vs Team */}
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setTeamType('solo')}
                className={`py-2.5 px-3 rounded-lg text-label-md font-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                  teamType === 'solo'
                    ? 'bg-[#002546] text-white shadow-sm'
                    : 'bg-[#e5eeff] text-[#42474f]'
                }`}
              >
                <span className="material-symbols-outlined text-base">person</span>
                Solo Hack
              </button>
              <button
                type="button"
                onClick={() => setTeamType('team')}
                className={`py-2.5 px-3 rounded-lg text-label-md font-label-md flex items-center justify-center gap-1.5 transition-all cursor-pointer font-bold ${
                  teamType === 'team'
                    ? 'bg-[#002546] text-white shadow-sm'
                    : 'bg-[#e5eeff] text-[#42474f]'
                }`}
              >
                <span className="material-symbols-outlined text-base">groups</span>
                Team Squad
              </button>
            </div>

            {/* Team details */}
            {teamType === 'team' && (
              <div className="space-y-space-xs p-3 bg-[#eff4ff] rounded-lg border border-[#dce9ff]">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-label-md font-label-md text-[#0b1c30] font-bold">
                    Squad Member Roll Numbers
                  </span>
                  <span className="text-label-sm font-label-sm text-[#737780]">Max 3 peers</span>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={member2}
                      onChange={(e) => setMember2(e.target.value)}
                      placeholder="Member 2 Roll No. (e.g. 22BCON411)"
                      className="w-full bg-white text-[#0b1c30] text-body-sm font-body-sm px-3 py-2 rounded-md focus:outline-none uppercase border border-[#c3c6d0]"
                    />
                    <span className="text-label-sm font-label-sm px-2 py-1 rounded bg-[#e5eeff] text-[#42474f] font-bold">
                      P2
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="text"
                      value={member3}
                      onChange={(e) => setMember3(e.target.value)}
                      placeholder="Member 3 Roll No. (Optional)"
                      className="w-full bg-white text-[#0b1c30] text-body-sm font-body-sm px-3 py-2 rounded-md focus:outline-none uppercase border border-[#c3c6d0]"
                    />
                    <span className="text-label-sm font-label-sm px-2 py-1 rounded bg-[#e5eeff] text-[#42474f] font-bold">
                      P3
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Hostel Accommodation */}
            <div
              onClick={() => setHostelNeeded(!hostelNeeded)}
              className="bg-[#eff4ff] p-3 rounded-lg flex items-start gap-3 cursor-pointer border border-[#dce9ff] hover:bg-[#e5eeff] transition-colors"
            >
              <input
                type="checkbox"
                checked={hostelNeeded}
                onChange={() => {}}
                className="mt-1 w-4 h-4 rounded text-[#0051d5] focus:ring-0 cursor-pointer"
              />
              <div className="flex flex-col">
                <label className="text-label-md font-label-md text-[#0b1c30] font-bold cursor-pointer select-none">
                  Hostel Accommodation Required
                </label>
                <span className="text-body-sm font-body-sm text-[#42474f]">
                  Includes bed, linen &amp; breakfast at JECRC Boys/Girls Hostel for non-Jaipur residents.
                </span>
              </div>
            </div>
          </div>

          {/* Section: Governance & Code of Conduct */}
          <div className="bg-white p-space-md rounded-xl shadow-xs space-y-space-xs border border-[#e5eeff]">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                required
                checked={conductAccepted}
                onChange={(e) => setConductAccepted(e.target.checked)}
                className="mt-1 w-4 h-4 rounded text-[#0051d5] focus:ring-0 cursor-pointer"
              />
              <span className="text-body-sm font-body-sm text-[#42474f] leading-snug">
                I agree to the <span className="text-[#0051d5] font-bold">JECRC Festival Code of Conduct</span>, anti-ragging mandates, and hackathon project integrity standards.
              </span>
            </label>
          </div>

          {/* Checkout & Registration CTA Section */}
          <div className="space-y-space-xs pt-1">
            <button
              type="submit"
              className="w-full py-4 px-space-md rounded-xl bg-[#002546] hover:bg-[#0d3b66] text-white font-headline-sm text-headline-sm flex items-center justify-center gap-2 shadow-lg active:scale-[0.98] transition-all cursor-pointer font-bold"
            >
              <span className="material-symbols-outlined text-2xl">confirmation_number</span>
              <span>
                {affiliation === 'jecrc'
                  ? 'Confirm Registration (Free JECRC Pass)'
                  : 'Proceed to Pay ₹199 & Register'}
              </span>
            </button>
            <div className="flex items-center justify-center gap-2 text-[#42474f] text-body-sm font-body-sm pt-1 text-center">
              <span
                className="material-symbols-outlined text-base text-[#0051d5]"
                style={{ fontVariationSettings: "'FILL' 1" }}
              >
                security
              </span>
              <span>Instant E-Pass with QR Code will be delivered to your registered email.</span>
            </div>
          </div>
        </form>
      </div>

      {/* Interactive Digital Pass Modal (Simulated Delight Experience) */}
      {generatedPass && (
        <div className="fixed inset-0 z-50 bg-[#213145]/70 backdrop-blur-sm flex items-end sm:items-center justify-center p-4">
          <div className="bg-white w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl animate-in fade-in slide-in-from-bottom duration-300">
            {/* Top festive ticket banner */}
            <div className="bg-[#002546] text-white p-space-md relative overflow-hidden text-center">
              <div className="absolute -top-10 -left-10 w-28 h-28 bg-[#ffb95f]/20 rounded-full blur-xl pointer-events-none" />
              <div className="w-12 h-12 rounded-full bg-white/20 mx-auto flex items-center justify-center mb-2">
                <span
                  className="material-symbols-outlined text-2xl text-[#ffddb8]"
                  style={{ fontVariationSettings: "'FILL' 1" }}
                >
                  celebration
                </span>
              </div>
              <span className="text-label-sm font-label-sm uppercase tracking-wider text-[#dbe1ff] font-bold">
                Entry Validated
              </span>
              <h4 className="text-headline-md font-headline-md text-white font-extrabold">
                Pass Confirmed!
              </h4>
              <p className="text-body-sm font-body-sm text-[#a4c9fc]">
                {generatedPass.eventName}
              </p>
            </div>

            {/* Ticket Body with Cutouts */}
            <div className="p-space-md space-y-space-md relative bg-white">
              {/* Ticket Punches */}
              <div className="absolute -left-3 top-[-12px] w-6 h-6 rounded-full bg-[#213145]/70" />
              <div className="absolute -right-3 top-[-12px] w-6 h-6 rounded-full bg-[#213145]/70" />

              {/* QR Code Display */}
              <div className="flex flex-col items-center justify-center p-4 bg-[#eff4ff] rounded-xl border border-[#dce9ff]">
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
                <span className="text-label-sm font-label-sm text-[#737780] mt-2 tracking-widest uppercase font-bold">
                  ID: {generatedPass.passId}
                </span>
              </div>

              {/* Delegate Summary */}
              <div className="space-y-1 bg-[#eff4ff] p-3 rounded-lg text-body-sm font-body-sm border border-[#dce9ff]">
                <div className="flex justify-between">
                  <span className="text-[#42474f]">Delegate:</span>
                  <span className="font-bold text-[#0b1c30]">{generatedPass.studentName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#42474f]">Affiliation:</span>
                  <span className="font-semibold text-[#0b1c30]">
                    {generatedPass.affiliation === 'jecrc'
                      ? `JECRC (${generatedPass.rollNumber})`
                      : `${generatedPass.collegeName} (${generatedPass.rollNumber})`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#42474f]">Access Category:</span>
                  <span className="font-bold text-[#0051d5]">{generatedPass.trackLabel}</span>
                </div>
              </div>

              {/* Close / Download CTA */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleDownloadPDF}
                  className="w-full py-3 rounded-xl bg-[#0051d5] text-white font-label-lg text-label-lg shadow-sm flex items-center justify-center gap-1.5 active:scale-95 transition-transform cursor-pointer font-bold"
                >
                  <span className="material-symbols-outlined text-lg">download</span>
                  Save Pass to Google Wallet / PDF
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setGeneratedPass(null);
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl text-[#42474f] font-label-md text-label-md hover:bg-[#e5eeff] cursor-pointer font-semibold"
                >
                  Dismiss &amp; View in Passes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
