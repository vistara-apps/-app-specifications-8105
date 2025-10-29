import React from 'react'
import { Button } from './ui/Button'

interface SlippageSettingsProps {
  slippage: number
  onSlippageChange: (slippage: number) => void
}

const presetSlippages = [0.1, 0.5, 1.0, 3.0]

export function SlippageSettings({ slippage, onSlippageChange }: SlippageSettingsProps) {
  return (
    <div className="bg-surface/50 rounded-md p-4 space-y-3 animate-fade-in">
      <h4 className="font-medium text-sm">Slippage Tolerance</h4>
      
      <div className="flex flex-wrap gap-2">
        {presetSlippages.map((preset) => (
          <Button
            key={preset}
            variant={slippage === preset ? 'primary' : 'outline'}
            size="sm"
            onClick={() => onSlippageChange(preset)}
            className="text-xs"
          >
            {preset}%
          </Button>
        ))}
      </div>
      
      <div className="flex items-center space-x-2">
        <input
          type="number"
          step="0.1"
          min="0.1"
          max="50"
          value={slippage}
          onChange={(e) => onSlippageChange(parseFloat(e.target.value) || 0.5)}
          className="flex-1 px-3 py-2 bg-bg border border-border rounded-md outline-none focus:border-primary text-sm"
          placeholder="Custom %"
        />
        <span className="text-sm text-text-muted">%</span>
      </div>
      
      {slippage > 5 && (
        <div className="text-xs text-warning">
          ⚠️ High slippage tolerance may result in unfavorable trades
        </div>
      )}
    </div>
  )
}