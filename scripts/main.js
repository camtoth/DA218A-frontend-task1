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
        e.target.textContent = 'Clicked!';
      });

    // buy book
      const buyBooks = document.querySelectorAll('#buy-btn')
      buyBooks.forEach(buybtn => {
        buybtn.addEventListener('click', (e) => {
            console.log()
            e.target.textContent = 'Clicked!';
            addBookToCart(e.target.parentNode.id)
        });
      });
}

function addBookToCart(id){
    let bookToAdd = books.find(element => element.id==id)
    booksInCart.push(bookToAdd)
    console.log(booksInCart)
}

// init
async function init() {
    books = await readFromJson('data/books.json');

    renderBooks()
    initButtons()
    //render all the menus and nav options
}

init()