# 【Sui Blog】規格計劃書

## 1. 專案概述

### 1.1 專案背景與目的

Web3 內容創作正在快速成長，但多數創作者仍被困在傳統 Web2 平台——言論審查、平台抽成、沒有辦法直接接受讀者贊助。Sigle 和 Mirror.xyz 打開了 Web3 原生內容創作的可能性，但在 Sui 生態系中，這樣的工具仍然匱乏。本工具是以 Sui 區塊鏈為核心的部落格平台：創作者以 Sui 錢包登入（Petra / Martian），文章內容存於去中心化存儲（IPFS），讀者可以直接用 SUI 代幣打賞，創作者也沒有平台抽成。這不只是一個部落格，而是 Web3 創作者與讀者之間的直接價值流轉通道。
### 1.2 目標受眾（TA）

- Sui 生態投資者 — 需要深度技術文章和生態項目分析
- Web3 內容創作者 — 想把內容變現，但不想被平台抽成
- DAO 治理參與者 — 需要一個去中心化的方式發表治理提案和討論
- Sui 開發者 — 需要一個分享技術文章的舞台，建立個人品牌
### 1.3 專案範圍

### In Scope（做）

- Sui 錢包登入（Petra / Martian / Sui Wallet）
- 錢包地址驗證與顯示
- Markdown 所見即所得編輯器
- 文章發布（存 IPFS，附 Sui 交易 hash）
- 標籤 / 分類系統
- 文章付費牆（可選，用 SUI 代幣解鎖）
- SUI 代幣打賞功能（鏈上即時轉帳）
- 贊助者徽章顯示 / 錢包內 NFT 畫廊展示
- 評論系統（鏈上或近鏈儲存可選）
### Out of Scope（不做）

- 多鏈支援（僅 Sui）
- 完整的 NFT 交易市場
- 即時訊息系統 / 行動應用程式
### 1.4 參考網站分析

Sigle (sigle.io) — Web3 原生、支援 ENS，但目前專注 Ethereum/Deso。
Mirror.xyz (mirror.xyz) — 多人協作、代幣發行，但偏 Ethereum，生態封閉。
Distrikt (distrikt.io) — 專業 UI、內容品質高，但無代幣打賞。
DeSo Social (deso.org) — 去中心化社交、區塊鏈原生，但對 Sui 生態支援有限。
## 2. 資訊架構與動線

### 2.1 網站地圖（Sitemap）

Sui Blog：首頁（動態 feed）→ 文章列表（依分類/標籤）→ 文章詳情頁→ 個人作者頁→ 創作中心→ 錢包設定
### 2.2 使用者動線

```mermaid\nflowchart TD\n    A([讀者進入首頁]) --> B[瀏覽最新文章]\n    B --> C[點擊文章]\n    C --> D[閱讀文章內容]\n    D --> E{文章是否付費牆?}\n    E -->|是| F[需要解鎖付費牆]\n    E -->|否| G{是否打賞?}\n    F --> H[支付 SUI 解鎖]\n    H --> I[解鎖成功，繼續閱讀]\n    G -->|是| J[輸入 SUI 金額並打賞]\n    J --> K[鏈上轉帳即時完成]\n    G -->|否| L[繼續閱讀或關閉]\n    I --> L\n    K --> L\n    L --> M[查看作者錢包 NFT]\n    M --> N([離開或繼續閱讀其他文章])\n    A --> O[點擊創作中心入口]\n    O --> P[錢包未連接則引導連接]\n    P --> Q[錢包已連接進入編輯器]\n    Q --> R[撰寫 Markdown 文章]\n    R --> S[設定標籤 / 付費牆]\n    S --> T[發布文章]\n    T --> U[文章上傳 IPFS 並鑄造 Sui 交易]\n    U --> V[獲得文章 URL]\n    V --> W([文章上線])\n```
### 2.3 使用者旅程圖

```mermaid\njourney\n    title Sui 部落格旅程\n    section 發現內容\n      在 Twitter 看到文章連結: 5: Sui 投資者\n      在首頁滑到有興趣的標題: 4: 開發者\n    section 閱讀體驗\n      點進文章閱讀: 5: 所有讀者\n      看到作者錢包資料感到信任: 4: Web3 用戶\n      發現內容有付費牆: 3: 一般讀者\n    section 互動階段\n      看完後想要打賞支持: 5: 忠實讀者\n      輸入 SUI 金額並送出: 5: 粉絲\n      看到自己出現在贊助者徽章: 4: 打賞者\n    section 創作階段\n      申請創作帳號並連接錢包: 5: 創作者\n      用 Markdown 撰寫技術文章: 5: 開發者\n      發布後收到第一筆打賞: 5: 新創作者\n```
## 3. 視覺與 UI

### 3.1 品牌設計指南

- Primary: #6D28D9 — 主要按鈕、品牌元素（Sui 紫色系）
- Secondary: #0F172A — 深色背景、主要容器
- Accent: #10B981 — 打賞成功、NFT 展示
- Sui Purple: #A855F7 — Sui 生態標示、錢包相關元素
- Background: #0F0F23 / Card BG: #1A1A2E
- 字體：標題 Inter 700 / 內文 Inter 400-500 / 程式碼 JetBrains Mono
### 3.2 跨裝置支援

- Desktop ≥ 1024px：完整功能，文章詳情頁雙欄，編輯器全功能
- Tablet 768-1023px：單欄，編輯器工具列簡化
- Mobile < 768px：閱讀為主，編輯器功能完整但較不方便
## 4. 前端功能規格

- Sui 錢包連接：Petra / Martian / Sui Wallet，支援多重錢包切換
- 錢包地址驗證：顯示錢包地址（ENS 解析如支援），截斷顯示
- 首頁 Feed：最新文章列表，支援分頁，置頂文章高亮
- Markdown 編輯器：所見即所得，左側編輯右側預覽，支援程式碼語法高亮
- 文章付費牆：可選開關，設定解鎖費用（以 SUI 計算）
- IPFS 上傳：文章內容上傳至 IPFS，顯示 CID 與交易 hash
- SUI 打賞：輸入金額，錢包彈窗確認，鏈上即時轉帳
- 贊助者徽章：打賞過的讀者錢包地址顯示於文章內
- NFT 畫廊：錢包內 NFT 抓取並以 Grid 展示，點擊放大
- 評論系統：近鏈儲存（評論 hash 上鍊，內文存 Supabase）
- 標籤 / 分類：文章可加多個標籤，支援標籤雲與標籤過濾
## 5. 後端與技術規格

### 5.1 技術棧

- 前端框架：Next.js 14（App Router）+ Tailwind CSS
- 錢包 SDK：@mysten/sui.js
- 後端框架：Next.js API Routes
- 文章存儲：IPFS（via Pinata 或 web3.storage）+ Supabase（評論/元數據）
- NFT 資料：Sui RPC API（讀取錢包內 NFT）
- 轉帳：@mysten/sui.js（Coin 轉移）
- 部署：Vercel
### 5.2 第三方 API 串接

- Pinata：IPFS 檔案上傳（免費 1GB，付費 $0.0005/GB）
- web3.storage：IPFS 備選方案（免費額度）
- Sui RPC：讀取錢包 NFT / 鏈上資料（免費公開 RPC）
- Supabase：文章元數據 / 評論儲存（免費 Starter）
## 6. 專案時程與驗收標準

### 6.1 里程碑時程

```mermaid\ntimeline\n    title Sui Blog 開發時程\n    phase 1: 錢包與身份 (Week 1-2)\n        @mysten/sui.js 錢包連接 : 3 days\n        錢包地址驗證與顯示 : 2 days\n        ENS 解析整合（如有） : 2 days\n        NFT 畫廊抓取與展示 : 4 days\n    phase 2: 創作系統 (Week 3-4)\n        Markdown 編輯器整合 : 4 days\n        IPFS 上傳功能 : 3 days\n        文章發布流程 : 3 days\n        付費牆機制 : 3 days\n    phase 3: 打賞與互動 (Week 5-6)\n        SUI 轉帳打賞功能 : 4 days\n        贊助者徽章系統 : 3 days\n        評論系統 : 3 days\n    phase 4: 內容呈現 (Week 7-8)\n        首頁 Feed : 3 days\n        文章詳情頁 : 3 days\n        作者個人頁 : 2 days\n        標籤系統 : 2 days\n    phase 5: 測試與交付 (Week 9)\n        鏈上交易測試（Sui Testnet） : 3 days\n        IPFS 持久性驗證 : 1 day\n        Bug 修復與文件 : 3 days\n```
### 6.2 驗收標準

- 支援瀏覽器：Chrome 120+、Firefox 120+、Edge 120+
- 錢包驗證成功率 > 98% / 文章載入時間 < 1.5 秒
- IPFS 上傳成功率 > 95% / 打賞轉帳成功率 > 99%
- 目標：註冊作者數 50 人以上 / 平均每篇文章打賞次數 > 2 次
## 7. 功能勾選清單

### 前端

### 後端

### DevOps

