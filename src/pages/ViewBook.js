import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const ViewBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`); // Replace with your API endpoint
                if (!response.ok) {
                    throw new Error('Book not found');
                }
                const data = await response.json();
                setBook(data); // Set the book data from the API
                setLoading(false);
            } catch (error) {
                setError(error.message); // Handle errors
                setLoading(false);
            }
        };

        fetchBook(); // Fetch book data when component mounts or `id` changes
    }, [id]); // Re-run if `id` changes

    const handleBackClick = () => {
        navigate('/'); // Navigate back to home
    };

    if (loading) {
        return <p className="text-center text-warning">Loading book details...</p>;
    }

    if (error) {
        return <p className="text-center text-danger">{error}</p>;
    }

    return (
        <div className="container my-5">
            <h2 className="text-center text-warning mb-4">{book.title}</h2>
            <div className="bg-light p-4 rounded shadow-sm">
                <p><strong>Author:</strong> {book.author}</p>
                <p><strong>Published Year:</strong> {book.published_year}</p>
                <p><strong>Genre:</strong> {book.genre}</p>
                <p><strong>Description:</strong> {book.description}</p>
            </div>
            <div className="text-center mt-4">
                <button onClick={handleBackClick} className="btn btn-warning btn-lg">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default ViewBook;
