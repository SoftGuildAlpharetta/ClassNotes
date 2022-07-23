const BIN_URL = "https://api.jsonbin.io/v3/b/62dc0c482c868775a534ada7";
fetch(BIN_URL).then((res) =>
  res.json().then((json) => {
    const guests = json.record || [];
    const element = document.getElementById("guest-book");
    const submitBtn = document.getElementById("submit-btn");
    const innerGuestList = document.getElementById("guest-book-list");
    const listOfGuests = guests
      .map((guest) => `<li>${guest.name} - ${guest.birthday}</li>`)
      .join("");
    innerGuestList.innerHTML = listOfGuests;

    const submitForm = (event) => {
      event.preventDefault();
      const nameField = document.getElementById("name-input");
      const bDayField = document.getElementById("bday-input");
      guests.unshift({ name: nameField.value, birthday: bDayField.value });
      const listOfGuests = guests
        .map((guest) => `<li>${guest.name} - ${guest.birthday}</li>`)
        .join("");
      innerGuestList.innerHTML = listOfGuests;
      nameField.value = "";
      bDayField.value = "";
      const requestObject = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "X-Access-Key":
            "$2b$10$ywKZCpz8UFYNO6lEpUSw7.ihEaDdRK8S2y8gSFSeuUjQtDSFMRvmq",
        },
        body: JSON.stringify(guests),
      };
      fetch(BIN_URL, requestObject).then((res) => res.json().then(console.log));
    };

    submitBtn.addEventListener("click", submitForm);
  })
);
