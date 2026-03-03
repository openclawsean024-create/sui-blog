export function PostCard({ post }) {
  const formatTime = (timestamp) => {
    const date = new Date(timestamp)
    const now = new Date()
    const diff = now - date
    
    if (diff < 60000) return '剛剛'
    if (diff < 3600000) return `${Math.floor(diff / 60000)} 分鐘前`
    if (diff < 86400000) return `${Math.floor(diff / 3600000)} 小時前`
    return date.toLocaleDateString('zh-TW')
  }

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-meta">
          <span className="post-author">@{post.author}</span>
          <span className="post-timestamp">{formatTime(post.timestamp)}</span>
        </div>
        <span className="post-version">v{post.version}</span>
      </div>
      
      <h2 className="post-title">{post.title}</h2>
      <p className="post-content">{post.content}</p>
      
      <div className="post-footer">
        <div className="post-blockchain">
          <span>🔗</span>
          <span>區塊 #{post.blockHeight?.toLocaleString()}</span>
        </div>
        <div className="post-stat">
          <span>💾</span>
          <span>已上鏈</span>
        </div>
        <div className="post-stat">
          <span>⛓️</span>
          <span>不可篡改</span>
        </div>
      </div>
    </div>
  )
}
