export function Header({
  account,
  isConnected,
  onConnectWallet,
  onDisconnectWallet,
  onLogin,
  onCreatePost,
  onGoHome,
  currentView,
}) {
  return (
    <header className="header">
      <button className="logo logo-button" onClick={onGoHome}>
        <div className="logo-icon">✦</div>
        <div>
          <span className="logo-text">SUI Deck BLOG</span>
          <div className="logo-sub">
            {currentView === 'home' ? 'Content product for SUI research' : 'Back to home'}
          </div>
        </div>
      </button>

      <div className="header-actions">
        {isConnected ? (
          <>
            <div className="wallet-info">
              <span className="wallet-address">
                {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
              </span>
              <span className="wallet-balance">Wallet Connected</span>
            </div>
            <button className="btn btn-secondary" onClick={onDisconnectWallet}>
              中斷連線
            </button>
            <button className="btn btn-primary" onClick={onCreatePost}>
              撰寫文章
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={onLogin}>
              登入
            </button>
            <button className="btn btn-primary" onClick={onConnectWallet}>
              連接錢包
            </button>
          </>
        )}
      </div>
    </header>
  )
}
