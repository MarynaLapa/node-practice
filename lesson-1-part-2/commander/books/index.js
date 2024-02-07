const fs = require("fs/promises");
const path = require("path");

const booksPath = path.join(__dirname, "books.json");

const getAll = async () => {
    const data = await fs.readFile(booksPath);
    return JSON.parse(data);
}

// Алгорим пошуку книги за потрібним id
//index.js
//1. Отримати посилання на всі книги
//2. Шукаємо у масиві елементів елемент, у якого співпадає el.id з потрібним id.
//3. Повертаємо значеня отриманого елемента.
// app.js
//4. Прописуємо умову у відповідному кейсі.
//4.1 Якщо є помилка getById is not a function перевір як дана функція експортується.
// 4.2 Якщо console.log(oneBook) повертає 
// * Promise {
    // <pending> } перевір чи правельно розписана асихрона функція async + await
// * undefind

const getById = async (id) => {
    const data = await getAll(); 
    const result = data.find(el => el.id === id); 
    return result; 
}

module.exports = {
    getAll,
    getById,
}