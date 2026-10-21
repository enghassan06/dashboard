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

const ESP_IP = "http://10.18.247.186";

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

const deviceMessage = {
  gateMain: {
    on: "W",
    off: "w", 
  },
  door: {
    on: "D",
    off: "d",
  },
  lightMain: {
    on: "L",
    off: "l",
  },
  lights: {
    on: "A",
    off: "a",
  },
};

const toggleBtn = document.querySelectorAll(".toggle");

toggleBtn.forEach(function (btn) {
  btn.addEventListener("click", function () {
    btn.classList.toggle("active");

    const isActive = btn.classList.contains("active");
    switch (btn.id) {
      case "gateMain":
        isActive
          ? sendToArduino(deviceMessage.gateMain.on)
          : sendToArduino(deviceMessage.gateMain.off);
        break;
      case "door":
        isActive
          ? sendToArduino(deviceMessage.door.on)
          : sendToArduino(deviceMessage.door.off);
        break;
      case "lightMian":
        isActive
          ? sendToArduino(deviceMessage.lightMain.on)
          : sendToArduino(deviceMessage.lightMain.off);
        break;
      case "lights":
        isActive
          ? sendToArduino(deviceMessage.lights.on)
          : sendToArduino(deviceMessage.lights.off);
        break;
    }
  });
});

const roomBtn = document.querySelectorAll(".room-btn");
const rooms = document.querySelectorAll(".room-devices");

function showRoom(RoomName) {
  roomBtn.forEach(function (button) {
    button.classList.toggle("active", button.dataset.room === RoomName);
  });

  rooms.forEach(function (room) {
    room.classList.toggle("active", room.id === RoomName);
  });
}

roomBtn.forEach(function (button) {
  button.addEventListener("click", function () {
    showRoom(button.dataset.room);
  });
});
let a = [];
console.log(Array.isArray(a));
