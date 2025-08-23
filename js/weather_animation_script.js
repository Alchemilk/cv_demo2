// 云朵类 - 实现云朵形态和动画
class Cloud {
    constructor() {
        this.container = document.createElement('div');
        this.shadow = document.createElement('div');
        this.bumps = [];
        this.initCloud();
        this.initShadow();
        this.animate();
    }
    
    // 创建云朵形态
    initCloud() {
        // 云朵基本属性
        this.size = Math.random() * 100 + 150;
        this.density = Math.random() * 0.3 + 0.4; // 提高密度至0.4-0.7，更饱满
        this.speed = Math.random() * 0.3 + 0.1;
        this.positionX = Math.random() * window.innerWidth;
        this.positionY = Math.random() * window.innerHeight * 0.3 + window.innerHeight * 0.05;
        
        // 云朵容器样式 - 使用不规则圆角和更自然的基础形状
        this.container.style.position = 'absolute';
        this.container.style.width = `${this.size}px`;
        this.container.style.height = `${this.size * 0.5}px`; // 高度略大于之前，更蓬松
        this.container.style.backgroundColor = `rgba(255, 255, 255, ${this.density})`;
        // 不规则圆角，模拟自然云朵轮廓（不再是完美圆形）
        this.container.style.borderRadius = `${60 + Math.random() * 20}% ${40 + Math.random() * 20}% ${50 + Math.random() * 10}% ${50 + Math.random() * 10}%`;
        this.container.style.filter = `blur(${8 + Math.random() * 4}px)`; // 随机模糊度（8-12px）
        this.container.style.left = `${this.positionX}px`;
        this.container.style.top = `${this.positionY}px`;
        
        // 添加云朵凸起，使用不规则形状和随机分布
        const bumpCount = Math.floor(Math.random() * 3) + 4; // 4-6个凸起，比之前更多样
        for (let i = 0; i < bumpCount; i++) {
            const bump = document.createElement('div');
            bump.className = 'cloud-bump';
            
            // 凸起尺寸随机化（不再是正圆形）
            const bumpWidth = Math.random() * this.size * 0.4 + this.size * 0.2; // 0.2-0.6倍基础尺寸
            const bumpHeight = bumpWidth * (0.7 + Math.random() * 0.5); // 高度随机（0.7-1.2倍宽度），形成椭圆
            const posX = (i / (bumpCount - 1)) * 100;
            const posY = -Math.random() * 50 - 30; // 垂直位置随机
            
            // 不规则凸起形状（椭圆+随机圆角）
            bump.style.width = `${bumpWidth}px`;
            bump.style.height = `${bumpHeight}px`;
            bump.style.left = `${posX}%`;
            bump.style.top = `${posY}%`;
            bump.style.transform = 'translate(-50%, 0)';
            // 随机圆角，避免完美圆形
            bump.style.borderRadius = `${50 + Math.random() * 50}% ${30 + Math.random() * 70}% ${60 + Math.random() * 40}% ${40 + Math.random() * 60}%`;
            // 轻微透明度变化，增强层次感
            bump.style.opacity = `${0.8 + Math.random() * 0.2}`;
            
            this.container.appendChild(bump);
            this.bumps.push(bump);
        }
        
        document.querySelector('.clouds').appendChild(this.container);
    }
    
    // 创建云影
    initShadow() {
        this.shadow.style.position = 'absolute';
        this.shadow.style.width = `${this.size * 1.3}px`;
        this.shadow.style.height = `${this.size * 0.5}px`;
        this.shadow.style.backgroundColor = `rgba(0, 0, 0, ${this.density * 0.12})`;
        this.shadow.style.borderRadius = '50%';
        this.shadow.style.filter = 'blur(25px)';
        this.shadow.style.transform = 'translate(-50%, -50%)';
        
        document.querySelector('.cloud-shadows').appendChild(this.shadow);
    }
    
    // 更新位置
    update() {
        // 云朵移动，带微小的上下浮动
        this.positionX += this.speed;
        this.positionY += Math.sin(Date.now() * 0.001 + this.positionX * 0.01) * 0.05;
        
        // 云朵超出边界后从左侧重新进入
        if (this.positionX > window.innerWidth + this.size) {
            this.positionX = -this.size;
            this.positionY = Math.random() * window.innerHeight * 0.6 + window.innerHeight * 0.1;
            this.speed = Math.random() * 0.3 + 0.1; // 新速度
        }
        
        // 更新云朵位置
        this.container.style.left = `${this.positionX}px`;
        this.container.style.top = `${this.positionY}px`;
        
        // 更新云影位置
        const shadowX = (this.positionX / window.innerWidth) * 100;
        const shadowY = (this.positionY / window.innerHeight) * 80 + 10;
        this.shadow.style.left = `${shadowX}%`;
        this.shadow.style.top = `${shadowY}%`;
        
        // 微小的形态变化，模拟云的流动
        this.bumps.forEach((bump, i) => {
            const factor = Math.sin(Date.now() * 0.002 + i);
            bump.style.transform = `translate(-50%, ${factor * 2}px)`;
        });
    }
    
    // 动画循环
    animate() {
        const update = () => {
            this.update();
            requestAnimationFrame(update);
        };
        update();
    }
}

// 天气动画控制器
class WeatherAnimationController {
    constructor() {
        this.isActive = false;
        this.clouds = [];
        this.sunElement = null;
        this.weatherContainer = null;
        this.init();
    }
    
    // 初始化天气动画容器
    init() {
        // 创建天气动画容器
        this.weatherContainer = document.createElement('div');
        this.weatherContainer.className = 'weather-animation-container';
        this.weatherContainer.style.display = 'none';
        this.weatherContainer.style.position = 'absolute';
        this.weatherContainer.style.top = '0';
        this.weatherContainer.style.left = '0';
        this.weatherContainer.style.width = '100%';
        this.weatherContainer.style.height = '100%';
        
        // 创建天空背景
        const skyElement = document.createElement('div');
        skyElement.className = 'sky';
        
        // 创建云影容器
        const cloudShadowsElement = document.createElement('div');
        cloudShadowsElement.className = 'cloud-shadows';
        
        // 创建阳光效果
        const sunlightElement = document.createElement('div');
        sunlightElement.className = 'sunlight';
        
        // 创建云朵容器
        const cloudsElement = document.createElement('div');
        cloudsElement.className = 'clouds';
        
        // 创建太阳
        this.sunElement = document.createElement('div');
        this.sunElement.className = 'sun';
        
        // 组合元素
        this.weatherContainer.appendChild(skyElement);
        this.weatherContainer.appendChild(cloudShadowsElement);
        this.weatherContainer.appendChild(sunlightElement);
        this.weatherContainer.appendChild(cloudsElement);
        this.weatherContainer.appendChild(this.sunElement);
        
        // 添加到iPad屏幕
        document.querySelector('.ipad-screen').prepend(this.weatherContainer);
    }
    
    // 启动天气动画
    start() {
        if (!this.weatherContainer) return;
        
        this.isActive = true;
        this.weatherContainer.style.display = 'block';
        
        // 创建云朵
        this.clouds = [];
        const cloudCount = 8;
        for (let i = 0; i < cloudCount; i++) {
            this.clouds.push(new Cloud());
        }
    }
    
    // 停止天气动画
    stop() {
        this.isActive = false;
        if (this.weatherContainer) {
            this.weatherContainer.style.display = 'none';
        }
        
        // 清除云朵
        const cloudsContainer = document.querySelector('.clouds');
        if (cloudsContainer) cloudsContainer.innerHTML = '';
        
        const shadowsContainer = document.querySelector('.cloud-shadows');
        if (shadowsContainer) shadowsContainer.innerHTML = '';
        
        this.clouds = [];
    }
}

// 初始化天气动画控制器
const weatherAnimation = new WeatherAnimationController();

// 暴露API给主脚本
window.weatherAnimation = weatherAnimation;