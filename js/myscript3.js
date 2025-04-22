const gap = 20;
const photosContainer = document.getElementById('experience-grid');
const cards = document.querySelectorAll('.experience-card');

// 卡片排版主函式
function initMasonry(){
    const containerWidth = photosContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const columns = parseInt(containerWidth / (cardWidth + gap)); // ➕ 可容納的欄數（整除）
    const totalContentWidth = columns * cardWidth + (columns - 1) * gap;
    const offsetX = (containerWidth - totalContentWidth) / 2; // ↔️ 水平置中偏移量
    const heights = Array(columns).fill(0); // 每一欄目前高度

    // Reset all card positions
    cards.forEach(card => {
        card.style.position = 'absolute';
        card.style.top = null;
        card.style.left = null;
        card.style.minHeight = 'unset';
    });

    let placedCount = 0; // Picture Count

    // Process each card
    cards.forEach(card => {
        const img = card.querySelector('img');
        
        function placeCard(){
            const minHeight = Math.min(...heights); // 找最短欄
            const index = heights.indexOf(minHeight); // 找出欄位索引
            // 📍 設定位置
            card.style.top = minHeight + gap + 'px';
            card.style.left = offsetX + (cardWidth + gap) * index + 'px';
            heights[index] += card.scrollHeight + gap; // 更新該欄的高度
            
            // 撐高
            const containerHeight = Math.max(...heights);
            photosContainer.style.height = containerHeight + 'px';

            // 🟢 全部排完時：隱藏 loading、顯示容器
            placedCount++;
            if (placedCount === cards.length){
                document.getElementById('experience-loading').style.display = 'none';
                photosContainer.style.visibility = 'visible';
            }
        }
        
        // 💡 確保圖片載入完才排版，避免圖片高度影響 scrollHeight 抓不到
        if (!img){
            placeCard();
        } else if (img.complete){
            setTimeout(placeCard, 100);
        } else {
            img.onload = () => {
                setTimeout(placeCard, 100); 
            };
        }
    });
}

window.onload = function() {
    // 🟡載入時顯示 loading 動畫
    photosContainer.style.visibility = 'hidden';
    document.getElementById('experience-loading').style.display = 'block';
    initMasonry();  
};

// 螢幕尺寸改變時：重新排版（避免重疊）
let resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        initMasonry();
    }, 200);
};