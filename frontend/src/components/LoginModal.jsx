import { useState } from 'react'

export function LoginModal({ onClose, onSuccess }) {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [isRegister, setIsRegister] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 1200))
    setLoading(false)
    onSuccess({ username, password, isRegister })
    onClose()
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">{isRegister ? '建立帳號' : '登入帳號'}</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">帳號名稱</label>
            <input type="text" className="form-input" placeholder="輸入帳號名稱" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} maxLength={20} />
          </div>

          <div className="form-group">
            <label className="form-label">密碼</label>
            <input type="password" className="form-input" placeholder="輸入密碼" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
          </div>

          <div className="helper-box success-box">
            平常可用帳號密碼登入管理內容；後續若涉及提領或資產操作，會再要求密碼驗證與錢包簽章。
          </div>

          <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading}>
            {loading ? <span><span className="spinner" style={{ width: '16px', height: '16px' }}></span> 處理中...</span> : (isRegister ? '建立帳號' : '登入')}
          </button>
        </form>

        <p className="switch-copy">
          {isRegister ? '已經有帳號？' : '還沒有帳號？'}
          <button type="button" onClick={() => setIsRegister(!isRegister)} className="switch-link">
            {isRegister ? '立即登入' : '建立帳號'}
          </button>
        </p>
      </div>
    </div>
  )
}
