import React, { useState } from 'react'
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
  { symbol: 'BONK', address: 'DezXAZ8z7PnrnRJjz3wXBoRgixCa6xjnB7YaB1pPB263', balance: '1,234.56' },
]

export function TokenSelector({ token, onTokenChange }: TokenSelectorProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [search, setSearch] = useState('')

  const filteredTokens = popularTokens.filter(t =>
    t.symbol.toLowerCase().includes(search.toLowerCase())
  )

  const handleSelect = (selectedToken: Token) => {
    onTokenChange(selectedToken)
    setIsOpen(false)
    setSearch('')
  }

  if (!isOpen) {
    return (
      <Button
        variant="ghost"
        onClick={() => setIsOpen(true)}
        className="flex items-center space-x-2 p-2 hover:bg-surface-hover"
      >
        <div className="w-6 h-6 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-xs font-bold">
          {token?.symbol.slice(0, 2)}
        </div>
        <span className="font-medium">{token?.symbol || 'Select'}</span>
        <ChevronDown className="w-4 h-4" />
      </Button>
    )
  }

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 md:relative md:bg-transparent md:backdrop-blur-none md:p-0">
      <div className="bg-surface rounded-lg border border-border w-full max-w-sm max-h-96 overflow-hidden animate-scale-in md:absolute md:top-full md:left-0 md:mt-2 md:z-10">
        {/* Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">Select Token</h3>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(false)}
              className="p-1"
            >
              ✕
            </Button>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-muted" />
            <input
              type="text"
              placeholder="Search tokens..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg border border-border rounded-md outline-none focus:border-primary"
              autoFocus
            />
          </div>
        </div>

        {/* Token List */}
        <div className="max-h-64 overflow-y-auto">
          {filteredTokens.map((tokenOption) => (
            <button
              key={tokenOption.address}
              onClick={() => handleSelect(tokenOption)}
              className="w-full p-4 flex items-center space-x-3 hover:bg-surface-hover transition-colors"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center text-sm font-bold">
                {tokenOption.symbol.slice(0, 2)}
              </div>
              <div className="flex-1 text-left">
                <div className="font-medium">{tokenOption.symbol}</div>
                <div className="text-sm text-text-muted truncate">
                  {tokenOption.address.slice(0, 8)}...{tokenOption.address.slice(-8)}
                </div>
              </div>
              <div className="text-right text-sm">
                <div>{tokenOption.balance}</div>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}