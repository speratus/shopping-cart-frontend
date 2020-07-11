let cart = document.querySelector('#cart-body');
let totalEl = document.querySelector('#total');

function createTD(contents: any): Element {
    let td = document.createElement('td');
    td.textContent = contents;
    return td;
}

function createTR(...cells: Element[]): Element {
    let tr = document.createElement('tr');
    for (let td of cells) {
        tr.appendChild(td);
    }
    return tr;
}

function fillCart(data: Array<POJO>) {
    let total = 0;
    cart.innerHTML = "";
    for (let b of data) {

        let title = createTD(b.title);
        let author = createTD(b.author);
        let price = createTD(b.price);
        let count = createTD(b.count);

        total += b.price * b.count;

        let tr = createTR(title, author, price, count);
        cart.appendChild(tr);
    }
    totalEl.textContent = total.toString();
}

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