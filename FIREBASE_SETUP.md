# Firebase 設置指南

為了實現多人協作功能，您需要設置 Firebase Realtime Database。

## 步驟 1：創建 Firebase 專案

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 點擊「新增專案」或「Add Project」
3. 輸入專案名稱（例如：korea-travel-guide）
4. 按照指示完成專案創建

## 步驟 2：啟用 Realtime Database

1. 在 Firebase Console 中，點擊左側選單的「Realtime Database」
2. 點擊「建立資料庫」或「Create Database」
3. 選擇「以測試模式啟動」（Start in test mode）
4. 選擇資料庫位置（建議選擇離您最近的區域，例如：asia-east1）
5. 點擊「完成」或「Done」

## 步驟 3：獲取配置資訊

1. 在 Firebase Console 中，點擊左側選單的「專案設定」（Project Settings）
2. 滾動到「您的應用程式」（Your apps）部分
3. 點擊「</>」圖示（Web 應用程式）
4. 輸入應用程式暱稱（例如：Korea Travel Guide）
5. 複製配置資訊

## 步驟 4：更新 firebase-config.js

打開 `firebase-config.js` 文件，將以下內容替換為您從 Firebase Console 複製的配置：

```javascript
const firebaseConfig = {
    apiKey: "您的 API Key",
    authDomain: "您的專案 ID.firebaseapp.com",
    databaseURL: "https://您的專案 ID-default-rtdb.firebaseio.com",
    projectId: "您的專案 ID",
    storageBucket: "您的專案 ID.appspot.com",
    messagingSenderId: "您的 Messaging Sender ID",
    appId: "您的 App ID"
};
```

## 步驟 5：更新資料庫規則（安全性）

1. 在 Firebase Console 中，點擊「Realtime Database」
2. 點擊「規則」（Rules）標籤
3. 將規則更新為：

```json
{
  "rules": {
    "schedules": {
      ".read": true,
      ".write": true
    }
  }
}
```

**注意**：這個規則允許任何人讀寫資料。如果您的網站是公開的，建議設置身份驗證。對於測試用途，這個規則是可以的。

## 步驟 6：在 HTML 中添加 Firebase SDK

所有 day 頁面已經包含了 Firebase SDK 的引用，您只需要確保：
- Firebase SDK 在 `firebase-config.js` 之前載入
- 所有頁面都正確引用了這些文件

## 完成！

設置完成後，所有用戶的行程編輯將會即時同步。當一個人新增或刪除行程時，其他打開相同頁面的用戶會立即看到更新。

## 疑難排解

- **無法連接 Firebase**：檢查 `firebase-config.js` 中的配置是否正確
- **權限錯誤**：確認資料庫規則已正確設置
- **同步延遲**：檢查網路連接，Firebase 需要穩定的網路連接

