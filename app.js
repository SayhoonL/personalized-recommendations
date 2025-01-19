// Sample product data
const products = [
    { id: 1, name: "Model X", type: "SUV", price: 40000, description: "A luxurious SUV for your family." },
    { id: 2, name: "Model Y", type: "Sedan", price: 30000, description: "A compact sedan with great fuel efficiency." },
    { id: 3, name: "Model Z", type: "Truck", price: 50000, description: "A heavy-duty truck for tough jobs." },
    { id: 4, name: "Model A", type: "SUV", price: 25000, description: "An affordable SUV with modern features." },
    { id: 5, name: "Model B", type: "Sedan", price: 20000, description: "A budget-friendly sedan for daily use." },
  ];
  
  // DOM Elements
  const budgetInput = document.getElementById("budget");
  const budgetValue = document.getElementById("budget-value");
  const recommendationsDiv = document.getElementById("recommendations");
  const searchInput = document.getElementById("search");
  const submitButton = document.getElementById("submit");
  const clearButton = document.getElementById("clear-filters");
  
  // Update budget display dynamically
  budgetInput.addEventListener("input", () => {
    budgetValue.textContent = `$${parseInt(budgetInput.value).toLocaleString()}`;
  });
  
  // Generate recommendations
  submitButton.addEventListener("click", () => {
    const selectedBudget = parseInt(budgetInput.value);
    const selectedTypes = [];
    if (document.getElementById("suv").checked) selectedTypes.push("SUV");
    if (document.getElementById("sedan").checked) selectedTypes.push("Sedan");
    if (document.getElementById("truck").checked) selectedTypes.push("Truck");
    const searchQuery = searchInput.value.toLowerCase();
  
    // Filter products based on user preferences
    const filteredProducts = products.filter(
      (product) =>
        selectedTypes.includes(product.type) &&
        product.price <= selectedBudget &&
        product.name.toLowerCase().includes(searchQuery)
    );
  
    renderRecommendations(filteredProducts);
  });
  
  // Clear filters and reset recommendations
  clearButton.addEventListener("click", () => {
    budgetInput.value = 30000;
    budgetValue.textContent = "$30,000";
    document.getElementById("suv").checked = true;
    document.getElementById("sedan").checked = false;
    document.getElementById("truck").checked = false;
    searchInput.value = "";
    recommendationsDiv.innerHTML = "";
  });
  
  // Render recommendations in the grid
  function renderRecommendations(products) {
    recommendationsDiv.innerHTML = "";
  
    if (products.length === 0) {
      recommendationsDiv.innerHTML = "<p>No products match your preferences. Try adjusting your filters.</p>";
      return;
    }
  
    products.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "recommendation-item";
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Type: ${product.type}</p>
        <p>Price: $${product.price.toLocaleString()}</p>
        <p>${product.description}</p>
      `;
      recommendationsDiv.appendChild(productDiv);
    });
  }
  