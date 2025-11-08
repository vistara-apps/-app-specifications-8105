import { Code, BarChart3, Droplets, Book } from 'lucide-react'
import { Button } from './ui/Button'

interface HeaderProps {
  currentView: string
  onViewChange: (view: 'swap' | 'dashboard' | 'liquidity' | 'docs') => void
}

export function Header({ currentView, onViewChange }: HeaderProps) {
  const navigation = [
    { id: 'swap', label: 'Swap Demo', icon: Code },
    { id: 'dashboard', label: 'Analytics', icon: BarChart3 },
    { id: 'liquidity', label: 'Liquidity', icon: Droplets },
    { id: 'docs', label: 'Docs', icon: Book },
  ] as const

  return (
    <header className="border-b border-border bg-surface/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-lg flex items-center justify-center">
              <Code className="w-5 h-5 text-white" />
            </div>
            <span className="font-bold text-xl">SwapKit</span>
          </div>
          
          <nav className="hidden md:flex items-center space-x-1">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-2"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </nav>
          
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm" className="hidden sm:flex">
              Connect Wallet
            </Button>
            <Button variant="primary" size="sm">
              Get API Key
            </Button>
          </div>
        </div>
        
        {/* Mobile Navigation */}
        <div className="md:hidden pb-4">
          <div className="flex space-x-1 overflow-x-auto">
            {navigation.map((item) => {
              const Icon = item.icon
              return (
                <Button
                  key={item.id}
                  variant={currentView === item.id ? 'primary' : 'ghost'}
                  size="sm"
                  onClick={() => onViewChange(item.id)}
                  className="flex items-center space-x-2 whitespace-nowrap"
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </Button>
              )
            })}
          </div>
        </div>
      </div>
    </header>
  )
}