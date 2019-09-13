var OwO = localStorage.getItem("OwO"), UwU = localStorage.getItem("UwU"), bonus = (localStorage.getItem("bonus") == 'true');

if (OwO != null) {
  OwO = parseInt(OwO);
  if (OwO != 0) window.document.getElementById("OwO").textContent = "OwO ("+OwO+")";
} else OwO = 0;
if (UwU != null) {
  UwU = parseInt(UwU);
  if (OwO != 0) window.document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;
  if (UwU != 0) window.document.getElementById("UwU").textContent = "UwU ("+UwU+")";
} else UwU = 0;

window.document.getElementById("roulettebruh").addEventListener("click", function() {
  var rangen = Math.floor(Math.random() * 1000) + 1, num = parseInt(window.document.getElementById("input").value);
  if (num < 1001 && num > 0) {
    if(num == rangen || (bonus == true && (1000 - num) == rangen)) {
      OwO++;
      alert("You got luckey!\n+1 OwO!\n+"+(((OwO/UwU)*1000)-(((OwO-1)/UwU)*1000)).toString()+" luck!");
      window.document.getElementById("OwO").textContent = "OwO ("+OwO+")";
    } else {
      UwU++;
      window.document.getElementById("UwU").textContent = "UwU ("+UwU+")";
    }

    window.document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;

    Number.prototype.between = function(a, b, inclusive) {
      var min = Math.min(a, b), max = Math.max(a, b);
      return inclusive ? this >= min && this <= max : this > min && this < max;
    }

    var onum = window.document.getElementById("number");
    onum.textContent = "| "+rangen;
    if (rangen.between(num-10, num+10, true) || (bonus == true && rangen.between(990-num, 1010-num, true)) onum.style.color = "rgb(0, 255, 0)";
    else if (rangen.between(num-100, num+100, true) || (bonus == true && rangen.between(900-num, 1100-num, true)) onum.style.color = "rgb(255, 255, 0)";
    else onum.style.color = "rgb(255, 0, 0)";
  } else alert("Make sure that the number is\nbetween 1 and 1001!");
});

window.document.getElementById("bonus").addEventListener("click", function() {
  if (OwO >= 1 && bonus == false) {
    OwO--;
    if (OwO == 0) window.document.getElementById("OwO").textContent = "";
    else window.document.getElementById("OwO").textContent = "OwO ("+OwO+" times)";
    bonus = true;
  } else if (bonus) alert("You already have this bonus!");
  else alert("Not enough OwO's!");
});

window.document.getElementById("reset").addEventListener("click", function() {
  OwO = 0;
  UwU = 0;
  bonus = false;
  window.location.reload();
});

window.addEventListener("beforeunload", function(){
  localStorage.setItem("OwO", OwO.toString());
  localStorage.setItem("UwU", UwU.toString());
  localStorage.setItem("bonus", bonus.toString());
});
