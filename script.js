// 心情对应的背景颜色（调整为更柔和的颜色）
const moodColors = {
    happy: '#FFF7E6', // 温暖的米黄色
    calm: '#F0F7F0',  // 柔和的薄荷绿
    sad: '#E6F3FF',   // 淡淡的天蓝色
    angry: '#FFF0F0'  // 淡淡的粉色
};

let currentMood = '';

// 初始化
document.addEventListener('DOMContentLoaded', () => {
    // 设置默认背景色
    document.body.style.backgroundColor = '#E6F3FF';
    
    // 添加心情按钮点击事件
    document.querySelectorAll('.mood-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            // 更新当前心情
            currentMood = btn.dataset.mood;
            
            // 更新背景颜色
            document.body.style.backgroundColor = moodColors[currentMood];
            
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
        date: new Date().toLocaleString(),
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
        const entry = document.createElement('div');
        entry.className = 'diary-entry';
        entry.style.borderLeft = `5px solid ${moodColors[diary.mood]}`;
        entry.innerHTML = `
            <div style="display: flex; justify-content: space-between;">
                <small>${diary.date}</small>
                <span>${getMoodEmoji(diary.mood)}</span>
            </div>
            <p>${diary.text}</p>
        `;
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
