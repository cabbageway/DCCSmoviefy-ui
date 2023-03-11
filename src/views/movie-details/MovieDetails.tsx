import React, {useState} from "react";
import {Movie} from "../../common/models/movie.model";
import "./MovieDetails.styles.css"
import {Genre} from "../../common/models/genre.model";

interface MovieDetailsProps {
    movie?: Movie
    genres: Genre[]
    onSave: (movie: Movie) => void
    onCancel: () => void
}

const initialMovie: Movie = {
    title: "",
    description: "",
    imageUrl: "",
    isFavorite: false,
    isWatched: false
}

const MovieDetails: React.FC<MovieDetailsProps> = (
    { movie, genres, onSave, onCancel }
) => {
    const [formData, setFormData] = useState<Movie>(movie ?? initialMovie)
    const { id, title, genre, description, imageUrl, year } = formData

    const handleTitleChange = (value: string): void => {
        setFormData({...formData, title: value})
    }

    const handleDescriptionChange = (value: string): void => {
        setFormData({...formData, description: value})
    }

    const handleYearChange = (value: number): void => {
        setFormData({...formData, year: value})
    }

    const handleImageUrlChange = (value: string): void => {
        setFormData({...formData, imageUrl: value})
    }

    const handleGenreChange = (genreId: number): void => {
        const selectedGenre = genres.find(g => g.id === genreId)
        setFormData({...formData, genre: selectedGenre})
    }

    const isFormValid = (): boolean => {
        return title !== "" && genre != null && year != null && year > 0 && imageUrl !== ""
    }

    return (
        <div className={"movie-details-root"}>
            <div className="movie-details-header">
                <span>{id == null ? "Add movie" : "Edit movie"}</span>
            </div>

            <div className="movie-details-content">
                <div className="movie-details-img-container">
                    <img src={imageUrl} alt="None"/>
                </div>
                <div className="movie-details-form-container">
                    <div className="movie-details-from-field">
                        <label>Title</label>
                        <input
                            type="text"
                            maxLength={50}
                            value={title}
                            onChange={e => handleTitleChange(e.target.value)}
                        />
                    </div>
                    <div className="movie-details-from-field">
                        <label>Genre</label>
                        <select value={genre?.id} name="genres" onChange={e => handleGenreChange(Number(e.target.value))}>
                            <option>Please choose one option</option>
                            {genres.map(g => {
                                return (
                                    <option
                                        key={g.id}
                                        value={g.id}
                                    >
                                        {g.name}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    <div className="movie-details-from-field">
                        <label>Year</label>
                        <input
                            type="number"
                            min={1900}
                            max={2023}
                            value={year}
                            onChange={e => handleYearChange(Number(e.target.value))}
                        />
                    </div>
                    <div className="movie-details-from-field">
                        <label>Description</label>
                        <input
                            type="text"
                            maxLength={200}
                            value={description}
                            onChange={e => handleDescriptionChange(e.target.value)}
                        />
                    </div>
                    <div className="movie-details-from-field">
                        <label>Image url</label>
                        <input
                            type="text"
                            value={imageUrl}
                            onChange={e => handleImageUrlChange(e.target.value)}
                        />
                    </div>
                </div>
            </div>

            <div className="movie-details-button-container">
                <button className="movie-details-cancel-button" onClick={() => onCancel()}>Cancel</button>
                <button
                    className="movie-details-save-button"
                    onClick={() => onSave(formData)}
                    disabled={!isFormValid()}
                >Save
                </button>
            </div>
        </div>
    )
}

export default MovieDetails