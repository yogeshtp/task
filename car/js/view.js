let svg1 = document.getElementById("list-svg");
let svg2 = document.getElementById("grid-svg");
filled1 = document.getElementById("Icon-Set-Filled");

svg1.addEventListener("click", (e) => {
  svg1.style.stroke = "#6B1D57";
  filled1.style.fill = "#808080";
});

svg2.addEventListener("click", () => {
  filled1.style.fill = "#6B1D57";
  svg1.style.stroke = "#808080";
});



  let puzzle = true;
  if(puzzle){
    if(false){
      console.log("free")
    }
  }
  else{

  }