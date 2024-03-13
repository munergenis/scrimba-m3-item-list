// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries
import {
  getDatabase,
  ref,
  push,
  onValue,
  remove,
} from "https://www.gstatic.com/firebasejs/10.8.1/firebase-database.js"

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCe1j02laalA40JN-7Ea0Ylo7xZEJ__7I8",
  authDomain: "shoppinglist-032024.firebaseapp.com",
  databaseURL:
    "https://shoppinglist-032024-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "shoppinglist-032024",
  storageBucket: "shoppinglist-032024.appspot.com",
  messagingSenderId: "1956273696",
  appId: "1:1956273696:web:4f19b11502ba350c522645",
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
const shoppingListRef = ref(database, "shoppingList")

const inpEl = document.querySelector("#inp-el")
const addBtn = document.querySelector("#add-btn")
const ulEl = document.querySelector("#ul-el")

addBtn.addEventListener("click", () => {
  addNewItem()
})

onValue(shoppingListRef, (snapshot) => {
  if (snapshot.exists()) {
    renderLiItemsFromDB(snapshot)
  } else {
    ulEl.textContent = "Add some items"
  }
})

// Functions
function addNewItem() {
  const inputValue = inpEl.value
  if (inputValue) {
    clearInput()
    addToDB(inputValue)
  }
}

function clearInput() {
  inpEl.value = ""
}

function addToDB(value) {
  push(shoppingListRef, value)
}

function createElement(type, value) {
  const el = document.createElement(type)
  el.textContent = value
  return el
}

function addEvent(el, elID) {
  el.addEventListener("dblclick", () => {
    remove(ref(database, `shoppingList/${elID}`))
  })
}

function renderLiItemsFromDB(snapshot) {
  const itemArray = Object.entries(snapshot.val())
  ulEl.innerHTML = ""
  itemArray.forEach((item) => {
    const itemID = item[0]
    const itemValue = item[1]
    const liEl = createElement("li", itemValue)
    addEvent(liEl, itemID)
    ulEl.append(liEl)
  })
}
