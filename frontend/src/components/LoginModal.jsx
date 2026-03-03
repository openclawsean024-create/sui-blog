import { useState } from 'react'

export function LoginModal({ onClose, onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate blockchain registration/login
    await new Promise(resolve => setTimeout(resolve, 1500))

    // In real implementation, this would:
    // 1. Hash the password
    // 2. Call the SUI smart contract
    // 3. Register or verify the user

    setLoading(false)
    onSuccess()
    onClose()
  }

  // Simple hash function for demo
  const hashPassword = (password) => {
    let hash = 0
    for (let i = 0; i < password.length; i++) {
      const char = password.charCodeAt(i)
      hash = ((hash << 5) - hash) + char
      hash = hash & hash
    }
    return Math.abs(hash).toString(16).padStart(64, '0')
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isRegister ? '📝 註冊' : '🔑 登入'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">用戶名</label>
            <input
              type="text"
              className="form-input"
              placeholder="輸入用戶名"
              value={username}
              onChange={e => setUsername(e.target.value)}
              required
              minLength={3}
              maxLength={20}
            />
          </div>

          <div className="form-group">
            <label className="form-label">密碼</label>
            <input
              type="password"
              className="form-input"
              placeholder="輸入密碼"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              minLength={6}
            />
          </div>

          <div style={{ 
            padding: '12px', 
            background: 'rgba(34, 197, 94, 0.1)', 
            borderRadius: '8px',
            marginBottom: '20px',
            fontSize: '13px',
            color: 'var(--accent)'
          }}>
            🔒 密碼將進行雜湊處理後儲存於區塊鏈
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading}
          >
            {loading ? (
              <span><span className="spinner" style={{ width: '16px', height: '16px' }}></span> 處理中...</span>
            ) : (
              isRegister ? '📝 註冊' : '🔑 登入'
            )}
          </button>
        </form>

        <p style={{ 
          textAlign: 'center', 
          marginTop: '20px',
          color: 'var(--text-muted)',
          fontSize: '14px'
        }}>
          {isRegister ? '已有帳號？' : '還沒有帳號？'}
          <button
            type="button"
            onClick={() => setIsRegister(!isRegister)}
            style={{
              background: 'none',
              border: 'none',
              color: 'var(--primary)',
              cursor: 'pointer',
              marginLeft: '4px'
            }}
          >
            {isRegister ? '登入' : '註冊'}
          </button>
        </p>
      </div>
    </div>
  )
}
