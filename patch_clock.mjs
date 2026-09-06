import fs from 'fs';
let content = fs.readFileSync('main.js', 'utf8');

const oldClock = `    var tick = function () {
      try {
        var t = new Intl.DateTimeFormat("en-GB", {
          timeZone: clock.dataset.tz || "Asia/Dhaka",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(new Date());
        clock.textContent = "Dhaka · " + t;
      } catch (e) {
        clock.textContent = "Dhaka";
      }
    };`;

const newClock = `    var tick = function () {
      try {
        var t = new Intl.DateTimeFormat("en-US", {
          timeZone: clock.dataset.tz || "Asia/Dhaka",
          hour: "numeric",
          minute: "2-digit",
          hour12: true,
        }).format(new Date());
        clock.textContent = t;
      } catch (e) {
        clock.textContent = "";
      }
    };`;

content = content.replace(oldClock, newClock);
fs.writeFileSync('main.js', content);
console.log("Patched clock in main.js");
