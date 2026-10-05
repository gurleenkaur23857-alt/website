import React, { useState, useEffect } from 'react';
import { TabType, FestEvent, UserPass } from './types';
import { INITIAL_USER_PASSES, FEST_EVENTS } from './data/festData';
import { Header } from './components/Header';
import { BottomNav } from './components/BottomNav';
import { FestHome } from './components/FestHome';
import { TimelineSchedule } from './components/TimelineSchedule';
import { EventsDirectory } from './components/EventsDirectory';
import { DashboardPasses } from './components/DashboardPasses';
import { PassCheckoutModal } from './components/PassCheckoutModal';
import { VenueModal } from './components/VenueModal';
import { MenuDrawer } from './components/MenuDrawer';
import { QRScannerModal } from './components/QRScannerModal';
import { Toast } from './components/Toast';

export default function App() {
  const [currentTab, setCurrentTab] = useState<TabType>('home');
  const [userPasses, setUserPasses] = useState<UserPass[]>(() => {
    try {
      const stored = localStorage.getItem('jecrc_user_passes_2026');
      if (stored) {
        return JSON.parse(stored);
      }
    } catch {
      // fallback
    }
    return INITIAL_USER_PASSES;
  });

  const [checkedInCount, setCheckedInCount] = useState<number>(0);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState<boolean>(false);
  const [checkoutEvent, setCheckoutEvent] = useState<FestEvent | null>(FEST_EVENTS[0]);
  const [isDrawerOpen, setIsDrawerOpen] = useState<boolean>(false);
  const [isScannerOpen, setIsScannerOpen] = useState<boolean>(false);
  const [selectedVenue, setSelectedVenue] = useState<string | null>(null);

  // Toast state
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastIcon, setToastIcon] = useState<string>('check_circle');

  const showToast = (msg: string, icon: string = 'check_circle') => {
    setToastMessage(msg);
    setToastIcon(icon);
    setTimeout(() => {
      setToastMessage((prev) => (prev === msg ? null : prev));
    }, 2800);
  };

  useEffect(() => {
    try {
      localStorage.setItem('jecrc_user_passes_2026', JSON.stringify(userPasses));
    } catch {
      // ignore
    }
  }, [userPasses]);

  const handleTabChange = (tab: TabType) => {
    setIsCheckoutOpen(false);
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectEventForCheckout = (event: FestEvent) => {
    setCheckoutEvent(event);
    setIsCheckoutOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePassGenerated = (newPass: UserPass) => {
    setUserPasses((prev) => [newPass, ...prev]);
    showToast(`Pass #${newPass.passId} added to your active tickets!`, 'verified');
  };

  const handleVerifyPassAtGate = (pass: UserPass) => {
    setCheckedInCount((c) => c + 1);
    showToast(`Checked in: ${pass.studentName} at Main Gate`, 'how_to_reg');
  };

  return (
    <div className="min-h-screen bg-[#f8f9ff] text-[#0b1c30] flex flex-col font-sans relative selection:bg-[#dbe1ff] selection:text-[#00174b]">
      {/* Fixed Global Header */}
      <Header
        currentTab={currentTab}
        onTabChange={handleTabChange}
        onOpenDrawer={() => setIsDrawerOpen(true)}
        isCheckoutOpen={isCheckoutOpen}
        onCloseCheckout={() => setIsCheckoutOpen(false)}
      />

      {/* Main Screen Content */}
      <main className="flex-1 flex flex-col w-full pt-16">
        {isCheckoutOpen ? (
          <PassCheckoutModal
            event={checkoutEvent}
            onClose={() => {
              setIsCheckoutOpen(false);
              setCurrentTab('passes');
            }}
            onPassGenerated={handlePassGenerated}
            onShowToast={showToast}
          />
        ) : (
          <>
            {currentTab === 'home' && (
              <FestHome
                onNavigate={handleTabChange}
                onSelectEventForCheckout={handleSelectEventForCheckout}
                onOpenVenueModal={(v) => setSelectedVenue(v)}
                onShowToast={showToast}
              />
            )}
            {currentTab === 'events' && (
              <EventsDirectory
                onNavigate={handleTabChange}
                onSelectEventForCheckout={handleSelectEventForCheckout}
                onShowToast={showToast}
              />
            )}
            {currentTab === 'schedule' && (
              <TimelineSchedule
                onNavigate={handleTabChange}
                onOpenVenueModal={(v) => setSelectedVenue(v)}
                onShowToast={showToast}
              />
            )}
            {(currentTab === 'passes' || currentTab === 'portal') && (
              <DashboardPasses
                userPasses={userPasses}
                onOpenScanner={() => setIsScannerOpen(true)}
                onNavigate={handleTabChange}
                checkedInCount={checkedInCount}
                onShowToast={showToast}
              />
            )}
          </>
        )}
      </main>

      {/* Fixed Bottom Navigation */}
      <BottomNav
        currentTab={isCheckoutOpen ? 'passes' : currentTab}
        onTabChange={handleTabChange}
        passCount={userPasses.length}
      />

      {/* Side Menu Drawer */}
      <MenuDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        onNavigate={handleTabChange}
        onOpenVenueModal={(v) => setSelectedVenue(v)}
        onShowToast={showToast}
      />

      {/* Interactive Venue Radar Pin Modal */}
      <VenueModal
        venueName={selectedVenue}
        onClose={() => setSelectedVenue(null)}
        onShowToast={showToast}
      />

      {/* Admin QR Scanner Simulator Modal */}
      {isScannerOpen && (
        <QRScannerModal
          onClose={() => setIsScannerOpen(false)}
          onVerifyPass={handleVerifyPassAtGate}
          userPasses={userPasses}
          onShowToast={showToast}
        />
      )}

      {/* Global Toast Notification */}
      <Toast message={toastMessage} icon={toastIcon} />
    </div>
  );
}
