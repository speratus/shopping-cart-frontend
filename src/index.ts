interface Item {
    title: string;
    author: string;
    price: number;
    count: number;
}

function displayItem(item: Item) {
    console.log(item);
}