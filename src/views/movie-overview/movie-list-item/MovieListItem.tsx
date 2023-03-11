import React from "react";
import "./MovieListItem.styles.css"
import {Movie} from "../../../common/models/movie.model";
import {BookmarkAdded, BookmarkBorder, Delete, Star, StarOutline} from "@mui/icons-material";

interface MovieListItemProps {
    orderNr: number
    movie: Movie
    onFavoriteClick: (id: number) => void
    onWatchedClick: (id: number) => void
    onEditMovie: () => void
    onDeleteMovie: (id: number) => void
}

const MovieListItem: React.FC<MovieListItemProps> = (
    {orderNr, movie, onFavoriteClick, onWatchedClick, onEditMovie, onDeleteMovie }
) => {
    const { id, title, imageUrl, year, isFavorite, isWatched } = movie

    return (
        <div className="movie-list-item" onClick={() => onEditMovie()}>
            <div className="movie-list-item-column" style={{ width: "40px" }}>
                <span className="movie-list-item-icon" onClick={e => {
                    e.stopPropagation()
                    id && onFavoriteClick(id)
                }}>
                    {isFavorite ? <Star /> : <StarOutline />}
                </span>
            </div>
            <div className="movie-list-item-column" style={{ width: "40px"}}>
                <img className="movie-list-item-img" src={imageUrl} alt={"pic"} />
            </div>
            <div className="movie-list-item-column"  style={{ width: "400px" }}>
                <span>{`${orderNr}. ${title}`}</span>
            </div>
            <div className="movie-list-item-column"  style={{ width: "70px" }}>
                <span>{year}</span>
            </div>
            <div className="movie-list-item-column" style={{ width: "110px" }}>
                <span className="movie-list-item-icon" onClick={e => {
                    e.stopPropagation()
                    id && onWatchedClick(id)
                }}>
                    {isWatched ? <BookmarkAdded /> : <BookmarkBorder />}
                </span>
            </div>
            <div className="movie-list-item-column" style={{ width: "40px" }}>
                <span className="movie-list-item-icon-delete" onClick={e => {
                    e.stopPropagation()
                    id && onDeleteMovie(id)
                }}>
                    <Delete />
                </span>
            </div>
        </div>
    )
}

export default MovieListItem