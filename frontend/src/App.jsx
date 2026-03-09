import { useMemo, useState } from 'react'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { WalletModal } from './components/WalletModal'
import { LoginModal } from './components/LoginModal'
import { CreatePostModal } from './components/CreatePostModal'
import { PostCard } from './components/PostCard'
import { Header } from './components/Header'
import { Stats } from './components/Stats'
import { Toast } from './components/Toast'

const MOCK_POSTS = [
  {
    id: '1',
    title: 'SUI Deck：把研究、觀點與上鏈敘事整合在同一個前台',
    content:
      'SUI Deck BLOG 不是單純的加密部落格，而是把研究筆記、敘事文章與可驗證的鏈上發佈流程整合成同一個產品界面。這代表內容不只可讀，也更接近可以驗證、可以引用、可以持續演進的資產。\n\n第一版先從高質感前端與清楚的產品定位開始，下一步再逐步接上真實的錢包簽章與 Move 合約。',
    author: 'deck_editor',
    timestamp: Date.now() - 1000 * 60 * 36,
    version: 3,
    blockHeight: 15234567,
    tag: '產品定位',
    readTime: '4 分鐘'
  },
  {
    id: '2',
    title: '為什麼 SUI 適合做內容型產品：速度、物件模型、互動感',
    content:
      '大部分內容產品在鏈上都會遇到兩個問題：交易體驗太重，以及資料模型不夠自然。SUI 的物件模型讓內容、作者、版本、互動可以被更細緻地建模，這對「文章版本」、「系列內容」與「內容資產化」非常重要。\n\n這也是 SUI Deck BLOG 想做的方向：不是把 Web2 部落格硬搬上鏈，而是重新思考內容本身該如何被擁有、被追蹤、被轉譯。',
    author: 'sui_research',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    version: 2,
    blockHeight: 15234120,
    tag: '研究洞察',
    readTime: '6 分鐘'
  },
  {
    id: '3',
    title: '內容、Deck、Insight 三條線如何變成同一個品牌體驗',
    content:
      '未來的內容站不該只是文章列表。對創作者、投資人與生態參與者來說，更重要的是一個可被快速理解的 knowledge surface：今天發生了什麼、哪些觀點重要、哪些內容值得收藏。\n\nSUI Deck BLOG 的前端要像一個編輯化的產品入口，而不是單純的 feed。這也是這次第一輪改版的重點。',
    author: 'studio_lead',
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    version: 1,
    blockHeight: 15233005,
    tag: '品牌策略',
    readTime: '5 分鐘'
  }
]

function App() {
  const account = useCurrentAccount()
  const isConnected = !!account?.address
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState('featured')
  const [posts, setPosts] = useState(MOCK_POSTS)

  const featuredPost = posts[0]

  const filteredPosts = useMemo(() => {
    if (activeTab === 'featured') return posts
    if (activeTab === 'research') return posts.filter((post) => post.tag === '研究洞察')
    if (activeTab === 'signals') return posts.filter((post) => post.tag !== '研究洞察')
    if (activeTab === 'my-posts' && isConnected) {
      return posts.filter((post) => post.author.includes(account.address.slice(0, 8)))
    }
    if (activeTab === 'my-posts' && !isConnected) return []
    return posts
  }, [activeTab, posts, isConnected, account])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    window.clearTimeout(showToast._timer)
    showToast._timer = window.setTimeout(() => setToast(null), 2800)
  }

  const handleCreatePost = (post) => {
    const shortAddress = account?.address ? account.address.slice(0, 8) : 'guest'
    const newPost = {
      id: Date.now().toString(),
      ...post,
      author: shortAddress,
      timestamp: Date.now(),
      version: 1,
      blockHeight: 15235000 + Math.floor(Math.random() * 1000),
      tag: '創作者投稿',
      readTime: `${Math.max(2, Math.ceil(post.content.length / 180))} 分鐘`
    }
    setPosts([newPost, ...posts])
    setShowCreatePost(false)
    showToast('新文章已加入展示 feed，下一步可接真實鏈上交易。')
  }

  return (
    <div className="app-shell">
      <Header
        account={account}
        isConnected={isConnected}
        onConnectWallet={() => setShowWalletModal(true)}
        onLogin={() => setShowLoginModal(true)}
        onCreatePost={() => setShowCreatePost(true)}
      />

      <main className="container">
        <section className="hero card hero-card">
          <div className="hero-copy">
            <span className="eyebrow">SUI Deck BLOG</span>
            <h1>把 SUI 生態觀點、研究筆記與內容資產，做成可展示的編輯化前台。</h1>
            <p>
              這不是單純的 Web3 部落格 demo，而是一個結合 <strong>內容、研究、deck 感敘事</strong> 的產品雛形。
              第一版先完成品牌化前端與互動工作流，下一階段再接上真實的 SUI 錢包與 Move 合約。
            </p>
            <div className="hero-actions">
              <button className="btn btn-primary" onClick={() => setShowCreatePost(true)}>
                ✍️ 開始寫一篇 Insight
              </button>
              <button className="btn btn-secondary" onClick={() => setActiveTab('research')}>
                🔎 看研究內容
              </button>
            </div>
          </div>
          <div className="hero-panel">
            <div className="hero-metric">
              <span>定位</span>
              <strong>Editorial × Onchain</strong>
            </div>
            <div className="hero-metric">
              <span>目前階段</span>
              <strong>Productized Frontend MVP</strong>
            </div>
            <div className="hero-metric">
              <span>下一步</span>
              <strong>Wallet Sign + Move Publish</strong>
            </div>
          </div>
        </section>

        <Stats postsCount={posts.length} usersCount={1280} blocksCount={15235000} />

        <section className="grid-two">
          <div className="card spotlight-card">
            <div className="section-head">
              <span className="section-kicker">Featured Deck</span>
              <h2>{featuredPost.title}</h2>
            </div>
            <p className="spotlight-body">{featuredPost.content.slice(0, 220)}…</p>
            <div className="spotlight-meta">
              <span>作者 @{featuredPost.author}</span>
              <span>{featuredPost.readTime}</span>
              <span>區塊 #{featuredPost.blockHeight.toLocaleString()}</span>
            </div>
          </div>

          <div className="card rail-card">
            <div className="section-head">
              <span className="section-kicker">Why it matters</span>
              <h2>這一版先把產品感做對</h2>
            </div>
            <ul className="bullet-list">
              <li>收斂成 SUI-focused insight / deck / blog destination</li>
              <li>保留現有 React 架構，不做重型重寫</li>
              <li>用 demo data 呈現未來鏈上內容產品的形狀</li>
              <li>下一階段再接真實 wallet、author profile、publish flow</li>
            </ul>
          </div>
        </section>

        <div className="tabs product-tabs">
          <button className={`tab ${activeTab === 'featured' ? 'active' : ''}`} onClick={() => setActiveTab('featured')}>
            主編精選
          </button>
          <button className={`tab ${activeTab === 'research' ? 'active' : ''}`} onClick={() => setActiveTab('research')}>
            研究洞察
          </button>
          <button className={`tab ${activeTab === 'signals' ? 'active' : ''}`} onClick={() => setActiveTab('signals')}>
            敘事 Signals
          </button>
          <button className={`tab ${activeTab === 'my-posts' ? 'active' : ''}`} onClick={() => setActiveTab('my-posts')}>
            我的內容
          </button>
        </div>

        {!filteredPosts.length ? (
          <div className="empty-state card">
            <div className="empty-icon">🪪</div>
            <h3>{isConnected ? '你還沒有內容' : '先連接錢包查看個人內容'}</h3>
            <p>{isConnected ? '建立第一篇文章，測試這個前端工作流。' : '目前「我的內容」需要先接上錢包地址與鏈上身份。'}</p>
          </div>
        ) : (
          filteredPosts.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </main>

      {showWalletModal && <WalletModal onClose={() => setShowWalletModal(false)} />}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onSuccess={() => showToast('登入流程已完成（目前為 demo 模式）。')} />}
      {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} onSubmit={handleCreatePost} />}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default App
