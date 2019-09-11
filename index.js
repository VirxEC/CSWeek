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

throw new Error("Thrown error");
console.error("Console error");
