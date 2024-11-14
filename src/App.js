import React, { useState, useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import Home from './pages/Home';
import AddBook from './pages/AddBook';
import EditBook from './pages/EditBook';
import ViewBook from './pages/ViewBook';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const [books, setBooks] = useState([]);
  const navigate = useNavigate();

  const fetchBooks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/books');
      if (response.ok) {
        const data = await response.json();
        setBooks(data);
      } else {
        console.error('Failed to fetch books');
      }
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleAddBook = async (bookData) => {
    try {
      // Check if the book already exists
      const bookExists = books.some(book => book.id === bookData.id); // Assuming 'id' is a unique identifier

      if (bookExists) {
        console.error('This book already exists');
        return; // Exit the function if the book already exists
      }

      const response = await fetch('http://127.0.0.1:8000/api/books', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookData),
      });

      if (response.ok) {
        const newBook = await response.json();
        setBooks((prevBooks) => [...prevBooks, newBook]);
        navigate('/');
      } else {
        console.error('Failed to add book');
      }
    } catch (error) {
      console.error('Error adding book:', error);
    }
  };

  const handleUpdateBook = async (id, updatedData) => {
    try {
      const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData),
      });

      if (response.ok) {
        setBooks((prevBooks) =>
          prevBooks.map((book) => (book.id === parseInt(id) ? updatedData : book))
        );
        navigate('/');
      } else {
        console.error('Failed to update book');
      }
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1 className="text-center text-white py-4">Book Management System</h1>
      </header>
      <div className="app-content">
        <Routes>
          <Route path="/" element={<Home books={books} setBooks={setBooks} fetchBooks={fetchBooks} />} />
          <Route path="/add" element={<AddBook onAdd={handleAddBook} />} />
          <Route path="/edit/:id" element={<EditBook books={books} onUpdate={handleUpdateBook} />} />
          <Route path="/view/:id" element={<ViewBook books={books} />} />
        </Routes>
      </div>
    </div>
  );
};

export default App;