# 【Sui Blog】規格計劃書 v4

## 狀態

| 功能 | 狀態 | 備註 |
|------|------|------|
| 首頁文章列表（靜態） | ✅ 已完成 | lib/posts.ts |
| 錢包連接 UI | ✅ 已完成 | @mysten/dapp-kit 已設定 |
| Write 頁面 UI | ✅ 已完成 | 無實際發布功能 |
| About/Ecosystem 頁面 | ✅ 已完成 | 靜態內容 |
| 動態文章列表 + localStorage | 🚧 進行中 | 即將實作 |
| 文章詳情頁（Markdown 渲染） | 🚧 進行中 | 即將實作 |
| 文章發布（localStorage） | 🚧 進行中 | 即將實作 |
| 付費牆系統 | 📋 待實作 | 基本版 |
| SUI 打賞功能 | 📋 待實作 | @mysten/sui.js |
| 作者個人頁 | 📋 待實作 | /author/[address] |
| /privacy、/terms、/contact | 📋 待實作 | 法律頁面 |
| Vercel 部署觸發 | 📋 待實作 | 推送後自動 |

---

## 1. 專案概述

### 1.1 專案背景與目的

Web3 內容創作正在快速成長，但多數創作者仍被困在傳統 Web2 平台——言論審查、平台抽成、沒有辦法直接接受讀者贊助。Sigle 和 Mirror.xyz 打開了 Web3 原生內容創作的可能性，但在 Sui 生態系中，這樣的工具仍然匱乏。本工具是以 Sui 區塊鏈為核心的部落格平台：創作者以 Sui 錢包登入（Petra / Martian），文章內容存於去中心化存儲（IPFS），讀者可以直接用 SUI 代幣打賞，創作者也沒有平台抽成。這不只是一個部落格，而是 Web3 創作者與讀者之間的直接價值流轉通道。
### 1.2 目標受眾（TA）

- Sui 生態投資者 — 需要深度技術文章和生態項目分析
- Web3 內容創作者 — 想把內容變現，但不想被平台抽成
- DAO 治理參與者 — 需要一個去中心化的方式發表治理提案和討論
- Sui 開發者 — 需要一個分享技術文章的舞台，建立個人品牌
### 1.3 參考網站分析

Sigle (sigle.io) — Web3 原生、支援 ENS，但目前專注 Ethereum/Deso。
Mirror.xyz (mirror.xyz) — 多人協作、代幣發行，但偏 Ethereum，生態封閉。
Distrikt (distrikt.io) — 專業 UI、內容品質高，但無代費打賞。
DeSo Social (deso.org) — 去中心化社交、區塊鏈原生，但對 Sui 生態支援有限。
## 2. 技術棧

- 前端框架：Next.js 14（App Router）+ Tailwind CSS
- 錢包 SDK：@mysten/sui.js + @mysten/dapp-kit
- 後端框架：Next.js API Routes（未來擴展用）
- 文章存儲：localStorage（原型階段）+ IPFS（未來）
- 部署：Vercel
## 3. 已實作功能

### 3.1 錢包身份系統
- Petra / Martian / Sui Wallet 連接
- 錢包地址驗證與顯示（formatAddress 工具函数）
- 下拉選單：複製地址、Explorer 查看、斷開連線

### 3.2 首頁 Feed
- 最新文章列表，支援分類篩選（All/Development/Ecosystem/Technical/Research）
- 文章卡片：分類標籤、標題、摘要、日期、作者位址

### 3.3 文章詳情頁
- 完整 Markdown 渲染（標題、代碼、表格、列表、粗體、斜體）
- 作者錢包位址顯示
- 分類標籤與日期

### 3.4 創作系統（Write 頁面）
- Markdown 編輯器（文字區域）
- 分類選擇（Development/Ecosystem/Technical/Research）
- 錢包未連接時顯示提示
- 發布成功後清空表單並跳轉首頁

### 3.5 頁面
- 首頁（Hero + 文章列表）
- 文章詳情頁
- About 頁面
- Ecosystem 頁面
- Write 頁面

## 4. 待實作功能

### 4.1 動態文章存儲
- 將新發布文章存入 localStorage（key: `sui-blog-posts`）
- 首頁從 localStorage + 靜態數據合併讀取
- 文章 ID 遞增

### 4.2 付費牆系統（基本版）
- Write 頁面可設定付費金額（SUI）
- 文章詳情頁如需付費則顯示解鎖按鈕
- 提示錢包未連接或餘額不足

### 4.3 SUI 打賞功能
- 文章頁有「Tip Author」按鈕
- 連接錢包後輸入金額，彈出錢包確認
- 使用 @mysten/sui.js executeTransactionBlock

### 4.4 作者個人頁
- /author/[address] 路由
- 顯示該作者所有文章
- 作者錢包位址與區塊鏈Explorer連結

### 4.5 法律頁面
- /privacy — 隱私權政策
- /terms — 服務條款
- /contact — 聯絡我們

## 5. 視覺與 UI

### 5.1 品牌設計指南

- Primary: #6D28D9 — 主要按鈕、品牌元素（Sui 紫色系）
- Secondary: #0F172A — 深色背景、主要容器
- Accent: #10B981 — 打賞成功、NFT 展示
- Sui Purple: #A855F7 — Sui 生態標示、錢包相關元素
- Background: #0F0F23 / Card BG: #1A1A2E
- 字體：標題 Inter 700 / 內文 Inter 400-500 / 程式碼 JetBrains Mono

## 6. 部署

- GitHub: https://github.com/openclawsean024-create/sui-blog
- Vercel: https://sui-blog-roan.vercel.app
- Branch: feature/productization → master（合併後自動部署）