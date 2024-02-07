const fs = require("fs/promises");
const path = require("path");
const { nanoid } = require('nanoid');

//1. Імпортуємо path
//2. Створюємо шлях до json файлу
//2.1 Потрібно памятати, що якщо файли books.json та index.js знаходяться на одному рівні, то шлях path.join(__dirname, "books.json"), Якщо знаходяться на різниї рівняю, наприклад на рівень вище, то шлях повинен бути path.join(__dirname, "books", "books.json"), де __dirname – абсолютний шлях до скрипта, що виконується; "books" - назва папки, в яій знаходиться файл;"books.json" - назва  json файлу, який потрібно прочитати.    

const booksPath = path.join(__dirname, "books.json");

// Алгорим створення всіх книжок
//index.js
//1. Створюємо асихрону функцію getAll
//2. Вона не приймає нічого
//3. Отримуємо інформацію у вигляді коду buffer. Для того щоб отримати масив данних чекаємо поки обробиться проміс  
//4. Повертаємо розпарсену відповідь 

const getAll = async () => {
    const data = await fs.readFile(booksPath);
    return JSON.parse(data);
}

// Алгорим пошуку книги за потрібним id
//index.js
//1. Створюємо асихрону функцію
//2. Вона приймає певний набір парамертів data, які потрібні для створення функції
//3. Отримати посилання на всі книги
//4. Шукаємо у масиві елементів елемент, у якого співпадає el.id з потрібним id.
//5. Повертаємо значеня отриманого елемента.
//6. Експортуємо getById
// app.js
//7. Прописуємо умову у відповідному кейсі case "getById".
//7.1 Якщо є помилка getById is not a function перевір як дана функція експортується.
//7.2 Якщо console.log(oneBook) повертає 
// * Promise {<pending> } перевір чи правельно розписана асихрона функція async + await
// * undefind пошук за переданим id не знайшов книжку, у такому випадку ми повертаємо null у index.js

const getById = async (id) => {
    const data = await getAll(); 
    const result = data.find(el => el.id === id); 
    return result || null; 
}

// Алгоритм додавання нової книги
//index.js
//1. Створюємо асихрону функцію addBook
//2. Вона приймає певний набір парамертів data, які потрібні для створення нової позиції книжки
//3. Для створення id можемо використовувати nanoid, але потрібно памятати, що версія повинна бути 3.3.4 (yarn add nanoid@3.3.4) тому, що вона працює з commondjs. Версія 4.1.0 (yarn add nanoid) працює з Е6-модулями.
//3.1 Імпортуємо наноід.
//4. Створюємо нову книгу, при цьому отриманий набір параметрів розпущуємо за допогою оператора ... і додаємо id
//5. Так як використати метод append додасть інформацію про книгу{} після [массиву книг]{} о потрібно пушити у вже існуючий масив.
//6. Повністю переписати весь books.json fs.writeFile(booksPath, JSON.stringify(books)) (booksPath- шлях до файлу, JSON.stringify(books)- зміст файлу у форматі рядку)
//6.1 Json файл в одну строку тому додаємо значення null, 2. (Null- це заміна одних имволів на інші, але ніхто не використовує їх)); 2- відступи)
//7. Повернути значення нової книги
//8. Експортуємо addBook
// app.js
//9. Прописуємо умову у відповідному кейсі case "add"

const addBook = async (data) => {
    const newBook = {
        id: nanoid(),
        ...data,
    }

    const books = await getAll();
    books.push(newBook);

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2))
    return newBook;
}

//Алгоритм оноволення інформації про книгу
//index.js
//1. Створюємо асихрону функцію updateById
//2. Вона приймає певний набір парамертів id і data, які потрібні для створення оновленя інформації про книжку
//3. Знаходимо усі книжки
//4. Пошук індекса findIndex книжки по отриманому id. Якщо індекс дорівнює -1 це означає, що елемента з даним id не існує. Якщо отримуємо число, воно допоможе нам при замінні
//5. В масиві книжок змінюємо інформацію про книжку
//6. Повністю переписати весь books.json fs.writeFile(booksPath, JSON.stringify(books)). (booksPath- шлях до файлу, JSON.stringify(books)- зміст файлу у форматі рядку)
//6.1 Json файл в одну строку тому додаємо значення null, 2. (Null- це заміна одних имволів на інші, але ніхто не використовує їх)); 2- відступи)
//7. Повернути значення оновленої книжки
//8. Експортуємо updateById
// app.js
//9. Прописуємо умову у відповідному кейсі case "updateById"

const updateById = async (id, data) => {
    const books = await getAll();

    const index = books.findIndex(el => el.id === id); 
    if (index === -1) return null;
    books[index] = { id, ...data };

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return books[index]
}

//Алгоритм видалення книги
//index.js
//1. Створюємо асихрону функцію removeById
//2. Вона приймає набір парамертів id, які потрібні для створення оновленя інформації про книжку
//3. Знаходимо усі книжки
//4. Пошук індекса findIndex книжки по отриманому id. Якщо індекс дорівнює -1 це означає, що елемента з даним id не існує. Якщо отримуємо число, воно допоможе нам при видаленні
//5. В масив книжок видаляємо інформацію про книжку
//6. Повністю переписати весь books.json fs.writeFile(booksPath, JSON.stringify(books)). (booksPath- шлях до файлу, JSON.stringify(books)- зміст файлу у форматі рядку)
//6.1 Json файл в одну строку тому додаємо значення null, 2. (Null- це заміна одних имволів на інші, але ніхто не використовує їх)); 2- відступи)
//7. Повернути значення видаленної книжки
//8. Експортуємо removeById
// app.js
//9. Прописуємо умову у відповідному кейсі case "removeById"

const removeById = async (id) => {
    const books = await getAll();

     const index = books.findIndex(el => el.id === id); 
    if (index === -1) return null;
    const [result] = books.splice(index, 1)

    await fs.writeFile(booksPath, JSON.stringify(books, null, 2));

    return result
}

module.exports = {
    getAll,
    getById,
    addBook,
    updateById,
    removeById,
}