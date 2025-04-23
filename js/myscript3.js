const gap = 20;
const photosContainer = document.getElementById('experience-grid');
const cards = document.querySelectorAll('.experience-card');

// Main card layout function
function initMasonry(){
    const containerWidth = photosContainer.offsetWidth;
    const cardWidth = cards[0].offsetWidth;
    const columns = parseInt(containerWidth / (cardWidth + gap)); // ➕ Allowable columns (evenly divisible)
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

    let placedCount = 0; // Picture Count

    // Process each card
    cards.forEach(card => {
        const img = card.querySelector('img');
        
        function placeCard(){
            const minHeight = Math.min(...heights); // Find shortest column
            const index = heights.indexOf(minHeight); // Get column index
            // 📍 Set position
            card.style.top = minHeight + gap + 'px';
            card.style.left = offsetX + (cardWidth + gap) * index + 'px';
            heights[index] += card.scrollHeight + gap; // Update column height
            
            // Expand container height
            const containerHeight = Math.max(...heights);
            photosContainer.style.height = containerHeight + 'px';

            // 🟢 When all arranged: Hide loading, show container
            placedCount++;
            if (placedCount === cards.length){
                document.getElementById('experience-loading').style.display = 'none';
                photosContainer.style.visibility = 'visible';
            }
        }
        
        // 💡 Ensure images are loaded before layout to prevent incorrect scrollHeight
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
    // 🟡 Show loading animation during load
    photosContainer.style.visibility = 'hidden';
    document.getElementById('experience-loading').style.display = 'block';
    initMasonry();  
};

// On screen resize: rearrange layout (prevent overlaps)
let resizeTimer;
window.onresize = function(){
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(function(){
        initMasonry();
    }, 200);
};