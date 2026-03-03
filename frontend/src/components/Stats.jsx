export function Stats({ postsCount, usersCount = 128, blocksCount = 15235000 }) {
  return (
    <div className="stats-grid">
      <div className="stat-card">
        <div className="stat-value">{postsCount}</div>
        <div className="stat-label">📝 總文章數</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{usersCount.toLocaleString()}</div>
        <div className="stat-label">👥 註冊用戶</div>
      </div>
      <div className="stat-card">
        <div className="stat-value">{(blocksCount / 1000000).toFixed(1)}M</div>
        <div className="stat-label">🔗 區塊高度</div>
      </div>
    </div>
  )
}
