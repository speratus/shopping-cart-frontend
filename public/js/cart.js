var cart = document.querySelector('#cart-body');
var totalEl = document.querySelector('#total');
function createTD(contents) {
    var td = document.createElement('td');
    td.textContent = contents;
    return td;
}
function createTR() {
    var cells = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        cells[_i] = arguments[_i];
    }
    var tr = document.createElement('tr');
    for (var _a = 0, cells_1 = cells; _a < cells_1.length; _a++) {
        var td = cells_1[_a];
        tr.appendChild(td);
    }
    return tr;
}
function deleteItem(id) {
    var options = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json'
        }
    };
    executeFetch(ITEMS_ADDRESS + "/" + id, options).then(function (data) { return getBooks(); });
}
function createDeleteButton(item) {
    var td = document.createElement('td');
    var button = document.createElement('button');
    button.textContent = 'x';
    button.dataset.id = item.id;
    button.addEventListener('click', function () {
        deleteItem(button.dataset.id);
    });
    td.appendChild(button);
    return td;
}
function fillCart(data) {
    var total = 0;
    cart.innerHTML = "";
    for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
        var b = data_1[_i];
        var title = createTD(b.title);
        var author = createTD(b.author);
        var price = createTD(b.price);
        var count = createTD(b.count);
        var del = createDeleteButton(b);
        total += b.price * b.count;
        var tr = createTR(title, author, price, count, del);
        cart.appendChild(tr);
    }
    totalEl.textContent = total.toString();
}
function getBooks() {
    var options = {
        method: 'GET',
        headers: {
            'Accept': 'application/json'
        }
    };
    executeFetch(ITEMS_ADDRESS, options)
        .then(fillCart);
}
getBooks();
