import { TrendingUp, Users, Zap, DollarSign, Activity, AlertTriangle } from 'lucide-react'

export function DeveloperDashboard() {
  const metrics = [
    {
      title: '24h Volume',
      value: '$2.4M',
      change: '+12.3%',
      trend: 'up',
      icon: DollarSign,
    },
    {
      title: 'Active Users',
      value: '1,234',
      change: '+8.5%',
      trend: 'up',
      icon: Users,
    },
    {
      title: 'Success Rate',
      value: '99.2%',
      change: '+0.3%',
      trend: 'up',
      icon: Zap,
    },
    {
      title: 'Avg Response',
      value: '1.2s',
      change: '-0.1s',
      trend: 'up',
      icon: Activity,
    },
  ]

  const recentTransactions = [
    { id: '1', time: '2 min ago', from: 'SOL', to: 'USDC', amount: '12.5', status: 'success' },
    { id: '2', time: '5 min ago', from: 'USDT', to: 'RAY', amount: '850', status: 'success' },
    { id: '3', time: '8 min ago', from: 'BONK', to: 'SOL', amount: '50K', status: 'failed' },
    { id: '4', time: '12 min ago', from: 'SOL', to: 'USDC', amount: '7.8', status: 'success' },
  ]

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-3xl font-bold">Developer Analytics</h1>
        <p className="text-text-muted mt-2">Monitor your SwapKit integration performance</p>
      </div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric) => {
          const Icon = metric.icon
          return (
            <div key={metric.title} className="glass-effect rounded-lg p-6 shadow-card">
              <div className="flex items-center justify-between">
                <Icon className="w-8 h-8 text-primary" />
                <span className={`text-sm font-medium ${
                  metric.trend === 'up' ? 'text-success' : 'text-error'
                }`}>
                  {metric.change}
                </span>
              </div>
              <div className="mt-4">
                <div className="text-2xl font-bold">{metric.value}</div>
                <div className="text-sm text-text-muted">{metric.title}</div>
              </div>
            </div>
          )
        })}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Volume Chart */}
        <div className="glass-effect rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">Trading Volume</h3>
          <div className="h-64 bg-surface/50 rounded-md flex items-center justify-center">
            <div className="text-center text-text-muted">
              <TrendingUp className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>Chart visualization would go here</p>
              <p className="text-sm mt-1">Integration with charting library needed</p>
            </div>
          </div>
        </div>

        {/* User Activity */}
        <div className="glass-effect rounded-lg p-6 shadow-card">
          <h3 className="text-lg font-semibold mb-4">User Activity</h3>
          <div className="h-64 bg-surface/50 rounded-md flex items-center justify-center">
            <div className="text-center text-text-muted">
              <Users className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>User activity chart</p>
              <p className="text-sm mt-1">Real-time user engagement metrics</p>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Transactions */}
      <div className="glass-effect rounded-lg p-6 shadow-card">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold">Recent Transactions</h3>
          <div className="flex items-center space-x-2 text-sm text-text-muted">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span>Live</span>
          </div>
        </div>
        
        <div className="space-y-3">
          {recentTransactions.map((tx) => (
            <div key={tx.id} className="flex items-center justify-between p-3 bg-surface/50 rounded-md">
              <div className="flex items-center space-x-2">
                <div className={`w-2 h-2 rounded-full ${
                  tx.status === 'success' ? 'bg-success' : 'bg-error'
                }`} />
                <div>
                  <div className="font-medium text-sm">
                    {tx.amount} {tx.from} → {tx.to}
                  </div>
                  <div className="text-xs text-text-muted">{tx.time}</div>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                {tx.status === 'failed' && <AlertTriangle className="w-4 h-4 text-error" />}
                <span className={`text-xs px-2 py-1 rounded-full ${
                  tx.status === 'success' 
                    ? 'bg-success/20 text-success' 
                    : 'bg-error/20 text-error'
                }`}>
                  {tx.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}