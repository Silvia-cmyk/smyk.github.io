const barchartData = {
    university: {
        bars:[
            {label: "Python", value: 80, color: "#d7b4f3"},
            {label: "Java", value: 70, color: "#f7c59f"},
            {label: "C++", value: 60, color: "#9fe3e1"},
            {label: "JavaScript", value: 90, color: "#f7e65b"},
            {label: "C#", value: 50, color: "#b4c6f0"},
        ]
    },
    work: {
        bars:[
            {label: "Python", value: 85, color: "#d7b4f3"},
            {label: "Java", value: 75, color: "#f7c59f"},
            {label: "C++", value: 65, color: "#9fe3e1"},
            {label: "JavaScript", value: 95, color: "#f7e65b"},
            {label: "C#", value: 55, color: "#b4c6f0"},
        ]
    }
};

const radarData = {
    university: {
        labels: ["Data 1", "Data 2", "Data 3", "Data 4", "Data 5", "Data 6"],
        data: [60, 50, 80, 90, 70, 65]
    },
    work: {
        labels: ["Python", "Java", "C++", "JavaScript", "C#", "Data 6"],
        data: [85, 75, 65, 95, 55, 85]
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