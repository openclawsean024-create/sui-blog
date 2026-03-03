import { useState } from 'react'

export function CreatePostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    // Simulate blockchain transaction
    await new Promise(resolve => setTimeout(resolve, 2000))

    onSubmit({ title, content })
    setLoading(false)
  }

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">✍️ 發布文章</h2>
          <button className="modal-close" onClick={onClose}>×</button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">標題</label>
            <input
              type="text"
              className="form-input"
              placeholder="輸入文章標題"
              value={title}
              onChange={e => setTitle(e.target.value)}
              required
              maxLength={100}
            />
          </div>

          <div className="form-group">
            <label className="form-label">內容</label>
            <textarea
              className="form-textarea"
              placeholder="輸入文章內容..."
              value={content}
              onChange={e => setContent(e.target.value)}
              required
              minLength={10}
            />
            <div style={{ 
              textAlign: 'right', 
              fontSize: '12px', 
              color: 'var(--text-muted)',
              marginTop: '4px'
            }}>
              {content.length} 字
            </div>
          </div>

          <div style={{ 
            padding: '16px', 
            background: 'rgba(111, 179, 233, 0.1)', 
            borderRadius: '12px',
            marginBottom: '20px',
            fontSize: '13px',
            color: 'var(--primary)'
          }}>
            <p>⚠️ 重要提醒：</p>
            <ul style={{ marginTop: '8px', paddingLeft: '20px' }}>
              <li>文章發布後將<strong>無法修改或刪除</strong></li>
              <li>如需更新，請<strong>發布新文章</strong></li>
              <li>所有內容將<strong>永久記錄</strong>在區塊鏈上</li>
            </ul>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary" 
            style={{ width: '100%' }}
            disabled={loading || !title || !content}
          >
            {loading ? (
              <span>
                <span className="spinner" style={{ width: '16px', height: '16px' }}></span>
                {' '}正在上鏈中...
              </span>
            ) : (
              '⛓️ 發布到區塊鏈'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
