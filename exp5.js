const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const { buildSchema } = require('graphql');

const app = express();
const port = 4024;

// Sample Data
let books = [
    { id: 1, title: "Harry Potter", author: "J.K. Rowling" },
    { id: 2, title: "The Hobbit", author: "J.R.R. Tolkien" }];

// 1. Define Schema
const schema = buildSchema(`
    type Book {
        id: Int
        title: String
        author: String
    }
    type Query {
        getBooks: [Book]
        getBook(id: Int!): Book
    }
    type Mutation {
        addBook(title: String!, author: String!): Book
    }
`);

// 2. Define Resolvers 
const root = {
    getBooks: () => books,
    getBook: ({ id }) => books.find(book => book.id === id),
    addBook: ({ title, author }) => {
        const newBook = { id: books.length + 1, title, author };
        books.push(newBook);
        return newBook;
    }
};

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true
}));

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/graphql`);
});
