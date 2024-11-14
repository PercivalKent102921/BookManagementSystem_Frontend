import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import 'bootstrap/dist/css/bootstrap.min.css';

// Define validation schema using yup
const schema = yup.object().shape({
    title: yup.string().required('Title is required'),
    author: yup.string().required('Author is required'),
    genre: yup.string().required('Genre is required'),
});

const BookForm = ({ onSubmit, initialData }) => {
    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
        defaultValues: initialData || {}
    });

    // Function to handle form submission
    const onFormSubmit = async (data) => {
        try {
            const response = await fetch('http://127.0.0.1:8000/api/books', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            });

            if (!response.ok) {
                throw new Error('Failed to submit the book');
            }

            const result = await response.json();
            onSubmit(result);

            alert('Book added successfully!');
        } catch (error) {
            console.error(error);
            alert('There was an error submitting the form.');
        }
    };

    return (
        <div className="container mt-5">
            <div className="row justify-content-center">
                <div className="col-md-8 col-lg-6">
                    <div className="card shadow-lg p-4 rounded">
                        <h2 className="text-center text-dark mb-4">Add New Book</h2>
                        <form onSubmit={handleSubmit(onFormSubmit)}>
                            <div className="mb-3">
                                <label htmlFor="title" className="form-label">Title</label>
                                <input
                                    type="text"
                                    id="title"
                                    className={`form-control ${errors.title ? 'is-invalid' : ''}`}
                                    {...register("title")}
                                />
                                {errors.title && <div className="invalid-feedback">{errors.title.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="author" className="form-label">Author</label>
                                <input
                                    type="text"
                                    id="author"
                                    className={`form-control ${errors.author ? 'is-invalid' : ''}`}
                                    {...register("author")}
                                />
                                {errors.author && <div className="invalid-feedback">{errors.author.message}</div>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="genre" className="form-label">Genre</label>
                                <input
                                    type="text"
                                    id="genre"
                                    className={`form-control ${errors.genre ? 'is-invalid' : ''}`}
                                    {...register("genre")}
                                />
                                {errors.genre && <div className="invalid-feedback">{errors.genre.message}</div>}
                            </div>
                            <div className="d-grid gap-2">
                                <button type="submit" className="btn btn-primary">Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookForm;
