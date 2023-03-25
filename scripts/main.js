//global variables
let books;

// render functions
function renderBooks() {
    const htmlBooksDiv = document.getElementById("js-books");
    let htmlToRender = '';
    books.forEach(function (book) {
        htmlToRender += 
        `<div class = 'book container-sm' id = '${book.id}'>
            Title: ${book.title}<br>
            Author: ${book.author}
        </div>`;
    })
    htmlBooksDiv.innerHTML = htmlToRender;
}

// utility functions
async function readFromJson(path) {
    return await (await fetch(path)).json(); 
}

function initButtons(){
    document.getElementById('cart-btn').addEventListener('click', (e) => {
        e.target.textContent = 'Clicked!';
      });
}

// init
async function init() {
    books = await readFromJson('data/books.json');

    renderBooks()
    //initButtons()
    //render all the menus and nav options
}

init()