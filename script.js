function updateDateTime() {
  const now = new Date();

  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  const timeString = now.toLocaleTimeString("en-US", timeOptions);


  const dateOptions = { weekday: "short", day: "numeric", month: "short" };
  const dateString = now.toLocaleDateString("en-US", dateOptions);


  document.getElementById("currentTime").innerText = timeString;
  document.getElementById("currentDate").innerText = dateString;
}
updateDateTime();

setInterval(updateDateTime, 1000);

const ESP_IP = "http://10.84.98.186";

async function sendToArduino(command) {
  try {
    await fetch(`${ESP_IP}/?cmd=${command}`, {
      method: "GET",
      mode: "no-cors",
    });
  } catch (error) {
    console.log("القطعة مش متوصلة بالشبكة أو الـ IP غلط.");
  }
}
const toggleBtn = document.querySelectorAll(".toggle");

toggleBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.classList.toggle("active");

    const isActive = btn.classList.contains("active");
    switch (btn.id) {
      case "lights":
        isActive ? sendToArduino("A") : sendToArduino("a");
        break;
      case "door":
        isActive ? sendToArduino("B") : sendToArduino("b");
        break;
    }
  });
});
