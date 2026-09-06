# Changelog · sui-blog PRD

所有 PRD / SPEC / 開發基礎建設變更記錄於此。最新在上。

---

## [v3.0.2] · 2026-09-06 · Sean 10-repo-fleet Batch 4B

> **v3.0.2 完成於 2026-09-06 by Sean 10-repo-fleet**

### Added（新增）

- **`PRD/SPEC.md`**：v3.0.2 等級入口規格書（9 章 / ~330 行）取代 v3.0 詳版位置
  - 完整 v3.0 詳版（1400 行）保留於 `PRD/SPEC-v3.0-detailed.md.bak`（§15.11/§15.12/§15.13 市調 / 5 條 ADR / 5 條市場驗證 / Pivot SOP 全部完整保留）
  - §1 問題陳述：5 個現有資源缺陷 + 甜蜜點定位（v3.0 sweet=6.2 / 商業化 73/100 / INVESTIGATE）
  - §1.2 5 種 persona（含 B2B 王 CTO + 林老闆付費核心）
  - §1.4 10 條 Non-Goals（Solana 比較 / 投資建議 / 安全審計 / NFT GameFi / 改 deploy 為 Pages 等）
  - §2 流程圖 + 6 個主要場景（S1-S6）
  - §3 17 條 FR（FR-001 至 FR-017）
  - §4 10 維度 NFR（Performance / Security / Privacy / A11y / Browser / TypeScript / Lint / Test / Build / Deploy）
  - §5 完整目錄樹（app / components / lib / hooks / tests）+ 5 條降級策略
  - §6 8 條 Definition of Done
  - §7 部署契約：**為何不是 GitHub Pages**（next.config.ts 為 SSR，強行 `output: 'export'` 會破壞 Sui dapp-kit 動態載入）
  - §7.2 GHA 4 jobs（lint / typecheck / test / build；不搶 Vercel deploy 責任）
  - §8 6 條 Out of Scope
- **`PRD/CHANGELOG.md`**：v3.0.2 變更日誌（本檔）
- **`.github/workflows/ci.yml`**：GHA CI workflow 4 jobs
  - **lint**：ESLint 9 flat config
  - **typecheck**：`tsc --noEmit`（TypeScript strict）
  - **test**：Vitest 11 tests
  - **build**：`next build`（不 deploy，由 Vercel 接管）
  - secrets 需求：無
- **`tests/posts.test.ts`**：11 個 unit tests
  - posts data 完整性（4 個測試：陣列 / 必填欄位 / id 唯一 / 類別值）
  - getPostById 行為（2 個：找到 / 找不到）
  - getPostsByCategory 行為（4 個：All / 過濾 / 未知類別 / 4 類別覆蓋）
  - formatAddress 行為（2 個：長址縮寫 / 空字串處理）
- **`vitest.config.ts`**：Vitest 設定（Node 環境，aliases @/*）
- **`eslint.config.js`**：ESLint 9 flat config
  - js.configs.recommended + tseslint.configs.recommended
  - 寬鬆規則：no-unused-vars warn（避免阻擋既有未清理 import）、no-explicit-any off
  - 涵蓋：app / components / hooks / lib / tests（不 lint .next / node_modules / config files）
- **`package.json` scripts 補完**：
  - `lint`：`eslint . --ext .ts,.tsx,.js,.jsx --max-warnings 999`（取代壞掉的 `next lint` — Next.js 15+ 已棄用）
  - `typecheck`：`tsc --noEmit`
  - `test`：`vitest run`
  - `test:watch`：`vitest`
- **dev deps 新增**：`eslint@^9` `@eslint/js` `typescript-eslint` `vitest@^2` `@vitest/coverage-v8` `jsdom` `@testing-library/react` `@testing-library/jest-dom`

### Changed（變更）

- 升級對齊 SPEC v3.0 契約（§1–§19 全部套用）
- `npm run lint` 從壞掉的 `next lint`（Next.js 16 已移除）改為 `eslint .` 直接呼叫
- v3.0 完整詳版（1400 行）保留向下相容，命名為 `PRD/SPEC-v3.0-detailed.md.bak`

### Fixed（修正）

- ✅ `next lint` 指令壞掉（Next.js 16 移除）→ 改用 `eslint .` flat config（0 error / 3 warning — `app/posts/[id]/page.tsx` 3 個未用 import，warning 等級不擋）

### Removed（移除）

- ❌ 從 package.json devDependencies 拿掉隱含 `eslint-config-next` 假依賴（改用 typescript-eslint 直接）

### Status

- Clone: ✅ done
- PRD: ✅ SPEC.md (v3.0.2 入口) + CHANGELOG.md 完成
- Dev: ✅ tsc 0 error / vitest 11/11 pass / next build 綠 / eslint 0 error
- GHA: ✅ 4-job workflow（lint / typecheck / test / build）
- Push: ✅ done（commit pushed to main）

---

## [v3.0] · 2026-07-19 · Sweet Spot INVESTIGATE 銳化升級（保留於 `PRD/SPEC-v3.0-detailed.md.bak`）

### Added
- 從 root `SPEC.md` v2.2.1 stub + `PRD/SPEC.md` v2.2.2 雙基底銳化
- 新增 §15.11 v3.0 量表 / §15.12 5 條 ADR / §15.13 5 條市場驗證
- 明確 Pivot SOP（M3 內未拿到 1 個 B2B 內訓單 + 2 個招募版刊登 → Pivot 或 NO-GO）
- Sweet spot 6.2 / 10、商業化 73/100（公式 `30 + sweet×7`）

### Notes
- 完整 1400 行細節保留於 `PRD/SPEC-v3.0-detailed.md.bak`（v3.0.2 entry-level SPEC.md 提供索引）

---

## [v2.2.2] · 之前 · Sweet Spot Rewrite（已併入 v3.0 詳版）

（早期 sweet=6 / 商業化 69 / 隱性 INVESTIGATE，記錄於 v3.0 詳版 §0.1）

---

## [v2.2.1] · 之前 · Sui 部落格 SPEC（root SPEC.md）

（從 v1.0 升級到 v2.2.1，root `SPEC.md` 為簡略版 12KB / 206 行）
