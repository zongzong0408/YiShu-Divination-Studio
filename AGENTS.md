# 易數排盤平台架構與 AI 協作規範

## 1. 專案願景與核心定位 (Project Purpose)

- **專案名稱**：易數閣（YiShu Divination Studio）— 模組化傳統術數排盤平台
- **核心目標**：建立一個可持續擴充的純前端占卜計算平台（首波支援「小六壬」與「梅花易數」），透過嚴格的「演算法引擎（Engine）與視圖（View）分離」架構，確保未來新增任何術數工具時，都能維持完全一致的 UI 體驗與資料結構。
- **部署環境**：GitHub Pages（純靜態環境，嚴禁使用任何需要 Node.js 編譯或後端伺服器的技術，所有路徑必須使用相對路徑）。

---

## 2. 架構分層與硬性邊界 (Architecture & Strict Prohibitions)

本專案嚴格劃分為三層，AI 在開發時**必須**遵守以下依賴方向（View -> Engine，不可反向依賴）：

1. **領域演算法層 (`src/engines/<slug>.js`)**：
   - 必須是純 JavaScript ES Module (`export function ...`)。
   - **嚴禁**在此層存取 `document`、`window`、`localStorage` 或 `alert()`。
   - 輸入必須為明確的數字或時間參數，輸出必須符合下方的「標準占卜結果契約」。
2. **工具註冊層 (`src/registry.js`)**：
   - 集中註冊所有可用的占卜模組，首頁將自動讀取此檔案渲染工具卡片。
3. **互動視圖層 (`pages/<slug>.html`)**：
   - 負責處理使用者表單輸入、呼叫對應的 Engine 函數，並將回傳的結果物件渲染至標準 `.result-box` 容器中。
   - **禁止**引入外部 CSS/JS 框架（如 Tailwind, Bootstrap, jQuery），**禁止**使用 Inline Styles。

---

## 3. 標準占卜結果資料契約 (Standard Result Contract)

所有 `src/engines/<slug>.js` 的核心計算函數，**必須**回傳以下統一格式的 JSON 物件，以確保前端渲染邏輯高度一致：

```javascript

```
