import { useMemo, useState } from 'react'
import {
  useCurrentAccount,
  useDisconnectWallet,
  useSignPersonalMessage,
} from '@mysten/dapp-kit'
import {
  useNavigate,
  useLocation,
  Routes,
  Route,
  Navigate,
  useParams,
} from 'react-router-dom'
import { WalletModal } from './components/WalletModal'
import { LoginModal } from './components/LoginModal'
import { CreatePostModal } from './components/CreatePostModal'
import { WithdrawModal } from './components/WithdrawModal'
import { PostCard } from './components/PostCard'
import { Header } from './components/Header'
import { Stats } from './components/Stats'
import { Toast } from './components/Toast'

const MOCK_POSTS = [
  {
    id: '1',
    title: 'SUI Deck：把研究觀點上鏈之前，先把內容產品化',
    content:
      'SUI Deck BLOG 不是單純的加密部落格，而是把研究筆記、市場觀察、觀點文章與可驗證內容流程整合成一個內容產品。第一階段的重點不是急著上鏈，而是先把內容展示、編輯體驗與資訊架構做得足夠清楚，讓之後接上錢包簽章與 Move 合約時，整體產品依然成立。',
    author: 'deck_editor',
    timestamp: Date.now() - 1000 * 60 * 36,
    version: 3,
    blockHeight: 15234567,
    tag: '產品定位',
    readTime: '4 分鐘',
    publishStatus: 'published-demo',
  },
  {
    id: '2',
    title: '為什麼 SUI 適合做內容資產：速度、物件模型、可編排性',
    content:
      '多數內容平台卡在兩件事：交互太慢，以及內容模組不夠細。SUI 的物件模型讓文章、作者、版本、權限與發佈流程都能被更細緻地建模。這對研究內容、系統內容與可追蹤知識資產特別重要，也讓未來做出真正可驗證的內容平台變得更可行。',
    author: 'sui_research',
    timestamp: Date.now() - 1000 * 60 * 60 * 5,
    version: 2,
    blockHeight: 15234120,
    tag: '研究洞察',
    readTime: '6 分鐘',
    publishStatus: 'published-demo',
  },
  {
    id: '3',
    title: '內容、Deck、Insight 三條線，為何要整合成同一個入口',
    content:
      '面向創作者、投資人與開發者的內容，不該只是靜態文章列表。更好的做法是建立一個可以快速理解今日重點、近期研究與重要信號的 knowledge surface。SUI Deck BLOG 的第一輪前端，就是朝這種更像產品而不是單純 feed 的方向推進。',
    author: 'studio_lead',
    timestamp: Date.now() - 1000 * 60 * 60 * 22,
    version: 1,
    blockHeight: 15233005,
    tag: '內容策略',
    readTime: '5 分鐘',
    publishStatus: 'published-demo',
  },
]

function HomeView({
  posts,
  activeTab,
  setActiveTab,
  isConnected,
  account,
  onCreatePost,
  openPost,
  openAuthor,
  userProfile,
  onOpenWithdraw,
}) {
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

  return (
    <>
      <section className="hero card hero-card">
        <div className="hero-copy">
          <span className="eyebrow">SUI Deck BLOG</span>
          <h1>把 SUI 的觀點、研究筆記與內容資產，做成真正可持續發展的內容產品。</h1>
          <p>
            這不是單純的 Web3 部落格 demo，而是一個把 <strong>研究內容、deck 展示與內容資產</strong>
            結合的產品原型。現階段已完成第一輪前端與互動流程，並加入帳號登入、錢包綁定與提領安全流程 demo。
          </p>
          <div className="hero-actions">
            <button className="btn btn-primary" onClick={onCreatePost}>開始撰寫 Insight</button>
            <button className="btn btn-secondary" onClick={() => setActiveTab('research')}>查看研究內容</button>
            <button className="btn btn-secondary" onClick={onOpenWithdraw}>提領資產</button>
          </div>
        </div>
        <div className="hero-panel">
          <div className="hero-metric"><span>帳號模式</span><strong>{userProfile.username ? `@${userProfile.username}` : '尚未登入'}</strong></div>
          <div className="hero-metric"><span>錢包綁定</span><strong>{userProfile.boundWallet ? '已綁定錢包' : '尚未綁定'}</strong></div>
          <div className="hero-metric"><span>提領安全</span><strong>密碼驗證 + 錢包簽章</strong></div>
        </div>
      </section>

      <Stats postsCount={posts.length} usersCount={1280} blocksCount={15235000} />

      <section className="grid-two">
        <div className="card spotlight-card">
          <div className="section-head">
            <span className="section-kicker">Featured Deck</span>
            <h2>{featuredPost.title}</h2>
          </div>
          <p className="spotlight-body">{featuredPost.content.slice(0, 220)}...</p>
          <div className="spotlight-meta">
            <button className="link-button spotlight-link" onClick={() => openAuthor(featuredPost.author)}>作者 @{featuredPost.author}</button>
            <span>{featuredPost.readTime}</span>
            <button className="link-button spotlight-link" onClick={() => openPost(featuredPost.id)}>查看詳情</button>
          </div>
        </div>

        <div className="card rail-card">
          <div className="section-head">
            <span className="section-kicker">Security Flow</span>
            <h2>帳號登入與錢包綁定怎麼配合？</h2>
          </div>
          <ul className="bullet-list">
            <li>平常登入可使用帳號密碼</li>
            <li>登入後綁定一個 SUI 錢包</li>
            <li>提領時需再次輸入密碼</li>
            <li>最後再用綁定錢包簽章確認，不收助記詞</li>
          </ul>
        </div>
      </section>

      <div className="tabs product-tabs">
        <button className={`tab ${activeTab === 'featured' ? 'active' : ''}`} onClick={() => setActiveTab('featured')}>主編精選</button>
        <button className={`tab ${activeTab === 'research' ? 'active' : ''}`} onClick={() => setActiveTab('research')}>研究洞察</button>
        <button className={`tab ${activeTab === 'signals' ? 'active' : ''}`} onClick={() => setActiveTab('signals')}>市場 Signals</button>
        <button className={`tab ${activeTab === 'my-posts' ? 'active' : ''}`} onClick={() => setActiveTab('my-posts')}>我的內容</button>
      </div>

      {!filteredPosts.length ? (
        <div className="empty-state card">
          <div className="empty-icon">✦</div>
          <h3>{isConnected ? '你還沒有內容' : '登入後查看你的個人內容'}</h3>
          <p>{isConnected ? '建立第一篇文章，開始測試整個前端工作流。' : '切換到「我的內容」需要先連接錢包或登入。'}</p>
        </div>
      ) : (
        filteredPosts.map((post) => (
          <PostCard key={post.id} post={post} onOpenPost={openPost} onOpenAuthor={openAuthor} />
        ))
      )}
    </>
  )
}

function PostView({ posts, openAuthor, goHome }) {
  const { postId } = useParams()
  const selectedPost = posts.find((post) => post.id === postId) || posts[0]

  return (
    <section className="card detail-card">
      <button className="back-link" onClick={goHome}>← 返回首頁</button>
      <div className="detail-header">
        <span className="section-kicker">Post Detail</span>
        <h1 className="detail-title">{selectedPost.title}</h1>
        <div className="detail-meta">
          <button className="link-button spotlight-link" onClick={() => openAuthor(selectedPost.author)}>作者 @{selectedPost.author}</button>
          <span>{selectedPost.readTime}</span>
          <span>區塊 #{selectedPost.blockHeight.toLocaleString()}</span>
          <span>版本 v{selectedPost.version}</span>
        </div>
      </div>
      <div className="detail-layout">
        <article className="detail-content">{selectedPost.content}</article>
        <aside className="detail-side">
          <div className="hero-metric"><span>內容標籤</span><strong>{selectedPost.tag}</strong></div>
          <div className="hero-metric"><span>Publish 狀態</span><strong>{selectedPost.publishStatus === 'published-demo' ? 'Published Demo' : 'Draft'}</strong></div>
          <div className="hero-metric"><span>下一步</span><strong>接真實簽章與鏈上交易回執</strong></div>
        </aside>
      </div>
    </section>
  )
}

function AuthorView({ posts, openPost, openAuthor, goHome }) {
  const { authorId } = useParams()
  const authorPosts = posts.filter((post) => post.author === authorId)

  return (
    <section className="card detail-card">
      <button className="back-link" onClick={goHome}>← 返回首頁</button>
      <div className="detail-header">
        <span className="section-kicker">Author Profile</span>
        <h1 className="detail-title">@{authorId}</h1>
        <div className="detail-summary">目前共 {authorPosts.length} 篇文章，聚焦在 SUI 研究、內容策略與產品化觀點。</div>
      </div>
      <div className="author-grid">
        <div className="hero-metric"><span>作者狀態</span><strong>Demo Author</strong></div>
        <div className="hero-metric"><span>文章數</span><strong>{authorPosts.length}</strong></div>
        <div className="hero-metric"><span>最近更新</span><strong>{authorPosts[0] ? new Date(authorPosts[0].timestamp).toLocaleDateString('zh-TW') : '尚無資料'}</strong></div>
      </div>
      <div className="author-posts">
        {authorPosts.map((post) => (
          <PostCard key={post.id} post={post} onOpenPost={openPost} onOpenAuthor={openAuthor} />
        ))}
      </div>
    </section>
  )
}

function AppShell() {
  const account = useCurrentAccount()
  const isConnected = !!account?.address
  const { mutate: disconnectWallet } = useDisconnectWallet()
  const { mutateAsync: signPersonalMessage } = useSignPersonalMessage()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [showWithdrawModal, setShowWithdrawModal] = useState(false)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState('featured')
  const [posts, setPosts] = useState(MOCK_POSTS)
  const [userProfile, setUserProfile] = useState({ username: '', password: '', boundWallet: '' })
  const navigate = useNavigate()
  const location = useLocation()

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    window.clearTimeout(showToast._timer)
    showToast._timer = window.setTimeout(() => setToast(null), 3200)
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
      tag: '編輯草稿',
      readTime: `${Math.max(2, Math.ceil(post.content.length / 180))} 分鐘`,
    }
    setPosts([newPost, ...posts])
    setShowCreatePost(false)
    navigate(`/post/${newPost.id}`)
    showToast('文章已加入展示 feed，並完成 publish demo 流程。')
  }

  const handleLoginSuccess = ({ username, password, isRegister }) => {
    setUserProfile((prev) => ({ ...prev, username, password }))
    showToast(isRegister ? '帳號建立完成，接下來可以綁定錢包。' : '登入成功，可繼續綁定錢包。')
  }

  const handleWalletConnected = (walletName) => {
    if (!account?.address) {
      showToast(`已發起 ${walletName} 連線，請完成錢包授權。`)
      return
    }
    setUserProfile((prev) => ({ ...prev, boundWallet: account.address }))
    showToast(`已綁定錢包 ${account.address.slice(0, 6)}...${account.address.slice(-4)}`)
  }

  const handleDisconnect = () => {
    disconnectWallet()
    setUserProfile((prev) => ({ ...prev, boundWallet: '' }))
    showToast('錢包已中斷連線。')
  }

  const handleWithdraw = async ({ amount, password }) => {
    if (!userProfile.username) {
      showToast('請先登入帳號。', 'error')
      return
    }
    if (!userProfile.boundWallet || !account?.address) {
      showToast('請先綁定錢包。', 'error')
      return
    }
    if (password !== userProfile.password) {
      showToast('密碼驗證失敗，無法提領。', 'error')
      return
    }

    try {
      const message = new TextEncoder().encode(`Withdraw ${amount} SUI from @${userProfile.username}`)
      await signPersonalMessage({ message })
      showToast(`已完成簽章，提領 ${amount} SUI 的流程驗證成功。`)
      setShowWithdrawModal(false)
    } catch (error) {
      showToast(error?.message || '簽章失敗，請在錢包中確認。', 'error')
    }
  }

  const openPost = (postId) => navigate(`/post/${postId}`)
  const openAuthor = (author) => navigate(`/author/${author}`)
  const goHome = () => navigate('/')

  return (
    <div className="app-shell">
      <Header
        account={account}
        isConnected={isConnected}
        onConnectWallet={() => setShowWalletModal(true)}
        onDisconnectWallet={handleDisconnect}
        onLogin={() => setShowLoginModal(true)}
        onCreatePost={() => setShowCreatePost(true)}
        onGoHome={goHome}
        currentView={location.pathname === '/' ? 'home' : 'detail'}
      />

      <main className="container">
        <Routes>
          <Route
            path="/"
            element={
              <HomeView
                posts={posts}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                isConnected={isConnected}
                account={account}
                onCreatePost={() => setShowCreatePost(true)}
                openPost={openPost}
                openAuthor={openAuthor}
                userProfile={userProfile}
                onOpenWithdraw={() => setShowWithdrawModal(true)}
              />
            }
          />
          <Route path="/post/:postId" element={<PostView posts={posts} openAuthor={openAuthor} goHome={goHome} />} />
          <Route path="/author/:authorId" element={<AuthorView posts={posts} openPost={openPost} openAuthor={openAuthor} goHome={goHome} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {showWalletModal && (
        <WalletModal
          onClose={() => setShowWalletModal(false)}
          onConnected={handleWalletConnected}
          onError={(error) => showToast(error?.message || '錢包連線失敗', 'error')}
        />
      )}
      {showLoginModal && <LoginModal onClose={() => setShowLoginModal(false)} onSuccess={handleLoginSuccess} />}
      {showCreatePost && <CreatePostModal onClose={() => setShowCreatePost(false)} onSubmit={handleCreatePost} />}
      {showWithdrawModal && (
        <WithdrawModal
          onClose={() => setShowWithdrawModal(false)}
          onSubmit={handleWithdraw}
          walletBound={Boolean(userProfile.boundWallet && account?.address)}
        />
      )}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default function App() {
  return <AppShell />
}
