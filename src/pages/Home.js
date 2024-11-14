import React from 'react';
import { Link } from 'react-router-dom';

const Home = ({ books = [], setBooks }) => {
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
        <div className="row">
          {books.map((book) => (
            <div key={book.id} className="col-md-4 mb-3">
              <div className="card">
                <div className="card-body">
                  <h5 className="card-title text-warning">{book.title}</h5>
                  <p className="card-text text-muted">Author: {book.author}</p>
                  <p className="card-text text-white">{book.description}</p>
                  <div className="text-center">
                    <Link to={`/view/${book.id}`} className="btn btn-view mx-2">
                      View
                    </Link>
                    <Link to={`/edit/${book.id}`} className="btn btn-edit mx-2">
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(book.id)} className="btn btn-delete mx-2">
                      Delete
                    </button>
                  </div>
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