import { useState } from 'react'

export function CreatePostModal({ onClose, onSubmit }) {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [loading, setLoading] = useState(false)
  const [step, setStep] = useState('editing')

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setStep('signing')
    await new Promise((resolve) => setTimeout(resolve, 900))
    setStep('publishing')
    await new Promise((resolve) => setTimeout(resolve, 1200))

    onSubmit({ title, content, publishStatus: 'published-demo' })
    setLoading(false)
    setStep('editing')
  }

  const stepLabel = {
    editing: '準備發佈',
    signing: '模擬簽章中',
    publishing: '模擬發佈中'
  }[step]

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h2 className="modal-title">撰寫新文章</h2>
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
              onChange={(e) => setTitle(e.target.value)}
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
              onChange={(e) => setContent(e.target.value)}
              required
              minLength={10}
            />
            <div className="form-counter">{content.length} 字</div>
          </div>

          <div className="publish-box">
            <p className="publish-title">發佈流程 demo</p>
            <ul>
              <li>建立內容草稿</li>
              <li>模擬錢包簽章</li>
              <li>模擬送出 publish transaction</li>
            </ul>
            <div className="publish-step">目前狀態：{stepLabel}</div>
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
                {' '}處理中...
              </span>
            ) : (
              '模擬發佈文章'
            )}
          </button>
        </form>
      </div>
    </div>
  )
}
