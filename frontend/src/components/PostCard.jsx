export function PostCard({ post, onOpenPost, onOpenAuthor }) {
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
          <button className="link-button post-author" onClick={() => onOpenAuthor?.(post.author)}>@{post.author}</button>
          <span className="post-timestamp">{formatTime(post.timestamp)}</span>
        </div>
        <span className="post-version">v{post.version}</span>
      </div>

      <button className="link-button block-button" onClick={() => onOpenPost?.(post.id)}>
        <h2 className="post-title">{post.title}</h2>
      </button>
      <p className="post-content">{post.content}</p>

      <div className="post-footer">
        <div className="post-blockchain">
          <span>鏈上定位</span>
          <span>區塊 #{post.blockHeight?.toLocaleString()}</span>
        </div>
        <div className="post-stat">
          <span>{post.tag}</span>
          <span>{post.readTime}</span>
        </div>
        <button className="link-button post-stat" onClick={() => onOpenPost?.(post.id)}>
          查看詳情
        </button>
      </div>
    </div>
  )
}
