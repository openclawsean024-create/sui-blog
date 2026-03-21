import { useState } from 'react'

export function WithdrawModal({ onClose, onSubmit, walletBound }) {
  const [amount, setAmount] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    await new Promise((resolve) => setTimeout(resolve, 900))
    await onSubmit({ amount, password })
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">提領資產</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        {!walletBound ? (
          <div className="helper-box">
            目前尚未綁定錢包。請先登入帳號並完成錢包綁定，之後才能進行提領。
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">提領數量</label>
              <input type="number" min="0" step="0.01" className="form-input" placeholder="例如 12.5" value={amount} onChange={(e) => setAmount(e.target.value)} required />
            </div>

            <div className="form-group">
              <label className="form-label">再次輸入密碼</label>
              <input type="password" className="form-input" placeholder="輸入密碼確認此次提領" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={6} />
            </div>

            <div className="publish-box">
              <p className="publish-title">安全規則</p>
              <ul>
                <li>登入可用帳號密碼，但不收助記詞。</li>
                <li>提領時會先驗證密碼。</li>
                <li>接著需使用已綁定錢包進行簽章確認。</li>
              </ul>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%' }} disabled={loading || !amount || !password}>
              {loading ? <span><span className="spinner" style={{ width: '16px', height: '16px' }}></span> 驗證中...</span> : '驗證後進行簽章'}
            </button>
          </form>
        )}
      </div>
    </div>
  )
}
