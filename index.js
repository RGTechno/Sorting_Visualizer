// Navigation Bar Dropdown
let A = document.getElementsByClassName("dropdown-item");
console.log(A);
for (let i = 0; i < A.length; i++) {
  A[i].addEventListener("click", function () {
    let temp = A[i].innerHTML;
    A[i].innerHTML = document.getElementById(
      "navbarDropdownMenuLink"
    ).innerHTML;
    document.getElementById("navbarDropdownMenuLink").innerHTML = temp;
  });
}

// Bars
let barsHeight = [];
const n = 30;
for (let i = 0; i < n; i++) {
  barsHeight.push(0);
}
generateNewArray();

document.querySelector(".newArray").addEventListener("click", generateNewArray);

function generateNewArray() {
  for (let i = 0; i < n; i++) {
    let a = Math.floor(Math.random() * 351);
    let b = Math.floor(Math.random() * 101);

    barsHeight[i] = a + b; // 0 <= a+b <= 450

    if (barsHeight[i] <= 100) barsHeight[i] += 50; // 50 <= barsHeight[i] <= 450

    document.getElementById("b" + i).style.height = barsHeight[i] + "px";
  }

  // Atleast one bar must have a height = 450
  // randomly selecting the index
  let i = Math.floor(Math.random() * 30);
  barsHeight[i] = 450;
  document.getElementById("b" + i).style.height = barsHeight[i] + "px";
}
