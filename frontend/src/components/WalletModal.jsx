import { useMemo, useState } from 'react'
import { useConnectWallet, useWallets } from '@mysten/dapp-kit'

export function WalletModal({ onClose, onConnected, onError }) {
  const wallets = useWallets()
  const { mutateAsync: connectWallet } = useConnectWallet()
  const [connecting, setConnecting] = useState('')

  const availableWallets = useMemo(() => {
    return wallets.map((wallet) => ({
      name: wallet.name,
      icon: wallet.icon,
      wallet,
    }))
  }, [wallets])

  const handleConnect = async (wallet) => {
    setConnecting(wallet.name)
    try {
      await connectWallet({ wallet })
      onConnected?.(wallet.name)
      onClose()
    } catch (error) {
      console.error('Failed to connect wallet:', error)
      onError?.(error)
      setConnecting('')
    }
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">連接 SUI 錢包</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <p className="modal-copy">
          選擇一個已安裝的 SUI 錢包來連線。這一版已改成 dapp-kit 真實連線流程，成功後會顯示真實 wallet address。
        </p>

        {availableWallets.length ? (
          <div className="wallet-list">
            {availableWallets.map(({ name, icon, wallet }) => (
              <button
                key={name}
                className="wallet-option"
                onClick={() => handleConnect(wallet)}
                disabled={Boolean(connecting)}
              >
                <span className="wallet-icon">
                  {icon ? <img src={icon} alt={name} className="wallet-icon-img" /> : '◈'}
                </span>
                <span className="wallet-copy">
                  <strong>{name}</strong>
                  <small>已安裝，可直接發起連線</small>
                </span>
                {connecting === name && <span className="spinner" style={{ width: '20px', height: '20px' }}></span>}
              </button>
            ))}
          </div>
        ) : (
          <div className="helper-box">
            <p>目前沒有偵測到可用的 SUI 錢包。</p>
            <a href="https://sui.io/wallet" target="_blank" rel="noopener noreferrer">
              前往 Sui Wallet 下載頁
            </a>
          </div>
        )}
      </div>
    </div>
  )
}
