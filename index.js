// Navigation Bar Dropdown
let A = document.getElementsByClassName('dropdown-item')
let barsCon = document.querySelector('.bars')
let sortBtn = document.getElementById('sortBtn')

let temp

console.log(A)
for (let i = 0; i < A.length; i++) {
  A[i].addEventListener('click', function () {
    temp = A[i].innerHTML
    A[i].innerHTML = document.getElementById('navbarDropdownMenuLink').innerHTML
    document.getElementById('navbarDropdownMenuLink').innerHTML = temp
  })
}

// Bars
let barsHeight = []
let bars = []
const n = 30

const generateNewArray = () => {
  console.log(barsHeight)
  barsCon.innerHTML = ''
  for (let i = 0; i < n; i++) {
    barsHeight[i] = randomNumber(50, 400)
    bars[i] = document.createElement('div')
    bars[i].classList.add('bar')
    barsCon.appendChild(bars[i])
    bars[i].style.height = `${barsHeight[i]}px`
  }
  let i = Math.floor(Math.random() * 30)
  barsHeight[i] = 400
  bars[i].style.height = `${barsHeight[i]}px`
  console.log(Math.max(...barsHeight), i)
}

// for (let i = 0; i < n; i++) {
//   barsHeight.push(300)
// }
generateNewArray()

document.querySelector('.newArray').addEventListener('click', generateNewArray)

// function generateNewArray() {
//   for (let i = 0; i < n; i++) {
//     let a = Math.floor(Math.random() * 201)
//     let b = Math.floor(Math.random() * 101)

//     barsHeight[i] = a + b // 0 <= a+b <= 300

//     if (barsHeight[i] <= 100) barsHeight[i] += 100 // 100 <= barsHeight[i] <= 300

//     document.getElementById('b' + i).style.height = barsHeight[i] + 'px'
//   }

//   // Atleast one bar must have a height = 300
//   // randomly selecting the index
//   let i = Math.floor(Math.random() * 30)
//   barsHeight[i] = 300
//   document.getElementById('b' + i).style.height = barsHeight[i] + 'px'
// }

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

//Visual

let speed = 1000
let delay = 10000 / (Math.floor(n / 10) * speed)
let c = 0

const anim = (bar, height, color) => {
  setTimeout(() => {
    bar.style = `height:${height}px;background-color:${color};`
  }, (c += delay))
}

//Start Sorting

sortBtn.addEventListener('click', () => {
  switch (temp) {
    case "Bubble Sort":
      bubbleSort()      
      break;
    case "Selection Sort":
      selectionSort()
      break;  
    default:
      bubbleSort();
  }
})

//Sorting

function bubbleSort() {
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      anim(bars[j], barsHeight[j], 'lightgreen')
      anim(bars[j + 1], barsHeight[j + 1], 'teal')

      if (barsHeight[j] > barsHeight[j + 1]) {
        // anim(bars[j], barsHeight[j], 'cyan')
        // anim(bars[j + 1], barsHeight[j + 1], 'cyan')

        let temp = barsHeight[j]
        barsHeight[j] = barsHeight[j + 1]
        barsHeight[j + 1] = temp

        anim(bars[j], barsHeight[j], 'teal')
        anim(bars[j + 1], barsHeight[j + 1], 'lightgreen')
      }
      anim(bars[j], barsHeight[j], 'whitesmoke')
      anim(bars[j + 1], barsHeight[j + 1], 'whitesmoke')
    }
    anim(bars[n - 1 - i], barsHeight[n - 1 - i], 'violet')
  }
  anim(bars[0], barsHeight[0], 'violet')
}

function selectionSort() {
  for (let i = 0; i < n - 1; i++) {
    let min = i
    anim(bars[i], barsHeight[i], 'teal')

    for (let j = i + 1; j < n; j++) {
      // anim(bars[j], barsHeight[j], 'violet')

      if (barsHeight[j] < barsHeight[min]) {
        min = j
      }
    }
    anim(bars[min], barsHeight[min], 'cyan')
    let temp = barsHeight[i]
    barsHeight[i] = barsHeight[min]
    barsHeight[min] = temp
    anim(bars[i], barsHeight[i], 'lightgreen')
    if(min!=i) anim(bars[min], barsHeight[min], 'white')
  }
  anim(bars[n-1], barsHeight[n-1], 'lightgreen')
}
