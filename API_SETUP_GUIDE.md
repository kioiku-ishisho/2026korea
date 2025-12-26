# API 設定指南

## 匯率 API 設定（ExchangeRate-API）

### 步驟 1：註冊帳號
1. 前往 https://www.exchangerate-api.com/
2. 點擊 "Get Free Key" 或 "Sign Up"
3. 填寫註冊資訊（Email、密碼等）
4. 完成註冊並驗證 Email

### 步驟 2：取得 API Key
1. 登入後進入 Dashboard
2. 在 "Your API Key" 區塊中可以看到您的 API key
3. 複製這個 API key

### 步驟 3：設定 API Key
1. 開啟 `script.js` 檔案
2. 找到第 6 行：`const apiKey = 'YOUR_EXCHANGE_RATE_API_KEY';`
3. 將 `'YOUR_EXCHANGE_RATE_API_KEY'` 替換為您複製的 API key
4. 例如：`const apiKey = 'abc123def456ghi789';`
5. 儲存檔案

### 步驟 4：測試
重新載入首頁，匯率應該會顯示即時資料（而不是 "免費API" 或 "模擬"）

### 注意事項
- 免費方案每月有 1,500 次 API 呼叫限制
- 如果超過限制，系統會自動使用備用的免費 API
- API key 請妥善保管，不要公開分享

---

## 天氣 API 設定（OpenWeatherMap）

### 已完成設定
✅ API Key 已設定：`94f6ef8b9f2e1811a5e82d91b8935e38`

### 如需更換 API Key
1. 前往 https://openweathermap.org/api
2. 註冊並取得新的 API key
3. 開啟 `script.js` 檔案
4. 找到第 33 行：`const apiKey = '94f6ef8b9f2e1811a5e82d91b8935e38';`
5. 替換為新的 API key
6. 儲存檔案

### 免費方案限制
- 每分鐘 60 次 API 呼叫
- 每日 1,000,000 次 API 呼叫
- 足夠一般使用

---

## 飯店座標設定

### 目前狀態
目前飯店位置使用首爾市中心作為預設位置（37.5665, 126.9780）

### 如何獲取正確的飯店座標
1. 開啟 Google Maps：https://maps.app.goo.gl/Pe3mSULyzJVVLm6w8
2. 在地圖上找到飯店位置
3. 右鍵點擊飯店位置
4. 選擇第一個選項（通常是座標）
5. 複製座標（格式：緯度, 經度，例如：37.5665, 126.9780）

### 更新飯店座標
1. 開啟 `index.html` 檔案
2. 找到飯店位置設定（約第 217 行）
3. 找到：`lat: 37.5665, lng: 126.9780`
4. 將座標替換為正確的飯店座標
5. 儲存檔案

---

## 問題排除

### 匯率顯示 "模擬" 或 "免費API"
- 檢查 API key 是否正確設定
- 確認 API key 沒有過期
- 檢查瀏覽器控制台是否有錯誤訊息

### 天氣顯示 "模擬"
- 檢查 API key 是否正確
- 確認 OpenWeatherMap 帳號是否啟用
- 檢查網路連線

### 地圖無法顯示
- 確認已連線網路
- 檢查瀏覽器控制台是否有錯誤
- 確認 Leaflet 庫已正確載入

