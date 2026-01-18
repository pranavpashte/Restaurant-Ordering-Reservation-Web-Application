document.addEventListener("DOMContentLoaded", () => {
  const filterSelect = document.getElementById("menuFilter");
  const menuItems = document.querySelectorAll(".menu-item");
  const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
  const cartList = document.getElementById("cartList");
  const totalPriceEl = document.getElementById("totalPrice");
  const orderForm = document.getElementById("orderForm");
  const cartSummary = document.getElementById("cartSummary");
  const cartModal = document.getElementById("cartModal");
  const closeCartBtn = document.getElementById("closeCart");

  // Cart object: { dishName: { price, quantity } }
  let cart = {};

  // Filter menu items based on dropdown
  filterSelect.addEventListener("change", () => {
    const selected = filterSelect.value;
    menuItems.forEach(item => {
      if (selected === "all" || item.dataset.category === selected) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  });

  // Add to cart handler
  addToCartButtons.forEach(btn => {
    btn.addEventListener("click", () => {
      const card = btn.closest(".menu-item");
      const dish = card.dataset.dish;
      const price = parseInt(card.dataset.price, 10);

      if (cart[dish]) {
        cart[dish].quantity++;
      } else {
        cart[dish] = { price: price, quantity: 1 };
      }
      renderCart();
      updateCartSummary();
    });
  });

  // Render cart UI inside modal
  function renderCart() {
    cartList.innerHTML = "";
    const dishes = Object.keys(cart);
    if (dishes.length === 0) {
      cartList.innerHTML = "<li class='list-group-item'>No items in cart.</li>";
      totalPriceEl.textContent = "";
      return;
    }

    let total = 0;
    dishes.forEach(dish => {
      const item = cart[dish];
      total += item.price * item.quantity;

      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      // Dish name and quantity
      const dishInfo = document.createElement("span");
      dishInfo.textContent = `${dish} x ${item.quantity}`;

      // Price
      const priceSpan = document.createElement("span");
      priceSpan.textContent = `₹${item.price * item.quantity}`;
      priceSpan.classList.add("me-3");

      // Remove button
      const removeBtn = document.createElement("button");
      removeBtn.className = "btn btn-sm btn-danger";
      removeBtn.textContent = "Remove";
      removeBtn.setAttribute("aria-label", `Remove one ${dish} from cart`);

      // Remove button click handler
      removeBtn.addEventListener("click", () => {
        if (cart[dish].quantity > 1) {
          cart[dish].quantity--;
        } else {
          delete cart[dish];
        }
        renderCart();
        updateCartSummary();
      });

      // Append elements to li
      li.appendChild(dishInfo);
      li.appendChild(priceSpan);
      li.appendChild(removeBtn);

      cartList.appendChild(li);
    });

    totalPriceEl.textContent = `Total Price: ₹${total}`;
  }

  // Update cart summary button text and visibility
  function updateCartSummary() {
    const totalItems = Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
    if (totalItems > 0) {
      cartSummary.textContent = `Cart (${totalItems})`;
      cartSummary.classList.remove("d-none");
    } else {
      cartSummary.classList.add("d-none");
    }
  }

  // Show cart modal
  cartSummary.addEventListener("click", () => {
    cartModal.classList.remove("d-none");
  });

  // Close cart modal
  closeCartBtn.addEventListener("click", () => {
    cartModal.classList.add("d-none");
  });

  // Close modal on clicking outside modal content
  cartModal.addEventListener("click", (e) => {
    if (e.target === cartModal) {
      cartModal.classList.add("d-none");
    }
  });

  // Form validation helper
  function validateForm() {
    let valid = true;

    // First Name
    const customerName = orderForm.customerName;
    if (!customerName.value.trim()) {
      customerName.classList.add("is-invalid");
      valid = false;
    } else {
      customerName.classList.remove("is-invalid");
    }

    // Phone Number (10 digits)
    const phoneNumber = orderForm.phoneNumber;
    const phonePattern = /^[0-9]{10}$/;
    if (!phonePattern.test(phoneNumber.value.trim())) {
      phoneNumber.classList.add("is-invalid");
      valid = false;
    } else {
      phoneNumber.classList.remove("is-invalid");
    }

    // Address
    const address = orderForm.address;
    if (!address.value.trim()) {
      address.classList.add("is-invalid");
      valid = false;
    } else {
      address.classList.remove("is-invalid");
    }

    // Order Type
    const orderType = orderForm.orderType;
    if (!orderType.value) {
      orderType.classList.add("is-invalid");
      valid = false;
    } else {
      orderType.classList.remove("is-invalid");
    }

    return valid;
  }

  // Handle form submission
  orderForm.addEventListener("submit", e => {
    e.preventDefault();

    if (Object.keys(cart).length === 0) {
      alert("Your cart is empty. Please add some dishes.");
      return;
    }

    if (!validateForm()) {
      return;
    }

    const orderData = {
      cart: cart,
      customerName: orderForm.customerName.value.trim(),
      phoneNumber: orderForm.phoneNumber.value.trim(),
      address: orderForm.address.value.trim(),
      orderType: orderForm.orderType.value
    };

    // Save order data to localStorage
    localStorage.setItem("orderData", JSON.stringify(orderData));

    // Redirect to receipt page
    window.location.href = "receipt.html";
  });

  // Initial render and summary update
  renderCart();
  updateCartSummary();
});