const data = [
    {
        img: "assets/portfolio/picheart.jpg",
        title: "Step 1: Browse by Category",
        desc: "Choose from categories like Web Design, Interactive Media, and Branding.",
        link:"https://reurl.cc/YYE1yO"
    },
    {
        img: "assets/portfolio/watermask.png",
        title: "Step 2: Choose a Template",
        desc: "Each project includes insights into my creative process and techniques."
    },
    {
        img: "assets/portfolio/smallcollection.jpg",
        title: "Step 3: Customize Your Design",
        desc: "Easily customize colors, fonts, and layouts to fit your brand."
    },
    {
        img: "assets/portfolio/minihouseblock.jpg",
        title: "Step 4: Preview and Download",
        desc: "Preview your design and download it in various formats."
    },
    {
        img: "assets/portfolio/particlesimulation.jpg",
        title: "Step 5: Share Your Work",
        desc: "Showcase your design on social media or your portfolio."
    },
    {
        img: "assets/portfolio/openctisample.png",
        title: "Step 6: Get Inspired",
        desc: "Explore other users' designs for inspiration and ideas."
    },
    {
        img: "assets/portfolio/nightmarket.png",
        title: "Step 7: Join the Community",
        desc: "Connect with fellow designers and share your work."
    },
    {
        img: "assets/portfolio/attacksample.png",
        title: "Step 8: Join the Community",
        desc: "Connect with fellow designers and share your work 1."
    },
    {
        img: "assets/portfolio/grafanadata.jpg",
        title: "Step 9: Join the Community",
        desc: "Connect with fellow designers and share your work 2."
    },
    {
        img: "assets/portfolio/baiheebook.jpg",
        title: "Step 10: Join the Community",
        desc: "Connect with fellow designers and share your work 3."
    },
    {
        img: "assets/portfolio/sharkpreventiondiary.png",
        title: "Step 11: Join the Community",
        desc: "Connect with fellow designers and share your work 4."
    }
]

const updateCard = (dataItem, imgId, titleId, descId) => {
    // Update image and title
    document.getElementById(imgId).src = dataItem.img;
    document.getElementById(titleId).innerText = dataItem.title;

    const descElement = document.getElementById(descId);

    
    // Update description (show link if available, otherwise display description only)
    if (dataItem.link) {
        descElement.innerHTML = `${dataItem.desc}<br><a href="${dataItem.link}" target="_blank" class="project-link">查看程式碼</a>`;
    }else{
        descElement.innerText = dataItem.desc;
    }
};

let currentIndex = 0;

document.addEventListener("DOMContentLoaded", () => {
    // initial load
    updateCard(data[0], "img-left", "title-left", "desc-left");
    updateCard(data[1], "img-right", "title-right", "desc-right");
    
    // switch to the next card
    const arrow = document.getElementById("arrow-next");
    arrow.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % data.length;
        const nextIndex = (currentIndex + 1) % data.length;
        updateCard(data[currentIndex], "img-left", "title-left", "desc-left");
        updateCard(data[nextIndex], "img-right", "title-right", "desc-right");
    });
});
