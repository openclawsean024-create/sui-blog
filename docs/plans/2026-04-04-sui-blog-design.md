# Sui 部落格實作完善化 — 設計文件
**日期：** 2026-04-04
**負責：** Alan (Subagent Brainstorm Phase)
**輸入：** task-alan-20260404-sui-blog-fix.md

---

## 現狀分析

### 專案現況
- **位置：** `/home/sean/sui-blog`
- **框架：** Next.js 16 (Pages Router, `app/page.tsx` 全 client-side)
- **錢包：** 完全 mock — `WalletButton` 只做 `alert()` 提示，無實際連接
- **發布功能：** 無表單，只有 `#publish` 區塊的 static UI
- **智能合約：** 完全不存在，無 `blog.move` / `move.toml`
- **Vercel 部署：** 已設定 (`prj_Y0DEOVsu86fq9lOM2NQqdqp94kGh`, org `team_ZXidjNihc5HAjfVw3VErrrrK`)，目前部署靜態 mock 版本
- **依賴：** 只有 `next`, `react`, `react-dom` — 無任何 Sui SDK

### 核心缺口
| 缺口 | 嚴重性 |
|------|--------|
| 無錢包連接 | 🔴 高 |
| 無智能合約 | 🔴 高 |
| 無鏈上讀寫 | 🔴 高 |
| 無 Sui SDK | 🔴 高 |
| 無 Testnet RPC | 🔴 高 |

---

## 方案 A：最小可行整合（MVP）

### 思路
只替換 wallet mock 為 `@mysten/dapp-kit`，**不做** 自架 Move 合約，改用 Sui 官方 `DeepBook` 或簡單的 `sui::coin` 轉帳當作「發布 proof-of-concept」。前端讀取錢包地址即可真實顯示，發布功能記錄 tx hash 當虛擬發布。

### 步驟
1. `npm install @mysten/dapp-kit @mysten/sui`
2. 在 `page.tsx` 頂部 import `WalletProvider` / `ConnectButton` from `@mysten/dapp-kit`
3. 包一層 `<SuiClientProvider network="testnet">` + `<WalletProvider>`，替換現有 `WalletButton` 元件
4. 保留 static posts array，但把錢包連接後的地址真實化
5. 發布區塊改為：輸入 title/excerpt → 用 `sui::coin::transfer` 鑄造 0.001 SUI 作為「發布費」→ 把 tx hash 顯示在假文章上
6. `vercel deploy`

### 優點
- ✅ 技術門檻最低（不需要寫 Move 合約）
- ✅ 錢包真實連接，30 分鐘內可完成整合
- ✅ 使用 Mysten 官方維護的 SDK，穩定性高
- ✅ Testnet 免費，不需要真實 SUI

### 缺點
- ❌ 發布不是真正的「寫部落格文章」上鏈，只是送了一筆 coin 交易
- ❌ 文章數據仍存在前端 memory，刷新就消失
- ❌ 不是真正的 blog 合約，無法展示「鏈上內容存儲」

### 適用場景
快速 demo / 向 Sophia 展示錢包連接效果，不適合正式產品。

---

## 方案 B：完整 blog.move 合約 + 錢包整合（推薦）

### 思路
從頭寫一個 `blog.move` 智能合約，部署到 Sui Testnet。前端用 `@mysten/sui` SDK 的 `Transaction` API 發布文章，用 `sui client` CLI 部署合約。

### 步驟

**Phase 1：合約開發**
1. 初始化 Move 專案：`cd ~/sui-blog && mkdir move && cd move && sui move new blog`
2. 撰寫 `sources/blog.move`：
   - `Blog` struct（UID, owner, posts vector）
   - `Post` struct（title: string, content: string, author: address, timestamp: u64）
   - `publish_article(blog: &mut Blog, title: vector<u8>, content: vector<u8>)` entry function
   - `create_blog()` entry function（工廠）
3. `sui client publish --testnet --skip-linting` 部署到 Testnet
4. 拿到 `package ID`，記錄下來

**Phase 2：前端整合**
1. `npm install @mysten/sui @mysten/dapp-kit`
2. 重構 `page.tsx`：抽出錢包狀態管理、動態 posts state
3. 替換 `WalletButton` 為 `@mysten/dapp-kit` 的 `ConnectButton` + 讀取 `useCurrentAccount()`
4. 建立 `/app/api/publish/route.ts`（或直接 client-side）：
   - 用 `@mysten/sui` 建立 `Transaction`
   - 呼叫 `blog::publish_article`
   - 等待 Finalized checkpoint，回傳 tx digest
5. 把 tx digest 存入 local state，渲染成假的「已發布文章」
6. `vercel deploy`

### 優點
- ✅ 真正意義的「鏈上部落格」，合約邏輯正確
- ✅ Mysten 官方 SDK，文件齊全
- ✅ 可擴展：未來加 `delete_post`、`update_post` 容易
- ✅ Testnet 免費 gas，可反覆測試

### 缺點
- ❌ 需要寫 Move 合約，有一定學習曲線
- ❌ 合約部署後前端需更換 `package ID`
- ❌ `Transaction.waitForFinality()` 在 Vercel Edge 可能超時，需處理

### 關鍵風險
- 合約部署需要 `sui` CLI，WSL2 環境需確認能執行
- `sui client` 需已設定 Testnet profile 並有足夠 gas coin

---

## 方案 C：混合模式 — 最小合約 + Sui Indexer 讀取

### 思路
寫一個極簡 `blog.move`（只存 tx hash 指向 IPFS/CID），用「IPFS 存內容 + Sui 存 CID」的二層方式。或者更簡單：用 Sui 的 `event` 機制發布文章，透過 Indexer API 查詢 event 來渲染文章列表。

### 步驟
1. `blog.move` 只做一件事：收到發布請求時 emit 一個 `ArticlePublished { title, content_hash, author, timestamp }` event
2. 前端用 `@mysten/sui` 發送 transaction 並等待 event 回執
3. 用 Sui Indexer API（`https://testnet-indexer.sui.io/`）查詢 `ArticlePublished` events，渲染文章列表
4.錢包整合同方案 B

### 優點
- ✅ 鏈上足跡最小（只存 event），gas 成本最低
- ✅ 內容存 IPFS，無法被刪除特性保留
- ✅ 可用 Indexer 查歷史文章，支援「查看所有文章」功能

### 缺點
- ❌ 需要 IPFS 服務（可能需要 Pinata 或 Infura IPFS API key）
- ❌ 架構稍複雜，兩層存儲
- ❌ 依賴 Indexer API 可用性

### 適用場景
長期產品藍圖，當前階段過度設計。

---

## 推薦方案

**方案 B（完整 blog.move 合約 + 錢包整合）** 為首選。

理由：
1. 任務目標明確是「部署 blog.move 合約並連接前端」— 方案 A 不符合
2. 方案 C 架構過度複雜，不適合第一次實作
3. Sui Testnet 完全免費，沒有失敗成本

---

## 前置條件檢查

| 檢查項 | 狀態 | 備註 |
|--------|------|------|
| `sui` CLI 安裝 | ❓ 待確認 | 需執行 `which sui` 驗證 |
| Testnet profile 設定 | ❓ 待確認 | 需 `sui client switch --env testnet` |
| Testnet gas coin | ❓ 待確認 | 需有足夠 SUI gas |
| Vercel CLI 登入 | ✅ 已登入 | `openclawsean024-3056` |
| `@mysten/sui` npm | ❌ 尚未安裝 | 待 `npm install` |

---

## 預估工時

| 階段 | 工時 | 說明 |
|------|------|------|
| 環境檢查（sui CLI + Testnet） | 15 min |  blocker |
| Move 合約開發 | 1-2 hr | 取決於 Move 熟悉度 |
| 合約部署 | 15 min | 估計一次成功 |
| 前端錢包整合 | 1 hr | @mysten/dapp-kit |
| 前端發布功能串接 | 1 hr | Transaction + wait |
| Vercel 部署 + 驗證 | 30 min | 端到端測試 |
| **總計** | **4-5 hr** | — |

---

## 下一步（Planning Phase）

1. 確認 `sui` CLI 和 Testnet 環境狀態
2. 初始化 `move/blog` 專案，寫 `blog.move`
3. 部署合約到 Testnet，取得 package ID
4. 實作前端：錢包連接 + 發布功能 + 文章列表讀取
5. Vercel 部署
6. 提交 Sophia 驗收
