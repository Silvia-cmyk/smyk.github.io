const gap = 20;
const photosContainer = document.getElementById('experience-grid');

// Wait for all images to load
function waitForImages(cards) {
    const promises = Array.from(cards).map(card => {
        const img = card.querySelector('img');
        if (!img) return Promise.resolve(); // No image, resolve immediately
        if (img.complete) return Promise.resolve(); // Already loaded
        return new Promise(resolve => {
            img.onload = () => resolve();
            img.onerror = () => resolve(); // Evenif load failed, continue
        });
    });
    return Promise.all(promises);
}


// Main card layout function
function initMasonry(cards){
    const containerWidth = photosContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const columns = Math.max(1, parseInt(containerWidth / (cardWidth + gap))); // ➕ Allowable columns (evenly divisible)
    const totalContentWidth = columns * cardWidth + (columns - 1) * gap;
    const offsetX = (containerWidth - totalContentWidth) / 2; // ↔️ Horizontal center offset
    const heights = Array(columns).fill(0); // Current height of each column

    // Reset all card positions
    cards.forEach(card => {
        card.style.position = 'absolute';
        card.style.top = null;
        card.style.left = null;
        card.style.minHeight = 'unset';
    });

    // Process each card
    cards.forEach(card => {
        const minHeight = Math.min(...heights); // Find shortest column
        const index = heights.indexOf(minHeight); // Get column index
        // 📍 Set position
        card.style.top = minHeight + gap + 'px';
        card.style.left = offsetX + (cardWidth + gap) * index + 'px';
        heights[index] += card.scrollHeight + gap; // Update column height
    });        
    // Expand container height
    const containerHeight = Math.max(...heights);
    photosContainer.style.height = containerHeight + 'px';
}

// Control loading and masonry
function startMasonry() {
    const cards = document.querySelectorAll('.experience-card');
    if (cards.length === 0) {
        console.error('❗找不到任何 .experience-card 卡片！');
        return;
    }

    photosContainer.style.visibility = 'hidden';
    document.getElementById('experience-loading').style.display = 'block';
    
    // Hide loading animation and show the grid
    waitForImages(cards).then(() => {
        initMasonry(cards);
        document.getElementById('experience-loading').style.display = 'none';
        photosContainer.style.visibility = 'visible';
    }).catch(err => {
        console.error('圖片載入失敗：', err);
        document.getElementById('experience-loading').style.display = 'none';
        photosContainer.style.visibility = 'visible';
    })
}


window.onload = function() {
    startMasonry(); 
};

// On screen resize: rearrange layout (prevent overlaps)
let resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        startMasonry();
    }, 200);
};