let cart = document.querySelector('#cart-body');
let totalEl = document.querySelector('#total');

/**
 * creates a table data element with the specified contents. Reduces repetitive code.
 * @param contents the text ccontents of the new td element
 */
function createTD(contents: any): Element {
    let td = document.createElement('td');
    td.textContent = contents;
    return td;
}

/**
 * Adds the specified elements to a table row. Reduces repetitive code.
 * @param cells the cells to add the table row
 */
function createTR(...cells: Element[]): Element {
    let tr = document.createElement('tr');
    for (let td of cells) {
        tr.appendChild(td);
    }
    return tr;
}

/**
 * Sends a request to the backend to delete an item.
 * @param id the id of the item to delete
 */
function deleteItem(id: string) {
    let options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    }
    //This line prints an error to the console, but that is expected.
    executeFetch(ITEMS_ADDRESS + "/" + id, options).then(data => getBooks());
}

/**
 * Creates a delete button wrapped by a td element. helps keep fillCart function clean and readable.
 * @param item the data item for which to create a delete button
 */
function createDeleteButton(item: POJO): Element {
    let td = document.createElement('td');
    let button = document.createElement('button');
    button.textContent = 'x';
    button.dataset.id = item.id;

    button.addEventListener('click', () => {
        deleteItem(button.dataset.id);
    });
    td.appendChild(button);
    return td;
}

/**
 * populates the cart table with the specified data.
 * @param data the data with which to populate the table
 */
function fillCart(data: Array<POJO>) {
    let total = 0;
    cart.innerHTML = "";
    for (let b of data) {

        let title = createTD(b.title);
        let author = createTD(b.author);
        let price = createTD(b.price);
        let count = createTD(b.count);

        let del = createDeleteButton(b);

        total += b.price * b.count;

        let tr = createTR(title, author, price, count, del);
        cart.appendChild(tr);
    }
    totalEl.textContent = total.toString();
}

/**
 * Queries teh backend for the list of items available.
 */
function getBooks() {
    let options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        } 
    }
    executeFetch(ITEMS_ADDRESS, options)
        .then(fillCart);
}

getBooks();