const data = [
    {
        img: "assets/portfolio/picheart.webp",
        title: "一顆程式碼組成跳動的心",
        desc: "某天追劇時看到用程式寫愛心，我想還原劇中一模一樣的愛心動畫。當時對原理一無所知，只能從網路上截圖、找短影片、分析他人程式碼，反覆比對修正。我堅持要做出讓人心動的愛心。",
        link:"https://reurl.cc/YYE1yO"
    },
    {
        img: "assets/portfolio/watermask.webp",
        title: "原來波浪的秘密",
        desc: "從台灣水庫即時水情網站的波浪，當時我充滿好奇與酷炫設計吸引，讓我開始學著思考程式與設計的交界，為了搞懂它的原理，我學習怎麼「看懂別人怎麼做」的過程。",
        link:"https://reurl.cc/yRDVlE"
    },
    {
        img: "assets/portfolio/smallcollection.webp",
        title: "從零開始的 3D 小物件練習",
        desc: "為了重新熟悉 Blender，我選擇跟著 CrossMind Studio 的系列課程進行每日練習。這是 Day 2 的成果，練習物件編輯與視覺排列。同時也是我重新學習 3D 建模的第二步——從基本做起，不跳過任何一個細節。"
    },
    {
        img: "assets/portfolio/minihouseblock.webp",
        title: "Blender 重新上手第一天",
        desc: "這是我多年後再次打開 Blender 的第一份作業，跟著教學完成簡單街區建模，練習移動、縮放、複製等基礎操作。這不只是一次操作練習，更是一場自我測試：「我能不能靠自己的意志，把這整套課程學完？」"
    },
    {
        img: "assets/portfolio/particlesimulation.webp",
        title: "音樂節奏 × 視覺粒子",
        desc: "用 Unreal Engine 與音樂頻譜輸入，嘗試做一個跳動的粒子特效呈現節奏感強烈搭配視覺化效果。靈感來自 Marshmello 與 Grimes 創作音樂。",

    },
    {
        img: "assets/portfolio/openctisample.webp",
        title: "轉身走進資安的那段時間",
        desc: "本來只是為了寫一個技術計畫的前期探索，卻在過程中接觸到各種我沒想過的工具與世界。或許我沒有完成一開始設定的研究路徑，但我走到了另一個能看得更遠的地方。",
        link: "https://reurl.cc/9DDro8"
    },
    {
        img: "assets/portfolio/nightmarket.webp",
        title: "從模型到專題：用反覆練習建起這座小夜市",
        desc: "Unity 結合自建模型，打造出小型夜市。過程中從大東夜市想法出發，經歷多次修改與重做，逐步熟悉建模與場景整合的流程。這個專題不只記錄作品，更是我把這些不同階段的作品統整在一起，也表達了我的耐心與進步。",
        link: "https://reurl.cc/M33kM4"
    },
    {
        img: "assets/portfolio/attacksample.webp",
        title: "第一次做資料視覺化，我學到的事",
        desc: "我第一次使用 Power BI 製作資安儀表板時發現，資料視覺化的關鍵不是「怎麼畫」，而是「為誰而畫、要說什麼」。這段經驗教會我從資料本身與需求出發，思考儀表板該傳遞的價值。"
    },
    {
        img: "assets/portfolio/grafanadata.webp",
        title: "從樹莓派到 Grafana",
        desc: "自費購買樹莓派實作資料收集流程，從源頭串接到 Grafana 視覺化，完整理解整個資料鏈。這不只是學技術，也是為了讓我能更清楚、準確地與他人溝通時，能更清楚知道哪裡可能出錯，怎麼解決問題。有時候，想懂一件事，就得親手走過整套流程。看似白費力氣，但對我而言，非常值得。"
    },
    {
        img: "assets/portfolio/baiheebook.webp",
        title: "典藏蓮鄉-店仔口傳記",
        desc: "擔任《典藏蓮鄉——店仔口傳記》此專題組長，負責協調與整合作品方向。對我來說，這不只是團隊合作，更是第一次意識到領導不是決定一切，而是讓每個人都被看見、尊重每個人的意見。",
        link: "https://reurl.cc/0KK91o"
    },
    {
        img: "assets/portfolio/sharkpreventiondiary.webp",
        title: "鯊鯊居家防疫",
        desc: "這是疫情期間用手機和 CapCut 剪輯的小短片，主角是我家裡的鯊鯊，記錄牠一天的「居家防疫生活」。雖然製作時間緊湊、會的工具也不多，但我用鯊魚玩偶構思劇情，拍出了一段輕鬆逗趣的小故事。",
        link: "https://reurl.cc/5KK4WR"
    }
]

const updateCard = (dataItem, imgId, titleId, descId) => {
    // Update image and title
    document.getElementById(imgId).src = dataItem.img;
    document.getElementById(titleId).innerText = dataItem.title;

    const descElement = document.getElementById(descId);

    
    // Update description (show link if available, otherwise display description only)
    if (dataItem.link) {
        descElement.innerHTML = `${dataItem.desc}<br><a href="${dataItem.link}" target="_blank" rel="noopener noreferrer" class="project-link" >連結查看</a>`;
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
