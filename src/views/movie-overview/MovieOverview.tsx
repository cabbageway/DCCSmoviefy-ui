import React from "react";
import {Movie} from "../../common/models/movie.model";
import MovieListItem from "./movie-list-item/MovieListItem";
import "./MovieOverview.styles.css"

interface MovieOverviewProps {
    movies: Movie[]
    onOpenDetails: (movie?: Movie) => void
    onChange: (updated: Movie[]) => void
    onDeleteMovie: (id: number) => void
}

const MovieOverview: React.FC<MovieOverviewProps> = ({ movies, onChange, onOpenDetails, onDeleteMovie }) => {
    const toggleFavorite = (id: number): void => {
        const updated = movies.map(m => m.id === id ? {...m, isFavorite: !m.isFavorite} : m)
        onChange(updated)
    }

    const toggleWatched = (id: number): void => {
        const updated = movies.map(m => m.id === id ? {...m, isWatched: !m.isWatched} : m)
        onChange(updated)
    }

    return (
        <div className="movie-overview-root">
            <div className="movie-overview-button-container">
                <button onClick={() => onOpenDetails()}>Add movie</button>
            </div>

            <div className="movie-overview-item-container">
                <div className="movie-overview-header">
                    <div className="movie-overview-header-column" style={{ width: "40px" }} />
                    <div className="movie-overview-header-column" style={{ width: "40px"}} />
                    <div className="movie-overview-header-column"  style={{ width: "400px"}}>
                        Title
                    </div>
                    <div className="movie-overview-header-column"  style={{ width: "70px" }}>
                        Year
                    </div>
                    <div className="movie-overview-header-column" style={{ width: "110px" }}>
                        Watched
                    </div>
                    <div className="movie-overview-header-column" style={{ width: "40px" }} />
                </div>

                {movies.map((movie, index) => {
                    return (
                        <MovieListItem
                            key={movie.id}
                            orderNr={index + 1}
                            movie={movie}
                            onFavoriteClick={toggleFavorite}
                            onWatchedClick={toggleWatched}
                            onEditMovie={() => onOpenDetails(movie)}
                            onDeleteMovie={onDeleteMovie}
                        />
                    )
                })}
            </div>
        </div>
    )
}

export default MovieOverview