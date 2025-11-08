import { useState } from 'react'
import { ChevronDown, Search } from 'lucide-react'
import { Button } from './ui/Button'

interface Token {
  symbol: string
  address: string
  balance: string
  logo?: string
}

interface TokenSelectorProps {
  token: Token | null
  onTokenChange: (token: Token) => void
}

const popularTokens: Token[] = [
  { symbol: 'SOL', address: 'So11111111111111111111111111111111111111112', balance: '2.45' },
  { symbol: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', balance: '0.00' },
  { symbol: 'USDT', address: 'Es9vMFrzaCERmJfrF4H2FYD4KCoNkY11McCe8BenwNYB', balance: '0.00' },
  { symbol: 'RAY', address: '4k3Dyjzvzp8eMZWUXbBCjEvwSkkk59S5iCNLY3QrkX6R', balance: '0.00' },
  { symbol: 'BONK', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', balance: '0.00' },
]

export function TokenSelector({ token, onTokenChange }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredTokens = popularTokens.filter(t =>
    t.symbol.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[120px] justify-between"
      >
        {token ? (
          <>
            <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center">
              <span className="text-xs font-medium">{token.symbol.slice(0, 2)}</span>
            </div>
            <span className="font-medium">{token.symbol}</span>
          </>
        ) : (
          <span className="text-text-muted">Select token</span>
        )}
        <ChevronDown className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </Button>

      {isOpen && (
        <div className="absolute top-full mt-2 w-72 bg-surface border border-border rounded-lg shadow-lg z-50 animate-fade-in">
          <div className="p-4 border-b border-border">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-text-muted" />
              <input
                type="text"
                placeholder="Search tokens..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full pl-10 pr-4 py-2 bg-bg border border-border rounded-md outline-none focus:border-primary text-sm"
              />
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {filteredTokens.map((t) => (
              <button
                key={t.address}
                onClick={() => {
                  onTokenChange(t)
                  setIsOpen(false)
                  setSearch('')
                }}
                className="w-full p-3 hover:bg-surface-hover flex items-center space-x-3 text-left"
              >
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">{t.symbol.slice(0, 2)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="font-medium">{t.symbol}</div>
                  <div className="text-sm text-text-muted truncate">{t.address.slice(0, 8)}...{t.address.slice(-4)}</div>
                </div>
                <div className="text-sm text-text-muted">
                  {t.balance} {t.symbol}
                </div>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}