const data = [
    {
        img: "asset/portfolio/picheart.jpg",
        title: "Step 1: Browse by Category",
        desc: "Choose from categories like Web Design, Interactive Media, and Branding."
    },
    {
        img: "asset/portfolio/watermask.png",
        title: "Step 2: Choose a Template",
        desc: "Each project includes insights into my creative process and techniques."
    }
]

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    const arrow = document.getElementById("arrow-next");

    arrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % data.length;
        
        //
        document.getElementById("img-left").src = data[currentIndex].img;
        document.getElementById("title-left").innerText = data[currentIndex].title;
        document.getElementById("desc-left").innerText = data[currentIndex].desc;

        //
        const nextIndex = (currentIndex + 1) % data.length;
        document.getElementById("img-right").src = data[nextIndex].img;
        document.getElementById("title-right").innerText = data[nextIndex].title;
        document.getElementById("desc-right").innerText = data[nextIndex].desc;
    });
});
