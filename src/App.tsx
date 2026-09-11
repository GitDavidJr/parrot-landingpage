import React from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { ScrollShowcase } from './components/ScrollShowcase';
import { FeatureShowcase } from './components/FeatureShowcase';
import { ComparisonTable } from './components/ComparisonTable';
import { Supporters } from './components/Supporters';
import { FAQ } from './components/FAQ';
import { DownloadCTA } from './components/DownloadCTA';
import { Footer } from './components/Footer';

export function App() {
  return (
    <div className="relative min-h-screen bg-white text-slate-900 font-sans selection:bg-emerald-500/20 selection:text-emerald-950 overflow-x-hidden">
      {/* Main Layout Elements */}
      <Navbar />

      <main className="relative z-10">
        <Hero />
        <ScrollShowcase />
        <FeatureShowcase />
        <ComparisonTable />
        <Supporters />
        <FAQ />
        <DownloadCTA />
      </main>

      <Footer />
    </div>
  );
}

export default App;
