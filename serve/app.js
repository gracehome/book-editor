'use strict';

const Hapi = require('hapi');

const {
  Book,
  Chapter,
  Paper
} = require('./db')
const raw = true;

const server = Hapi.server({
  port: 3000,
  host: 'localhost'
});

server.route({
  method: 'GET',
  path: '/',
  handler: (request, h) => {

    return 'Hello, world!';
  }
});

server.route({
  method: 'GET',
  path: '/api/books',
  handler: (request, h) => {
    const page = request.query.page || 1;
    const limit = request.query.limit || 10;
    const offset = (page - 1) * limit;
    const query = {
      limit,
      offset
    };
    return Book.findAndCountAll({
      raw,
      limit,
      offset,
    }).then((books) => {
      return books;
    })
  }
});

server.route({
  method: 'PUT',
  path: '/api/books/{id}',
  handler: (request, h) => {
    return Book.update(request.payload, {
      where: {
        id: request.params.id
      },
    });
  }
});

server.route({
  method: 'POST',
  path: '/api/books',
  handler: (request, h) => {
    const book = request.payload;
    return Book.create(book);
  }
});

server.route({
  method: 'DELETE',
  path: '/api/books/{id}',
  handler: (request, h) => {
    return Book.destroy({
      where: {
        id: request.params.id
      }
    });
  }
});

server.route({
  method: 'GET',
  path: '/api/books/{id}',
  handler: (request, h) => {
    return Book.findOne({
      where: {
        id: request.params.id
      },
      raw
    });
  }
});

server.route({
  method: 'GET',
  path: '/api/books/{id}/chapters',
  handler: (request, h) => {
    return Chapter.findAll({
      where: {book: request.params.id},
      order: [['order', 'ASC']],
      raw: true
    }).then((chapters) => {
      return chapters;
    });
  }
});

server.route({
  method: 'POST',
  path: '/api/books/{book}/chapters',
  handler: (request, h) => {
    const chapter = request.payload;
    if(!chapter.order || !chapter.title) return;
    chapter.book = request.params.book;
    return Chapter.create(chapter);
  }
});

server.route({
  method: 'PUT',
  path: '/api/books/{book}/chapters/{id}',
  handler: (request, h) => {
    const chapter = request.payload;
    if(!chapter.order || !chapter.title) return;
    chapter.book = request.params.book;
    return Chapter.update(chapter, {
      where: {id: request.params.id, book: request.params.book},
    });
  }
});

server.route({
  method: 'DELETE',
  path: '/api/books/{book}/chapters/{id}',
  handler: (request, h) => {
    return Chapter.destroy({
      where: {id: request.params.id, book: request.params.book},
    });
  }
});

server.route({
  method: 'GET',
  path: '/api/books/{book}/chapters/{chapter}/paper',
  handler: (request, h) => {
    return Paper.findOne({
      where: {chapter: request.params.chapter, book: request.params.book},
    });
  }
});

server.route({
  method: 'POST',
  path: '/api/books/{book}/chapters/{chapter}/paper',
  handler: (request, h) => {
    const paper = request.payload;
    if(!paper.content) return;
    paper.state = paper.state || 10;
    paper.chapter = request.params.chapter;
    paper.book = request.params.book;
    return Paper.create(paper);
  }
});

server.route({
  method: 'PUT',
  path: '/api/books/{book}/chapters/{chapter}/paper',
  handler: (request, h) => {
    const paper = request.payload;
    if(!paper.content) return;
    paper.state = paper.state || 10;
    paper.chapter = request.params.chapter;
    paper.book = request.params.book;
    return Paper.update(paper, {
      where: {chapter: request.params.chapter, book: request.params.book},
    });
  }
});

server.route({
  method: 'DELETE',
  path: '/api/books/{book}/chapters/{chapter}/paper',
  handler: (request, h) => {
    return Paper.destroy({
      where: {chapter: request.params.chapter, book: request.params.book},
    });
  }
});

const init = async () => {

  await server.start();
  console.log(`Server running at: ${server.info.uri}`);
};

process.on('unhandledRejection', (err) => {

  console.log(err);
  process.exit(1);
});

init();