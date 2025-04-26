document.addEventListener("DOMContentLoaded", function() {
    const footer = document.querySelector('.footer');
    const snowflakes = ["❄️", "❅", "❆"];
    
    function createSnowflake() {
        const snowflake = document.createElement('div');
        snowflake.className = 'snowflake';
        snowflake.textContent = snowflakes[Math.floor(Math.random() * snowflakes.length)];
        snowflake.style.left = Math.random() * 100 + "%";
        
        footer.appendChild(snowflake);
        
        setTimeout(() => {
            const rect = snowflake.getBoundingClientRect();
            const x = rect.left;

            snowflake.style.animation = 'none';
            snowflake.style.top = 'auto';
            snowflake.style.bottom = '0px';
            snowflake.style.left = x + `px`;
            snowflake.style.opacity = '1';
            snowflake.style.transform = `translateX(0) rotate(${Math.random() * 360}deg)`;
        }, 2735);

        setTimeout(()=> {
            snowflake.remove();
        }, 60000);

    }

    setInterval(createSnowflake, 1000);
});