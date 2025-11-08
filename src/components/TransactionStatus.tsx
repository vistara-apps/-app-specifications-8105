import { CheckCircle, XCircle, Clock, ExternalLink, X } from 'lucide-react'
import { Button } from './ui/Button'

interface TransactionStatusProps {
  status: 'idle' | 'pending' | 'success' | 'error'
  txSignature?: string
  onClose: () => void
}

export function TransactionStatus({ status, txSignature, onClose }: TransactionStatusProps) {
  if (status === 'idle') return null

  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          title: 'Transaction Pending',
          message: 'Your swap is being processed...',
          color: 'text-warning',
          bgColor: 'bg-warning/10',
        }
      case 'success':
        return {
          icon: CheckCircle,
          title: 'Transaction Successful',
          message: 'Your swap has been completed successfully!',
          color: 'text-success',
          bgColor: 'bg-success/10',
        }
      case 'error':
        return {
          icon: XCircle,
          title: 'Transaction Failed',
          message: 'Something went wrong. Please try again.',
          color: 'text-error',
          bgColor: 'bg-error/10',
        }
      default:
        return null
    }
  }

  const config = getStatusConfig()
  if (!config) return null

  const Icon = config.icon

  return (
    <div className={`rounded-lg p-4 ${config.bgColor} border border-current/20 animate-fade-in`}>
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3">
          <Icon className={`w-5 h-5 mt-0.5 ${config.color}`} />
          <div className="flex-1">
            <h4 className={`font-medium ${config.color}`}>{config.title}</h4>
            <p className="text-sm text-text-muted mt-1">{config.message}</p>
            
            {txSignature && status === 'success' && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-2 p-0 h-auto text-primary hover:text-primary-hover"
                onClick={() => window.open(`https://solscan.io/tx/${txSignature}`, '_blank')}
              >
                <span className="text-sm">View on Solscan</span>
                <ExternalLink className="w-3 h-3 ml-1" />
              </Button>
            )}
          </div>
        </div>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 h-auto"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}