var OwO, UwU, cps, bonus = localStorage.getItem("bonus") == 'true';

function setValue(id, value, returnV = false) {
  localStorage.setItem(id, value.toString());
  if (returnV) return value;
  else eval(id+"="+value+";");
}
function setUpValue(value) {
  eval(`${value}=localStorage.getItem("${value}");`);
  eval(`${value}=${value}!=null ? +${value}:setValue("${value}", 0, true);`);
}
function startClicker() {
  setInterval(()=>document.getElementById("roulettebruh").click(), 1000/cps);
}
function setOwO(value) {
  setValue("OwO", value);
  document.getElementById("OwO").textContent = OwO == 0 ? "" : `OwO (${OwO})`;
  document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;
}

setUpValue("OwO");
setUpValue("UwU");
setUpValue("cps");
if (UwU != 0) document.getElementById("UwU").textContent = "UwU ("+UwU+")";
if (OwO != 0) setOwO(OwO);
               
if (localStorage.getItem("autoclicker") == 'true') startClicker();

document.getElementById("roulettebruh").addEventListener("click", ()=>{
  var rangen = ~~(Math.random()*1000)+1, num = +document.getElementById("input").value;
  if (num < 1001 && num > 0) {
    if(num == rangen || (bonus == true && (1000 - num) == rangen)) {
      setOwO(OwO+1);
      alert("You got lucky!\n+1 OwO!\n+"+(((OwO/UwU)*1000)-(((OwO-1)/UwU)*1000)).toString()+" luck!");
    } else {
      setValue("UwU", UwU+1);
      document.getElementById("UwU").textContent = "UwU ("+UwU+")";
    }
    document.getElementById("ratio").textContent = "| Luck: "+(OwO/UwU)*1000;

    var onum = document.getElementById("number");
    onum.textContent = "| "+rangen;
    if (num-10 <= rangen && rangen <= num+10 || (bonus == true && 990-num <= rangen && rangen <= 1010-num)) onum.style.color = "rgb(0, 255, 0)";
    else if (num-100 <= rangen && rangen <= num+100 || (bonus == true && 900-num <= rangen && rangen <= 1100-num)) onum.style.color = "rgb(255, 255, 0)";
    else onum.style.color = "rgb(255, 0, 0)";
  }
});

document.getElementById("bonus").addEventListener("click", ()=>{
  if (OwO >= 1 && bonus == false) {
    setOwO(OwO-1);
    localStorage.setItem("autoclicker", true);
    setValue("bonus", true);
  } else if (bonus) alert("You already have this bonus!");
  else alert("Not enough OwO's!");
});

var autoclick = document.getElementById("autoclicker");
if (localStorage.getItem("autoclicker") != 'true') {
  autoclick.addEventListener("click", ()=>{
    if (OwO > 99) {
      setOwO(OwO-100);
      localStorage.setItem("autoclicker", true);
      setValue("cps", 1);
      startClicker();
      setClickPlus();
    } else if (OwO < 100) alert("Not enought OwO's!");
  });
} else setClickPlus();

function setClickPlus() {
  autoclick.id = "clickplus";
  autoclick.textContent = `Improve autoclicker for 100 OwO's (${cps} of 10 cps)`;
  document.getElementById("clickplus").addEventListener("click", ()=>{
    if (OwO > 99 && cps < 11) {
      setOwO(OwO-100);
      setValue("cps", cps+1);
      autoclick.textContent = `Improve autoclicker for 100 OwO's (${cps} of 10 cps)`;
    } else if (OwO < 100) alert("Not enough OwO's!");
    else alert("You already maxed this bonus!\n(You have a 10 cps autoclicker)");
  });
}
                                                        
document.getElementById("reset").addEventListener("click", ()=>{
  setValue("OwO", 0);
  setValue("UwU", 0);
  setValue("bonus", false);
  setValue("autoclicker", false);
  setValue("cps", 0);
  location.reload();
});

window.addEventListener("beforeunload", ()=>{
  localStorage.setItem("OwO", OwO);
  localStorage.setItem("UwU", UwU);
  localStorage.setItem("bonus", bonus);
  localStorage.setItem("cps", cps);
});
