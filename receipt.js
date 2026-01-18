 document.addEventListener("DOMContentLoaded", () => {
      const receiptDiv = document.getElementById("receipt");
      const orderDataJSON = localStorage.getItem("orderData");

      if (!orderDataJSON) {
        receiptDiv.innerHTML = "<p class='text-danger'>No order data found. Please place an order first.</p>";
        return;
      }

      const orderData = JSON.parse(orderDataJSON);

      let total = 0;
      let html = `
        <h3>Customer Details</h3>
        <p><strong>Name:</strong> ${orderData.customerName}</p>
        <p><strong>Mobile Number:</strong> ${orderData.phoneNumber}</p>
        <p><strong>Address:</strong> ${orderData.address}</p>
        <p><strong>Order Type:</strong> ${orderData.orderType}</p>

        <h3 class="mt-4">Ordered Dishes</h3>
        <ul class="list-group mb-3">
      `;

      for (const dish in orderData.cart) {
        const item = orderData.cart[dish];
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        html += `
          <li class="list-group-item d-flex justify-content-between align-items-center">
            ${dish} x ${item.quantity}
            <span>₹${itemTotal}</span>
          </li>
        `;
      }

      html += `
        <li class="list-group-item d-flex justify-content-between align-items-center fw-bold">
          Total Price
          <span>₹${total}</span>
        </li>
        </ul>
      `;

      receiptDiv.innerHTML = html;
    });