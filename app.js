// Mock API URL for product data
const API_URL = "https://api.mocki.io/v2/549a5d8b/Products"; // Replace with a real API if available

// DOM Elements
const budgetInput = document.getElementById("budget");
const budgetValue = document.getElementById("budget-value");
const recommendationsDiv = document.getElementById("recommendations");
const submitButton = document.getElementById("submit");
const searchInput = document.getElementById("search");

// Update budget display dynamically
budgetInput.addEventListener("input", () => {
  budgetValue.textContent = `$${parseInt(budgetInput.value).toLocaleString()}`;
});

// Fetch product data from the mock API
async function fetchProducts() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data.products; // Adjust based on API structure
  } catch (error) {
    console.error("Error fetching products:", error);
    return [];
  }
}

// Generate recommendations
submitButton.addEventListener("click", async () => {
  const products = await fetchProducts();
  const selectedBudget = parseInt(budgetInput.value);
  const selectedTypes = [];
  if (document.getElementById("suv").checked) selectedTypes.push("SUV");
  if (document.getElementById("sedan").checked) selectedTypes.push("Sedan");
  if (document.getElementById("truck").checked) selectedTypes.push("Truck");
  const searchQuery = searchInput.value.toLowerCase();

  // Filter products
  const filteredProducts = products.filter(
    (product) =>
      selectedTypes.includes(product.type) &&
      product.price <= selectedBudget &&
      product.name.toLowerCase().includes(searchQuery)
  );

  // Apply AI-based ranking (e.g., sort by relevance)
  const rankedProducts = rankProducts(filteredProducts);

  renderRecommendations(rankedProducts);
});

// Simple AI-based ranking (by price relevance)
function rankProducts(products) {
  return products.sort((a, b) => a.price - b.price);
}

// Render recommendations
function renderRecommendations(products) {
  recommendationsDiv.innerHTML = "";
  if (products.length === 0) {
    recommendationsDiv.innerHTML = "<p>No products match your criteria.</p>";
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
