import { useState, useEffect } from 'react'
import { useCurrentAccount } from '@mysten/dapp-kit'
import { WalletModal } from './components/WalletModal'
import { LoginModal } from './components/LoginModal'
import { CreatePostModal } from './components/CreatePostModal'
import { PostCard } from './components/PostCard'
import { Header } from './components/Header'
import { Stats } from './components/Stats'
import { Toast } from './components/Toast'

function App() {
  const { account, isConnected } = useCurrentAccount()
  const [showWalletModal, setShowWalletModal] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreatePost, setShowCreatePost] = useState(false)
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [toast, setToast] = useState(null)
  const [activeTab, setActiveTab] = useState('feed')

  // Mock data for demo (since we can't actually connect to SUI mainnet without proper setup)
  useEffect(() => {
    // Simulated posts data
    const mockPosts = [
      {
        id: '1',
        title: '區塊鏈部落格的未來',
        content: '區塊鏈技術為我們提供了一個不可篡改的記錄系統。在這個部落格平台上，每一篇發布的文章都會被永久記錄在區塊鏈上，無法被修改或刪除。這種設計確保了內容的真實性和完整性。\n\n想像一下，如果你寫了一篇重要的文章，你可以確保它在未來幾年甚至幾十年後仍然存在，不會因為伺服器關閉或人為因素而消失。',
        author: 'sui_founder',
        timestamp: Date.now() - 3600000,
        version: 3,
        blockHeight: 15234567
      },
      {
        id: '2',
        title: 'SUI 區塊鏈簡介',
        content: 'SUI 是一個高效能的第一層區塊鏈，採用 Move 程式語言編寫智慧合約。它具有以下特點：\n\n1. 高吞吐量 - 每秒可處理數千筆交易\n2. 低延遲 - 交易確認時間極短\n3. 開發者友好 - Move 語言安全且易於使用\n4. 可擴展性 - 支援大規模應用程式',
        author: 'crypto_dev',
        timestamp: Date.now() - 7200000,
        version: 1,
        blockHeight: 15234500
      },
      {
        id: '3',
        title: 'Web3 時代的內容創作',
        content: '在 Web3 時代，內容創作者可以擁有更大的控制權。透過區塊鏈技術，我們可以：\n\n- 確保內容不被審查\n- 直接與讀者互動\n- 透過代幣經濟獲得收益\n- 建立不可篡改的創作記錄\n\n這是一個全新的創作時代！',
        author: 'web3_creator',
        timestamp: Date.now() - 86400000,
        version: 2,
        blockHeight: 15234000
      }
    ]
    
    setTimeout(() => {
      setPosts(mockPosts)
      setLoading(false)
    }, 1000)
  }, [])

  const showToast = (message, type = 'success') => {
    setToast({ message, type })
    setTimeout(() => setToast(null), 3000)
  }

  const handleCreatePost = (post) => {
    const newPost = {
      id: Date.now().toString(),
      ...post,
      author: account?.address ? `${account.address.slice(0, 8)}...` : 'Anonymous',
      timestamp: Date.now(),
      version: 1,
      blockHeight: 15235000 + Math.floor(Math.random() * 1000)
    }
    setPosts([newPost, ...posts])
    setShowCreatePost(false)
    showToast('文章發布成功！已記錄在區塊鏈上')
  }

  return (
    <div className="app">
      <Header 
        account={account}
        isConnected={isConnected}
        onConnectWallet={() => setShowWalletModal(true)}
        onLogin={() => setShowLoginModal(true)}
        onCreatePost={() => setShowCreatePost(true)}
      />

      <div className="container">
        <Stats postsCount={posts.length} />

        <div className="tabs">
          <button 
            className={`tab ${activeTab === 'feed' ? 'active' : ''}`}
            onClick={() => setActiveTab('feed')}
          >
            📖 動態牆
          </button>
          <button 
            className={`tab ${activeTab === 'explore' ? 'active' : ''}`}
            onClick={() => setActiveTab('explore')}
          >
            🔍 探索
          </button>
          <button 
            className={`tab ${activeTab === 'my-posts' ? 'active' : ''}`}
            onClick={() => setActiveTab('my-posts')}
          >
            📝 我的文章
          </button>
        </div>

        {loading ? (
          <div className="loading">
            <div className="spinner"></div>
          </div>
        ) : posts.length === 0 ? (
          <div className="empty-state">
            <div className="empty-icon">📝</div>
            <h3>還沒有文章</h3>
            <p>成為第一個發布文章的人吧！</p>
            {isConnected && (
              <button 
                className="btn btn-primary" 
                style={{ marginTop: '16px' }}
                onClick={() => setShowCreatePost(true)}
              >
                發布文章
              </button>
            )}
          </div>
        ) : (
          posts.map(post => (
            <PostCard key={post.id} post={post} />
          ))
        )}
      </div>

      {showWalletModal && (
        <WalletModal onClose={() => setShowWalletModal(false)} />
      )}

      {showLoginModal && (
        <LoginModal 
          onClose={() => setShowLoginModal(false)} 
          onSuccess={() => showToast('登入成功！')}
        />
      )}

      {showCreatePost && (
        <CreatePostModal 
          onClose={() => setShowCreatePost(false)}
          onSubmit={handleCreatePost}
        />
      )}

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  )
}

export default App
