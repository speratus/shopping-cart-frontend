var BACKEND_ADDRESS = 'http://backend.test:8080';
var ITEMS_ADDRESS = BACKEND_ADDRESS + "/items";
/**
 * An abstract wrapper around fetch that can be reused throughout the codebase.
 * @param address The address to query
 * @param options The query options (e.g. method type, and additional headers)
 * @param data the payload of the request if there is one.
 */
function executeFetch(address, options, data) {
    if (options === void 0) { options = { method: 'GET', headers: {} }; }
    var query = {
        method: options.method,
        headers: options.headers
    };
    if (data) {
        query.body = JSON.stringify(data);
    }
    return fetch(address, query).then(function (res) { return res.json(); });
}
var errorElement = document.querySelector("#error-message");
function postNewItem(item) {
    var options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    };
    executeFetch(ITEMS_ADDRESS, options, item).then(function (response) {
        if (!response.id) {
            errorElement.classList.remove('invisible');
        }
        else {
            errorElement.classList.add('invisible');
            alert("New Item added to Cart.");
        }
    });
}
var form = document.querySelector('#input-form');
form.addEventListener('submit', function (e) {
    e.preventDefault();
    var title = form['title'].value;
    var author = form['author'].value;
    var price = form['price'].value;
    var count = form['count'].value;
    var book = {
        title: title,
        author: author,
        price: price,
        count: count
    };
    postNewItem(book);
});
