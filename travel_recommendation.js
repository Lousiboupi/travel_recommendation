document.getElementById('btnSearch').addEventListener('click', function() {
    const query = document.getElementById('destinationInput').value.trim().toLowerCase();
    console.log("Search query:", query);

    if (query) {
        fetch('path/to/your/data.json') // Replace with the actual path to your data
            .then(response => response.json())
            .then(data => {
                console.log("Data fetched:", data);
                const filteredData = data.filter(item => item.name.toLowerCase().includes(query));
                console.log("Filtered data:", filteredData);
                if (filteredData.length > 0) {
                    displayRecommendations(filteredData, query);
                } else {
                    console.log("No matching results found.");
                    document.getElementById("recommendations-container").innerHTML = "<p>No matching results found.</p>";
                }
            })
            .catch(error => console.error("Error fetching data:", error));
    } else {
        console.log("Please enter a search query.");
    }
});

document.getElementById('btnReset').addEventListener('click', function() {
    clearResults();
});

function clearResults() {
    document.getElementById('destinationInput').value = ''; // Clear the search input
    document.getElementById('recommendations-container').innerHTML = ''; // Clear the recommendations container
}

function displayRecommendations(data, category) {
    const container = document.getElementById("recommendations-container");
    container.innerHTML = ""; // Clear previous results
    
    const recommendations = data.filter(item => item.category === category).slice(0, 2);
    console.log("Recommendations to display:", recommendations);
    
    recommendations.forEach(place => {
        const placeElement = document.createElement("div");
        placeElement.classList.add("recommendation");
        placeElement.innerHTML = `
            <h3>${place.name}</h3>
            <img src="${place.imageUrl}" alt="${place.name}" />
            <p>${place.description}</p>
        `;
        container.appendChild(placeElement);
    });
}