var OwO = localStorage.getItem("OwO"), UwU = localStorage.getItem("UwU"), bonus = (localStorage.getItem("bonus") == 'true'), cps = localStorage.getItem("cps");
function setValue(id, value) {
  eval(id+"="+value+";");
  localStorage.setItem(id, value.toString());
}
if (OwO != null) {
  OwO = parseInt(OwO);
  if (OwO != 0) document.getElementById("OwO").textContent = "OwO ("+OwO+")";
} else {
  setValue("OwO", 0);
}
if (UwU != null) {
  UwU = parseInt(UwU);
  if (OwO != 0) document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;
  if (UwU != 0) document.getElementById("UwU").textContent = "UwU ("+UwU+")";
} else {
  setValue("UwU", 0);
}
if (cps != null) cps = parseInt(cps);
else {
  setValue("cps", 1);
}
function startClicker() {
  setInterval(()=>{
    document.getElementById("roulettebruh").click();
  }, 1000/cps);
}
if (localStorage.getItem("autoclicker") == 'true') startClicker();

document.getElementById("roulettebruh").addEventListener("click", ()=>{
  var rangen = Math.floor(Math.random()*1000)+1, num = parseInt(document.getElementById("input").value);
  if (num < 1001 && num > 0) {
    if(num == rangen || (bonus == true && (1000 - num) == rangen)) {
      setValue("OwO", OwO+1);
      alert("You got lucky!\n+1 OwO!\n+"+(((OwO/UwU)*1000)-(((OwO-1)/UwU)*1000)).toString()+" luck!");
      document.getElementById("OwO").textContent = "OwO ("+OwO+")";
    } else {
      setValue("UwU", UwU+1);
      document.getElementById("UwU").textContent = "UwU ("+UwU+")";
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
    setValue("OwO", OwO-1);
    localStorage.setItem("autoclicker", true);
    if (OwO == 0) document.getElementById("OwO").textContent = "";
    else document.getElementById("OwO").textContent = "OwO ("+OwO+" times)";
    setValue("bonus", true);
  } else if (bonus) alert("You already have this bonus!");
  else alert("Not enough OwO's!");
});

var autoclick = document.getElementById("autoclicker")
if (localStorage.getItem("autoclicker") != 'true') {
  autoclick.addEventListener("click", ()=>{
    if (OwO > 99) {
      setValue("OwO", OwO-100);
      document.getElementById("OwO").textContent = `OwO (${OwO})`;
      localStorage.setItem("autoclicker", true);
      startClicker();
      setClickPlus();
    } else if (OwO < 100) alert("Not enought OwO's!");
  });
} else setClickPlus();

function setClickPlus() {
  autoclick.id = "clickplus";
  autoclick.textContent = "Improve clicker by 1 CPS for 100 OwO's (1)";
  document.getElementById("clickplus").addEventListener("click", ()=>{
    if (OwO > 99) {
      setValue("cps", cps+1);
      autoclick.textContent = `Improve clicker by 1 CPS for 100 OwO's (${cps})`;
    } else if (OwO < 100) alert("Not enough OwO's!");
    else alert("You already maxed this bonus!\n(You have a 10 cps autoclicker)");
  });
}
                                                        
document.getElementById("reset").addEventListener("click", ()=>{
  localStorage.setItem("OwO", 0);
  localStorage.setItem("UwU", 0);
  localStorage.setItem("bonus", false);
  localStorage.setItem("autoclicker", false);
  localStorage.setItem("cps", 0);
  location.reload();
});

window.addEventListener("beforeunload", ()=>{
  localStorage.setItem("OwO", OwO);
  localStorage.setItem("UwU", UwU);
  localStorage.setItem("bonus", bonus);
  localStorage.setItem("autoclicker", autoclicker);
  localStorage.setItem("cps", cps);
});
