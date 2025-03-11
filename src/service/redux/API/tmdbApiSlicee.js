import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_TOKEN = import.meta.env.VITE_TOKEN_TMDB_API;

export const tmdbApiSlice = createApi({
  reducerPath: "tmdbApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${TMDB_API_TOKEN}`);
      return headers;
    },
  }),
  endpoints: (builder) => ({
    // Movie Only
    getPopularMovies: builder.query({
      query: () => `/movie/popular`,
    }),
    getTopRatedMovies: builder.query({
      query: () => `/movie/top_rated`,
    }),
    getTrendingMovies: builder.query({
      query: (timeWindow = "week") => `/trending/movie/${timeWindow}`,
    }),
    getFamilyMovies: builder.query({
      query: () => `/discover/movie?with_genres=10751`,
    }),
    getHorrorMovies: builder.query({
      query: () => `/discover/movie?with_genres=27`,
    }),
    getComedyMovies: builder.query({
      query: () => `/discover/movie?with_genres=35`,
    }),
    getActionMovies: builder.query({
      query: () => `/discover/movie?with_genres=28`,
    }),
    getAnimeMovies: builder.query({
      query: () => `/discover/movie?with_genres=16&region=JP`,
    }),
    getSimilarMovies: builder.query({
      query: (movieId) => `/movie/${movieId}/similar`,
    }),
    getMovieTrailer: builder.query({
      query: (movieId) => `/movie/${movieId}/videos`,
    }),

    // TV Show Only
    getPopularTVShows: builder.query({
      query: () => `/tv/popular`,
    }),
    getTopRatedTVShows: builder.query({
      query: () => `/tv/top_rated`,
    }),
    getTrendingTVShows: builder.query({
      query: (timeWindow = "week") => `/trending/tv/${timeWindow}`,
    }),
    getFamilyTVShows: builder.query({
      query: () => `/discover/tv?with_genres=10751`,
    }),
    getHorrorTVShows: builder.query({
      query: () => `/discover/tv?with_genres=27`,
    }),
    getComedyTVShows: builder.query({
      query: () => `/discover/tv?with_genres=35`,
    }),
    getActionTVShows: builder.query({
      query: () => `/discover/tv?with_genres=28`,
    }),
    getAnimeTVShows: builder.query({
      query: () => `/discover/tv?with_genres=16&origin_country=JP`,
    }),
    getSimilarTVShows: builder.query({
      query: (tvId) => `/tv/${tvId}/similar`,
    }),
    getTVShowTrailer: builder.query({
      query: (tvId) => `/tv/${tvId}/videos`,
    }),

    // Both Movies & TV Shows
    searchMoviesAndTVShows: builder.query({
      query: (query) => `/search/multi?query=${encodeURIComponent(query)}`,
    }),
    getTrendingAll: builder.query({
      query: (timeWindow = "week") => `/trending/all/${timeWindow}`,
    }),
  }),
});

export const {
  // Movie Only
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetFamilyMoviesQuery,
  useGetHorrorMoviesQuery,
  useGetComedyMoviesQuery,
  useGetActionMoviesQuery,
  useGetAnimeMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetMovieTrailerQuery,

  // TV Show Only
  useGetPopularTVShowsQuery,
  useGetTopRatedTVShowsQuery,
  useGetTrendingTVShowsQuery,
  useGetFamilyTVShowsQuery,
  useGetHorrorTVShowsQuery,
  useGetComedyTVShowsQuery,
  useGetActionTVShowsQuery,
  useGetAnimeTVShowsQuery,
  useGetSimilarTVShowsQuery,
  useGetTVShowTrailerQuery,

  // Both Movies & TV Shows
  useSearchMoviesAndTVShowsQuery,
  useGetTrendingAllQuery,
} = tmdbApiSlice;
