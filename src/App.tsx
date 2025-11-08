import { useState } from 'react'
import { Header } from './components/Header'
import { SwapWidget } from './components/SwapWidget'
import { DeveloperDashboard } from './components/DeveloperDashboard'
import { LiquidityBootstrap } from './components/LiquidityBootstrap'
import { Documentation } from './components/Documentation'

type View = 'swap' | 'dashboard' | 'liquidity' | 'docs'

export default function App() {
  const [currentView, setCurrentView] = useState<View>('swap')

  return (
    <div className="min-h-screen bg-bg text-text">
      <Header currentView={currentView} onViewChange={setCurrentView} />
      
      <main className="container mx-auto px-4 py-8 max-w-6xl">
        {currentView === 'swap' && (
          <div className="space-y-8">
            <div className="text-center space-y-4">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SwapKit
              </h1>
              <p className="text-lg md:text-xl text-text-muted max-w-2xl mx-auto">
                Production-ready Solana AMM integration in under 5 minutes
              </p>
            </div>
            
            <div className="flex justify-center">
              <SwapWidget />
            </div>
          </div>
        )}
        
        {currentView === 'dashboard' && <DeveloperDashboard />}
        {currentView === 'liquidity' && <LiquidityBootstrap />}
        {currentView === 'docs' && <Documentation />}
      </main>
    </div>
  )
}