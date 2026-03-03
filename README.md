# SUI 區塊鏈部落格系統

一個使用 SUI 區塊鏈技術的不可篡改部落格平台。

## 功能特色

### 🔐 帳號系統
- 用戶名 + 密碼註冊
- 密碼雜湊儲存（區塊鏈安全）
- 每個帳號自動生成 SUI 錢包地址

### 💰 錢包整合
- 支援 SUI Wallet
- 顯示錢包餘額
- 區塊鏈原生支付

### 📝 發文系統
- **不可篡改**：文章一旦發布，無法修改或刪除
- **版本追蹤**：更新需發布新文章（新區塊 = 新版本）
- **永久儲存**：所有資料記錄在 SUI 區塊鏈上

### ⛓️ 區塊鏈特性
- 去中心化儲存
- 不可篡改
- 透明可驗證
- 低交易費用

## 技術架構

```
┌─────────────────────────────────────────┐
│         Frontend (React + Vite)         │
│  - @mysten/dapp-kit                     │
│  - SUI Wallet Adapter                   │
└────────────────┬────────────────────────┘
                 │
                 ▼
┌─────────────────────────────────────────┐
│         SUI Move Smart Contract         │
│  - User Profile (用戶資料)               │
│  - Blog Post (文章)                     │
│  - Global State (全局狀態)               │
└─────────────────────────────────────────┘
```

## 安裝與運行

### 前端

```bash
cd frontend
npm install
npm run dev
```

訪問 http://localhost:3000

### 智慧合約

```bash
cd sui-contracts
sui move build
sui client publish
```

## 智慧合約結構

### 資料結構

```move
// 用戶資料
struct UserProfile {
    id: UID,
    username: String,
    password_hash: String,
    wallet_address: address,
    created_at: u64,
    post_count: u64
}

// 文章 (不可變)
struct BlogPost {
    id: UID,
    post_id: u64,
    author: address,
    author_username: String,
    title: String,
    content: String,
    timestamp: u64,
    block_height: u64,
    version: u64,
    previous_post_id: Option<ID>
}
```

### 核心函數

- `register_user()` - 註冊新用戶
- `create_post()` - 發布文章
- `get_all_posts()` - 獲取所有文章
- `get_address_by_username()` - 查詢用戶地址
- `get_stats()` - 獲取統計數據

## 設計原則

### 為什麼文章不能修改？

區塊鏈的核心價值之一是**不可篡改**。一旦資料上鏈，就無法修改。這保證了：

1. **言論自由**：沒有審查風險
2. **資料真實**：無法偽造或篡改歷史
3. **永久記錄**：資料永遠存在

### 如何「修改」文章？

在傳統系統中，你會「編輯」文章。
在區塊鏈系統中，你應該**發布新文章**。

每次發布新文章都會：
- 創建新的區塊記錄
- 增加版本號
- 保留歷史版本

這就是所謂的「追加型」資料儲存！

## 開發者

- Sean Li - 初始開發

## 授權

MIT License
