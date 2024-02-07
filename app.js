const books = require("../lesson-2/commander/books")

const invokeAction = async ({action, id, title, author}) => {
    switch (action) {
        case "read":
            const allBooks = await books.getAll();
            return console.log(allBooks);
        case "getById":
            const oneBook = await books.getById(id);
            return console.log(oneBook);
    }
}

invokeAction({ action: "read" })
// invokeAction({action: "getById", id: "1"})