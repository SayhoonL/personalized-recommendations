// Sample product data
const products = [
    { id: 1, name: "Model X", type: "SUV", price: 40000, description: "A luxurious SUV for your family." },
    { id: 2, name: "Model Y", type: "Sedan", price: 30000, description: "A compact sedan with great fuel efficiency." },
    { id: 3, name: "Model Z", type: "Truck", price: 50000, description: "A heavy-duty truck for tough jobs." },
    { id: 4, name: "Model A", type: "SUV", price: 25000, description: "An affordable SUV with modern features." },
    { id: 5, name: "Model B", type: "Sedan", price: 20000, description: "A budget-friendly sedan for daily use." },
  ];
  
  // Update budget display dynamically
  const budgetInput = document.getElementById("budget");
  const budgetValue = document.getElementById("budget-value");
  
  budgetInput.addEventListener("input", () => {
    budgetValue.textContent = `$${parseInt(budgetInput.value).toLocaleString()}`;
  });
  
  // Handle form submission and display recommendations
  document.getElementById("submit").addEventListener("click", () => {
    const selectedBudget = parseInt(document.getElementById("budget").value);
    const selectedType = document.getElementById("type").value;
  
    // Filter products based on user preferences
    const filteredProducts = products.filter(
      (product) => product.type === selectedType && product.price <= selectedBudget
    );
  
    // Display recommendations
    const recommendationsDiv = document.getElementById("recommendations");
    recommendationsDiv.innerHTML = "";
  
    if (filteredProducts.length === 0) {
      recommendationsDiv.innerHTML = "<p>No products match your preferences. Try adjusting your criteria.</p>";
    } else {
      filteredProducts.forEach((product) => {
        const productDiv = document.createElement("div");
        productDiv.className = "recommendation";
        productDiv.innerHTML = `
          <h3>${product.name}</h3>
          <p>Type: ${product.type}</p>
          <p>Price: $${product.price.toLocaleString()}</p>
          <p>${product.description}</p>
        `;
        recommendationsDiv.appendChild(productDiv);
      });
    }
  });
  