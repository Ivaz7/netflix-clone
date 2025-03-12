import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_TOKEN = import.meta.env.VITE_TOKEN_TMDB_API;

const appendAgeFilter = (url, age) => {
  let filter = "";
  if (age === true) {
    filter = "certification_country=US&certification.lte=G";
  } else if (age === false) {
    filter = "certification_country=US&certification=R";
  }
  return filter ? (url.includes("?") ? `${url}&${filter}` : `${url}?${filter}`) : url;
};


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
    // Movies
    getPopularMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/movie/popular`, age),
    }),
    getTopRatedMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/movie/top_rated`, age),
    }),
    getTrendingMovies: builder.query({
      query: ({ age, timeWindow = "week" } = {}) => appendAgeFilter(`/trending/movie/${timeWindow}`, age),
    }),
    getComedyMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/movie?with_genres=35`, age),
    }),
    getActionMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/movie?with_genres=28`, age),
    }),
    getSimilarMovies: builder.query({
      query: ({ id, age } = {}) => appendAgeFilter(`/movie/${id}/similar`, age),
    }),
    getMovieTrailer: builder.query({
      query: ({ id, age } = {}) => appendAgeFilter(`/movie/${id}/videos`, age),
    }),

    // TV shows
    getPopularTVShows: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/tv/popular`, age),
    }),
    getTopRatedTVShows: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/tv/top_rated`, age),
    }),
    getTrendingTVShows: builder.query({
      query: ({ age, timeWindow = "week" } = {}) => appendAgeFilter(`/trending/tv/${timeWindow}`, age),
    }),
    getComedyTVShows: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/tv?with_genres=35`, age),
    }),
    getActionTVShows: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/tv?with_genres=28`, age),
    }),
    getSimilarTVShows: builder.query({
      query: ({ id, age } = {}) => appendAgeFilter(`/tv/${id}/similar`, age),
    }),
    getTVShowTrailer: builder.query({
      query: ({ id, age } = {}) => appendAgeFilter(`/tv/${id}/videos`, age),
    }),

    // Etc
    searchMoviesAndTVShows: builder.query({
      query: ({ age, query }) =>
        appendAgeFilter(`/search/multi?query=${encodeURIComponent(query)}`, age),
    }),
    getTrendingAll: builder.query({
      query: ({ age, timeWindow = "week" } = {}) =>
        appendAgeFilter(`/trending/all/${timeWindow}`, age),
    }),
    getLogos: builder.query({
      query: ({ category, id }) => `/${category}/${id}/images`,
    }),    
  }),
});

export const {
  // Movies
  useLazyGetPopularMoviesQuery,
  useLazyGetTopRatedMoviesQuery,
  useLazyGetTrendingMoviesQuery,
  useLazyGetComedyMoviesQuery,
  useLazyGetActionMoviesQuery,
  useLazyGetSimilarMoviesQuery,
  useLazyGetMovieTrailerQuery,

  // TV Shows
  useLazyGetPopularTVShowsQuery,
  useLazyGetTopRatedTVShowsQuery,
  useLazyGetTrendingTVShowsQuery,
  useLazyGetComedyTVShowsQuery,
  useLazyGetActionTVShowsQuery,
  useLazyGetSimilarTVShowsQuery,
  useLazyGetTVShowTrailerQuery,

  // Etc
  useLazySearchMoviesAndTVShowsQuery,
  useLazyGetTrendingAllQuery,
  useLazyGetLogosQuery,
} = tmdbApiSlice;
