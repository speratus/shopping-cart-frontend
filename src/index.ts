const BACKEND_ADDRESS = 'http://backend.test:8080';
const ITEMS_ADDRESS = BACKEND_ADDRESS + "/items";

interface Book {
    title: string;
    author: string;
    price: number;
    count: number;
}

/**
 * Represents a plain old JavaScript object. Apparently, this is necessary to satisfy typescript and use
 * POJOs in the way I want to be able to.
 */
interface POJO {
    [key: string]: any;
}

interface FetchOptions {
    method: string;
    headers: object;
}

/**
 * An abstract wrapper around fetch that can be reused throughout the codebase.
 * @param address The address to query
 * @param options The query options (e.g. method type, and additional headers)
 * @param data the payload of the request if there is one.
 */
function executeFetch(address: string, options: FetchOptions = {method: 'GET', headers: {}}, data?: object): Promise<POJO> {
    let query: POJO = {
        method: options.method,
        headers: options.headers
    };
    
    if (data) {
        query.body = JSON.stringify(data);
    }
    return fetch(address, query).then(res => res.json());
}

let errorElement = document.querySelector("#error-message");

function postNewItem(item: Book) {
    let options = {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        }
    }
    executeFetch(ITEMS_ADDRESS, options, item).then(response => {
        if (!response.id) {
            errorElement.classList.remove('invisible');
        } else {
            errorElement.classList.add('invisible');
            alert("New Item added to Cart.");
        }
    });
}

let form = document.querySelector('#input-form');
form.addEventListener('submit', (e) => {
    e.preventDefault();
    let title = form['title'].value;
    let author = form['author'].value;
    let price = form['price'].value;
    let count = form['count'].value;

    let book: Book = {
        title: title,
        author: author,
        price: price,
        count: count
    }

    postNewItem(book);
});