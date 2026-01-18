    document.addEventListener("DOMContentLoaded", () => {
      const reservationDiv = document.getElementById("reservationDetails");
      const reservationJSON = localStorage.getItem("reservationData");

      if (!reservationJSON) {
        reservationDiv.innerHTML = "<p class='text-danger'>No reservation data found. Please make a reservation first.</p>";
        return;
      }

      const reservation = JSON.parse(reservationJSON);

      const html = `
        <p><strong>Name:</strong> ${reservation.name}</p>
        <p><strong>Email:</strong> ${reservation.email}</p>
        <p><strong>Reservation Date:</strong> ${reservation.date}</p>
        <p><strong>Number of People:</strong> ${reservation.people}</p>
      `;

      reservationDiv.innerHTML = html;

      // Optionally clear reservation data after displaying
      // localStorage.removeItem("reservationData");
    });