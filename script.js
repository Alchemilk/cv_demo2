// 更新时间函数，精确到秒
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time-display').textContent = `${hours}:${minutes}:${seconds}`;
    
    // 更新日期和星期
    updateDate();
}

// 新增：更新日期和星期函数
function updateDate() {
    const now = new Date();
    const year = now.getFullYear();
    const month = String(now.getMonth() + 1).padStart(2, '0');
    const day = String(now.getDate()).padStart(2, '0');
    
    // 星期几中文显示
    const weekdays = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];
    const weekday = weekdays[now.getDay()];
    
    document.querySelector('.date-display').textContent = `${year}-${month}-${day} ${weekday}`;
}

// 天气数据数组
const weatherData = [
    { emoji: '☀️', name: '晴天', color: '#87CEEB' }, // 浅蓝色
    { emoji: '🌤️', name: '多云转晴', color: '#A4D3EE' }, // 淡蓝色
    { emoji: '☁️', name: '多云', color: '#D3D3D3' }, // 灰色
    { emoji: '🌧️', name: '雨天', color: '#708090' }, // 深灰色
    { emoji: '⛅', name: '阴天', color: '#B0C4DE' }, // 亮钢蓝色
    { emoji: '❄️', name: '雪天', color: '#F5F5F5' }, // 近白色
    { emoji: '🌩️', name: '雷阵雨', color: '#4A4A4A' }, // 深灰色
    { emoji: '🌫️', name: '雾天', color: '#C0C0C0' } // 银色
];

let currentWeatherIndex = 0;

// 更新天气函数 - 确保随机切换
// 更新天气函数 - 确保时间颜色跟随背景切换
function updateWeather() {
    const weatherElement = document.querySelector('.weather-display');
    const timeElement = document.querySelector('.time-display');
    const ipadScreen = document.querySelector('.ipad-screen');
    
    // 随机选择天气索引
    const randomIndex = Math.floor(Math.random() * weatherData.length);
    currentWeatherIndex = randomIndex;
    
    // 更新天气显示
    weatherElement.textContent = `${weatherData[currentWeatherIndex].emoji} ${weatherData[currentWeatherIndex].name}`;
    
    // 更新屏幕背景颜色
    const bgColor = weatherData[currentWeatherIndex].color;
    ipadScreen.style.backgroundColor = bgColor;
    
    // 根据背景色亮度自动调整文字颜色（确保时间数字颜色跟随背景）
    const luminance = getLuminance(bgColor);
    const textColor = luminance > 0.5 ? '#333333' : '#ffffff'; // 亮色背景用深色文字，暗色背景用白色文字
    timeElement.style.color = textColor; // 设置时间数字颜色
    weatherElement.style.color = textColor;
}

// 辅助函数：调整颜色深浅
function shadeColor(color, percent) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R = Math.floor(R * (100 + percent) / 100);
    G = Math.floor(G * (100 + percent) / 100);
    B = Math.floor(B * (100 + percent) / 100);

    R = (R < 255) ? R : 255;
    G = (G < 255) ? G : 255;
    B = (B < 255) ? B : 255;

    R = (R > 0) ? R : 0;
    G = (G > 0) ? G : 0;
    B = (B > 0) ? B : 0;

    const RR = ((R.toString(16).length === 1) ? "0" + R.toString(16) : R.toString(16));
    const GG = ((G.toString(16).length === 1) ? "0" + G.toString(16) : G.toString(16));
    const BB = ((B.toString(16).length === 1) ? "0" + B.toString(16) : B.toString(16));

    return "#" + RR + GG + BB;
}

// 辅助函数：获取颜色亮度
function getLuminance(color) {
    let R = parseInt(color.substring(1, 3), 16);
    let G = parseInt(color.substring(3, 5), 16);
    let B = parseInt(color.substring(5, 7), 16);

    R /= 255;
    G /= 255;
    B /= 255;

    const [r, g, b] = [R, G, B].map(component => {
        return component <= 0.03928
            ? component / 12.92
            : Math.pow((component + 0.055) / 1.055, 2.4);
    });

    return 0.2126 * r + 0.7152 * g + 0.0722 * b;
}

// 初始化并设置定时器
updateTime();
setInterval(updateTime, 1000); // 每秒更新时间

// 页面加载时随机选择初始天气
currentWeatherIndex = Math.floor(Math.random() * weatherData.length);
updateWeather();
// 设置15秒自动切换天气
setInterval(updateWeather, 15000); // 每15秒切换一次天气