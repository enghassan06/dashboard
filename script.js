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

const alertBox = document.querySelector("#security-alert");
const alertMessage = document.querySelector("#security-message");
const okButton = document.querySelector("#security-ok");

let acknowledgingAlarm = false;

// Send commands to Arduino
async function sendToArduino(command) {
  const response = await fetch(`${ESP_IP}/?cmd=${command}`, {
    mode: "cors",
    cache: "no-store"
  });

  return response.text();
}

// Check alarm status every 500ms
async function checkAlarm() {
  try {
    const status = await sendToArduino("S");

    if (status.trim() === "A") {
      if (!acknowledgingAlarm) {
        alertMessage.textContent =
          "Warning! Window intrusion detected.";

        alertBox.hidden = false;
      }
    } else if (status.trim() === "N") {
      acknowledgingAlarm = false;
      alertBox.hidden = true;
    }
  } catch (error) {
    console.log("Could not connect to Arduino:", error);
  }
}

// Clear the alarm when OK is clicked
okButton.addEventListener("click", async () => {
  acknowledgingAlarm = true;
  alertBox.hidden = true;

  try {
    await sendToArduino("K");
  } catch (error) {
    acknowledgingAlarm = false;
    console.log("Could not clear alarm:", error);
  }
});

// Start checking
checkAlarm();
setInterval(checkAlarm, 500);





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
