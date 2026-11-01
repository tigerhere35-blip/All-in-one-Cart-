const products = [
{ name: "Fashion", icon: "👕", description: "Clothing and accessories" },
{ name: "Electronics", icon: "📱", description: "Phones and gadgets" },
{ name: "Home & Kitchen", icon: "🏠", description: "Everyday essentials" },
{ name: "Beauty", icon: "✨", description: "Beauty and personal care" }
];

export function renderApp(root) {
root.innerHTML = `
<header class="header">
<a class="brand" href="#">
<span class="brand-icon">🛒</span>
<span>ALL-IN-ONE-CART</span>
</a>
<nav>
<a href="#how-it-works">How It Works</a>
<a href="#categories">Categories</a>
<a href="#submit-order" class="nav-button">Order Now</a>
</nav>
</header>

<main>
  <section class="hero">
    <div class="hero-content">
      <span class="eyebrow">YOUR NEEDS, ONE CART!</span>
      <h1>Shop Anything.<br><span>We Help You Get It.</span></h1>
      <p>
        Found something you love on Amazon, Flipkart, or another
        shopping platform? Share the product link with us.
      </p>
      <a href="#submit-order" class="primary-button">Submit Product Link →</a>
      <div class="hero-note">Easy ordering · Customer support · COD requests</div>
    </div>
    <div class="hero-card">
      <div class="cart-art">🛍️</div>
      <div class="floating-card">
        <span>🔗</span>
        <div>
          <strong>One Product Link</strong>
          <small>We help with your order</small>
        </div>
      </div>
    </div>
  </section>

  <section class="section" id="how-it-works">
    <div class="section-heading">
      <span class="eyebrow">SIMPLE PROCESS</span>
      <h2>How It Works</h2>
      <p>Shopping made easy in three simple steps.</p>
    </div>
    <div class="steps">
      <article class="step">
        <span class="step-number">01</span>
        <div class="step-icon">🔍</div>
        <h3>Find Your Product</h3>
        <p>Choose a product from your favorite shopping platform.</p>
      </article>
      <article class="step">
        <span class="step-number">02</span>
        <div class="step-icon">🔗</div>
        <h3>Share the Link</h3>
        <p>Submit the product link and your order details.</p>
      </article>
      <article class="step">
        <span class="step-number">03</span>
        <div class="step-icon">📦</div>
        <h3>Track Your Order</h3>
        <p>Our team will contact you to confirm your order.</p>
      </article>
    </div>
  </section>

  <section class="section categories-section" id="categories">
    <div class="section-heading">
      <span class="eyebrow">EXPLORE</span>
      <h2>Shop Across Categories</h2>
      <p>Share links for products you want to order.</p>
    </div>
    <div class="categories">
      ${products.map(product => `
        <article class="category-card">
          <span class="category-icon">${product.icon}</span>
          <h3>${product.name}</h3>
          <p>${product.description}</p>
        </article>
      `).join("")}
    </div>
  </section>

  <section class="section order-section" id="submit-order">
    <div class="order-info">
      <span class="eyebrow">START YOUR ORDER</span>
      <h2>Found Something You Love?</h2>
      <p>Share the product link and tell us what you need.</p>
      <ul>
        <li>✓ Product links from supported platforms</li>
        <li>✓ Order confirmation before purchase</li>
        <li>✓ Cash on Delivery requests</li>
        <li>✓ Customer support for order updates</li>
      </ul>
    </div>

    <form id="order-form" class="order-form">
      <h3>Submit Product Link</h3>

      <label for="customer-name">Your Name</label>
      <input id="customer-name" name="name" type="text"
        placeholder="Enter your name" required maxlength="100" />

      <label for="customer-phone">Phone Number</label>
      <input id="customer-phone" name="phone" type="tel"
        placeholder="Enter your phone number" required maxlength="20" />

      <label for="product-link">Product Link</label>
      <input id="product-link" name="link" type="url"
        placeholder="https://..." required />

      <label for="product-details">Product Details</label>
      <textarea id="product-details" name="details"
        placeholder="Product name, size, color, quantity..."
        rows="3" required maxlength="2000"></textarea>

      <label for="customer-address">Delivery Address</label>
      <textarea id="customer-address" name="address"
        placeholder="Enter your delivery address"
        rows="3" required maxlength="1000"></textarea>

      <button type="submit" class="primary-button full-width">
        Submit Order Request →
      </button>

      <p class="form-note">
        This is an order request. Your order is not confirmed until
        our team contacts you.
      </p>
      <div id="form-message" role="status" aria-live="polite"></div>
    </form>
  </section>

  <section class="support-banner">
    <div>
      <span class="eyebrow">NEED HELP?</span>
      <h2>We're Here to Help</h2>
      <p>Contact our customer support team for assistance.</p>
    </div>
    <a id="whatsapp-link" class="primary-button" href="#" target="_blank"
      rel="noopener noreferrer">Chat on WhatsApp</a>
  </section>
</main>

<footer class="footer">
  <a class="brand" href="#"><span class="brand-icon">🛒</span> ALL-IN-ONE-CART</a>
  <p>Your Needs, One Cart!</p>
  <small>© ${new Date().getFullYear()} ALL-IN-ONE-CART. All rights reserved.</small>
</footer>

`;

setupOrderForm(root);
}

function setupOrderForm(root) {
const form = root.querySelector("#order-form");
const message = root.querySelector("#form-message");

form.addEventListener("submit", (event) => {
event.preventDefault();

const formData = new FormData(form);
const link = String(formData.get("link") || "").trim();

let productUrl;

try {
  productUrl = new URL(link);
} catch {
  message.textContent = "Please enter a valid product URL.";
  return;
}

if (!["http:", "https:"].includes(productUrl.protocol)) {
  message.textContent = "Please use a valid http or https product link.";
  return;
}

const order = {
  name: String(formData.get("name") || "").trim(),
  phone: String(formData.get("phone") || "").trim(),
  link: productUrl.href,
  details: String(formData.get("details") || "").trim(),
  address: String(formData.get("address") || "").trim()
};

// Supabase order submission will be connected in a later step.
// Do not display this as a confirmed order.
message.textContent =
  "The form is ready. Order submission will activate after secure database setup.";

console.info("Order form validated. Database connection pending.", {
  productLink: order.link
});

});

// Replace with your official WhatsApp support number.
const whatsappNumber = "";
const whatsappLink = root.querySelector("#whatsapp-link");

if (whatsappNumber) {
whatsappLink.href =
"https://wa.me/${whatsappNumber.replace(/\D/g, "")}";
} else {
whatsappLink.href = "https://www.whatsapp.com/";
whatsappLink.addEventListener("click", (event) => {
event.preventDefault();
message.textContent =
"WhatsApp support will be activated after adding your business number.";
});
}
}
