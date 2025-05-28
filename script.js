const products = [
  { naam: "Nike T-shirt", prijs: 25, merk: "Nike" },
  { naam: "Adidas Shorts", prijs: 30, merk: "Adidas" },
  { naam: "NB Hoodie", prijs: 50, merk: "New Balance" },
  { naam: "UA Tanktop", prijs: 20, merk: "Under Armour" },
  { naam: "Asics Broek", prijs: 35, merk: "Asics" },
];

function showProducts(filtered = products) {
  const container = document.getElementById("products");
  if (!container) return;
  container.innerHTML = "";
  filtered.forEach((p, index) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
      <h3>${p.naam}</h3>
      <p>€${p.prijs}</p>
      <button onclick="addToCart(${index})">Toevoegen</button>
    `;
    container.appendChild(card);
  });
}

function filterByBrand(merk) {
  showProducts(products.filter(p => p.merk === merk));
}

const cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(index) {
  cart.push(products[index]);
  localStorage.setItem("cart", JSON.stringify(cart));
  alert("Toegevoegd aan winkelwagen!");
}

function checkout() {
  const total = cart.reduce((sum, p) => sum + p.prijs, 0);
  const message = `Hey ik ben benieuwd naar deze producten:\n${cart.map(p => p.naam).join(", ")}\nTotale bedrag: €${total}`;
  window.open(`https://wa.me/31684133152?text=${encodeURIComponent(message)}`);
}

if (window.location.pathname.includes("cart.html")) {
  const container = document.getElementById("cart-items");
  const totalContainer = document.getElementById("total");
  cart.forEach(p => {
    const div = document.createElement("div");
    div.textContent = `${p.naam} - €${p.prijs}`;
    container.appendChild(div);
  });
  const total = cart.reduce((sum, p) => sum + p.prijs, 0);
  totalContainer.textContent = `Totaal: €${total}`;
}
