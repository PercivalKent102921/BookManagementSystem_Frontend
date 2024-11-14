import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css';  // Corrected path to App.css

const EditBook = ({ books, onUpdate }) => {
    const { id } = useParams();
    const book = books.find((book) => book.id === parseInt(id));
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (book) {
            setTitle(book.title);
            setAuthor(book.author);
            setPublishedYear(book.published_year);
            setGenre(book.genre);
            setDescription(book.description);
        }
    }, [book]);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const updatedBook = { 
            ...book, 
            title, 
            author, 
            published_year: parseInt(publishedYear, 10), // Ensure published year is parsed as an integer
            genre, 
            description 
        };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`http://127.0.0.1:8000/api/books/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedBook),
            });

            if (!response.ok) {
                throw new Error('Failed to update book');
            }

            const data = await response.json();
            onUpdate(id, data);
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/');
    };

    if (!book) {
        return <p className="text-center text-danger">Book not found!</p>;
    }

    return (
        <div className="container my-5 bg-dark p-4 rounded shadow-lg" style={{ backgroundColor: '#2C3E50' }}>
            <h2 className="text-center text-warning mb-4">Edit Book</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="title" className="form-label text-light">Title</label>
                        <input
                            type="text"
                            id="title"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                            className="form-control shadow-sm"
                            style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="author" className="form-label text-light">Author</label>
                        <input
                            type="text"
                            id="author"
                            value={author}
                            onChange={(e) => setAuthor(e.target.value)}
                            required
                            className="form-control shadow-sm"
                            style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                        />
                    </div>
                </div>
                <div className="row mb-3">
                    <div className="col-md-6">
                        <label htmlFor="publishedYear" className="form-label text-light">Published Year</label>
                        <input
                            type="number"
                            id="publishedYear"
                            value={publishedYear}
                            onChange={(e) => setPublishedYear(e.target.value)}
                            required
                            className="form-control shadow-sm"
                            style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                        />
                    </div>
                    <div className="col-md-6">
                        <label htmlFor="genre" className="form-label text-light">Genre</label>
                        <input
                            type="text"
                            id="genre"
 value={genre}
                            onChange={(e) => setGenre(e.target.value)}
                            required
                            className="form-control shadow-sm"
                            style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                        />
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label text-light">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-control shadow-sm"
                        rows="5"
                        style={{ backgroundColor: '#f9f9f9', color: '#333' }}
                    ></textarea>
                </div>
                <div className="text-center">
                    <button 
                        type="submit" 
                        className="btn btn-warning btn-lg shadow-sm"
                        disabled={loading}
                        style={{ backgroundColor: '#f39c12', borderColor: '#e67e22' }}
                    >
                        {loading ? 'Updating...' : 'Update Book'}
                    </button>
                </div>
            </form>
            <div className="text-center mt-4">
                <button onClick={handleBackClick} className="btn btn-secondary btn-lg shadow-sm">
                    Back to Home
                </button>
            </div>
        </div>
    );
};

export default EditBook;