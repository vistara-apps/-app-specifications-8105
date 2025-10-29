import React, { useState } from 'react'
import { Code, Copy, Check } from 'lucide-react'
import { Button } from './ui/Button'

export function Documentation() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null)

  const copyToClipboard = (code: string, id: string) => {
    navigator.clipboard.writeText(code)
    setCopiedCode(id)
    setTimeout(() => setCopiedCode(null), 2000)
  }

  const installCode = `npm install @swapkit/react`

  const basicUsage = `import { SwapWidget } from '@swapkit/react'

function App() {
  return (
    <SwapWidget
      apiKey="your-api-key"
      theme="dark"
      onSwapComplete={(tx) => console.log(tx)}
    />
  )
}`

  const advancedConfig = `import { SwapKit, SwapWidget } from '@swapkit/react'

// Initialize SwapKit
SwapKit.init({
  apiKey: 'your-api-key',
  network: 'mainnet',
  rpcEndpoint: 'https://api.mainnet-beta.solana.com',
  slippageTolerance: 0.5,
  enableRetry: true,
  mevProtection: true
})

// Advanced widget configuration
<SwapWidget
  allowedTokens={['SOL', 'USDC', 'RAY']}
  customTheme={{
    primary: '#8B5CF6',
    background: '#1A1B23',
    surface: '#2D2E36'
  }}
  onTransaction={(tx) => {
    // Custom transaction handling
    analytics.track('swap_initiated', {
      from: tx.fromToken,
      to: tx.toToken,
      amount: tx.amount
    })
  }}
/>`

  return (
    <div className="space-y-8 animate-fade-in max-w-4xl">
      <div>
        <h1 className="text-3xl font-bold">Documentation</h1>
        <p className="text-text-muted mt-2">Get started with SwapKit in minutes</p>
      </div>

      {/* Quick Start */}
      <div className="glass-effect rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold mb-4 flex items-center">
          <Code className="w-5 h-5 mr-2 text-primary" />
          Quick Start
        </h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">1. Install SwapKit</h3>
            <div className="relative">
              <pre className="bg-bg border border-border rounded-lg p-4 overflow-x-auto text-sm">
                <code>{installCode}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(installCode, 'install')}
                className="absolute top-2 right-2 p-2"
              >
                {copiedCode === 'install' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-3">2. Basic Usage</h3>
            <div className="relative">
              <pre className="bg-bg border border-border rounded-lg p-4 overflow-x-auto text-sm">
                <code>{basicUsage}</code>
              </pre>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => copyToClipboard(basicUsage, 'basic')}
                className="absolute top-2 right-2 p-2"
              >
                {copiedCode === 'basic' ? (
                  <Check className="w-4 h-4 text-success" />
                ) : (
                  <Copy className="w-4 h-4" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Advanced Configuration */}
      <div className="glass-effect rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold mb-4">Advanced Configuration</h2>
        <div className="relative">
          <pre className="bg-bg border border-border rounded-lg p-4 overflow-x-auto text-sm">
            <code>{advancedConfig}</code>
          </pre>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => copyToClipboard(advancedConfig, 'advanced')}
            className="absolute top-2 right-2 p-2"
          >
            {copiedCode === 'advanced' ? (
              <Check className="w-4 h-4 text-success" />
            ) : (
              <Copy className="w-4 h-4" />
            )}
          </Button>
        </div>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="glass-effect rounded-lg p-6 shadow-card">
          <h3 className="font-semibold mb-3">Key Features</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Drop-in React component</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Auto-retry transaction engine</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>MEV protection via Jito</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Smart route aggregation</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-primary rounded-full" />
              <span>Customizable themes</span>
            </li>
          </ul>
        </div>

        <div className="glass-effect rounded-lg p-6 shadow-card">
          <h3 className="font-semibold mb-3">Supported Networks</h3>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full" />
              <span>Solana Mainnet</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-success rounded-full" />
              <span>Solana Devnet</span>
            </li>
            <li className="flex items-center space-x-2">
              <div className="w-1.5 h-1.5 bg-text-muted rounded-full" />
              <span>Solana Testnet (coming soon)</span>
            </li>
          </ul>
        </div>
      </div>

      {/* API Reference */}
      <div className="glass-effect rounded-lg p-6 shadow-card">
        <h2 className="text-xl font-semibold mb-4">API Reference</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="font-medium mb-3">SwapWidget Props</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-2">Prop</th>
                    <th className="text-left p-2">Type</th>
                    <th className="text-left p-2">Default</th>
                    <th className="text-left p-2">Description</th>
                  </tr>
                </thead>
                <tbody className="text-text-muted">
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-mono text-primary">apiKey</td>
                    <td className="p-2">string</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Your SwapKit API key</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-mono text-primary">theme</td>
                    <td className="p-2">'light' | 'dark'</td>
                    <td className="p-2">'dark'</td>
                    <td className="p-2">Widget theme</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-mono text-primary">allowedTokens</td>
                    <td className="p-2">string[]</td>
                    <td className="p-2">all</td>
                    <td className="p-2">Restrict available tokens</td>
                  </tr>
                  <tr className="border-b border-border/50">
                    <td className="p-2 font-mono text-primary">onSwapComplete</td>
                    <td className="p-2">function</td>
                    <td className="p-2">-</td>
                    <td className="p-2">Callback on successful swap</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Get Started */}
      <div className="glass-effect rounded-lg p-6 shadow-card text-center">
        <h3 className="text-xl font-semibold mb-2">Ready to get started?</h3>
        <p className="text-text-muted mb-4">Get your API key and start integrating SwapKit today</p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button variant="primary" size="lg">
            Get API Key
          </Button>
          <Button variant="outline" size="lg">
            View Examples
          </Button>
        </div>
      </div>
    </div>
  )
}