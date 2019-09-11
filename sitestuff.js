window.onload = function() {
 var luckynumber = Math.floor(Math.random()*10);
 function roulette() {
  var num = document.getElementById("input").value;
  if(num == luckynumber) {
    document.getElementById("sitetest").innerHTML = "Wow, epic!";
  } else {
      document.getElementById("sitetest").innerHTML = "Wow so not epic...";
  }
 }
}
