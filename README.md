

# ☯ 易數閣 YiShu Divination Studio

**基於「規範驅動開發（Specification-Driven Development）」的模組化傳統術數排盤平台**

[![Architecture](https://img.shields.io/badge/Architecture-Spec--Driven%20%7C%20Plugin--Based-991b1b?style=flat-square)](./AGENTS.md)
[![Stack](https://img.shields.io/badge/Stack-HTML5%20%7C%20CSS%20Tokens%20%7C%20Vanilla%20ES%20Modules-1c1917?style=flat-square)](#2-系統架構與分層設計)
[![Deployment](https://img.shields.io/badge/Deploy-GitHub%20Pages%20(Zero--Build)-166534?style=flat-square)](#4-本地開發與部署指南)

[線上體驗 Live Demo](https://YOUR_USERNAME.github.io/YOUR_REPO_NAME/) · [AI 開發規範契約 (`AGENTS.md`)](./AGENTS.md) · [回報問題](https://github.com/YOUR_USERNAME/YOUR_REPO_NAME/issues)

</div>

---

## 1. 專案願景與核心特色

**易數閣（YiShu Divination Studio）** 是一個純前端、零建置（Zero-Build）的模組化傳統術數排盤平台。

不同於一次性生成的「Vibe Coding」網頁，本專案的核心工程目標是建立一套**高內聚、低耦合的插件化架構**與明確的 [`AGENTS.md`](./AGENTS.md) 開發契約，讓開發者與 AI 協作代理人（AI Coding Agents）能夠在不修改底層框架的前提下，持續以標準化流程擴充新的占卜演算法。

### ✨ 目前支援模組

- **小六壬三數起課（`XiaoLiuRen`）**：支援自訂三數起課或系統即時時間起課，自動推演「初傳（起因）、中傳（轉折）、終傳（歸宿）」之六宮落點、五行屬性與吉凶斷語。
- **梅花易數雙數起卦（`MeiHuaYiShu`）**：以先天八卦位元建模（Bitwise Trigram Modeling），輸入雙數或以當前時間起卦，精準計算「本卦、互卦、變卦」、動爻位置及「體用五行生克」吉凶趨勢。
- **環境協定守衛（Protocol Guard）**：內建 `file://` 協定偵測機制，若本機雙擊開啟觸發瀏覽器 ES Modules CORS 限制，會主動顯示本地伺服器啟動指引，消除靜默載入失敗。

---

## 2. 系統架構與分層設計

本平台嚴格遵循**關注點分離（Separation of Concerns）**與**開閉原則（Open-Closed Principle）**，將系統劃分為四個單向依賴的邏輯層級：

```text
+-----------------------------------------------------------------------+
|  視圖表現層 (Presentation Layer)                                        |
|  ├── index.html (首頁入口 + Protocol Guard)                            |
|  ├── pages/xiaoliuren.html & pages/meihuayishu.html (標準互動排盤頁)    |
|  └── assets/css/tokens.css & layout.css (宣紙墨韻 Design Tokens 系統)   |
+-----------------------------------+-----------------------------------+
                                    | 讀取註冊表 / 呼叫純函數引擎
                                    v
+-----------------------------------+-----------------------------------+
|  工具註冊層 (Registry Layer)       |  領域演算法層 (Pure Domain Engines) |
|  └── src/registry.js              |  ├── src/engines/xiaoliuren.js    |
|      (Single Source of Truth)     |  └── src/engines/meihuayishu.js   |
|      集中管理所有術數卡片 Metadata  |      嚴禁觸碰 DOM，回傳標準 JSON 契約 |
+-----------------------------------+-----------------------------------+
```

### 設計核心原則

1. **演算法與介面徹底解耦**：所有占卜邏輯皆封裝於 `src/engines/*.js` 作為純函數（Pure Functions），嚴禁存取 `document` 或 `window`，確保演算法可獨立進行單元測試。
2. **標準占卜結果契約（Standard Result Contract）**：所有引擎皆回傳統一的 JSON 結構（包含 `methodName`、`inputSummary`、`primaryTitle`、`auspiciousness` 三態枚舉及 `details` 陣列），使前端 UI 元件達到 100% 複用。
3. **零外部依賴（Zero-Dependency & Zero-Build）**：純原生 HTML5、CSS Custom Properties 與 ES6 Modules，無需 Node.js 編譯打包即可直接部署於 GitHub Pages。

---

## 3. 目錄結構總覽

```text
.
├── AGENTS.md                  # [AI 開發契約] 定義架構邊界、資料契約與新增占卜模組 SOP
├── README.md                  # [專案說明書] 系統架構導覽與本地運行指南
├── index.html                 # [首頁視圖] 平台入口與環境協定守衛
├── .nojekyll                  # [部署配置] 停用 GitHub Pages 預設 Jekyll 解析
├── assets/
│   ├── css/
│   │   ├── tokens.css         # [設計系統] 全域色彩、字體與版面變數定義
│   │   └── layout.css         # [佈局樣式] 共用卡片網格、表單、狀態徽章與響應式排版
│   └── js/
│       └── home.js            # [首頁邏輯] 動態讀取 registry.js 渲染首頁工具卡片
├── src/
│   ├── registry.js            # [工具註冊表] 集中註冊所有可用占卜模組之 Metadata
│   └── engines/               # [純函數演算法引擎] 嚴禁包含任何 DOM 操作
│       ├── xiaoliuren.js      # 小六壬三數起課引擎
│       └── meihuayishu.js     # 梅花易數先天八卦體用生克引擎
└── pages/                     # [獨立工具視圖] 各占卜模組之互動操作頁面
    ├── xiaoliuren.html        # 小六壬排盤介面
    └── meihuayishu.html       # 梅花易數排盤介面
```

---

## 4. 本地開發與部署指南

> ⚠️ **重要提示（關於 `file://` 與 CORS 限制）**：
> 本專案使用原生 JavaScript ES Modules（`<script type="module">`）。基於現代瀏覽器的同源政策（Same-Origin Policy），**直接滑鼠雙擊 `index.html` 會被瀏覽器阻擋載入模組**。請務必透過本地 HTTP 伺服器預覽。

### 方法一：使用 Python 內建伺服器（推薦）

在專案根目錄開啟終端機（Terminal / PowerShell），執行以下指令：

```bash
# Windows 環境請執行：
python -m http.server 8080

# macOS / Linux 環境請執行：
python3 -m http.server 8080
```

啟動後，於瀏覽器開啟 **`http://localhost:8080`** 即可正常瀏覽與測試所有排盤功能。

### 方法二：使用 VS Code Live Server

1. 使用 VS Code 開啟本專案資料夾。
2. 安裝擴充套件 **Live Server**（Ritwick Dey）。
3. 對 `index.html` 點擊右鍵 $\rightarrow$ 選擇 **Open with Live Server**。

---

## 5. 如何透過 AI 擴充新占卜模組？

本專案已於根目錄配置完整的 [`AGENTS.md`](./AGENTS.md) 開發規範。若欲新增第三種占卜工具（例如：**塔羅牌三張牌陣**、**易經金錢卦** 或 **紫微流日速查**），只需對 AI 代理人下達以下指令：

> **Prompt 範例：**
> 「請嚴格閱讀並遵守專案根目錄的 `AGENTS.md` 規範，為本平台新增『塔羅牌三張牌陣（過去、現在、未來）』占卜模組。請依序建立純函數演算法引擎 `src/engines/tarot.js`、互動頁面 `pages/tarot.html`，並同步註冊至 `src/registry.js`。」

AI 將自動遵循 `AGENTS.md` 第 3 節與第 4 節的契約完成所有檔案建置，確保新頁面與既有系統維持完全一致的視覺風格與資料流結構。

---

## 6. 授權與免責聲明

- **技術架構授權**：本專案程式碼採用 MIT License 開放學習與架構參考。
- **文化與娛樂聲明**：本平台實作之傳統術數演算法旨在展示「規範驅動軟體架構」與計算機邏輯建模，排盤結果僅供傳統文化研究與個人決策思維啟發，請理性看待。
