//global variables
let books;
let booksInCart = [];

// render functions
function renderBooks() {
    const htmlBooksDiv = document.getElementById("js-books");
    let htmlToRender = '';
    books.forEach((book) => {
        htmlToRender += 
        `<div class = 'book container-sm' id = '${book.id}'>
            Title: ${book.title}<br>
            Author: ${book.author}<br>
            <button type="button" class="btn btn-primary click" id="buy-btn">Buy ➕</button>
        </div>`;
    })
    htmlBooksDiv.innerHTML = htmlToRender;
}

// utility functions
async function readFromJson(path) {
    return await (await fetch(path)).json(); 
}

function initButtons(){
    // cart
    document.getElementById('cart-btn').addEventListener('click', (e) => {
        e.target.textContent = 'Clicked!'
        showCart()
      });

    // buy book
      const buyBooks = document.querySelectorAll('#buy-btn')
      buyBooks.forEach(buybtn => {
        buybtn.addEventListener('click', (e) => {
            console.log()
            e.target.textContent = 'Clicked!'
            addBookToCart(e.target.parentNode.id)
        });
      });
}

function addBookToCart(id){
    if (booksInCart.find(element => element.id==id)){
        booksInCart.find(element => element.id==id).copiesInCart += 1
    }
    else {
        let bookToAdd = books.find(element => element.id==id)
        bookToAdd.copiesInCart = 1
        booksInCart.push(bookToAdd)
    }
    console.log(booksInCart)
}

function showDetails(id) {
    return
}

function showCart(id) {
    const htmlCartDiv = document.getElementById("js-cart-modal");
    let htmlToRender = '';
    let total = 0;
    booksInCart.forEach((book) => {
        htmlToRender += 
        `<div class = 'cart container' id = '${book.id}'>
            Title: ${book.title}<br>
            Price: ${book.price}<br>
            In cart: ${book.copiesInCart}
            Subtotal: ${book.price*book.copiesInCart}
        </div>`;
        total += book.price*book.copiesInCart
    })
    
    htmlToRender += `<div class = 'total container'>Total: ${total}</div>`
    console.log(htmlCartDiv)
    htmlCartDiv.innerHTML = htmlToRender;
}

// init
async function init() {
    books = await readFromJson('data/books.json');

    renderBooks()
    initButtons()
    //render all the menus and nav options
}

init()