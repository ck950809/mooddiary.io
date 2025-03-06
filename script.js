// 添加调试日志
console.log('脚本已加载');

// 心情对应的背景颜色（调整为更柔和的颜色）
const moodColors = {
    happy: '#FFF7E6', // 温暖的米黄色
    calm: '#F0F7F0',  // 柔和的薄荷绿
    sad: '#E6F3FF',   // 淡淡的天蓝色
    angry: '#FFF0F0'  // 淡淡的粉色
};

// 添加对应的深色，用于文字颜色
const moodTextColors = {
    happy: '#FFB700',  // 深黄色
    calm: '#4CAF50',   // 深绿色
    sad: '#2196F3',    // 深蓝色
    angry: '#F44336'   // 深红色
};

let currentMood = '';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM已加载完成'); // 调试日志
    
    // 设置默认背景色
    document.body.style.backgroundColor = '#E6F3FF';
    
    // 添加心情按钮点击事件
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            console.log('点击了心情按钮:', btn.dataset.mood); // 调试日志
            // 更新当前心情
            currentMood = btn.dataset.mood;
            
            // 更新背景颜色
            document.body.style.backgroundColor = moodColors[currentMood];
            console.log('设置背景色为:', moodColors[currentMood]); // 调试日志
            
            // 更新按钮选中状态
            document.querySelectorAll('.mood-btn').forEach(b => 
                b.style.border = '2px solid transparent');
            btn.style.border = '2px solid #333';
        });
    });

    // 加载保存的日记
    loadDiaries();
});

function saveDiary() {
    if (!currentMood) {
        alert('请先选择一个心情～');
        return;
    }

    const text = document.getElementById('diaryText').value;
    if (!text) {
        alert('请写点什么吧～');
        return;
    }

    const diary = {
        date: new Date().toLocaleString('zh-CN', {
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        }),
        mood: currentMood,
        text: text
    };

    // 获取已存储的日记
    let diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    diaries.unshift(diary); // 添加新日记到开头
    localStorage.setItem('diaries', JSON.stringify(diaries));

    // 清空输入
    document.getElementById('diaryText').value = '';
    currentMood = '';
    document.querySelectorAll('.mood-btn').forEach(btn => 
        btn.style.border = '2px solid transparent');

    // 重新加载日记列表
    loadDiaries();
}

function loadDiaries() {
    const diaries = JSON.parse(localStorage.getItem('diaries') || '[]');
    const diaryList = document.getElementById('diaryList');
    diaryList.innerHTML = '';

    diaries.forEach(diary => {
        // 截取日记内容（显示前50个字符）
        const shortText = diary.text.length > 50 
            ? diary.text.substring(0, 50) + '...' 
            : diary.text;

        const entry = document.createElement('div');
        entry.className = 'diary-entry';
        entry.style.backgroundColor = moodColors[diary.mood];
        entry.style.borderLeft = `4px solid ${moodTextColors[diary.mood]}`;
        
        entry.innerHTML = `
            <div class="diary-header">
                <span class="diary-date">${diary.date}</span>
                <span class="mood-emoji" style="color: ${moodTextColors[diary.mood]}">${getMoodEmoji(diary.mood)}</span>
            </div>
            <div class="diary-content" style="color: ${moodTextColors[diary.mood]}">
                ${shortText}
            </div>
        `;

        // 添加点击展开完整内容的功能
        entry.addEventListener('click', () => {
            entry.querySelector('.diary-content').textContent = diary.text;
        });

        diaryList.appendChild(entry);
    });
}

function getMoodEmoji(mood) {
    const emojis = {
        happy: '😊',
        calm: '😌',
        sad: '😢',
        angry: '😠'
    };
    return emojis[mood];
} 
