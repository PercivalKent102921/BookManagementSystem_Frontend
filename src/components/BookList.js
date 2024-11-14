import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './App.css'; // Assuming you have the custom styles in App.css

const BookList = () => {
    const [books, setBooks] = useState([]); // State to store the list of books

    // Function to fetch the books from the server
    const fetchBooks = async () => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books'); // Use the full API endpoint
            if (!response.ok) {
                throw new Error('Failed to fetch books');
            }
            const data = await response.json();
            setBooks(data); // Set the books data to state
        } catch (error) {
            console.error('Error fetching books:', error);
        }
    };

    // useEffect to fetch books on mount and set interval for refresh
    useEffect(() => {
        fetchBooks(); // Initial fetch on component mount

        const interval = setInterval(() => {
            fetchBooks(); // Refresh every 3 seconds
        }, 3000);

        // Cleanup interval on component unmount
        return () => clearInterval(interval);
    }, []); // Empty dependency array means this runs once when the component mounts

    const handleDelete = async (id) => {
        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('Failed to delete the book');
            }

            // Update the state by filtering out the deleted book
            setBooks((prevBooks) => prevBooks.filter((book) => book.id !== id));
        } catch (error) {
            console.error('Error deleting book:', error); // Handle any errors during deletion
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center text-white mb-4">Book List</h2>
            <div className="row">
                {books.map((book) => (
                    <div key={book.id} className="col-md-4 mb-4">
                        <div className="card shadow-sm">
                            <img
                                src="https://via.placeholder.com/150"
                                className="card-img-top"
                                alt="book cover"
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">{book.author}</p>
                                <div className="d-flex justify-content-between">
                                    <Link to={`/view/${book.id}`} className="btn btn-info btn-sm">
                                        View
                                    </Link>
                                    <Link to={`/edit/${book.id}`} className="btn btn-warning btn-sm">
                                        Edit
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(book.id)}
                                        className="btn btn-danger btn-sm"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default BookList;
