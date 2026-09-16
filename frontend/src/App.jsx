import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Topbar from './components/Topbar';
import ProcessingLogModal from './components/ProcessingLogModal';

import LandingPage from './pages/LandingPage';
import DashboardPage from './pages/DashboardPage';
import NewAnalysisPage from './pages/NewAnalysisPage';
import ComparisonPage from './pages/ComparisonPage';
import ChangeDetectionPage from './pages/ChangeDetectionPage';
import StatisticsPage from './pages/StatisticsPage';
import QueryAssistantPage from './pages/QueryAssistantPage';
import HistoryPage from './pages/HistoryPage';
import ArchitecturePage from './pages/ArchitecturePage';
import AboutPage from './pages/AboutPage';

import { runAnalysis, fetchSystemStatus } from './services/api';

export default function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [activeScenario, setActiveScenario] = useState('vegetation_loss');
  const [currentAnalysis, setCurrentAnalysis] = useState(null);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [systemStatus, setSystemStatus] = useState(null);

  // Initialize with default scenario analysis
  useEffect(() => {
    fetchSystemStatus().then(st => setSystemStatus(st));
    runAnalysis({ config: { scenario_id: activeScenario } }).then(data => {
      setCurrentAnalysis(data);
      if (data?.detected_regions?.length > 0) {
        setSelectedRegion(data.detected_regions[0]);
      }
    });
  }, [activeScenario]);

  // Handle scenario switch from topbar demo mode banner
  const handleSelectScenario = (scenarioId) => {
    setActiveScenario(scenarioId);
    runAnalysis({ config: { scenario_id: scenarioId } }).then(data => {
      setCurrentAnalysis(data);
      if (data?.detected_regions?.length > 0) {
        setSelectedRegion(data.detected_regions[0]);
      }
      setCurrentPage('dashboard');
    });
  };

  // Handle new analysis wizard completion
  const handleAnalysisComplete = (payload) => {
    runAnalysis(payload).then(data => {
      setCurrentAnalysis(data);
      if (data?.detected_regions?.length > 0) {
        setSelectedRegion(data.detected_regions[0]);
      }
      setCurrentPage('dashboard');
    });
  };

  return (
    <div className="flex h-screen bg-[#080d1a] text-slate-100 overflow-hidden font-sans">
      {/* Sidebar Navigation */}
      <Sidebar 
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        systemStatus={systemStatus}
      />

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col h-screen overflow-hidden">
        {/* Top Header */}
        <Topbar 
          currentAnalysis={currentAnalysis}
          onSelectScenario={handleSelectScenario}
          activeScenario={activeScenario}
        />

        {/* Scrollable Viewport */}
        <main className="flex-1 overflow-y-auto p-6 space-y-6">
          {currentPage === 'landing' && (
            <LandingPage 
              onNavigate={setCurrentPage}
              onExploreDemo={() => handleSelectScenario('vegetation_loss')}
            />
          )}

          {currentPage === 'dashboard' && (
            <DashboardPage 
              currentAnalysis={currentAnalysis}
              onNavigate={setCurrentPage}
              onSelectRegion={setSelectedRegion}
            />
          )}

          {currentPage === 'new-analysis' && (
            <NewAnalysisPage 
              onAnalysisComplete={handleAnalysisComplete}
            />
          )}

          {currentPage === 'comparison' && (
            <ComparisonPage 
              currentAnalysis={currentAnalysis}
            />
          )}

          {currentPage === 'change-detection' && (
            <ChangeDetectionPage 
              currentAnalysis={currentAnalysis}
              selectedRegion={selectedRegion}
              onSelectRegion={setSelectedRegion}
            />
          )}

          {currentPage === 'query-assistant' && (
            <QueryAssistantPage 
              currentAnalysis={currentAnalysis}
              onNavigate={setCurrentPage}
              onSelectRegion={setSelectedRegion}
            />
          )}

          {currentPage === 'history' && (
            <HistoryPage 
              onLoadAnalysis={(an) => {
                setCurrentAnalysis(an);
                if (an?.detected_regions?.length > 0) setSelectedRegion(an.detected_regions[0]);
                setCurrentPage('dashboard');
              }}
            />
          )}

          {currentPage === 'architecture' && (
            <ArchitecturePage />
          )}

          {currentPage === 'about' && (
            <AboutPage />
          )}

          {/* Processing Log Footer Bar on Data Pages */}
          {currentPage !== 'landing' && currentAnalysis?.processing_logs && (
            <div className="pt-4">
              <ProcessingLogModal logs={currentAnalysis.processing_logs} />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
