import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../App.css'; // Corrected path to App.css

const AddBook = ({ onAdd }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [publishedYear, setPublishedYear] = useState('');
    const [genre, setGenre] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !author || !publishedYear || !genre || !description) {
            setError('All fields are required.');
            return;
        }

        const newBook = { 
            title, 
            author, 
            published_year: parseInt(publishedYear, 10),
            genre, 
            description, 
            id: Date.now() 
        };

        setLoading(true);
        setError(null);

        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newBook),
            });

            if (!response.ok) {
                throw new Error('Failed to add book');
            }

            const data = await response.json();
            onAdd(data); 
            navigate('/');
        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleBackClick = () => {
        navigate('/'); // Navigate back to home
    };

    return (
        <div className="container my-5">
            <h2 className="text-light mb-4">Add New Book</h2>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={handleSubmit} className="form-container p-4 rounded shadow-lg">
                <div className="form-group">
                    <label htmlFor="title" className="text-light">Title</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="author" className="text-light">Author</label>
                    <input
                        type="text"
                        id="author"
                        value={author}
                        onChange={(e) => setAuthor(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publishedYear" className="text-light">Published Year</label>
                    <input
                        type="number"
                        id="publishedYear"
                        value={publishedYear}
                        onChange={(e) => setPublishedYear(e.target.value)}
                        required
                        className="form-control"
                        min="1000" 
                        max="9999" 
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="genre" className="text-light">Genre</label>
                    <input
                        type="text"
                        id="genre"
                        value={genre}
                        onChange={(e) => setGenre(e.target.value)}
                        required
                        className="form-control"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="description" className="text-light">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        required
                        className="form-control"
                        rows="5"
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="btn btn-warning btn-block mt-3"
                    disabled={loading}
                >
                    {loading ? 'Adding...' : 'Add Book'}
                </button>
                <button
                    type="button"
                    className="btn btn-secondary btn-block mt-3"
                    onClick={handleBackClick}
                >
                    Back
                </button>
            </form>
        </div>
    );
};

export default AddBook;