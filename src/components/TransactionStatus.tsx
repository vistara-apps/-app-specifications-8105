import React from 'react'
import { CheckCircle, XCircle, ExternalLink, X } from 'lucide-react'
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
          title: 'Transaction Pending',
          message: 'Confirming your swap on Solana...',
          icon: (
            <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
          ),
          color: 'border-primary',
        }
      case 'success':
        return {
          title: 'Swap Successful!',
          message: 'Your transaction has been confirmed',
          icon: <CheckCircle className="w-8 h-8 text-success" />,
          color: 'border-success',
        }
      case 'error':
        return {
          title: 'Transaction Failed',
          message: 'Your swap could not be completed. Please try again.',
          icon: <XCircle className="w-8 h-8 text-error" />,
          color: 'border-error',
        }
      default:
        return null
    }
  }

  const config = getStatusConfig()
  if (!config) return null

  return (
    <div className={`glass-effect rounded-lg border ${config.color} p-4 animate-slide-up`}>
      <div className="flex items-start space-x-3">
        {config.icon}
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-sm">{config.title}</h4>
          <p className="text-sm text-text-muted mt-1">{config.message}</p>
          {txSignature && (
            <div className="mt-2 flex items-center space-x-2">
              <a
                href={`https://solscan.io/tx/${txSignature}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center space-x-1 text-xs text-primary hover:text-primary/80"
              >
                <span>View on Solscan</span>
                <ExternalLink className="w-3 h-3" />
              </a>
            </div>
          )}
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClose}
          className="p-1 opacity-70 hover:opacity-100"
        >
          <X className="w-4 h-4" />
        </Button>
      </div>
    </div>
  )
}