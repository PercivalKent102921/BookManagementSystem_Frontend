import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import './App.css'; // Assuming your custom CSS for styles

const BookDetails = () => {
    const { id } = useParams(); // Get the book ID from the URL
    const [book, setBook] = useState(null); // Store book data
    const [loading, setLoading] = useState(true); // Loading state
    const [error, setError] = useState(null); // Error state

    useEffect(() => {
        // Fetch the book data based on the ID from the URL
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch book data');
                }
                const data = await response.json();
                setBook(data); // Set the book data in state
            } catch (error) {
                setError(error.message); // Set error state if fetch fails
            } finally {
                setLoading(false); // Set loading to false once the fetch is done
            }
        };

        fetchBook(); // Call the fetch function when the component mounts
    }, [id]); // The effect depends on the book ID

    if (loading) {
        return <div className="text-center text-white">Loading...</div>; // Show loading message
    }

    if (error) {
        return <div className="text-center text-danger">Error: {error}</div>; // Show error message if fetch fails
    }

    return book ? (
        <div className="container-fluid">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6 mt-5">
                    <div className="card bg-dark text-white shadow-lg rounded">
                        <div className="card-body">
                            <h2 className="card-title text-center fade-in">{book.title}</h2>
                            <p className="card-text">
                                <strong>Author:</strong> {book.author}
                            </p>
                            <p className="card-text">
                                <strong>Genre:</strong> {book.genre}
                            </p>
                            <p className="card-text">
                                <strong>Description:</strong> {book.description}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    ) : (
        <div className="text-center text-white">Book not found</div> // Show if the book is not found
    );
};

export default BookDetails;
