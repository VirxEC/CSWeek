window.onload = function() {
  var c = document.querySelector(".console");
  console.log = (...args) => args.forEach(m => {
    try {
      c.appendChild(document.createTextNode(`\n ${m}`));
    } catch(err) {
      console.log(err);
    }
  });
  console.warn = (...args) => args.forEach(e => {
    try {
      const s = document.createElement("span");
        s.textContent = "\n" + e;
        s.style.color = "rgb(205, 205, 0)";
        c.appendChild(s);
    } catch(err) {
      console.warn(err);
    }
  });
  console.error = (...args) => args.forEach(e => {
    try {
      const s = document.createElement("span");
        s.textContent = "\n" + e;
        s.style.color = "red";
        c.appendChild(s);
    } catch(err) {
      console.error(err);
    }
  });
  window.onerror=(e,s,l,c)=>console.error(`${e} at: ${s} : ${l}:${c}`);

  document.getElementById("sitetest").addEventListener("click", function() {
    var test = confirm("Don't tell anyone about this secret,\nOK?");
    if (test) alert("Thanks!");
    else window.location.replace("https://www.w3schools.com/");
  });
};
