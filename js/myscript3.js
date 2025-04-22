const gap = 20;
const photosContainer = document.getElementById('experience-grid');
const cards = document.querySelectorAll('.experience-card');

function initMasonry(){
    const containerWidth = photosContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const columns = parseInt(containerWidth / (cardWidth + gap));
    const totalContentWidth = columns * cardWidth + (columns - 1) * gap;
    const offsetX = (containerWidth - totalContentWidth) / 2;
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
            const minHeight = Math.min(...heights);
            const index = heights.indexOf(minHeight);
            card.style.top = minHeight + gap + 'px';
            card.style.left = offsetX + (cardWidth + gap) * index + 'px';
            heights[index] += card.scrollHeight + gap; // 更新該欄的高度
            
            // 撐高
            const containerHeight = Math.max(...heights);
            photosContainer.style.height = containerHeight + 'px';

            // 全部放完Icon收手
            placedCount++;
            if (placedCount === cards.length){
                document.getElementById('experience-loading').style.display = 'none';
                photosContainer.style.visibility = 'visible';
            }
        }
        
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

// windows resort
let resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        initMasonry();
    }, 200);
};