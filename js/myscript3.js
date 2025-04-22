const gap = 20;
const photosContainer = document.getElementById('experience-grid');
const cards = document.querySelectorAll('.experience-card');

// 大便塔💩🏗️處理
function waitForCardReady(callback){
    const cards = document.querySelectorAll('.experience-card');
    let loaded = 0;

    cards.forEach(card => {
        const img = card.querySelector('img');
        if (!img){
            loaded++;
            if (loaded === cards.length) callback();
            return;
        }
        
        if (img.complete){
            // 圖片已經載入完成
            loaded++;
            if (loaded === cards.length){
                setTimeout(callback, 200);
            }
        } else {
            // 加載完成後再確認一次layout
            img.onload = ()=> {
                setTimeout(() => {
                    loaded++;
                    if (loaded === cards.length) callback();
                }, 200);
            };
        }
    });
};


function arrangeMasonry(){
    const containerWidth = photosContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const columns = parseInt(containerWidth / (cardWidth + gap));
    const heights = [];
    // 計算整體 offset，讓內容置中
    const totalContentWidth = columns * cardWidth + (columns - 1) * gap;
    const offsetX = (containerWidth - totalContentWidth) / 2;
    // Reset 卡片位置與高度設定
    for (let i = 0; i < cards.length; i++){
        cards[i].style.top = null;
        cards[i].style.left = null;
        cards[i].style.minHeight = "unset";
    };
    

    for (let i = 0; i < cards.length; i++){
        const card = cards[i]
        card.style.position = 'absolute'

        // Debug
        console.log(`卡片 ${i} 高度為：`, card.scrollHeight); // ✅ debug 真實高度
        
        if (i < columns){
            // 第一列！
            card.style.top = '0px';
            card.style.left = offsetX + (cardWidth + gap) * i + 'px';
            heights[i] = card.scrollHeight;
        } else {
            // 其他列 幾個用法好奇 1. ...heights 2. indexOf
            const minHeight = Math.min(...heights);
            const index = heights.indexOf(minHeight);
            card.style.top = minHeight + gap + 'px';
            card.style.left = offsetX + (cardWidth + gap) * index + 'px';
            heights[index] += card.scrollHeight + gap;
        }
    };
    // 撐高以免到下一層樓鬼混
    const containerHeight = Math.max(...heights);
    photosContainer.style.height = containerHeight + 'px';
};


window.onload = function(){
    waitForCardReady(() => {
        arrangeMasonry();
    });
};
let resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(() => {
        arrangeMasonry();
    }, 200);
};