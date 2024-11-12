import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const EditBook = ({ books, onUpdate }) => {
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id));
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');  // Keep as string initially for input handling
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false); // Track loading state
    const [error, setError] = useState(null); // Track error messages
    const navigate = useNavigate();

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setPublishedYear(book.published_year); // Initialize with integer
            setGenre(book.genre);
            setDescription(book.description);
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Ensure publishedYear is an integer
        const updatedBook = { 
            ...book, 
            title, 
            author, 
            published_year: parseInt(publishedYear, 10), // Ensure it's an integer
            genre, 
            description 
        };

        setLoading(true);
        setError(null);

        try {
            // Send PUT request to update the book using fetch
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook), // Send updated book as JSON
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            const data = await response.json();
            onUpdate(id, data); // Call onUpdate prop to update the parent component

            // Navigate back to home after successful update
            navigate('/');
        } catch (error) {
            setError(error.message); // Set error message if any exception occurs
        } finally {
            setLoading(false); // Reset loading state after request
        }
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to home
    };

    if (!book) {
        return <p className="text-center text-danger">Book not found!</p>;
    }

    return (
        <div className="container my-5">
            <h2 className="text-center text-warning mb-4">Edit Book</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-sm">
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="author" className="form-label">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="publishedYear" className="form-label">Published Year</label>
                        <input
                            type="number"
                            id="publishedYear"
                            value={publishedYear}
                            onChange={(e) => setPublishedYear(e.target.value)}
                            required
                            className="form-control"
                            min="1000"  // Optional: set minimum year
                            max={new Date().getFullYear()} // Optional: set maximum year to current year
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="genre" className="form-label">Genre</label>
                        <input
                            type="text"
                            id="genre"
                            value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                            className="form-control"
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-control"
                        rows="5"
                    ></textarea>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-warning btn-lg" 
                        disabled={loading}
                    >
                        {loading ? 'Updating...' : 'Update Book'}
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <button onClick={handleBackClick} className="btn btn-secondary btn-lg">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default EditBook;
