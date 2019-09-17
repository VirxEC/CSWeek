var OwO = localStorage.getItem("OwO"), UwU = localStorage.getItem("UwU"), bonus = (localStorage.getItem("bonus") == 'true');
if (OwO != null) {
  OwO = parseInt(OwO);
  if (OwO != 0) document.getElementById("OwO").textContent = "OwO ("+OwO+")";
} else OwO = 0;
if (UwU != null) {
  UwU = parseInt(UwU);
  if (OwO != 0) document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;
  if (UwU != 0) document.getElementById("UwU").textContent = "UwU ("+UwU+")";
} else UwU = 0;
if (localStorage.getItem("autoclicker") == 'true') startClicker();

document.getElementById("roulettebruh").addEventListener("click", ()=>{
  var rangen = Math.floor(Math.random()*1000)+1, num = parseInt(document.getElementById("input").value);
  if (num < 1001 && num > 0) {
    if(num == rangen || (bonus == true && (1000 - num) == rangen)) {
      OwO++;
      alert("You got lucky!\n+1 OwO!\n+"+(((OwO/UwU)*1000)-(((OwO-1)/UwU)*1000)).toString()+" luck!");
      document.getElementById("OwO").textContent = "OwO ("+OwO+")";
      localStorage.setItem("OwO", OwO);
    } else {
      UwU++;
      document.getElementById("UwU").textContent = "UwU ("+UwU+")";
      localStorage.setItem("UwU", UwU);
    }

    document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;
    Number.prototype.between = function(a, b, inclusive) {
      var min = Math.min(a, b), max = Math.max(a, b);
      return inclusive ? this >= min && this <= max : this > min && this < max;
    }

    var onum = document.getElementById("number");
    onum.textContent = "| "+rangen;
    if (rangen.between(num-10, num+10, true) || (bonus == true && rangen.between(990-num, 1010-num, true))) onum.style.color = "rgb(0, 255, 0)";
    else if (rangen.between(num-100, num+100, true) || (bonus == true && rangen.between(900-num, 1100-num, true))) onum.style.color = "rgb(255, 255, 0)";
    else onum.style.color = "rgb(255, 0, 0)";
  }
});

document.getElementById("bonus").addEventListener("click", ()=>{
  if (OwO >= 1 && bonus == false) {
    OwO--;
    localStorage.setItem("OwO", OwO);
    localStorage.setItem("autoclicker", true);
    if (OwO == 0) document.getElementById("OwO").textContent = "";
    else document.getElementById("OwO").textContent = "OwO ("+OwO+" times)";
    bonus = true;
    localStorage.setItem("bonus", bonus);
  } else if (bonus) alert("You already have this bonus!");
  else alert("Not enough OwO's!");
});

function startClicker() {
  setInterval(()=>{
    document.getElementById("roulettebruh").click();
  }, 1000);
}

document.getElementById("autoclicker").addEventListener("click", ()=>{
  if (OwO > 99 && localStorage.getItem("autoclicker") != 'true') {
    OwO -= 100;
    document.getElementById("OwO").textContent = `OwO (${OwO})`;
    localStorage.setItem("OwO", OwO);
    localStorage.setItem("autoclicker", true);
    startClicker();
  } else if (OwO < 100) alert("Not enought OwO's!");
  else alert("You already have this bonus!");
});

document.getElementById("reset").addEventListener("click", ()=>{
  localStorage.setItem("OwO", 0);
  localStorage.setItem("UwU", 0);
  localStorage.setItem("bonus", false);
  localStorage.setItem("autoclicker", false);
  location.reload();
});
