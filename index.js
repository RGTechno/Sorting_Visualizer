// Navigation Bar Dropdown
let A = document.getElementsByClassName("dropdown-item");
console.log(A);
for (let i = 0; i < A.length; i++) {
  A[i].addEventListener("click", function () {
    let temp = A[i].innerHTML;
    A[i].innerHTML = document.getElementById("navbarDropdownMenuLink").innerHTML;
    document.getElementById("navbarDropdownMenuLink").innerHTML = temp;
  });
}
