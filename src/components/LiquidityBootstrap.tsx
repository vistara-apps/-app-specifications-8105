import React, { useState } from 'react'
import { Plus, Droplets, TrendingUp, Settings } from 'lucide-react'
import { Button } from './ui/Button'

export function LiquidityBootstrap() {
  const [selectedPool, setSelectedPool] = useState<string | null>(null)
  const [formData, setFormData] = useState({
    tokenA: 'SOL',
    tokenB: 'USDC',
    initialPrice: '',
    liquidityAmount: '',
    curve: 'constant-product',
    incentives: false,
  })

  const poolTemplates = [
    {
      id: 'token-launch',
      title: 'Token Launch Pool',
      description: 'Bootstrap liquidity for new token with fair launch mechanics',
      fee: '0.3%',
      tvl: 'Starting pool',
      icon: TrendingUp,
    },
    {
      id: 'stable-pair',
      title: 'Stablecoin Pair',
      description: 'Low-slippage pool for stablecoin trading',
      fee: '0.05%',
      tvl: 'Concentrated liquidity',
      icon: Droplets,
    },
    {
      id: 'concentrated',
      title: 'Concentrated Liquidity',
      description: 'Capital efficient pool with custom price ranges',
      fee: '0.3%',
      tvl: 'Active management',
      icon: Settings,
    },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Liquidity Bootstrap Wizard</h1>
        <p className="text-text-muted mt-2">Create and manage liquidity pools with ease</p>
      </div>

      {/* Pool Templates */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {poolTemplates.map((template) => {
          const Icon = template.icon
          return (
            <button
              key={template.id}
              onClick={() => setSelectedPool(template.id)}
              className={`glass-effect rounded-lg p-6 shadow-card text-left transition-all hover:shadow-glow ${
                selectedPool === template.id ? 'ring-2 ring-primary shadow-glow' : ''
              }`}
            >
              <Icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-semibold mb-2">{template.title}</h3>
              <p className="text-sm text-text-muted mb-4">{template.description}</p>
              <div className="flex justify-between text-xs">
                <span className="text-text-muted">Fee: {template.fee}</span>
                <span className="text-primary">{template.tvl}</span>
              </div>
            </button>
          )
        })}
      </div>

      {/* Configuration Form */}
      {selectedPool && (
        <div className="glass-effect rounded-lg p-6 shadow-card animate-fade-in">
          <h3 className="text-lg font-semibold mb-6">Configure Your Pool</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Token Pair */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Token A</label>
                <select
                  value={formData.tokenA}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenA: e.target.value }))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md outline-none focus:border-primary"
                >
                  <option value="SOL">SOL - Solana</option>
                  <option value="USDC">USDC - USD Coin</option>
                  <option value="USDT">USDT - Tether</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Token B</label>
                <select
                  value={formData.tokenB}
                  onChange={(e) => setFormData(prev => ({ ...prev, tokenB: e.target.value }))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md outline-none focus:border-primary"
                >
                  <option value="USDC">USDC - USD Coin</option>
                  <option value="SOL">SOL - Solana</option>
                  <option value="RAY">RAY - Raydium</option>
                </select>
              </div>
            </div>

            {/* Pool Parameters */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Initial Price</label>
                <input
                  type="number"
                  placeholder="0.00"
                  value={formData.initialPrice}
                  onChange={(e) => setFormData(prev => ({ ...prev, initialPrice: e.target.value }))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md outline-none focus:border-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-2">Initial Liquidity</label>
                <input
                  type="number"
                  placeholder="Amount in USD"
                  value={formData.liquidityAmount}
                  onChange={(e) => setFormData(prev => ({ ...prev, liquidityAmount: e.target.value }))}
                  className="w-full px-3 py-2 bg-surface border border-border rounded-md outline-none focus:border-primary"
                />
              </div>
            </div>
          </div>

          {/* Bonding Curve */}
          <div className="mt-6">
            <label className="block text-sm font-medium mb-3">Bonding Curve</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => setFormData(prev => ({ ...prev, curve: 'constant-product' }))}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  formData.curve === 'constant-product'
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                }`}
              >
                <div className="font-medium">Constant Product (x*y=k)</div>
                <div className="text-sm text-text-muted mt-1">
                  Standard AMM curve, good for volatile pairs
                </div>
              </button>
              
              <button
                onClick={() => setFormData(prev => ({ ...prev, curve: 'stable' }))}
                className={`p-4 border rounded-lg text-left transition-colors ${
                  formData.curve === 'stable'
                    ? 'border-primary bg-primary/10'
                    : 'border-border'
                }`}
              >
                <div className="font-medium">Stable Curve</div>
                <div className="text-sm text-text-muted mt-1">
                  Optimized for assets with similar values
                </div>
              </button>
            </div>
          </div>

          {/* LP Incentives */}
          <div className="mt-6">
            <label className="flex items-center space-x-3">
              <input
                type="checkbox"
                checked={formData.incentives}
                onChange={(e) => setFormData(prev => ({ ...prev, incentives: e.target.checked }))}
                className="w-4 h-4 text-primary bg-surface border-border rounded focus:ring-primary"
              />
              <span className="font-medium">Enable LP Incentives</span>
            </label>
            <p className="text-sm text-text-muted mt-1 ml-7">
              Provide additional token rewards to liquidity providers
            </p>
          </div>

          {/* Cost Estimate */}
          <div className="mt-6 p-4 bg-surface/50 rounded-lg">
            <h4 className="font-medium mb-2">Estimated Costs</h4>
            <div className="space-y-1 text-sm">
              <div className="flex justify-between">
                <span className="text-text-muted">Pool Creation</span>
                <span>~0.6 SOL</span>
              </div>
              <div className="flex justify-between">
                <span className="text-text-muted">Initial Liquidity</span>
                <span>${formData.liquidityAmount || '0'}</span>
              </div>
              <div className="flex justify-between font-medium border-t border-border pt-1 mt-2">
                <span>Total</span>
                <span>~0.6 SOL + ${formData.liquidityAmount || '0'}</span>
              </div>
            </div>
          </div>

          {/* Create Button */}
          <div className="mt-6 flex space-x-4">
            <Button variant="primary" size="lg" className="flex-1">
              <Plus className="w-4 h-4 mr-2" />
              Create Pool
            </Button>
            <Button variant="outline" size="lg">
              Preview
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}