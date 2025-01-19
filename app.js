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
  const recommendationsDiv = document.getElementById("recommendation-list");
  const favoritesDiv = document.getElementById("favorite-list");
  const sortInput = document.getElementById("sort");
  const clearButton = document.getElementById("clear-filters");
  
  // Persistent Preferences
  const savedPreferences = JSON.parse(localStorage.getItem("preferences")) || {};
  
  // Initialize App
  document.addEventListener("DOMContentLoaded", () => {
    loadPreferences();
    renderRecommendations(products);
  });
  
  // Update Budget Display
  budgetInput.addEventListener("input", () => {
    budgetValue.textContent = `$${parseInt(budgetInput.value).toLocaleString()}`;
  });
  
  const submitButton = document.getElementById("submit");

    submitButton.addEventListener("click", () => {
    const selectedBudget = parseInt(budgetInput.value);
    const selectedTypes = [];
    if (document.getElementById("suv").checked) selectedTypes.push("SUV");
    if (document.getElementById("sedan").checked) selectedTypes.push("Sedan");
    if (document.getElementById("truck").checked) selectedTypes.push("Truck");

    const filteredProducts = products.filter(
        (product) =>
        selectedTypes.includes(product.type) && product.price <= selectedBudget
    );

    renderRecommendations(filteredProducts);
    });
  // Generate Recommendations
  function renderRecommendations(filteredProducts) {
    const selectedBudget = parseInt(budgetInput.value);
    const selectedTypes = [];
    if (document.getElementById("suv").checked) selectedTypes.push("SUV");
    if (document.getElementById("sedan").checked) selectedTypes.push("Sedan");
    if (document.getElementById("truck").checked) selectedTypes.push("Truck");
  
    const filtered = filteredProducts.filter(
      (product) =>
        selectedTypes.includes(product.type) && product.price <= selectedBudget
    );
  
    const sorted = sortProducts(filtered, sortInput.value);
  
    recommendationsDiv.innerHTML = "";
    sorted.forEach((product) => {
      const productDiv = document.createElement("div");
      productDiv.className = "recommendation-item";
      productDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Type: ${product.type}</p>
        <p>Price: $${product.price.toLocaleString()}</p>
        <p>${product.description}</p>
        <button onclick="addFavorite(${product.id})">Favorite</button>
      `;
      recommendationsDiv.appendChild(productDiv);
    });
  }
  
  // Add to Favorites
  function addFavorite(productId) {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    if (!favorites.includes(productId)) {
      favorites.push(productId);
      localStorage.setItem("favorites", JSON.stringify(favorites));
      renderFavorites();
    }
  }
  
  // Render Favorites
  function renderFavorites() {
    const favoriteIds = JSON.parse(localStorage.getItem("favorites")) || [];
    favoritesDiv.innerHTML = "";
  
    favoriteIds.forEach((id) => {
      const product = products.find((p) => p.id === id);
      const favoriteDiv = document.createElement("div");
      favoriteDiv.className = "favorite-item";
      favoriteDiv.innerHTML = `
        <h3>${product.name}</h3>
        <p>Type: ${product.type}</p>
        <p>Price: $${product.price.toLocaleString()}</p>
        <button onclick="removeFavorite(${id})">Remove</button>
      `;
      favoritesDiv.appendChild(favoriteDiv);
    });
  }
  
  // Remove from Favorites
  function removeFavorite(productId) {
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    favorites = favorites.filter((id) => id !== productId);
    localStorage.setItem("favorites", JSON.stringify(favorites));
    renderFavorites();
  }
  
  // Sort Products
  function sortProducts(products, order) {
    if (order === "low-to-high") {
      return products.sort((a, b) => a.price - b.price);
    }
    if (order === "high-to-low") {
      return products.sort((a, b) => b.price - a.price);
    }
    return products;
  }
  
  // Load Preferences
  function loadPreferences() {
    if (savedPreferences.budget) budgetInput.value = savedPreferences.budget;
    renderFavorites();
  }
  