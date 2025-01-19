// Sample car data
const cars = [
    { name: "Model X", type: "SUV", price: 40000 },
    { name: "Model Y", type: "Sedan", price: 30000 },
    { name: "Model Z", type: "Truck", price: 50000 },
    { name: "Model A", type: "SUV", price: 25000 },
    { name: "Model B", type: "Sedan", price: 20000 },
  ];
  
  // Update budget display dynamically
  document.getElementById("budget").addEventListener("input", (e) => {
    const budgetDisplay = document.getElementById("budget-display");
    budgetDisplay.textContent = `$${parseInt(e.target.value).toLocaleString()}`;
  });
  
  // Generate and display recommendations
  document.getElementById("get-recommendations").addEventListener("click", () => {
    const budget = parseInt(document.getElementById("budget").value);
    const type = document.getElementById("type").value;
  
    // Filter cars based on user preferences
    const filteredCars = cars.filter(
      (car) => car.type === type && car.price <= budget
    );
  
    const recommendationsDiv = document.getElementById("recommendation-list");
    recommendationsDiv.innerHTML = "";
  
    if (filteredCars.length === 0) {
      recommendationsDiv.innerHTML = "<p>No cars match your preferences.</p>";
    } else {
      filteredCars.forEach((car) => {
        const carDiv = document.createElement("div");
        carDiv.className = "car";
        carDiv.innerHTML = `
          <h3>${car.name}</h3>
          <p>Type: ${car.type}</p>
          <p>Price: $${car.price.toLocaleString()}</p>
        `;
        recommendationsDiv.appendChild(carDiv);
      });
    }
  });
  