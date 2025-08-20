// 确保应用图标点击事件正常绑定（无需修改，确认代码如下）
document.addEventListener('DOMContentLoaded', function() {
    const appButtons = document.querySelectorAll('.app-icon-bg');
    
    // 打印选择到的按钮数量，验证是否正确获取元素
    console.log('检测到应用按钮数量:', appButtons.length); // 应输出5
    
    appButtons.forEach(button => {
        button.addEventListener('click', function() {
            const appIcon = this.closest('.app-icon');
            const appName = appIcon.getAttribute('data-app');
            console.log(`点击了应用: ${appName}`); // 点击时控制台应输出日志
            
            if ('vibrate' in navigator) {
                navigator.vibrate(10); // 支持振动的设备会有振动反馈
            }
        });
    });
});
