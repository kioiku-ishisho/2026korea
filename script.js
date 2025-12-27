// 匯率資訊（使用 ExchangeRate-API）
// 設定指南：
// 1. 前往 https://www.exchangerate-api.com/ 註冊免費帳號
// 2. 登入後在 Dashboard 取得您的 API key
// 3. 將下面的 YOUR_EXCHANGE_RATE_API_KEY 替換為您的 API key

let exchangeRates = {
    usdToKrw: null,
    krwToUsd: null,
    twdToKrw: null,
    krwToTwd: null
};

let currentRateMode = 'twd-krw'; // 'twd-krw' 或 'krw-twd'
let currentUsdKrwMode = 'usd-krw'; // 'usd-krw' 或 'krw-usd'

async function fetchExchangeRate() {
    try {
        // 從配置文件讀取 API key
        const apiKey = (typeof API_CONFIG !== 'undefined' && API_CONFIG.exchangeRateApiKey) 
            ? API_CONFIG.exchangeRateApiKey 
            : 'YOUR_EXCHANGE_RATE_API_KEY';
        
        if (apiKey === 'YOUR_EXCHANGE_RATE_API_KEY') {
            // 如果沒有設定 API key，使用免費的備用 API
            const response = await fetch('https://api.exchangerate-api.com/v4/latest/USD');
            const data = await response.json();
            
            const usdToTwd = data.rates.TWD;
            const usdToKrw = data.rates.KRW;
            const twdToKrw = (usdToKrw / usdToTwd).toFixed(6);
            const krwToTwd = (usdToTwd / usdToKrw).toFixed(6);
            
            exchangeRates.usdToKrw = usdToKrw.toFixed(2);
            exchangeRates.krwToUsd = (1 / usdToKrw).toFixed(6);
            exchangeRates.twdToKrw = twdToKrw;
            exchangeRates.krwToTwd = krwToTwd;
            
            updateRateDisplay();
            updateUsdKrwDisplay();
            document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
        } else {
            // 使用 ExchangeRate-API（需要 API key，更準確）
            const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/latest/USD`);
            const data = await response.json();
            
            if (data.result === 'success') {
                const usdToTwd = data.conversion_rates.TWD;
                const usdToKrw = data.conversion_rates.KRW;
                const twdToKrw = (usdToKrw / usdToTwd).toFixed(6);
                const krwToTwd = (usdToTwd / usdToKrw).toFixed(6);
                
                exchangeRates.usdToKrw = usdToKrw.toFixed(2);
                exchangeRates.krwToUsd = (1 / usdToKrw).toFixed(6);
                exchangeRates.twdToKrw = twdToKrw;
                exchangeRates.krwToTwd = krwToTwd;
                
                updateRateDisplay();
                updateUsdKrwDisplay();
                document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
            } else {
                throw new Error('API 回應錯誤');
            }
        }
    } catch (error) {
        console.error('匯率載入失敗:', error);
        // 如果 API 失敗，使用模擬資料
        exchangeRates.usdToKrw = '1350.00';
        exchangeRates.krwToUsd = (1 / 1350).toFixed(6);
        exchangeRates.twdToKrw = (1 / 42.5).toFixed(6);
        exchangeRates.krwToTwd = (42.5).toFixed(6);
        
        updateRateDisplay();
        updateUsdKrwDisplay();
        document.getElementById('rate-update').textContent = new Date().toLocaleString('zh-TW');
    }
}

function updateRateDisplay() {
    const rateValueEl = document.getElementById('krw-rate');
    const rateLabelEl = document.getElementById('rate-display-label');
    const targetLabelEl = document.getElementById('rate-target-label');
    
    if (currentRateMode === 'twd-krw') {
        // 顯示：1 TWD = ? KRW
        rateLabelEl.textContent = '1 新台幣 (TWD) =';
        rateValueEl.textContent = exchangeRates.twdToKrw;
        targetLabelEl.textContent = '韓元 (KRW)';
    } else {
        // 顯示：1 KRW = ? TWD
        rateLabelEl.textContent = '1 韓元 (KRW) =';
        rateValueEl.textContent = exchangeRates.krwToTwd;
        targetLabelEl.textContent = '新台幣 (TWD)';
    }
}

function updateUsdKrwDisplay() {
    const usdKrwRateEl = document.getElementById('usd-krw-rate');
    const usdRateLabelEl = document.getElementById('usd-rate-display-label');
    const usdTargetLabelEl = document.getElementById('usd-rate-target-label');
    
    if (currentUsdKrwMode === 'usd-krw') {
        // 顯示：1 USD = ? KRW
        usdRateLabelEl.textContent = '1 美元 (USD) =';
        usdKrwRateEl.textContent = exchangeRates.usdToKrw;
        usdTargetLabelEl.textContent = '韓元 (KRW)';
    } else {
        // 顯示：1 KRW = ? USD
        usdRateLabelEl.textContent = '1 韓元 (KRW) =';
        usdKrwRateEl.textContent = exchangeRates.krwToUsd;
        usdTargetLabelEl.textContent = '美元 (USD)';
    }
}

// 切換匯率顯示
function setupRateSwapButton() {
    const swapBtn = document.getElementById('swap-rate-btn');
    if (swapBtn) {
        swapBtn.addEventListener('click', function() {
            currentRateMode = currentRateMode === 'twd-krw' ? 'krw-twd' : 'twd-krw';
            updateRateDisplay();
        });
    }
    
    const swapUsdKrwBtn = document.getElementById('swap-usd-krw-btn');
    if (swapUsdKrwBtn) {
        swapUsdKrwBtn.addEventListener('click', function() {
            currentUsdKrwMode = currentUsdKrwMode === 'usd-krw' ? 'krw-usd' : 'usd-krw';
            updateUsdKrwDisplay();
        });
    }
}

// 天氣資訊（使用 OpenWeatherMap API）
async function fetchWeather() {
    try {
        // 從配置文件讀取 API key
        const apiKey = (typeof API_CONFIG !== 'undefined' && API_CONFIG.openWeatherMapApiKey) 
            ? API_CONFIG.openWeatherMapApiKey 
            : 'YOUR_OPENWEATHERMAP_API_KEY';
        const city = 'Seoul';
        
        if (apiKey === 'YOUR_OPENWEATHERMAP_API_KEY' || apiKey === 'YOUR_API_KEY') {
            throw new Error('請設定 OpenWeatherMap API key');
        }
        
        // 檢查是否為同一天，如果是同一天，使用保存的溫度範圍
        const today = new Date().toDateString();
        const savedWeather = localStorage.getItem('weatherData');
        let savedData = null;
        
        if (savedWeather) {
            try {
                savedData = JSON.parse(savedWeather);
                // 檢查保存的日期是否為今天
                if (savedData.date === today) {
                    // 使用保存的溫度範圍
                    const todayRangeEl = document.getElementById('today-range');
                    if (todayRangeEl) {
                        todayRangeEl.textContent = `今日溫度：${savedData.tempMin}°C ~ ${savedData.tempMax}°C`;
                    }
                } else {
                    // 不是同一天，清除舊數據
                    savedData = null;
                }
            } catch (e) {
                savedData = null;
            }
        }
        
        // 取得今日天氣（用於更新當前溫度）
        const todayResponse = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw`
        );
        
        if (!todayResponse.ok) {
            throw new Error('API 回應錯誤');
        }
        
        const todayData = await todayResponse.json();
        const temp = Math.round(todayData.main.temp);
        const desc = todayData.weather[0].description;
        
        // 更新當前溫度（每次都會更新）
        document.getElementById('temperature').textContent = `${temp}°C`;
        document.getElementById('weather-desc').textContent = desc;
        
        // 如果沒有保存的數據或不是同一天，獲取新的溫度範圍
        if (!savedData || savedData.date !== today) {
            const tempMin = Math.round(todayData.main.temp_min);
            const tempMax = Math.round(todayData.main.temp_max);
            
            // 保存今天的溫度範圍
            const weatherData = {
                date: today,
                tempMin: tempMin,
                tempMax: tempMax
            };
            localStorage.setItem('weatherData', JSON.stringify(weatherData));
            
            // 顯示今日溫度範圍
            const todayRangeEl = document.getElementById('today-range');
            if (todayRangeEl) {
                todayRangeEl.textContent = `今日溫度：${tempMin}°C ~ ${tempMax}°C`;
            }
        }
        
        document.getElementById('weather-update').textContent = new Date().toLocaleString('zh-TW');
        
        // 取得明日天氣預報
        try {
            const forecastResponse = await fetch(
                `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric&lang=zh_tw&cnt=40`
            );
            
            if (forecastResponse.ok) {
                const forecastData = await forecastResponse.json();
                
                // 計算明日的最高和最低溫度
                // 獲取明天0點到23:59的所有預報數據
                const tomorrow = new Date();
                tomorrow.setDate(tomorrow.getDate() + 1);
                tomorrow.setHours(0, 0, 0, 0);
                
                const tomorrowEnd = new Date(tomorrow);
                tomorrowEnd.setHours(23, 59, 59, 999);
                
                let tomorrowMin = Infinity;
                let tomorrowMax = -Infinity;
                let tomorrowDesc = '';
                
                forecastData.list.forEach(item => {
                    const itemDate = new Date(item.dt * 1000);
                    if (itemDate >= tomorrow && itemDate <= tomorrowEnd) {
                        const itemTemp = item.main.temp;
                        if (itemTemp < tomorrowMin) {
                            tomorrowMin = itemTemp;
                        }
                        if (itemTemp > tomorrowMax) {
                            tomorrowMax = itemTemp;
                        }
                        // 使用第一個預報的天氣描述
                        if (!tomorrowDesc) {
                            tomorrowDesc = item.weather[0].description;
                        }
                    }
                });
                
                // 如果找不到明天的數據，使用24小時後的預報
                if (tomorrowMin === Infinity || tomorrowMax === -Infinity) {
                    const tomorrowForecast = forecastData.list[8] || forecastData.list[forecastData.list.length - 1];
                    if (tomorrowForecast) {
                        tomorrowMin = tomorrowForecast.main.temp_min || tomorrowForecast.main.temp;
                        tomorrowMax = tomorrowForecast.main.temp_max || tomorrowForecast.main.temp;
                        tomorrowDesc = tomorrowForecast.weather[0].description;
                    }
                }
                
                const tomorrowTempEl = document.getElementById('tomorrow-temp');
                const tomorrowDescEl = document.getElementById('tomorrow-desc');
                
                if (tomorrowTempEl && tomorrowMin !== Infinity && tomorrowMax !== -Infinity) {
                    tomorrowTempEl.textContent = `${Math.round(tomorrowMin)}°C ~ ${Math.round(tomorrowMax)}°C`;
                }
                if (tomorrowDescEl && tomorrowDesc) {
                    tomorrowDescEl.textContent = tomorrowDesc;
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
            tempMin: -5,
            tempMax: 2,
            desc: '多雲時晴（1月首爾平均溫度）',
        };
        document.getElementById('temperature').textContent = mockWeather.temp + ' (模擬)';
        document.getElementById('weather-desc').textContent = mockWeather.desc;
        
        const todayRangeEl = document.getElementById('today-range');
        if (todayRangeEl) {
            todayRangeEl.textContent = `今日溫度：${mockWeather.tempMin}°C ~ ${mockWeather.tempMax}°C (模擬)`;
        }
        
        document.getElementById('weather-update').textContent = new Date().toLocaleString('zh-TW');
        
        const tomorrowTempEl = document.getElementById('tomorrow-temp');
        const tomorrowDescEl = document.getElementById('tomorrow-desc');
        if (tomorrowTempEl) {
            tomorrowTempEl.textContent = '-4°C ~ 1°C (模擬)';
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
    setupRateSwapButton();
    
    // 每 5 分鐘更新一次匯率和天氣
    setInterval(fetchExchangeRate, 5 * 60 * 1000);
    setInterval(fetchWeather, 5 * 60 * 1000);
    
    // 每秒更新時間
    setInterval(updateTime, 1000);
});

