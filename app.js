const books = require("./lesson-1-part-2/books")

const invokeAction = async ({action, id, title, author}) => {
    switch (action) {
        case "read":
            const allBooks = await books.getAll();
            return console.log(allBooks);
        case "getById":
            const oneBook = await books.getById(id);
            return console.log(oneBook);
        case "add":
            const newBook = await books.addBook({ title, author });
            return console.log(newBook)
        case "updateById":
            const updateBook = await books.updateById(id, { title, author });
            return console.log(updateBook);
        case "removeById":
            const removeBook = await books.removeById(id);
            return console.log(removeBook);
    }
}

invokeAction({ action: "read" })
// invokeAction({action: "getById", id:"YxhM4QDxPeA3SmPHcdmfn"})
//  invokeAction({action: "add", title:"Murder on the Orient Express", author: "Agatha Christie"})//Повторно використання потрібно змінити title i author
// invokeAction({action: "updateById", id: "QUlkJbJYDNZ0XbnCsbyzc", title: "Death on the Nile", author: "Agatha Christie"})   
// invokeAction({ action: "removeById", id: "YxhM4QDxPeA3SmPHcdmfn" });