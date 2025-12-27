# API 配置說明

## 🔒 安全提示

為了保護您的 API keys 不被公開到 GitHub，本專案使用獨立的配置文件來管理 API keys。

## 📋 設定步驟

1. **複製配置範本**
   ```bash
   cp config.example.js config.js
   ```

2. **編輯 config.js**
   - 打開 `config.js` 文件
   - 將 `YOUR_EXCHANGE_RATE_API_KEY` 替換為您的 ExchangeRate-API key
   - 將 `YOUR_OPENWEATHERMAP_API_KEY` 替換為您的 OpenWeatherMap API key

3. **確認 .gitignore**
   - 確保 `config.js` 已添加到 `.gitignore` 中
   - 這樣 `config.js` 就不會被提交到 Git 倉庫

## 🔑 API Keys 取得方式

### ExchangeRate-API
1. 前往 https://www.exchangerate-api.com/
2. 註冊免費帳號
3. 登入後在 Dashboard 取得您的 API key

### OpenWeatherMap API
1. 前往 https://openweathermap.org/api
2. 註冊免費帳號
3. 在 API keys 頁面取得您的 API key

## ⚠️ 重要提醒

- **永遠不要**將 `config.js` 提交到 Git 倉庫
- **永遠不要**在公開場合分享您的 API keys
- 如果 API key 意外洩漏，請立即到對應服務重新生成新的 key
- `config.example.js` 是範本文件，可以安全地提交到 Git

## 📁 文件說明

- `config.example.js` - 配置範本（可提交到 Git）
- `config.js` - 實際配置文件（已加入 .gitignore，不會被提交）
- `.gitignore` - Git 忽略文件列表

