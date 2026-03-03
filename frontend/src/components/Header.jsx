export function Header({ account, isConnected, onConnectWallet, onLogin, onCreatePost }) {
  return (
    <header className="header">
      <div className="logo">
        <div className="logo-icon">⛓️</div>
        <span className="logo-text">SUI 區塊鏈部落格</span>
      </div>
      
      <div className="header-actions">
        {isConnected ? (
          <>
            <div className="wallet-info">
              <span className="wallet-address">
                {account?.address?.slice(0, 6)}...{account?.address?.slice(-4)}
              </span>
              <span className="wallet-balance">● 連接中</span>
            </div>
            <button className="btn btn-primary" onClick={onCreatePost}>
              ✍️ 發布文章
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={onLogin}>
              🔑 登入
            </button>
            <button className="btn btn-primary" onClick={onConnectWallet}>
              🔗 連接錢包
            </button>
          </>
        )}
      </div>
    </header>
  )
}
