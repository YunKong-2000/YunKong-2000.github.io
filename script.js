// ============================================
// 页面加载动画
// ============================================
window.addEventListener('load', () => {
    const loader = document.getElementById('loader');
    // 延迟隐藏加载器，确保动画流畅
    setTimeout(() => {
        loader.classList.add('hidden');
        document.body.classList.remove('loading');
        
        // 触发滚动动画
        initScrollAnimation();
        // 触发技能进度条动画
        animateSkillBars();
    }, 500);
});

// ============================================
// 主题管理功能
// ============================================

// 获取 DOM 元素
const themeBtn = document.getElementById('themeBtn');
const themeMenu = document.getElementById('themeMenu');
const themeOptions = document.querySelectorAll('.theme-option');

// 检测系统主题偏好（暗黑模式自动检测）
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
const savedTheme = localStorage.getItem('theme');

// 如果没有保存的主题，根据系统偏好设置
if (!savedTheme) {
    if (prefersDark.matches) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'default');
    }
} else {
    document.documentElement.setAttribute('data-theme', savedTheme);
}

// 监听系统主题变化
prefersDark.addEventListener('change', (e) => {
    if (!localStorage.getItem('theme')) {
        document.documentElement.setAttribute('data-theme', e.matches ? 'dark' : 'default');
    }
});

// 主题按钮点击事件
themeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    themeMenu.classList.toggle('active');
});

// 主题选项点击事件
themeOptions.forEach(option => {
    option.addEventListener('click', () => {
        const theme = option.getAttribute('data-theme');
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        themeMenu.classList.remove('active');
    });
});

// 点击页面其他地方关闭菜单
document.addEventListener('click', (e) => {
    if (!themeBtn.contains(e.target) && !themeMenu.contains(e.target)) {
        themeMenu.classList.remove('active');
    }
});

// ============================================
// 滚动动画：元素进入视口时淡入
// ============================================
function initScrollAnimation() {
    const fadeElements = document.querySelectorAll('.fade-in');
    
    // IntersectionObserver API：观察元素是否进入视口
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                // 观察一次后取消观察，提高性能
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,  // 当元素10%可见时触发
        rootMargin: '0px 0px -50px 0px'  // 提前50px触发
    });
    
    // 观察所有需要淡入的元素
    fadeElements.forEach(el => observer.observe(el));
}

// ============================================
// 技能进度条动画
// ============================================
function animateSkillBars() {
    const skillBars = document.querySelectorAll('.skill-progress');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.getPropertyValue('--skill-width');
                bar.style.width = width;
                observer.unobserve(bar);
            }
        });
    }, {
        threshold: 0.5
    });
    
    skillBars.forEach(bar => observer.observe(bar));
}

// ============================================
// 返回顶部按钮
// ============================================
const backToTopBtn = document.getElementById('backToTop');

// 滚动时显示/隐藏返回顶部按钮
window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        backToTopBtn.classList.add('visible');
    } else {
        backToTopBtn.classList.remove('visible');
    }
});

// 点击返回顶部按钮：平滑滚动到顶部
backToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'  // 平滑滚动
    });
});

// ============================================
// 防抖函数：优化滚动事件性能
// ============================================
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 使用防抖优化滚动事件（可选）
// const handleScroll = debounce(() => {
//     // 滚动处理逻辑
// }, 100);

/* 
    ============================================
    可拓展的地方（JavaScript 部分）
    ============================================
    
    1. 添加更多交互功能：
       - 平滑滚动到锚点
       - 返回顶部按钮
       - 页面加载动画
    
    2. 数据管理：
       - 使用 JSON 文件存储项目数据
       - 动态生成技能标签和项目卡片
       - 添加搜索功能
    
    3. 用户体验：
       - 添加主题切换动画
       - 添加加载状态提示
       - 添加错误处理
    
    4. 功能增强：
       - 添加暗黑模式自动检测（prefers-color-scheme）
       - 添加主题预览功能
       - 添加主题自定义功能
    
    5. 性能优化：
       - 使用防抖（debounce）优化事件处理
       - 懒加载图片
       - 代码分割和模块化
    
    6. 其他功能：
       - 添加表单（联系表单）
       - 添加博客文章列表
       - 添加标签云
       - 添加时间线展示
*/
