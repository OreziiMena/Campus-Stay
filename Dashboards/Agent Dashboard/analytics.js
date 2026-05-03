document.addEventListener("DOMContentLoaded", () => {
    
    //Fetch Analytics Data
    async function fetchAnalyticsData() {
        try {
            // Replace with your actual backend URL and ensure authorization headers are included
            const response = await fetch("https://api.campusstay.com/v1/agent/analytics", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    // Retrieve agent token from localStorage or session
                    "Authorization": `Bearer ${localStorage.getItem("token") || ""}` 
                }
            });

            // If the API endpoint is not ready or returns an error, we throw an error to trigger the fallback
            if (!response.ok) {
                throw new Error("API not available or unauthorized. Falling back to mock data.");
            }

            const data = await response.json();
            populateMetrics(data.metrics);
            renderCharts(data.charts);

        } catch (error) {
            console.error("Analytics API Error:", error.message);
            
            // Inform user that chart data couldn't be loaded
            alert("Failed to load analytics data from the server. Please try again later.");
        }
    }

    // 2. Populate Top KPI Metrics
    function populateMetrics(metrics) {
        document.getElementById("metric-views").innerText = metrics.views.toLocaleString();
        document.getElementById("metric-clicks").innerText = metrics.clicks.toLocaleString();
        document.getElementById("metric-inquiries").innerText = metrics.inquiries.toLocaleString();
        document.getElementById("metric-conversion").innerText = `${metrics.conversionRate}%`;
    }

    // 3. Render Chart.js Charts
    function renderCharts(chartData) {
        
        // Define common font defaults for Chart.js to match the dashboard
        Chart.defaults.font.family = "'Open Sans', sans-serif";
        
        // Dynamically adjust text color based on Dark Mode
        const isDarkMode = document.body.classList.contains("dark-mode");
        const textColor = isDarkMode ? "#a0a0a0" : "#666";
        const gridColor = isDarkMode ? "#333" : "#eaeaea";
        
        Chart.defaults.color = textColor;

        // Chart 1: Engagement Overview (Line Chart)
        const ctx1 = document.getElementById('engagementChart').getContext('2d');
        new Chart(ctx1, {
            type: 'line',
            data: {
                labels: chartData.engagement.labels, 
                datasets: [{
                    label: 'Profile Views',
                    data: chartData.engagement.views,
                    borderColor: '#28a745',
                    backgroundColor: 'rgba(40, 167, 69, 0.1)',
                    tension: 0.4,
                    fill: true
                }, {
                    label: 'Inquiries',
                    data: chartData.engagement.inquiries,
                    borderColor: '#f39c12',
                    backgroundColor: 'transparent',
                    tension: 0.4,
                    borderDash: [5, 5]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { position: 'top' }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { color: gridColor }
                    },
                    x: {
                        grid: { color: gridColor }
                    }
                }
            }
        });

        // Chart 2: Views per Property (Bar Chart)
        const ctx2 = document.getElementById('propertyViewsChart').getContext('2d');
        new Chart(ctx2, {
            type: 'bar',
            data: {
                labels: chartData.properties.labels, 
                datasets: [{
                    label: 'Total Views',
                    data: chartData.properties.data,
                    backgroundColor: '#02351c', // Primary green
                    borderRadius: 4
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { 
                        beginAtZero: true,
                        grid: { color: gridColor }
                    },
                    x: {
                        grid: { display: false }
                    }
                }
            }
        });

        // Chart 3: Student Demographics (Doughnut Chart)
        const ctx3 = document.getElementById('demographicsChart').getContext('2d');
        new Chart(ctx3, {
            type: 'doughnut',
            data: {
                labels: chartData.demographics.labels, 
                datasets: [{
                    data: chartData.demographics.data,
                    backgroundColor: ['#02351c', '#d35400', '#28a745', '#f39c12', '#3498db'],
                    borderWidth: isDarkMode ? 2 : 0,
                    borderColor: isDarkMode ? '#1e1e1e' : '#fff'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                cutout: '70%',
                plugins: {
                    legend: { position: 'right' }
                }
            }
        });
    }



    // Initialize the fetch immediately on load
    fetchAnalyticsData();
});
