// 匯率資訊（使用 ExchangeRate-API）
// 設定指南：
// 1. 前往 https://www.exchangerate-api.com/ 註冊免費帳號
// 2. 登入後在 Dashboard 取得您的 API key
// 3. 將下面的 YOUR_EXCHANGE_RATE_API_KEY 替換為您的 API key
async function fetchExchangeRate() {
    try {
        const apiKey = '3f4dad549c5add47df56ed91'; // ExchangeRate-API key
        
        if (apiKey === 'YOUR_EXCHANGE_RATE_API_KEY') {
            // 如果沒有設定 API key，使用免費的備用 API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            
            const usdToTwd = data.rates.TWD;
            const usdToKrw = data.rates.KRW;
            const twdToKrw = (usdToKrw / usdToTwd).toFixed(6);
            
            document.getElementById('krw-rate').textContent = twdToKrw + ' (免費API)';
            document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
        } else {
            // 使用 ExchangeRate-API（需要 API key，更準確）
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
            const data = await response.json();
            
            if (data.result === 'success') {
                const usdToTwd = data.conversion_rates.TWD;
                const usdToKrw = data.conversion_rates.KRW;
                const twdToKrw = (usdToKrw / usdToTwd).toFixed(6);
                
                document.getElementById('krw-rate').textContent = twdToKrw;
                document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
            } else {
                throw new Error('API 回應錯誤');
            }
        }
    } catch (error) {
        console.error('匯率載入失敗:', error);
        // 如果 API 失敗，使用模擬資料
        const mockRate = (1 / 42.5).toFixed(6);
        document.getElementById('krw-rate').textContent = mockRate + ' (模擬)';
        document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
    }
}

// 天氣資訊（使用 OpenWeatherMap API）
async function fetchWeather() {
    try {
        const apiKey = '94f6ef8b9f2e1811a5e82d91b8935e38'; // OpenWeatherMap API key
        const city = 'Seoul';
        
        if (apiKey === 'YOUR_API_KEY') {
            throw new Error('請設定 OpenWeatherMap API key');
        }
        
        // 取得今日天氣
        const todayResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`
        );
        
        if (!todayResponse.ok) {
            throw new Error('API 回應錯誤');
        }
        
        const todayData = await todayResponse.json();
        const temp = Math.round(todayData.main.temp);
        const desc = todayData.weather[0].description;
        
        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('weather-desc').textContent = desc;
        document.getElementById('weather-update').textContent = new Date().toLocaleString('zh-TW');
        
        // 取得明日天氣預報
        try {
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw&cnt=8`
            );
            
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                // 取得明日（約24小時後）的天氣
                // 通常第一個預報是3小時後，我們取第8個（約24小時後）
                const tomorrowForecast = forecastData.list[7] || forecastData.list[forecastData.list.length - 1];
                if (tomorrowForecast) {
                    const tomorrowTemp = Math.round(tomorrowForecast.main.temp);
                    const tomorrowDesc = tomorrowForecast.weather[0].description;
                    
                    const tomorrowTempEl = document.getElementById('tomorrow-temp');
                    const tomorrowDescEl = document.getElementById('tomorrow-desc');
                    
                    if (tomorrowTempEl) {
                        tomorrowTempEl.textContent = `${tomorrowTemp}°C`;
                    }
                    if (tomorrowDescEl) {
                        tomorrowDescEl.textContent = tomorrowDesc;
                    }
                }
            }
        } catch (forecastError) {
            console.error('明日天氣預報載入失敗:', forecastError);
            const tomorrowTempEl = document.getElementById('tomorrow-temp');
            const tomorrowDescEl = document.getElementById('tomorrow-desc');
            if (tomorrowTempEl) {
                tomorrowTempEl.textContent = '載入失敗';
            }
            if (tomorrowDescEl) {
                tomorrowDescEl.textContent = '無法取得預報';
            }
        }
        
    } catch (error) {
        console.error('天氣載入失敗:', error);
        // 如果 API 失敗，使用模擬資料
        const mockWeather = {
            temp: '-2°C',
            desc: '多雲時晴（1月首爾平均溫度）',
        };
        document.getElementById('temperature').textContent = mockWeather.temp + ' (模擬)';
        document.getElementById('weather-desc').textContent = mockWeather.desc;
        document.getElementById('weather-update').textContent = new Date().toLocaleString('zh-TW');
        
        const tomorrowTempEl = document.getElementById('tomorrow-temp');
        const tomorrowDescEl = document.getElementById('tomorrow-desc');
        if (tomorrowTempEl) {
            tomorrowTempEl.textContent = '-1°C (模擬)';
        }
        if (tomorrowDescEl) {
            tomorrowDescEl.textContent = '多雲（模擬）';
        }
    }
}

// 時間顯示功能
function updateTime() {
    const now = new Date();
    
    // 首爾時間（UTC+9）
    const seoulTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Seoul' }));
    const seoulTimeStr = seoulTime.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    // 台灣時間（UTC+8）
    const taiwanTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Taipei' }));
    const taiwanTimeStr = taiwanTime.toLocaleString('zh-TW', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });
    
    const seoulTimeEl = document.getElementById('seoul-time');
    const taiwanTimeEl = document.getElementById('taiwan-time');
    
    if (seoulTimeEl) {
        seoulTimeEl.textContent = seoulTimeStr;
    }
    if (taiwanTimeEl) {
        taiwanTimeEl.textContent = taiwanTimeStr;
    }
}

// 頁面載入時執行
document.addEventListener('DOMContentLoaded', function() {
    fetchExchangeRate();
    fetchWeather();
    updateTime();
    
    // 每 5 分鐘更新一次匯率和天氣
    setInterval(fetchExchangeRate, 5 * 60 * 1000);
    setInterval(fetchWeather, 5 * 60 * 1000);
    
    // 每秒更新時間
    setInterval(updateTime, 1000);
});

