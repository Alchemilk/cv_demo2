// 时间控件 - 更新时间函数，精确到秒
function updateTime() {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, '0');
    const minutes = String(now.getMinutes()).padStart(2, '0');
    const seconds = String(now.getSeconds()).padStart(2, '0');
    document.querySelector('.time-display').textContent = `${hours}:${minutes}:${seconds}`;
    
    // 更新日期和星期
    updateDate();
}

// 日期星期控件 - 更新日期和星期函数
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

// 天气数据数组 - 统一蓝色系（通过亮度和灰度调整实现变化）
// 天气数据数组 - 按天气类型分类调整蓝色系背景
// 天气数据数组 - 添加温度范围
const weatherData = [
    { emoji: '☀️', name: '晴天', color: '#66B2FF', tempRange: [25, 35] }, // 二次元风格天蓝色
    { emoji: '🌤️', name: '多云转晴', color: '#99CEFF', tempRange: [22, 30] }, // 比晴天稍微浅一点的天蓝色
    { emoji: '☁️', name: '多云', color: '#99CEFF', tempRange: [20, 28] }, // 比晴天稍微浅一点的天蓝色
    { emoji: '🌧️', name: '雨天', color: '#8BA3CB', tempRange: [15, 22] }, // 灰暗的蓝色
    { emoji: '⛅', name: '阴天', color: '#8BA3CB', tempRange: [18, 25] }, // 灰暗的蓝色
    { emoji: '❄️', name: '雪天', color: '#8BA3CB', tempRange: [-5, 5] }, // 灰暗的蓝色
    { emoji: '🌩️', name: '雷阵雨', color: '#8BA3CB', tempRange: [18, 25] }, // 灰暗的蓝色
    { emoji: '🌫️', name: '雾天', color: '#99CEFF', tempRange: [10, 18] } // 比晴天稍微浅一点的天蓝色
];

let currentWeatherIndex = 0;

// 更新天气函数 - 确保随机切换
// 更新天气函数 - 确保时间颜色跟随背景切换
// 更新天气函数 - 添加温度显示
function updateWeather() {
    const weatherElement = document.querySelector('.weather-display');
    const timeElement = document.querySelector('.time-display');
    const dateElement = document.querySelector('.date-display'); 
    const ipadScreen = document.querySelector('.ipad-screen');
    
    // 随机选择天气索引
    const randomIndex = Math.floor(Math.random() * weatherData.length);
    currentWeatherIndex = randomIndex;
    
    // 获取当前天气数据
    const currentWeather = weatherData[currentWeatherIndex];
    
    // 生成随机温度（基于该天气的温度范围）
    const minTemp = currentWeather.tempRange[0];
    const maxTemp = currentWeather.tempRange[1];
    const randomTemp = Math.floor(Math.random() * (maxTemp - minTemp + 1)) + minTemp;
    
    // 更新天气和温度显示（使用制表符分隔）
    weatherElement.textContent = `${currentWeather.emoji} ${currentWeather.name}\t${randomTemp}°C`;
    
    // 更新屏幕背景颜色
    const bgColor = weatherData[currentWeatherIndex].color;
    ipadScreen.style.backgroundColor = bgColor;

}

// 初始化并设置定时器
updateTime();
setInterval(updateTime, 1000); // 每秒更新时间

// 页面加载时随机选择初始天气
currentWeatherIndex = Math.floor(Math.random() * weatherData.length);
updateWeather();

// 设置15秒自动切换天气
setInterval(updateWeather, 15000); // 每15秒切换一次天气
