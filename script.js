document.addEventListener("DOMContentLoaded", () => {
  // Set min date to today
  const dateInput = document.getElementById("date");
  const today = new Date().toISOString().split("T")[0];
  dateInput.setAttribute("min", today);

  const form = document.getElementById("reservationForm");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    let valid = true;

    // Name Validation
    const name = document.getElementById("name");
    const nameError = document.getElementById("nameError");
    if (name.value.trim() === "") {
      nameError.classList.remove("d-none");
      valid = false;
    } else {
      nameError.classList.add("d-none");
    }

    // Mobile Number Validation
    const mobile = document.getElementById("mobile");
    const mobileError = document.getElementById("mobileError");
    if (mobile.value.length !== 10) {
      mobileError.classList.remove("d-none");
      valid = false;
    } else {
      mobileError.classList.add("d-none");
    }

    // Email Validation
    const email = document.getElementById("email");
    const emailError = document.getElementById("emailError");
    const emailPattern = /^[^ ]+@[^ ]+\.[a-z]{2,}$/;
    if (!email.value.match(emailPattern)) {
      emailError.classList.remove("d-none");
      valid = false;
    } else {
      emailError.classList.add("d-none");
    }

    // Date Validation
    const date = document.getElementById("date");
    const dateError = document.getElementById("dateError");
    if (date.value === "") {
      dateError.classList.remove("d-none");
      valid = false;
    } else {
      dateError.classList.add("d-none");
    }

    // People Validation
    const people = document.getElementById("people");
    const peopleError = document.getElementById("peopleError");
    if (people.value === "") {
      peopleError.classList.remove("d-none");
      valid = false;
    } else {
      peopleError.classList.add("d-none");
    }

    if (valid) {
      // Save reservation data to localStorage
      const reservationData = {
        name: name.value.trim(),
        mobile: mobile.value,
        email: email.value.trim(),
        date: date.value,
        people: people.value
      };

      localStorage.setItem("reservationData", JSON.stringify(reservationData));

      // Show success popup
      alert("🎉 Reservation successful! You will be redirected to your reservation details.");

      // Redirect to reservation receipt page
      window.location.href = "reservation-receipt.html";
    }
  });
});