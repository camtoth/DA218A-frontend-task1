//global variables
let books
let filteredBooks = []
let booksInCart = []

// render functions
function renderBooks() {
	const htmlBooksDiv = document.getElementById('js-books')
	let booksToRender = []
	let htmlToRender = ''
	if (filteredBooks.length != 0){
		booksToRender = filteredBooks
	} else {
		booksToRender = books
	}
	booksToRender.forEach((book) => {
		htmlToRender +=
        `<div class = 'book container row' id = '${book.id}'>
			<div class = 'col-4'>
				<img src="assets/${book.id}.jpg" class="img-thumbnail picture">
			</div>

			<div class = 'col-8'>
				<h5>${book.title}</h5>
				Author: ${book.author}<br><br>
				<button type="button" style="display: inline" class="btn btn-primary click" id="buy-btn">Buy ➕</button>
				<button class="btn btn-primary" type="button" data-toggle="collapse" data-target="#book-details-${book.id}" aria-expanded="false" aria-controls="book-details">
				Details
				</button>
				<div class="collapse book-details" id="book-details-${book.id}">
					Summary: ${book.description}<br>
					Price: ${book.price}
				</div>
			</div>
        </div>`
	})
	htmlBooksDiv.innerHTML = htmlToRender
}

// utility functions
async function readFromJson(path) {
	return await (await fetch(path)).json() 
}

function addFilter(filterKey, filterValue) {
	books.forEach(book => {
		if(book[filterKey] == filterValue) {
			filteredBooks.push(book)
		}
	})
	renderBooks()
}

function removeFilter(filterKey, filterValue) {
	let newFilteredBooks = []
	filteredBooks.forEach(book => {
		if(book[filterKey] != filterValue) {
			newFilteredBooks.push(book)
		}
	})
	filteredBooks = newFilteredBooks
	renderBooks()
}

function initButtons(){
	// cart
	document.getElementById('cart-btn').addEventListener('click', () => {
		showCart()
	})

	// buy book
	const buyBooks = document.querySelectorAll('#buy-btn')
	buyBooks.forEach(buybtn => {
		buybtn.addEventListener('click', (e) => {
			addBookToCart(e.target.parentNode.parentNode.id)
		})
	})
}

function initFilters(){
	const allFilters = document.querySelectorAll('.filter')
	let filterKeys = []

	allFilters.forEach(filter => {
		filterKeys.push(filter.attributes.value.nodeValue)
	})
	console.log(filterKeys)
	filterKeys.forEach(filterKey => {
		const anyFilter = document.getElementById(`js-filter-${filterKey}-modal`)
		let htmlToRender = ''
		let listOfFilterElements = new Set()
		books.forEach(book => {
			listOfFilterElements.add(book[filterKey])
		})
		listOfFilterElements.forEach(filter => {
			htmlToRender +=
        `<div class="filter-check">
        <input class="filter-check-input" type="checkbox" value="${filter}" id="${filterKey}">
        <label class="filter-check-label" for="flexCheckDefault">${filter}</label>
        </div>`
		})
		anyFilter.innerHTML = htmlToRender
	})

	const filterCheckboxes = document.querySelectorAll('input[type=checkbox]')
	filterCheckboxes.forEach(checkbox => {
		checkbox.addEventListener('change', checkbox => {
			if (checkbox.currentTarget.checked){
				addFilter(checkbox.currentTarget.id, checkbox.currentTarget.value)
			} else {
				removeFilter(checkbox.currentTarget.id, checkbox.currentTarget.value)
			}
		})
	})
}

function initSorting () {
	document.getElementById('title-up').addEventListener('click', () => {
		books.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
		filteredBooks.sort((a,b) => (a.title > b.title) ? 1 : ((b.title > a.title) ? -1 : 0))
		renderBooks()
	})
	document.getElementById('title-down').addEventListener('click', () => {
		books.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
		filteredBooks.sort((a,b) => (a.title < b.title) ? 1 : ((b.title < a.title) ? -1 : 0))
		renderBooks()
	})
	document.getElementById('price-up').addEventListener('click', () => {
		books.sort((a,b) => a.price - b.price)
		filteredBooks.sort((a,b) => a.price - b.price)
		renderBooks()
	})
	document.getElementById('price-down').addEventListener('click', () => {
		books.sort((a,b) => b.price - a.price)
		filteredBooks.sort((a,b) => b.price - a.price)
		renderBooks()
	})
	document.getElementById('author-up').addEventListener('click', () => {
		books.sort((a,b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0))
		filteredBooks.sort((a,b) => (a.author > b.author) ? 1 : ((b.author > a.author) ? -1 : 0))
		renderBooks()
	})
	document.getElementById('author-down').addEventListener('click', () => {
		books.sort((a,b) => (a.author < b.author) ? 1 : ((b.author < a.author) ? -1 : 0))
		filteredBooks.sort((a,b) => (a.author < b.author) ? 1 : ((b.author < a.author) ? -1 : 0))
		renderBooks()
	})
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

function showCart() {
	const htmlCartDiv = document.getElementById('js-cart-modal')
	let htmlToRender = ''
	let total = 0
	booksInCart.forEach((book) => {
		htmlToRender +=
        `<div class = 'cart container' id = '${book.id}'>
            <h6>Title: ${book.title}</h6>
            Price: ${book.price}<br>
            In cart: ${book.copiesInCart}&nbsp;&nbsp;&nbsp;&nbsp;
            Subtotal: ${book.price*book.copiesInCart}
			<hr>
        </div>`
		total += book.price*book.copiesInCart
	})
    
	htmlToRender += `<div class='container'><h5>Total: ${total}</h5></div>`
	console.log(htmlCartDiv)
	htmlCartDiv.innerHTML = htmlToRender
}

// init
async function init() {
	books = await readFromJson('data/books.json')
	renderBooks()
	initButtons()
	initFilters()
	initSorting()
	//render all the menus and nav options
}

init()