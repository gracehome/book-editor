import axios from 'axios';

export const getDoulists = async(id) => {
  const res = await axios.get(`/rex_api/book/${id}/doulists?start=0&count=5&ck=&for_mobile=1`);
  return res.data;
}

export const createBook = async(book = {}) =>{
  if(!book.name) return;
  return await axios.post('/api/books', book)
}

export const removeBook = async(id) =>{
  if(!id) return;
  return await axios.delete(`/api/books/${id}`)
}

export const getBooks = async(options = {query: {}}) =>{
  const page = options.query.page || 1;
  const limit =10;
  return await axios.get(`/api/books?page=${page}&limit=${limit}`)
}


export const getBook = async(id) =>{
  if(!id) return;
  return await axios.get(`/api/books/${id}`)
}

export const getChapters = async(id) =>{
  if(!id) return;
  return await axios.get(`/api/books/${id}/chapters`)
}

export const createChapter = async(chapter) =>{
  if(!chapter.order || !chapter.title || !chapter.book) return;
  return await axios.post(`/api/books/${chapter.book}/chapters`, chapter)
}

export const updateChapter = async(chapter) =>{
  if(!chapter.id || !chapter.order || !chapter.title) return;
  return await axios.put(`/api/books/${chapter.book}/chapters/${chapter.id}`, chapter);
}

export const deleteChapter = async(chapter) =>{
  if(!chapter.id || !chapter.book) return;
  return await axios.delete(`/api/books/${chapter.book}/chapters/${chapter.id}`)
}

export const getPaper = async(chapter) =>{
  if(!chapter.id || !chapter.book) return;
  return await axios.get(`/api/books/${chapter.book}/chapters/${chapter.id}/paper`)
}

export const createPaper = async(paper) =>{
  if(!paper.chapter || !paper.book || !paper.content) return;
  return await axios.post(`/api/books/${paper.book}/chapters/${paper.chapter}/paper`, paper)
}

export const updatePaper = async(paper) =>{
  if(!paper.id || !paper.book || !paper.chapter) return;
  return await axios.put(`/api/books/${paper.book}/chapters/${paper.chapter}/paper`, paper)
}

export const deletePaper = async(chapter) =>{
  if(!chapter.book || !chapter.id) return;
  return await axios.delete(`/api/books/${chapter.book}/chapters/${chapter.id}/paper`)
}