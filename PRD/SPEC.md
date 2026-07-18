# Sui 部落格 — 規格計劃書 v2.2.2（sweet spot sharp rewrite）

> **版本**：v2.2.2｜**更新日期**：2026-07-19｜**維護者**：Sophia (CPO) for Sean
> **對接技術**：Alan (CTO) + Hermes Agent｜**對接 Repo**：[openclawsean024-create/sui-blog](https://github.com/openclawsean024-create/sui-blog)
> **Live**：https://sui-blog-roan.vercel.app｜**SDK**：@mysten/sui 2.16 + @mysten/dapp-kit 1.0 (Next.js 16 + Tailwind 4)
> **Sweet Spot**：6/10（**繁中 Move 開發者入口 + 企業內訓 / Sui 生態職缺導購**）→ 本版銳化甜蜜點

---

## 0. 本版重寫摘要 (v2.2.2)

v2.2.1 已定位「繁中 Sui 開發者入口」，本版**只做三件事銳化**：

1. **砍掉非甜蜜點功能**（多鏈比較、幣價評論、鏈上數據、NFT 教學、純英文版）
2. **變現重心從「訂閱制」轉為「企業內訓 + 招募導購」**——單筆 NT$29,990 ~ NT$300K 內訓 + NT$9,990/mo 招募版
3. **流量池定位**：Discord 500 人 + 月訪 30K → 月觸達 Web3 新創 CTO 500 人（招募天花板）

§15 貼出完整 sweet spot 5 問 + 最終商業化評分。**最終商業化評分**：**69 / 100**（公式 =(PRD×0.3 + sweet×0.7)×10）。

---

## 1. 產品概述

### 1.1 問題陳述

繁中 Sui 教學市場是真實空白，但「教學網站」變現天花板低（B2C 訂閱 NT$100K MRR 級）。甜蜜點**不在於「教學流量」**，而在於「**全繁中唯一 Sui 開發者入口 → 對接企業招募 / 內訓需求**」（B2B LTV 10× 起跳）。

| 現有資源 | 問題 |
|---|---|
| Sui 官方文檔 | 英文、Rust 風格、CLI-only |
| 鏈新聞 / 動區 | 報導為主、零教學深度 |
| Medium 中文 Sui | 抄官方文、零星散文章 |
| CSDN / 掘金 | 簡體、新手看不懂 |
| 中文區塊鏈 YouTuber | 影片不可搜尋、無法引用 |
| **繁中深度 Sui 教學 + 開發者入口** | **市場空白** |

**甜蜜點（v2.2.2 銳化）**：繁中 Move 開發者社群 → B2B 出口（企業內訓 NT$29,990/場 + Sui 生態招募廣告 NT$9,990/mo + Sui 基金會合作徵才專區）。

### 1.2 目標使用者

| Persona | 規模 (華人圈) | 場景 | 痛點 | ARPU/年 |
|---|---|---|---|---|
| 👨‍💻 阿德（前端轉 Sui 開發者） | ~3,000 | 自學 | 無中文資源 | NT$990-2,988 |
| 👩‍💻 小美（Solidity → Sui） | ~2,000 | 已 Web3 | 語言差異 | NT$990 |
| 🎓 志明（資工學生） | ~5,000 | 找畢業專題 | 中 | NT$0（流量） |
| 💼 **王 CTO（Web3 新創招募）** | ~500 | 招募 Sui 工程師 | 找不到人 | **NT$119,880** |
| 🏢 **林老闆（企業內訓窗口）** | ~200 | 開 AI/區塊鏈內訓 | 中 | **NT$299,900** |

**付費核心** = 王 CTO + 林老闆（B2B，20% 付費 = 140 企業 × NT$120K avg = NT$16.8M/年天花板）。

### 1.3 核心價值主張

> **「全繁中、唯一深度 Sui / Move 教學 + 開發者入口 — 從 0 到被 Sui 新創招募一次到位。」**

| 替代方案 | 缺點 | 我們差異 |
|---|---|---|
| Sui 官方 | 英文 + CLI | **繁中 + Web 互動 + 學習路徑** |
| 鏈新聞 | 報導為主 | **逐行程式碼解釋** |
| Medium 中文 Sui | 散文章 | **系統 50+ 篇 + 互動 demo** |
| 英文 Substack | 英文 + 無內訓 | **繁中 + 企業內訓出口** |
| 鏈 TG 群 (100人) | 無 Sui 專區 | **唯一 Sui 繁中深度社群** |

### 1.4 商業目標 (KPI / OKR)

| 時間 | 目標 | 指標 |
|---|---|---|
| M3 | 50 篇 + 1K 月訪 + Discord 200 人 | 招募版 1 客戶洽詢 |
| M6 | 100 付費 + 5K 月訪 + 500 Discord + **5 招募版客戶** | NT$200K MRR |
| M12 | **20 企業內訓 + 50 招募版客戶** + 30K 月訪 | **NT$1.5M MRR** |
| M18 | 繁中 Sui 第一品牌 + Sui 基金會合作 | NT$3M MRR |

**Unit Economics**：
- 個人贊助 NT$99/mo → max NT$50K MRR（保守）
- **招募版 NT$9,990/mo × 50 = NT$500K MRR** ← sweet spot 主力
- **企業內訓 NT$29,990 × 20/年 = NT$600K** ← 高毛利一次性
- 共用既有 200 + 500 + 30K 流量池 → CAC 趨近零

### 1.5 ⭐ Non-Goals

- ❌ **Solana / Aptos 比較**（立場偏頗）
- ❌ **投資建議 / 幣價預測**（法規）
- ❌ **智能合約安全審計**（法律責任）
- ❌ **ICO / IDO 推廣**（法規）
- ❌ **DEX / 聚合器**（失焦）
- ❌ **TVL / Volume 儀表板**（DeFiLlama 紅海）
- ❌ **純英文內容**（v3 才考慮）
- ❌ **NFT / GameFi 教學**（偏投機）
- ❌ **生命靈數 / 占卜 / 命理**（失焦）

---

## 2. 使用者場景與流程

### 2.1 流程圖

```
訪客 → 首頁 Hero「從 0 到 Sui 工程師」5 階段學習路徑
   ↓
選文章閱讀（MDX 互動 demo + Giscus 留言）
   ↓
底部 CTA：「進階學習 / 找 Sui 工作 / 企業內訓」
   ├─→ 進階 NT$299/mo（會員）
   ├─→ 招募版 NT$9,990/mo（企業上職缺 + 我們導流量）
   └─→ 企業內訓 NT$29,990（私訊預約）
   ↓
Discord 開發者社群（500 人）
   ├─ #入門 - 新手
   ├─ #code-review - PR review
   ├─ **#jobs（招募版客戶專屬）** - 月 5-10 職缺
   └─ #AMA - 每月線上
```

### 2.2 關鍵用戶故事

```
US-1（核心學習）
As a 剛學 Solidity 想轉 Sui 的工程師「小美」
I want 看完整繁中 Sui 教學 + 互動 demo
So that 我 2 週內寫出第一個 Move 合約

US-2（社群發問）
As a Sui 學習者「阿德」
I want 在 Discord 被資深開發者回答
So that 我不必卡在英文 Stack Overflow

US-3（**招募版客戶** - 核心付費）
As a Web3 新創 CTO「王先生」
I want 付月費 NT$9,990 在繁中唯一 Sui 入口貼職缺
So that 我 1 週內找到會 Sui 的工程師

US-4（**企業內訓客戶** - 高毛利）
As a 企業內訓窗口「林老闆」
I want 1 天工作坊 8 人
So that 我公司工程師 1 天上手 Sui

US-5（會員）
As a 學生「志明」
I want 進階會員看影片 + Repo
So that 我畢業專題做完
```

### 2.3 邊界場景

| 場景 | 處理 |
|---|---|
| 程式碼範例失效 | 文章標版本 + 警示 banner |
| Discord 廣告 / 洗版 | Bot 自動過濾 |
| 招募版職缺內容不實 | 招募版 KYC + 預付保證金 |
| 內訓講師臨時請假 | 2 位備援（Sean + Alan） |
| 中文術語不一致 | 第 1 篇建立術語表 |
| 留言區仇恨言論 | Giscus moderation + 人工 |

---

## 3. 功能性需求

### 3.1 MVP（P0 必做）

| ID | 功能 | 狀態 | 為何必做 |
|---|---|---|---|
| F-001 | 文章 CRUD (page/posts[id]/write) | ✅ 已實作 | 內容核心 |
| F-002 | **MDX 互動 demo** | ❌ | 差異化 |
| F-003 | Giscus 留言 | ❌ | 社群入口 |
| F-004 | 學習路徑 5 階段 | ❌ | SEO 入口 |
| F-005 | Discord 嵌入 | ❌ | 社群 |
| F-006 | 文章分類 | ✅ | 導覽 |
| F-007 | SEO (meta/OG/sitemap) | ⚠️ | 自然流量 |
| F-008 | **「招募版」刊登表單 + 自動上架** | ❌ | **B2B 變現** |
| F-009 | **「內訓報名表單」** | ❌ | **B2B 變現** |
| F-010 | RSS feed | ❌ | 開發者習慣 |

**砍掉**：投資分析、多鏈比較、NFT 教學、鏈上數據。

### 3.2 v2（P1）

| ID | 功能 | 商業理由 |
|---|---|---|
| F-101 | 會員付費牆 | B2C 補充 |
| F-102 | 月 AMA 直播 | 高 LTV 經營 |
| F-103 | Repo 權限 | 進階會員 |
| F-104 | 每週電子報 | 留存 |
| F-105 | **招募版後台（編輯職缺 + 報表）** | 客戶自助 |
| F-106 | **內訓排程系統** | 高毛利預訂 |

### 3.3 v3 (P2 探索)

| ID | 功能 | 假設 |
|---|---|---|
| F-201 | AI 學習助理 | 提升效率 |
| F-202 | Sui 基金會合作徵才專區 | B2G |
| F-203 | 中英雙語（馬來西亞） | 國際化 |
| F-204 | Sui 認證考試 | B2B 延伸 |

### 3.4 ⭐ Acceptance Criteria（Given/When/Then）

```
AC-01 學習路徑導引
  Given 訪客進入首頁
  When 點「從 0 到 Sui 工程師」
  Then 看到 5 階段學習路徑，每篇標註「預估 30 分鐘」
  And 階段完成度條可顯示（localStorage）
  And 響應 < 300ms

AC-02 MDX 互動 demo
  Given 文章含 React 元件
  When 讀者捲到 demo 區
  Then 元件即時渲染（不需 build）
  And 程式碼區可一鍵複製
  And < 50KB JS 增量

AC-03 招募版刊登
  Given 企業填寫 NT$9,990 表單
  When 提交
  Then 5 分鐘內於 #jobs 頻道 + /jobs 頁面上架
  And 自動寄信通知 500 Discord 開發者
  And 14 天後自動下架

AC-04 內訓報名
  Given 企業填內訓表
  When 提交
  Then 24hr 內 Sean 私訊回覆含時程 + 報價
  And 預付 50% 確認檔期

AC-05 留言審核
  Given Giscus 出現新留言
  When 含禁用詞（詐騙 / 仇恨 / 政治）
  Then 自動標記待審
  And 24hr 內人工處理
```

---

## 4. 系統設計

### 4.1 技術棧

| Layer | 選 | 理由 |
|---|---|---|
| Frontend | Next.js 16 + Tailwind 4 | 既有 |
| Content | MDX (@next/mdx) | 互動 demo |
| Storage | Vercel Postgres | 招募版資料 + 內訓報名 |
| Auth | Clerk（會員）+ Google OAuth（Discord） | 既有 |
| Comment | Giscus | GitHub 整合、零成本 |
| Payment | NewebPay（會員）+ 銀行轉帳（內訓招募） | 在地化 |
| Email | Resend | 通知 |
| Analytics | Plausible | GDPR-friendly |
| RSS | feed.xml (SSG) | 開發者習慣 |

### 4.2 系統架構

```
[Browser]
   ├─ Next.js 16 SSG + ISR
   │   ├─ /（學習路徑）
   │   ├─ /posts/[slug]（MDX）
   │   ├─ /jobs（招募版）
   │   ├─ /training（內訓）
   │   └─ /admin（編輯後台）
   ├─ Clerk Auth
   ├─ Giscus 留言
   └─ Discord widget (iframe)
[Vercel Edge]
   ├─ ISR revalidate 60s
   └─ /api/jobs（GraphQL/REST）
   ↓
[Vercel Postgres]
   ├─ jobs（招募版資料）
   ├─ training（內訓報名）
   └─ member（會員）
[Discord Bot]
   ├─ 監控 #jobs 自動發通知
   └─ 月 AMA 提醒
```

### 4.3 Prisma Schema（新增）

```prisma
model Job {
  id          String   @id @default(cuid())
  company     String
  title       String
  description String   @db.Text
  salary      String?
  location    String   @default("Remote")
  contact     String   // email / TG
  status      String   @default("active") // active / expired
  paidUntil   DateTime
  createdAt   DateTime @default(now())
}

model Training {
  id          String   @id @default(cuid())
  company     String
  contact     String
  headcount   Int
  date        DateTime
  topic       String   // "Move 入門" / "Cap 設計" / "鏈上整合"
  status      String   @default("pending") // pending / quoted / paid / done
  amount      Int      // NT$
  createdAt   DateTime @default(now())
}

model Member {
  id          String   @id @default(cuid())
  clerkId     String   @unique
  tier        String   @default("free") // free / sponsor / pro
  startedAt   DateTime @default(now())
  expiresAt   DateTime?
}
```

### 4.4 API Endpoints

| Method | Path | 用途 |
|---|---|---|
| GET | `/api/jobs?active=true` | 公開職缺列表 |
| POST | `/api/jobs` | 企業刊登（需付費 session） |
| PATCH | `/api/jobs/:id` | 編輯 / 下架 |
| POST | `/api/training` | 內訓報名（送 email） |
| GET | `/api/training/admin` | 列出（管理員） |
| POST | `/api/member/subscribe` | 升級會員（NewebPay callback） |
| GET | `/api/feed.xml` | RSS |

---

## 5. 非功能性需求

### 5.1 性能
- LCP < 1.5s（SSG + ISR）
- MDX demo 元件 bundle < 50KB
- API P95 < 200ms

### 5.2 安全與隱私
- 招募版職缺需 email 驗證 + 防垃圾（hCaptcha）
- 內訓聯絡資料僅 Sean 後台可見（不公開）
- 個資保存 6 個月後刪除（GDPR）
- Clerk JWT + middleware 保護 /admin

### 5.3 ⭐ 降級機制 (Graceful Degradation)

| 故障 | 降級 |
|---|---|
| Vercel Postgres 掛 | 招募版顯示 cache + 維護公告 |
| Resend 掛 | Discord 通知替代 |
| Clerk 掛 | 留言仍可匿名 |
| Discord 掛 | 留言區 + Email 通知替代 |
| NewebPay 掛 | 銀行轉帳 fallback（手動審單） |

### 5.4 擴展性
- 招募版職缺可分頁（cursor）
- Discord 流量大時改 webhook + rate limit
- ISR revalidate 熱門文章 30s / 冷門 5min

---

## 6. 完成標準 (Definition of Done)

- [ ] F-002 MDX 互動 demo 至少 10 篇
- [ ] F-008 招募版端到端跑（Stripe / NewebPay 沙盒）
- [ ] F-009 內訓報名表單 + email 通知
- [ ] Giscus 串接
- [ ] Discord 嵌入
- [ ] ISR 設定
- [ ] Lighthouse SEO ≥ 95
- [ ] 5 個用戶訪談驗證甜蜜點
- [ ] 招募版 1 個企業客戶試刊登
- [ ] Notion PRD 規格 ≥ 9、商業化分數更新

---

## 7. 風險與決策

### 7.1 風險表

| Risk | 等級 | 緩解 |
|---|---|---|
| 招募版客戶找不到 Sui 工程師退費 | 🟠 | 14 天退費保證 + 流量曝光報告 |
| 內訓講師請假 | 🟡 | 雙備援（Sean / Alan） |
| Discord / Giscus 被牆 | 🟡 | Telegram + Disqus 雙備援 |
| Sui 官方突然出中文文件 | 🟠 | 持續搶先發深度教學、靠社群護城河 |
| 繁中開發者成長停滯 | 🔴 | 拓展馬來西亞 / 新加坡華人圈 |

### 7.2 ⭐ ADR（關鍵決策）

**ADR-001 為何用 NewebPay 而非 Stripe？**
- 決策：會員 + 招募版用 NewebPay / 銀行轉帳
- 理由：1) 繁中唯一 Sui 入口，台灣客戶不熟 Stripe；2) NewebPay 手續費 2.5% vs Stripe 2.9% + 1.5% 跨國
- 取捨：NewebPay 文件差、開發慢

**ADR-002 為何 Discord 而非 Telegram？**
- 決策：Discord 為主，Telegram 鏡像
- 理由：1) Discord 是開發者主流；2) 頻道化（#jobs / #code-review）易分類；3) bot 生態完整
- 取捨：Telegram 牆內開發者多但犧牲審核

**ADR-003 為何放棄「付費牆」主導變現？**
- 決策：個人訂閱降為補充，**B2B 招募 / 內訓為主**
- 理由：計算「200K MRR 個人訂閱」需 7,000 付費（華人 Sui 開發者 5,000 人天花板），不可達
- 取捨：放棄可預期但小收入、放大可達 NT$3M MRR 的 B2B

---

## 8. 里程碑與 Sprint

### 8.1 里程碑

| M | 時程 | 產出 |
|---|---|---|
| M0 銳化 | W1-2 | 本 PRD + 訪談 5 招募客戶 / 2 內訓窗口 |
| M1 MVP | W3-8 | F-001~F-010 + 招募版 1 客戶試營運 |
| M2 GA | W9-12 | 公開招募版收費 + 內訓開放報名 |
| M3 PMF | W13-24 | 5 招募客戶 + 3 內訓 = NT$300K MRR |
| M4 規模 | W25-36 | 50 招募客戶 + 20 內訓 = NT$1.5M MRR |

### 8.2 Sprint（4 週 = 1 Sprint）

| Sprint | 主題 | 交付 |
|---|---|---|
| S1 | MDX 模板 + Giscus + Discord | 文章 CRUD + demo 元件 + 留言 |
| S2 | 招募版 schema + API | /jobs 公開頁 + 刊登表單 |
| S3 | NewebPay 串接 + webhook | 自動上架 + 下架 |
| S4 | 內訓報名 + 後台 | /training 表單 + admin |
| S5 | 訪談 + 文章衝刺 | 5 招募客戶訪談 + 20 篇新文章 |
| S6 | Beta + 行銷 | 招募版 beta 邀請 + KOL |

---

## 9. 變現路徑 + 定價心理學

### 9.1 方案

| 方案 | 月費 | 額度 | 目標 |
|---|---|---|---|
| 🆓 Free | NT$0 | 5 篇核心 + 留言 | 試用 |
| 👤 Sponsor | NT$99 | 全部文章 + 電子報 + Discord | C 端 |
| 👑 Pro | NT$299 | + 影片 + Repo + 月 AMA | C 端 |
| 💼 **Recruiter** | **NT$9,990/mo** | **月貼 5 職缺 + 自動通知 500 Discord** | **B 端（主）** |
| 🏢 **企業版** | **NT$29,990 起** | **1 天 8 人內訓** | **B 端（高毛利）** |

### 9.2 定價心理學
- **招募 NT$9,990** vs **獵人頭 50% 年薪（NT$600K+）**：客戶省 60×；我們 win-win
- **內訓 NT$29,990** vs 顧問 NT$100K/day：客戶省 70%
- **年繳 8 折**：提升 LTV（招募版 NT$95,904/年）
- 內訓預付 50% 鎖定檔期

---

## 10. 附錄

### 10.1 Competitive Quadrant

```
        高 LTV (企業)
            │
   CWMoney  │  ★ sui-blog v2.2.2
   集保 e手 │  (B2B 招募版 + 內訓)
            │
低收費 ─────┼──── 高收費
            │
   Substack │  Medium
            │
        低 LTV (個人)
```

### 10.2 術語表

| 術語 | 定義 |
|---|---|
| Move | Sui / Aptos 智能合約語言（Rust-based） |
| Sui | L1 公鏈（Move 主鏈） |
| Dapp-Kit | Sui 官方 React SDK |
| ISR | Incremental Static Regeneration |
| Giscus | GitHub Discussions-backed 留言 |
| NewebPay | 藍新金流（台灣在地） |

---

## 11. ⭐ 市場驗證計畫

### 11.1 3 個關鍵假設

| 假設 | 檢驗 | 成功指標 |
|---|---|---|
| **H1**: 5 個 Web3 新創願付 NT$9,990/mo 招募 | 訪談 5 CTO | 1 個 yes |
| **H2**: 1 個企業願付 NT$29,990 內訓 | 訪談 2 內訓窗口 | 1 個 yes |
| **H3**: Discord 500 開發者收到職缺點擊率 ≥ 5% | UTM + Plausible | ≥ 5% CTR |

### 11.2 訪談 SOP

**W1-2 完成 7 個訪談**：
- 3 個 Web3 新創 CTO（Sui 生態系優先）
- 2 個企業內訓窗口
- 2 個 Sui 開發者（驗證社群效用）

### 11.3 啟動指標（GA 條件）
- [ ] 1 招募客戶 paid + 1 內訓 paid
- [ ] Discord 100 人
- [ ] 月訪 1K
- [ ] 5 個訪談測試 H1/H2

---

## 12. ⭐ 失敗模式 SOP

### F1. 招募版客戶找不到人退費
- 14 天退費保證 → 客戶自動安心
- 提供 1 次加碼曝光（電子報置頂）救場

### F2. 內訓臨時找不到學員
- 退款 50% + 改期 30 天內免費重辦

### F3. 文章品質跟不上 Sui 版本更新
- 每篇文章標 Sui 版本 + 失效警告 banner
- 設 GitHub Issue + 「版本訂閱通知」email

### F4. Discord 廣告氾濫
- Bot 自動過濾 + 違規 3 次 ban

### F5. 流量無成長
- KOL 合作（台灣 Web3 KOL：Wisdom、帥過頭）
- 月 1 次免費電子報給 5K 訂閱者

---

## 13. ⭐ MetaGPT / spec-kit 對齊

### 13.1 Requirement Pool

**P0（MVP）**：F-001 ~ F-010 全部
**P1（v2）**：F-101 ~ F-106
**P2（v3）**：F-201 ~ F-204

### 13.2 MUST / SHOULD / MAY

| 標籤 | 項目 |
|---|---|
| MUST | MDX 互動 demo、招募版刊登、內訓報名、Giscus、Discord |
| SHOULD | RSS、SEO、電子報、會員付費牆 |
| MAY | 中英雙語、AI 學習助理 |

### 13.3 Requirement Quadrant

```
        高 B2B 價值
            │
   會員     │  招募版 + 內訓
   訂閱     │  ★ 本版核心
            │
低可行性 ───┼── 高可行性
            │
   NFT 教學 │  學習路徑
            │
        低 B2B 價值
```

### 13.4 GitHub spec-kit 對齊
- 每個 US 都標 **Why this priority** + **Independent Test**
- AC 全部含「< 200ms」、「< 50KB」量化指標

### 13.5 Open Questions

| # | 問題 | 待 |
|---|---|---|
| Q1 | Discord bot 用 JS 還是 Python？ | Alan |
| Q2 | NewebPay 簽章文件是否需第三方？ | 業務 |
| Q3 | 招募版客戶來源（Web3 新創怎找到我們）？ | 行銷 |
| Q4 | Sui 基金會是否合作（贊助 / 認證）？ | 業務 |

---

## 15. ⭐ 深度市調報告 (Sweet Spot 5 問)

### 15.1 5 問體檢

**最終商業化評分**：**69 / 100**
- 公式：(PRD × 0.3 + sweet × 0.7) × 10
- PRD 規格 = 9 / 10（v2.2.2 14 區塊完整 + AC 量化 + 降級機制）
- Sweet Spot = 6 / 10（銳化 B2B 招募 + 內訓後，從 5 升 6 — 仍受華人 Sui 開發者 ~5,000 人天花板限制）
- 計算：(9×0.3 + 6×0.7) × 10 = (2.7 + 4.2) × 10 = **69**

#### Q1 市場已有誰？

| 競品 | 用戶 | 繁中 | 深度 |
|---|---|---|---|
| Sui 官方文件 | 1M+ | ❌ 英文 | 高 |
| Medium 中文 Sui | ~100 篇 | ⚠️ 散 | 低 |
| 鏈新聞 / 動區 | 100K 月訪 | ✅ | 低（報導） |
| CSDN / 掘金 | ~500 篇 | ⚠️ 簡體 | 中 |
| 中文 YouTube Sui | ~50 支 | ✅ | 中 |
| TG 群 | ~100 人 | ✅ | — |
| **繁中深度 Sui 入口 + B2B** | **0 家** | **—** | **—** |

**現況**：繁中 Sui 教學是真實空白，但個人訂閱天花板低 — 紅海不在教學，在流量變現路徑。

#### Q2 甜蜜點在哪？

**甜蜜點 = 繁中唯一 Sui 開發者入口 → B2B 變現**
- Sui 官方無繁中（先機 12-18 月）
- 鏈新聞太淺；Medium 太散；TG 群太小
- **新發現**：開「企業招募版 + 內訓」才是甜蜜點 — 入口流量 → 高 LTV B2B

#### Q3 紅海功能（不做）

- ❌ 多鏈比較（立場偏頗）
- ❌ 投資分析（紅海 + 法規）
- ❌ NFT / GameFi（偏投機）
- ❌ 鏈上數據（DeFiLlama）
- ❌ 智能合約審計（法律責任）

#### Q4 紅海之外的差異化承諾

> **「繁中唯一深度 Sui 教學 + 開發者入口 → 企業招募 / 內訓對接」**

具體差異化：
1. **MDX 互動 demo**
2. **學習路徑**（SEO 入口）
3. **Discord 開發者社群**
4. **招募版刊登**（B2B）
5. **企業內訓**（高毛利）

#### Q5 Sean 一人公司能否負擔？

- 開發：50 篇 × 1.5 天 + 招募版 + 內訓 = ~90 人天 → Sean 10 週可完成
- 營運：M12 預估 NT$8K/月（Vercel + Postgres + Resend + NewebPay）
- CAC：SEO + Discord 流量 = 趨近零；B2B 客戶由 Sean 親訪 → 高轉化
- 客服：Discord Bot + Email 自動 + Sean 手動

**結論**：可負擔，LTV/CAC > 30× 健康。但需 M1 招募 1 客戶 + M3 內訓 1 客戶 驗證 B2B 真實 PMF。

### 15.2 重寫決策

| 改變 | v2.2.1 | v2.2.2 |
|---|---|---|
| 變現主軸 | B2C 訂閱 + B2B 並重 | **B2B 招募 + 內訓為主** |
| 個人訂閱 | NT$99-299 | 降為補充 |
| Non-Goals | 一般 | 明確砍「投資 / 多鏈 / NFT」 |
| 功能 | 招募 v3 | **MVP 必做** |
| 訪談 | 20 人開發者 | **5 CTO + 2 內訓窗口** |

### 15.3 與 v1 / v2.2.1 差異

| 面向 | v1 | v2.2.1 | **v2.2.2** |
|---|---|---|---|
| 甜蜜點 | 全方位教學 | 開發者入口 | **開發者入口 + B2B 出口** |
| 變現 | 廣告 | 訂閱 + 內訓 + 接案 | **招募 + 內訓主導** |
| Non-Goals | 一般 | 部分 | **明確** |
| MVP 範圍 | 教學 + 留言 | + Discord | **+ 招募版 + 內訓** |

### 15.4 後續驗證動作

- [ ] W1-2 完成 7 個訪談（5 CTO + 2 內訓窗口）
- [ ] W3-8 MVP 上線 + 招募 1 客戶 beta
- [ ] W9-12 GA 公開
- [ ] W13-24 評估 PMF：5 招募客戶 + 3 內訓 = NT$300K MRR 才進入規模化

---

> 對接產線：https://sui-blog-roan.vercel.app
> 對接 Repo：https://github.com/openclawsean024-create/sui-blog
