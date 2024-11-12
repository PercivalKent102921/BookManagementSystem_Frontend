import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';

const Home = ({ books = [], setBooks }) => {
  // Function to fetch books from backend
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

  // Fetch books when component mounts
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this book?')) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json',
          },
        });
  
        if (response.ok) {
          // Remove the deleted book from the state directly
          setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
          alert('Book deleted successfully!');
        } else {
          console.error('Failed to delete the book');
          alert('Failed to delete the book');
        }
      } catch (error) {
        console.error('Error deleting book:', error);
        alert('An error occurred while deleting the book');
      }
    }
  };
  
  return (
    <div className="container-fluid home-container">
      <h1 className="page-title">Book List</h1>
      <div className="add-book-button">
        <Link to="/add">
          <button className="btn btn-dark text-white">Add New Book</button>
        </Link>
      </div>
      {books.length === 0 ? (
        <p className="text-center text-danger">No books available. Please add some books.</p>
      ) : (
        <div className="book-list">
          {books.map((book) => (
            <div key={book.id} className="card mb-3">
              <div className="card-body">
                <h5 className="card-title text-center text-warning">{book.title}</h5>
                <p className="card-text text-center text-muted">{book.author}</p>
                <p className="card-text text-white">{book.description}</p>
                <div className="text-center">
                  <Link to={`/view/${book.id}`} className="btn btn-warning mx-2 text-black">
                    View
                  </Link>
                  <Link to={`/edit/${book.id}`} className="btn btn-warning mx-2 text-black">
                    Edit
                  </Link>
                  <button onClick={() => handleDelete(book.id)} className="btn btn-danger mx-2">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
