import React from 'react';
import { AntigravityCanvas } from './components/AntigravityCanvas';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollShowcase } from './components/ScrollShowcase';
import { LiveSimulator } from './components/LiveSimulator';
import { ArchitectureBento } from './components/ArchitectureBento';
import { ComparisonTable } from './components/ComparisonTable';
import { FAQ } from './components/FAQ';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="relative min-h-screen bg-[#fafafa] text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-950 overflow-x-hidden">
      {/* Background Interactive Antigravity Canvas */}
      <AntigravityCanvas />

      {/* Main Layout Elements */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <ScrollShowcase />
        <LiveSimulator />
        <ArchitectureBento />
        <ComparisonTable />
        <FAQ />
        <DownloadCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
