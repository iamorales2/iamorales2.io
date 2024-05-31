const carousel = document.querySelector(".carousel");
const arrowBtns = document.querySelectorAll(".wrapper i");
const firstCardWidth = carousel.querySelector(".card").offsetWidth;
const carouselChildrens = [...carousel.children];

let openShopping = document.querySelector('.shopping-cart-image');
let closeShopping = document.querySelector('.closeShopping');
let listCart = document.querySelector('.list-items');
let body = document.querySelector('body');
let total = document.querySelector('.total');
let quantity = document.querySelector('.items-number')

openShopping.addEventListener('click', ()=>{
  body.classList.add('active');
})
closeShopping.addEventListener('click', ()=>{
  body.classList.remove('active');
})

let products = [
  {
    id: 1,
    name: "Banana Caramel Con Yelo",
    price: 85,
    image: "../images/bananacaramel.jpg"
  },
  {
    id: 2,
    name: "Pinoy Special Halo-Halo",
    price: 99,
    image: "../images/halo-halo.jpg"
  },
  {
    id: 3,
    name: "Coffee Bun",
    price: 35,
    image: "../images/coffeebun.jpg"
  },
  {
    id: 4,
    name: "Ube Ensaymada",
    price: 50,
    image: "../images/ubeensaymada.jpg"
  },
  {
    id: 5,
    name: "Premium Doughnut",
    price: 215,
    image: "../images/bite2.jpg"
  },
  {
    id: 6,
    name: "Classic Doughnut",
    price: 275,
    image: "../images/bite3.jpg"
  },
  

];
let listCarts = [];


let isDragging = false, startX, startScrollLeft;

let cardPerView = Math.round(carousel.offsetWidth / firstCardWidth);


arrowBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    carousel.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
  })
})

const dragStart = (e) => {
  isDragging = true;
  carousel.classList.add("dragging");
  startX = e.pageX;
  startScrollLeft = carousel.scrollLeft
}

const dragging = (e) => {
  if(!isDragging) return;
  carousel.scrollLeft = startScrollLeft - (e.pageX - startX);
}

const dragStop = () => {
  isDragging = false;
  carousel.classList.remove("dragging");
}


const infiniteScroll = () => {
  if(carousel.scrollLeft === 0){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.scrollWidth - ( 2 * carousel.offsetWidth);
      carousel.classList.remove("no-transition");
  } else if(Math.ceil(carousel.scrollLeft) === carousel.scrollWidth - carousel.offsetWidth){
      carousel.classList.add("no-transition");
      carousel.scrollLeft = carousel.offsetWidth;
      carousel.classList.remove("no-transition");
  }
}

function addtocart(key){
  if(listCarts[key] == null){
    listCarts[key] = JSON.parse(JSON.stringify(products[key]));
    listCarts[key].quantity = 1;
  }
  reloadCard();
}
function reloadCard(){
  listCart.innerHTML = '';
  let count = 0;
  let totalPrice = 0;
  listCarts.forEach((value, key) => {
    totalPrice = totalPrice + value.price;
    count = count + value.quantity;
    if(value != null){
      let newDiv = document.createElement('li');
      newDiv.innerHTML = `
        <div><img src="${value.image}"/></div>
        <div>${value.name}</div>
        <div>${value.price.toLocaleString()}</div>
        <div>${value.quantity}</div>
        <div>
          <button onclick="changeQuantity(${key}, ${value.quantity - 1})">-</button>
          <div class="count">${value.quantity}</div>
          <button onclick="changeQuantity(${key}, ${value.quantity + 1})">+</button>
        </div>
      `;
      listCart.appendChild(newDiv);
    }
  })
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}
function changeQuantity(key, quantity){
  if(quantity == 0){
    delete listCarts[key];
  }else{
    listCarts[key].quantity = quantity;
    listCarts[key].price = quantity * products[key].price;
  }
  reloadCard();
  updateTotal();
}
function updateTotal() {
  let count = 0;
  let totalPrice = 0;
  Object.values(listCarts).forEach(value => {
    totalPrice += value.price;
    count += value.quantity;
  });
  total.innerText = totalPrice.toLocaleString();
  quantity.innerText = count;
}

carousel.addEventListener("mousedown", dragStart);
carousel.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);
carousel.addEventListener("scroll", infiniteScroll);

