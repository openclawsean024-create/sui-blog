import { useState } from 'react'
import { useCurrentAccount, useAccounts } from '@mysten/dapp-kit'

export function WalletModal({ onClose }) {
  const [connecting, setConnecting] = useState(false)
  
  // Demo wallet list (since dapp-kit might not have wallets available)
  const demoWallets = [
    { name: 'Sui Wallet', icon: '💳' },
    { name: 'Ethos Wallet', icon: '🔐' },
    { name: 'WalletConnect', icon: '🔗' }
  ]

  const handleConnect = async (walletName) => {
    setConnecting(walletName)
    try {
      // Simulate wallet connection
      await new Promise(resolve => setTimeout(resolve, 1500))
      onClose()
    } catch (error) {
      console.error('Failed to connect:', error)
      setConnecting(false)
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">🔗 連接錢包</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>
        
        <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>
          選擇一個 SUI 錢包來連接到區塊鏈部落格
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
          {demoWallets.map(wallet => (
            <button
              key={wallet.name}
              className="btn btn-secondary"
              onClick={() => handleConnect(wallet.name)}
              disabled={connecting}
              style={{ 
                justifyContent: 'flex-start', 
                padding: '16px',
                opacity: connecting === wallet.name ? 0.7 : 1
              }}
            >
              <span style={{ fontSize: '24px', marginRight: '12px' }}>
                {wallet.icon}
              </span>
              <span>{wallet.name}</span>
              {connecting === wallet.name && (
                <span style={{ marginLeft: 'auto' }}>
                  <span className="spinner" style={{ width: '20px', height: '20px' }}></span>
                </span>
              )}
            </button>
          ))}
        </div>

        <div style={{ 
          marginTop: '24px', 
          padding: '16px', 
          background: 'var(--bg)', 
          borderRadius: '12px',
          fontSize: '14px',
          color: 'var(--text-muted)'
        }}>
          <p>💡 沒有錢包？</p>
          <p style={{ marginTop: '8px' }}>
            <a 
              href="https://sui.io/wallet" 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: 'var(--primary)' }}
            >
              下載 Sui Wallet →
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}
