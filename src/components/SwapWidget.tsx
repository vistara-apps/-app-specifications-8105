import React, { useState } from 'react'
import { ArrowUpDown, Settings, Zap, Shield } from 'lucide-react'
import { Button } from './ui/Button'
import { TokenSelector } from './TokenSelector'
import { TransactionStatus } from './TransactionStatus'
import { SlippageSettings } from './SlippageSettings'

interface SwapState {
  fromToken: { symbol: string; address: string; balance: string } | null
  toToken: { symbol: string; address: string; balance: string } | null
  fromAmount: string
  toAmount: string
  slippage: number
  isLoading: boolean
  txStatus: 'idle' | 'pending' | 'success' | 'error'
  txSignature?: string
}

export function SwapWidget() {
  const [swapState, setSwapState] = useState<SwapState>({
    fromToken: { symbol: 'SOL', address: 'So11111111111111111111111111111111111111112', balance: '2.45' },
    toToken: { symbol: 'USDC', address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v', balance: '0.00' },
    fromAmount: '',
    toAmount: '',
    slippage: 0.5,
    isLoading: false,
    txStatus: 'idle',
  })

  const [showSettings, setShowSettings] = useState(false)

  const handleSwapTokens = () => {
    setSwapState(prev => ({
      ...prev,
      fromToken: prev.toToken,
      toToken: prev.fromToken,
      fromAmount: prev.toAmount,
      toAmount: prev.fromAmount,
    }))
  }

  const handleAmountChange = async (value: string, type: 'from' | 'to') => {
    setSwapState(prev => ({ ...prev, [`${type}Amount`]: value, isLoading: true }))
    
    // Simulate route fetching
    setTimeout(() => {
      if (type === 'from' && value) {
        const rate = swapState.fromToken?.symbol === 'SOL' ? 145.30 : 0.0069
        const calculated = (parseFloat(value) * rate).toFixed(6)
        setSwapState(prev => ({ ...prev, toAmount: calculated, isLoading: false }))
      } else if (type === 'to' && value) {
        const rate = swapState.toToken?.symbol === 'SOL' ? 0.0069 : 145.30
        const calculated = (parseFloat(value) * rate).toFixed(6)
        setSwapState(prev => ({ ...prev, fromAmount: calculated, isLoading: false }))
      } else {
        setSwapState(prev => ({ ...prev, toAmount: '', isLoading: false }))
      }
    }, 500)
  }

  const handleSwap = async () => {
    setSwapState(prev => ({ ...prev, txStatus: 'pending' }))
    
    // Simulate transaction
    setTimeout(() => {
      const success = Math.random() > 0.1 // 90% success rate
      setSwapState(prev => ({
        ...prev,
        txStatus: success ? 'success' : 'error',
        txSignature: success ? '5YNmS1VGyU2x4H7YqGFgLdhxB9gHoHrYNDEGKfMgPNAr' : undefined,
      }))
    }, 3000)
  }

  const canSwap = swapState.fromAmount && swapState.toAmount && swapState.fromToken && swapState.toToken

  return (
    <div className="w-full max-w-md mx-auto">
      <div className="glass-effect rounded-lg p-6 space-y-4 shadow-card animate-scale-in">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-semibold">Swap</h2>
          <div className="flex items-center space-x-2">
            <div className="flex items-center space-x-1 text-xs text-success">
              <Shield className="w-3 h-3" />
              <span>MEV Protected</span>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowSettings(!showSettings)}
              className="p-2"
            >
              <Settings className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Settings Panel */}
        {showSettings && (
          <SlippageSettings
            slippage={swapState.slippage}
            onSlippageChange={(slippage) => setSwapState(prev => ({ ...prev, slippage }))}
          />
        )}

        {/* From Token */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted">From</label>
          <div className="bg-surface rounded-md border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <TokenSelector
                token={swapState.fromToken}
                onTokenChange={(token) => setSwapState(prev => ({ ...prev, fromToken: token }))}
              />
              <div className="text-right">
                <input
                  type="number"
                  placeholder="0.00"
                  value={swapState.fromAmount}
                  onChange={(e) => handleAmountChange(e.target.value, 'from')}
                  className="bg-transparent text-right text-xl font-medium outline-none w-32"
                />
              </div>
            </div>
            <div className="flex justify-between text-sm text-text-muted">
              <span>Balance: {swapState.fromToken?.balance}</span>
              <button className="text-primary hover:text-primary/80">MAX</button>
            </div>
          </div>
        </div>

        {/* Swap Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwapTokens}
            className="p-2 rounded-full border border-border hover:border-primary transition-colors"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="space-y-2">
          <label className="text-sm text-text-muted">To</label>
          <div className="bg-surface rounded-md border border-border p-4">
            <div className="flex items-center justify-between mb-2">
              <TokenSelector
                token={swapState.toToken}
                onTokenChange={(token) => setSwapState(prev => ({ ...prev, toToken: token }))}
              />
              <div className="text-right">
                <input
                  type="number"
                  placeholder="0.00"
                  value={swapState.toAmount}
                  onChange={(e) => handleAmountChange(e.target.value, 'to')}
                  className="bg-transparent text-right text-xl font-medium outline-none w-32"
                />
                {swapState.isLoading && (
                  <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin ml-auto" />
                )}
              </div>
            </div>
            <div className="flex justify-between text-sm text-text-muted">
              <span>Balance: {swapState.toToken?.balance}</span>
            </div>
          </div>
        </div>

        {/* Route Info */}
        {swapState.fromAmount && swapState.toAmount && (
          <div className="bg-surface/50 rounded-md p-3 space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-text-muted">Rate</span>
              <span>1 {swapState.fromToken?.symbol} ≈ {(parseFloat(swapState.toAmount) / parseFloat(swapState.fromAmount)).toFixed(4)} {swapState.toToken?.symbol}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Price Impact</span>
              <span className="text-success">{'<'}0.1%</span>
            </div>
            <div className="flex justify-between">
              <span className="text-text-muted">Max Slippage</span>
              <span>{swapState.slippage}%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-text-muted">Route</span>
              <div className="flex items-center space-x-1 text-xs">
                <Zap className="w-3 h-3 text-warning" />
                <span>Jupiter • Raydium</span>
              </div>
            </div>
          </div>
        )}

        {/* Swap Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleSwap}
          disabled={!canSwap || swapState.txStatus === 'pending'}
          className="w-full"
        >
          {swapState.txStatus === 'pending' ? (
            <div className="flex items-center space-x-2">
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Swapping...</span>
            </div>
          ) : (
            'Swap'
          )}
        </Button>

        {/* Transaction Status */}
        <TransactionStatus
          status={swapState.txStatus}
          txSignature={swapState.txSignature}
          onClose={() => setSwapState(prev => ({ ...prev, txStatus: 'idle' }))}
        />
      </div>
    </div>
  )
}