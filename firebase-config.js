// Firebase 配置
// 使用 compat 版本以兼容 HTML 中的全局 firebase 對象

const firebaseConfig = {
  apiKey: "AIzaSyBjll8uP90-3JknuIDHYziJZueV5pf1HkA",
  authDomain: "korea-9ef5e.firebaseapp.com",
  databaseURL: "https://korea-9ef5e-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "korea-9ef5e",
  storageBucket: "korea-9ef5e.firebasestorage.app",
  messagingSenderId: "997943877630",
  appId: "1:997943877630:web:8e72c2534d8abd333a6aaf",
  measurementId: "G-CX0HWDXJZS"
};

// 初始化 Firebase（使用 compat 版本）
if (typeof firebase !== 'undefined') {
    firebase.initializeApp(firebaseConfig);
    
    // 獲取 Realtime Database 引用
    const database = firebase.database();
}

