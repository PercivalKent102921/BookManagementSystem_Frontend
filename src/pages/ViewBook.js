import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import '../App.css';  // Corrected path to App.css

const ViewBook = () => {
    const { id } = useParams();
    const [book, setBook] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBook = async () => {
            try {
                const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`);
                if (!response.ok) {
                    throw new Error('Book not found');
                }
                const data = await response.json();
                setBook(data);
                setLoading(false);
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        };

        fetchBook();
    }, [id]);

    const handleBackClick = () => {
        navigate('/');
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center min-vh-100">
                <div className="spinner-border text-warning" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="text-center text-danger">
                <h3>Error: {error}</h3>
                <button onClick={handleBackClick} className="btn btn-warning mt-3">
                    Back to Home
                </button>
            </div>
        );
    }

    return book ? (
        <div className="container my-5">
            <div className="book-detail-container p-4 rounded shadow-lg" style={{ backgroundColor: '#f7f7f7' }}>
                <h2 className="text-center text-dark mb-4">{book.title}</h2>
                <div className="book-info p-4 rounded" style={{ backgroundColor: '#ffffff', boxShadow: '0px 10px 30px rgba(0, 0, 0, 0.1)' }}>
                    <p style={{ color: '#2c3e50' }}><strong>Author:</strong> {book.author}</p>
                    <p style={{ color: '#2c3e50' }}><strong>Published Year:</strong> {book.published_year}</p>
                    <p style={{ color: '#2c3e50' }}><strong>Genre:</strong> {book.genre}</p>
                    <p style={{ color: '#2c3e50' }}><strong>Description:</strong> {book.description}</p>
                </div>
                <div className="text-center mt-4">
                    <button onClick={handleBackClick} className="btn btn-warning btn-lg">
                        Back to Home
                    </button>
                </div>
            </div>
        </div>
    ) : (
        <div className="text-center text-white">Book not found</div>
    );
};

export default ViewBook;