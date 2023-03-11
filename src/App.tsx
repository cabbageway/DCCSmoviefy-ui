import React, {ReactNode, useState} from 'react';
import AppHeader from "./common/components/app-header/AppHeader";
import "./App.css"
import MovieOverview from "./views/movie-overview/MovieOverview";
import {Movie} from "./common/models/movie.model";
import {moviesMockData, genresMockData} from "./common/mock-data";
import MovieDetails from "./views/movie-details/MovieDetails";

export enum AppViews {
  MovieOverview = 1,
  MovieDetails
}

function App() {
  const [selectedView, setSelectedView] = useState<AppViews>(AppViews.MovieOverview)
  const [selectedMovie, setSelectedMovie] = useState<Movie | undefined>(undefined)

  const [movies, setMovies] = useState<Movie[]>(moviesMockData)

  const handleOpenDetails = (movie?: Movie): void => {
    if (movie != null) {
      setSelectedMovie(movie)
    }

    setSelectedView(AppViews.MovieDetails)
  }

  const handleBackToOverview = (): void => {
    setSelectedMovie(undefined)
    setSelectedView(AppViews.MovieOverview)
  }

  const handleSaveMovie = (updatedMovie: Movie): void => {
    let updatedMovies

    if (updatedMovie.id == null) {
      const id = Number(Math.random().toString().slice(2))
      updatedMovies = [...movies, {...updatedMovie, id}]
    } else {
      updatedMovies = [...movies].map(movie => {
        if (movie.id === updatedMovie.id) {
          return {...updatedMovie}
        }
        return movie
      })
    }

    setMovies(updatedMovies)
    handleBackToOverview()
  }

  const handleDeleteMovie = (id: number): void => {
    const updatedMovies = movies.filter(movie => movie.id !== id)
    setMovies(updatedMovies)
  }

  const renderSelectedView = (): ReactNode => {
    switch (selectedView) {
      case AppViews.MovieOverview:
        return (
            <MovieOverview
                movies={movies}
                onOpenDetails={handleOpenDetails}
                onChange={(updated) => setMovies(updated)}
                onDeleteMovie={handleDeleteMovie}
            />
        )
      case AppViews.MovieDetails:
        return (
            <MovieDetails
                movie={selectedMovie}
                genres={genresMockData}
                onSave={handleSaveMovie}
                onCancel={handleBackToOverview}
            />
        )
    }
  }

  return (
    <div className="app">
      <AppHeader onClick={handleBackToOverview} />
      <div className="app-content">
        {renderSelectedView()}
      </div>
    </div>
  );
}

export default App;
