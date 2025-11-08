import { useState } from 'react'
import { ArrowUpDown, Settings, Zap } from 'lucide-react'
import { Button } from './ui/Button'
import { TokenSelector } from './TokenSelector'
import { SlippageSettings } from './SlippageSettings'
import { TransactionStatus } from './TransactionStatus'

interface Token {
  symbol: string
  address: string
  balance: string
  logo?: string
}

export function SwapWidget() {
  const [fromToken, setFromToken] = useState<Token | null>({
    symbol: 'SOL',
    address: 'So11111111111111111111111111111111111111112',
    balance: '2.45'
  })
  const [toToken, setToToken] = useState<Token | null>({
    symbol: 'USDC',
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    balance: '0.00'
  })
  const [fromAmount, setFromAmount] = useState('')
  const [toAmount, setToAmount] = useState('')
  const [slippage, setSlippage] = useState(0.5)
  const [showSlippage, setShowSlippage] = useState(false)
  const [txStatus, setTxStatus] = useState<'idle' | 'pending' | 'success' | 'error'>('idle')
  const [txSignature, setTxSignature] = useState<string | undefined>()

  const handleSwap = () => {
    setTxStatus('pending')
    // Simulate transaction
    setTimeout(() => {
      setTxStatus('success')
      setTxSignature('5xK...3j9')
    }, 3000)
  }

  const handleSwitchTokens = () => {
    setFromToken(toToken)
    setToToken(fromToken)
    setFromAmount(toAmount)
    setToAmount(fromAmount)
  }

  const isValidSwap = fromAmount && toAmount && fromToken && toToken

  return (
    <div className="glass-effect rounded-xl p-6 shadow-card max-w-md mx-auto animate-fade-in">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Swap Tokens</h2>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setShowSlippage(!showSlippage)}
          className="p-2"
        >
          <Settings className="w-4 h-4" />
        </Button>
      </div>

      {/* From Token */}
      <div className="space-y-4">
        <div className="bg-surface/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">From</span>
            <span className="text-sm text-text-muted">
              Balance: {fromToken?.balance} {fromToken?.symbol}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="0.00"
              value={fromAmount}
              onChange={(e) => setFromAmount(e.target.value)}
              className="flex-1 bg-transparent text-2xl font-medium outline-none placeholder:text-text-muted/50"
            />
            <TokenSelector token={fromToken} onTokenChange={setFromToken} />
          </div>
        </div>

        {/* Switch Button */}
        <div className="flex justify-center">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleSwitchTokens}
            className="p-2 rounded-full bg-surface hover:bg-surface-hover"
          >
            <ArrowUpDown className="w-4 h-4" />
          </Button>
        </div>

        {/* To Token */}
        <div className="bg-surface/50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-text-muted">To</span>
            <span className="text-sm text-text-muted">
              Balance: {toToken?.balance} {toToken?.symbol}
            </span>
          </div>
          
          <div className="flex items-center space-x-3">
            <input
              type="number"
              placeholder="0.00"
              value={toAmount}
              onChange={(e) => setToAmount(e.target.value)}
              className="flex-1 bg-transparent text-2xl font-medium outline-none placeholder:text-text-muted/50"
            />
            <TokenSelector token={toToken} onTokenChange={setToToken} />
          </div>
        </div>

        {/* Slippage Settings */}
        {showSlippage && (
          <SlippageSettings slippage={slippage} onSlippageChange={setSlippage} />
        )}

        {/* Swap Button */}
        <Button
          variant="primary"
          size="lg"
          onClick={handleSwap}
          disabled={!isValidSwap || txStatus === 'pending'}
          className="w-full flex items-center justify-center space-x-2"
        >
          {txStatus === 'pending' ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              <span>Swapping...</span>
            </>
          ) : (
            <>
              <Zap className="w-4 h-4" />
              <span>Swap</span>
            </>
          )}
        </Button>

        {/* Transaction Status */}
        <TransactionStatus
          status={txStatus}
          txSignature={txSignature}
          onClose={() => setTxStatus('idle')}
        />
      </div>
    </div>
  )
}