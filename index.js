// Returns Random Number : [min, max]
function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min)
}

let reset = document.getElementById('reset')

reset.addEventListener('click', generateNewArray)

let dropdownToggle = document.querySelector('.dropdown-toggle')
let sortBtn = document.getElementById('sortBtn')
let speedRange = document.getElementById('speedRange')
let arrayRange = document.getElementById('arrayRange')

function disable() {
  dropdownToggle.classList.add('disabled')
  sortBtn.classList.add('disabled')
  speedRange.setAttribute('disabled', '')
  arrayRange.setAttribute('disabled', '')
}
function enable() {
  dropdownToggle.classList.remove('disabled')
  sortBtn.classList.remove('disabled')
  speedRange.removeAttribute('disabled')
  arrayRange.removeAttribute('disabled')
}

// Navigation Bar Dropdown Swapping
let A = document.getElementsByClassName('dropdown-item')
let curAlgo = 'Bubble Sort'
for (let i = 0; i < A.length; i++) {
  A[i].addEventListener('click', function () {
    curAlgo = A[i].innerHTML
    A[i].innerHTML = document.getElementById('navbarDropdownMenuLink').innerHTML
    document.getElementById('navbarDropdownMenuLink').innerHTML = curAlgo
  })
}

// Bars
let barsHeight = []
let bars = []
let n = 30
function arraySizeChange(changed) {
  n = changed
  console.log(n)
  generateNewArray()
}
let barsCon = document.querySelector('.barsCon')

// Generation
function generateNewArray() {
  enable()
  barsCon.innerHTML = ''
  if (n > 30) {
    document.documentElement.style.setProperty('--width', '30px')
  } else {
    document.documentElement.style.setProperty('--width', '40px')
  }
  for (let i = 0; i < n; i++) {
    barsHeight[i] = randomNumber(100, 500)
    bars[i] = document.createElement('div')
    bars[i].classList.add('bar')
    barsCon.appendChild(bars[i])
    bars[i].style.height = barsHeight[i] + 'px'
  }
  let i = Math.floor(Math.random() * n)
  barsHeight[i] = 500
  bars[i].style.height = barsHeight[i] + 'px'
}

//Generate New Array Event Listener
document.querySelector('.newArray').addEventListener('click', generateNewArray)

//Visuals
let speed = 500
let c = 0
let delay = 10000 / (Math.floor(n / 10) * speed)

function speedChange(changed) {
  speed = changed
  delay = 10000 / (Math.floor(n / 10) * speed)
  console.log(speed)
}

const anim = (bar, height, color) => {
  setTimeout(() => {
    bar.style.height = height + 'px'
    bar.style.backgroundColor = color
  }, (c += delay + 10))
}

//Sorting Button
sortBtn.addEventListener('click', () => {
  switch (curAlgo) {
    case 'Bubble Sort':
      bubbleSort()
      break
    case 'Selection Sort':
      selectionSort()
      break
    case 'Insertion Sort':
      insertionSort()
      break
    case 'Merge Sort':
      mergeSort(0, n - 1)
      break
    case 'Heap Sort':
      heapSort()
      break
    case 'Quick Sort':
      quickSort(0, n - 1)
      break
    default:
      bubbleSort()
  }
  for (let i = 0; i < n; i++) {
    anim(bars[i], barsHeight[i], 'whitesmoke')
  }
  for (let i = 0; i < n; i++) {
    anim(bars[i], barsHeight[i], sorted)
  }
  c = 0
})

//Sorting Algorithms

// colors
let p = 'whitesmoke'
let p1 = '#ff8ba0'
let p2 = '#86003c'
let sorted = '#e41f7b'
let heap = 'whitesmoke'

// Bubble Sort
function bubbleSort() {
  disable()
  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      anim(bars[j], barsHeight[j], p1)
      anim(bars[j + 1], barsHeight[j + 1], p2)

      if (barsHeight[j] > barsHeight[j + 1]) {
        ;[barsHeight[j], barsHeight[j + 1]] = [barsHeight[j + 1], barsHeight[j]]

        anim(bars[j], barsHeight[j], p2)
        anim(bars[j + 1], barsHeight[j + 1], p1)
      }

      anim(bars[j], barsHeight[j], p)
      anim(bars[j + 1], barsHeight[j + 1], p)
    }
    anim(bars[n - 1 - i], barsHeight[n - 1 - i], sorted)
  }
  //sorted region
  anim(bars[0], barsHeight[0], sorted)
}

// Selection Sort
function selectionSort() {
  disable()

  for (let i = 0; i < n - 1; i++) {
    let min = i

    for (let j = n - 1; j > i; j--) {
      anim(bars[j], barsHeight[j], p1)

      if (barsHeight[j] < barsHeight[min]) min = j
      anim(bars[j], barsHeight[j], p)
    }

    ;[barsHeight[i], barsHeight[min]] = [barsHeight[min], barsHeight[i]]

    anim(bars[i], barsHeight[i], sorted)

    if (min != i) anim(bars[min], barsHeight[min], p)
  }
  //sorted region
  anim(bars[n - 1], barsHeight[n - 1], sorted)
}

//Insertion Sort
function insertionSort() {
  disable()

  for (let i = 0; i < n; i++) {
    let no = barsHeight[i]
    anim(bars[i], barsHeight[i], p2)
    let j = i - 1
    for (j = i - 1; j >= 0 && barsHeight[j] > no; j--) {
      barsHeight[j + 1] = barsHeight[j]
      anim(bars[j], barsHeight[j], p1)
      anim(bars[j + 1], barsHeight[j + 1], p2)
      anim(bars[j + 1], barsHeight[j + 1], sorted)
      anim(bars[j], barsHeight[j], sorted)
    }
    barsHeight[j + 1] = no

    anim(bars[i], barsHeight[i], p1)
    anim(bars[i], barsHeight[i], sorted)
    anim(bars[j + 1], barsHeight[j + 1], p2)
    anim(bars[j + 1], barsHeight[j + 1], sorted)
  }
}

// Merge Sort
function mergeSort(start, end) {
  disable()

  if (start >= end) {
    return
  }
  let m = Math.floor((start + end) / 2)
  mergeSort(start, m)
  mergeSort(m + 1, end)
  merge(start, end)
}

function merge(start, end) {
  let s1 = start
  let e1 = Math.floor((start + end) / 2)
  let s2 = e1 + 1
  let e2 = end
  let C = []

  while (s1 <= e1 && s2 <= e2) {
    if (barsHeight[s1] <= barsHeight[s2]) {
      anim(bars[s1], barsHeight[s1], p1)
      C.push(barsHeight[s1])
      s1++
    } else {
      C.push(barsHeight[s2])
      anim(bars[s2], barsHeight[s2], p2)
      s2++
    }
  }
  while (s1 <= e1) {
    anim(bars[s1], barsHeight[s1], p1)
    C.push(barsHeight[s1])
    s1++
  }
  while (s2 <= e2) {
    C.push(barsHeight[s2])
    anim(bars[s2], barsHeight[s2], p2)
    s2++
  }

  //sorted region
  for (let i = 0; i < C.length; i++) {
    barsHeight[start + i] = C[i]
    anim(bars[start + i], barsHeight[start + i], sorted)
  }
}

// Heap Sort
function heapSort() {
  disable()

  for (let i = 0; i < n; i++) {
    heapifyUp(i)
  }

  for (let i = 0; i < n - 1; i++) {
    let last = n - 1 - i
    ;[barsHeight[0], barsHeight[last]] = [barsHeight[last], barsHeight[0]]

    anim(bars[last], barsHeight[last], sorted)

    heapifyDown(last)
  }
}

function heapifyUp(i) {
  let parent = Math.floor((i - 1) / 2)

  while (i > 0 && barsHeight[parent] < barsHeight[i]) {
    anim(bars[i], barsHeight[i], p1)
    anim(bars[parent], barsHeight[parent], p2)
    ;[barsHeight[i], barsHeight[parent]] = [barsHeight[parent], barsHeight[i]]

    anim(bars[i], barsHeight[i], heap)
    anim(bars[parent], barsHeight[parent], heap)

    i = parent
    parent = Math.floor((i - 1) / 2)
  }
  anim(bars[i], barsHeight[i], heap)
}

function heapifyDown(size) {
  let i = 0
  while (2 * i + 1 < size) {
    let Child = 2 * i + 1
    if (2 * i + 2 < size && barsHeight[2 * i + 2] >= barsHeight[Child]) {
      Child = 2 * i + 2
    }
    anim(bars[i], barsHeight[i], p1)
    anim(bars[Child], barsHeight[Child], p2)

    anim(bars[i], barsHeight[i], heap)
    anim(bars[Child], barsHeight[Child], heap)

    if (barsHeight[i] >= barsHeight[Child]) {
      return
    }

    ;[barsHeight[i], barsHeight[Child]] = [barsHeight[Child], barsHeight[i]]
    i = Child
  }
}

// Quick Sort
function quickSort(start, end) {
  disable()

  if (start > end) {
    return
  }
  if (start == end) {
    anim(bars[start], barsHeight[start], sorted)
    return
  }
  let pivot = barsHeight[start]
  let i = start
  let j = end + 1
  while (i < j) {
    do {
      anim(bars[i], barsHeight[i], p1)
      anim(bars[i], barsHeight[i], p)
      i++
    } while (barsHeight[i] <= pivot)
    do {
      j--
      anim(bars[j], barsHeight[j], p2)
      anim(bars[j], barsHeight[j], p)
    } while (barsHeight[j] > pivot)
    if (i < j) {
      ;[barsHeight[i], barsHeight[j]] = [barsHeight[j], barsHeight[i]]
    }
  }
  ;[barsHeight[start], barsHeight[j]] = [barsHeight[j], barsHeight[start]]
  anim(bars[j], barsHeight[j], sorted)
  quickSort(start, j - 1)
  quickSort(j + 1, end)
}

generateNewArray()
