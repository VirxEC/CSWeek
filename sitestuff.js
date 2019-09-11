var luckynumber = Math.Floor(Math.Random()*10);
function roulette(var num)
{
 if(num == luckynumber)
 {
   document.getElementById("sitetest").innerHTML = "Wow, epic!";
 }
 else
 {
     document.getElementById("sitetest").innerHTML = "Wow so not epic...";
 }

}
