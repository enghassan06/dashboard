function updateDateTime() {
  const now = new Date();

  // تنسيق الوقت (الساعات والدقائق بنظام 12 ساعة)
  const timeOptions = { hour: "numeric", minute: "2-digit", hour12: true };
  const timeString = now.toLocaleTimeString("en-US", timeOptions);

  // تنسيق التاريخ (اليوم مختصراً، الرقم، ثم الشهر مختصراً)
  const dateOptions = { weekday: "short", day: "numeric", month: "short" };
  const dateString = now.toLocaleDateString("en-US", dateOptions);

  // عرض النتيجة في عناصر الـ HTML
  document.getElementById("currentTime").innerText = timeString;
  document.getElementById("currentDate").innerText = dateString;
}

// تشغيل الدالة فوراً عند فتح الصفحة
updateDateTime();

// تحديث الوقت كل 1000 ملي ثانية (كل ثانية)
setInterval(updateDateTime, 1000);

// حط السطر ده فوق الدالة مباشرة
// ده الـ IP المبدئي.. وهنغيره بالرقم الحقيقي أول ما نشغل القطعة
const ESP_IP = "http://192.168.1.100";

async function sendToArduino(command) {
  console.log(`جاري إرسال الحرف: ${command}`);

  try {
    // بنعمل Request للرابط بتاع القطعة ونلزق فيه الحرف
    // يعني لو دوست على زرار النور هيبعت: http://192.168.1.100/?cmd=A
    await fetch(`${ESP_IP}/?cmd=${command}`, {
      method: "GET",
      mode: "no-cors", // السطر ده مهم جداً عشان متصفح الموبايل أو اللاب ميمنعش الإرسال (CORS Error)
    });

    console.log(`تم إرسال ${command} للقطعة بنجاح!`);
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
