window.addEventListener('scroll', function() {
    const navbar = document.querySelector('.navbar');
    const triggerSection = document.querySelector('#stack');

    const triggerPoint = triggerSection.offsetTop - 80;

    if (window.scrollY >= triggerPoint) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});