# SUI Deck BLOG

SUI Deck BLOG 是一個以 **SUI 生態內容、研究洞察與 deck 式敘事** 為核心的前端產品雛形。

這個 repo 目前不是完整上鏈產品，而是分成兩層：

- `frontend/`：React + Vite 的產品前端
- `sui-contracts/`：Move 智慧合約雛形

目前這一版重點不是深度區塊鏈交互，而是先把站點收斂成一個**可展示、可延續開發、產品定位清楚**的內容入口。

---

## 目前已實作

### Frontend（已產品化第一輪）
- 高質感首頁 / 內容工作台介面
- 清楚的產品定位：SUI-focused blog / deck / insights destination
- 精選內容卡、研究內容、signals 分頁
- 錢包連接 / 登入 / 發文 modal（目前為 demo workflow）
- 模擬鏈上文章 feed
- 更合理的 `@mysten/dapp-kit` provider 設定

### Smart Contract（雛形）
- `sui-contracts/sources/blog.move`
- 目前作為資料模型與未來上鏈流程的基礎

---

## 目前限制

這個版本仍然是 **產品化前端 MVP**，尚未完成：

- 真實錢包簽章與 publish 交易
- 真正從鏈上讀取文章
- 真正的帳號系統與權限
- 真正的文章版本關聯 / 查詢
- production-ready deploy pipeline

也就是說：
**現在可 demo 產品方向與 UI / UX，但還不是完整可商用鏈上內容平台。**

---

## 技術結構

```text
frontend/
  React + Vite
  @mysten/dapp-kit
  UI components

sui-contracts/
  Move contract prototype
```

---

## 本地開發

### Frontend
```bash
cd frontend
npm install
npm run dev
```

### Build
```bash
cd frontend
npm run build
```

### Move Contract
```bash
cd sui-contracts
sui move build
```

---

## 下一步建議

### Phase 2
1. 接上真實 SUI wallet connect flow
2. 修正 / 完成 publish transaction 流程
3. 鏈上讀取文章與作者資料
4. 補齊 profile / post detail / author pages
5. 決定主打方向：
   - Onchain blog
   - Research publication hub
   - Deck / insight distribution layer

### Phase 3
1. 真正部署合約
2. 加入內容索引 / 搜尋
3. 加入收藏、追蹤、閱讀體驗優化
4. 規劃內容與品牌營運節奏

---

## 定位一句話

**SUI Deck BLOG = 把 SUI 生態內容、研究與敘事，做成更像產品而不是單純 demo 的前端入口。**
