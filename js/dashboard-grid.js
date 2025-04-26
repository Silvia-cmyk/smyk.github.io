const barchartData = {
    university: {
        bars:[
            {label: "Python", value: 85, color: "#c9b6f3"},
            {label: "Linux", value: 85, color: "#f5b971"},
            {label: "C Language", value: 75, color: "#7ed6d2"},
            {label: "Unity", value: 88, color: "#ffe066"},
            {label: "Blender", value: 80, color: "#92b4f4"},
            {label: "Database/SQL", value: 75, color: "#8ecae6"},
        ]
    },
    work: {
        bars:[
            {label: "Python", value: 80, color: "#6EC1E4"},
            {label: "Linux", value: 80, color: "#4A6D8C"},
            {label: "Docker", value: 85, color: "#5AB1BB"},
            {label: "Power BI", value: 85, color: "#F6C90E"},
            {label: "Grafana", value: 80, color: "#F79256"},
            {label: "MySQL", value: 80, color: "#9BA8B5"},
            {label: "Notion", value: 95, color: "#B28DFF"},
        ]
    }
};

const radarData = {
    university: {
        labels: ["自主學習", "問題解決", "技術整合", "執行力", "抗壓性與耐心", "團隊合作"],
        data: [90, 85, 75, 70, 65, 73]
    },
    work: {
        labels: ["技術整合", "自主學習", "問題解決", "抗壓性與自我堅持", "表達能力", "系統思考"],
        data: [95, 90, 85, 90, 75, 80]
    }
};

// Button click event
document.querySelectorAll(".toggle-btn").forEach(btn => {
    btn.addEventListener("click", () => {
        // delete all active state ＆ ✔️
        document.querySelectorAll(".toggle-btn").forEach(b => {
            b.classList.remove("active");
            b.querySelector(".check-icon").textContent = "";
        });

        // set up active state and show icon.
        btn.classList.add("active");
        btn.querySelector(".check-icon").textContent = "✔️";
        // 📌 Get data-type
        const type = btn.dataset.type;
        // ⏬ Call chart rendering function
        renderBarChart(type);
        renderRadarChart(type);
    });
});

// default chart
document.addEventListener("DOMContentLoaded", () => {
    renderBarChart("university");
    renderRadarChart("university");
});

// Create a bar chart
function renderBarChart(type){
    const container = document.getElementById("bar-chart");
    container.innerHTML = ""; // Clear previous chart

    barchartData[type].bars.forEach(item => {
        const row = document.createElement("div");
        row.className = "bar-row";

        row.innerHTML = `
            <div class="bar-label">${item.label}</div>
            <div class="bar-track">
                <div class="bar-fill"></div>
                <div class="bar-percent">0%</div>
            </div>
        `;
        container.appendChild(row);
        
        // start animate the bar fill
        setTimeout(() => {
            const fill = row.querySelector(".bar-fill");
            const percent = row.querySelector(".bar-percent");
            fill.style.backgroundColor = item.color; // 🎨 Apply colors

            fill.style.background = `linear-gradient(to right, #fff 0%, ${item.color} 100%)`;
            fill.style.width = `${item.value}%`;

            // run run run~
            let current = 0;
            const interval = setInterval(() => {
                if (current >= item.value) {
                    clearInterval(interval);
                } else {
                    current++;
                    percent.textContent = `${current}%`;
                }
            }, 1000 / item.value); // Adjust speed based on value
        }, 50);
    });
}

// Radar chart
let radarChart = null;

function renderRadarChart(type) {
    const ctx = document.getElementById("radar-chart").getContext("2d");
    // Destroy the previous chart if it exists
    if (radarChart) {
        radarChart.destroy();
    }

    // Create a new radar chart
    radarChart = new Chart(ctx, {
        type: 'radar',
        data: {
            labels: radarData[type].labels,
            datasets: [{
                label: '能力值',
                data: radarData[type].data,
                backgroundColor: 'rgba(108, 192, 122, 0.3)',
                borderColor: '#4caf50',
                pointBackgroundColor: '#4caf50',
                pointBorderColor: '#fff',
                pointHoverBackgroundColor: '#fff',
                pointHoverBorderColor: '#4caf50',
                fill: true,
            }]
        },
        options: {
            responsive: true,
            scales: {
                r: {
                    beginAtZero: true,
                    suggestedMax: 100,
                    angleLines: {color: '#ccc'},
                    grid: {color: '#eee'},
                    pointLabels:{
                        font: {size: 12},
                        color: '#333'
                    }
                }
            },
            plugins:{
                legend: {display: false}, // hide 
            }
        }
    });
}