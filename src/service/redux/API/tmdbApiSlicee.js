import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_TOKEN = import.meta.env.VITE_TOKEN_TMDB_API;

// Filter 
const appendAgeFilter = (url, age) => {
  let filter = "";
  if (age === true) {
    filter = "certification_country=US&certification.lte=G";
  } else if (age === false) {
    filter = "certification_country=US&certification=R";
  }
  return filter ? (url.includes("?") ? `${url}&${filter}` : `${url}?${filter}`) : url;
};

const appendTVBoolAgeFilter = (url, age) => {
  let filter = "";
  if (age === true) {
    filter = "with_content_ratings=TV-PG";
  } else if (age === false) {
    filter = "with_content_ratings=TV-MA";
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
    // Movies endpoints
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

    // TV Shows endpoints
    getPopularTVShows: builder.query({
      query: () => `/tv/popular`,
    }),
    getTopRatedTVShows: builder.query({
      query: () => `/tv/top_rated`,
    }),
    getTrendingTVShows: builder.query({
      query: ({ timeWindow = "week" } = {}) => `/trending/tv/${timeWindow}`,
    }),
    getActionTVShows: builder.query({
      query: ({ age } = {}) =>
        age !== undefined
          ? appendTVBoolAgeFilter(`/discover/tv?with_genres=10759`, age)
          : `/discover/tv?with_genres=10759`,
    }),
    getComedyTVShows: builder.query({
      query: ({ age } = {}) =>
        age !== undefined
          ? appendTVBoolAgeFilter(`/discover/tv?with_genres=35`, age)
          : `/discover/tv?with_genres=35`,
    }),
    getSimilarTVShows: builder.query({
      query: ({ id } = {}) => `/tv/${id}/similar`,
    }),
    getTVShowTrailer: builder.query({
      query: ({ id } = {}) => `/tv/${id}/videos`,
    }),

    // Etc
    searchMoviesAndTVShows: builder.query({
      query: ({ query }) => `/search/multi?query=${encodeURIComponent(query)}`,
    }),
    getTrendingAll: builder.query({
      query: ({ timeWindow = "week" } = {}) => `/trending/all/${timeWindow}`,
    }),
    getLogos: builder.query({
      query: ({ category, id }) => `/${category}/${id}/images?include_image_language=en,null`,
    }),
  }),
});

export const {
  // Movies hooks
  useLazyGetPopularMoviesQuery,
  useLazyGetTopRatedMoviesQuery,
  useLazyGetTrendingMoviesQuery,
  useLazyGetComedyMoviesQuery,
  useLazyGetActionMoviesQuery,
  useLazyGetSimilarMoviesQuery,
  useLazyGetMovieTrailerQuery,

  // TV Shows hooks
  useLazyGetPopularTVShowsQuery,
  useLazyGetTopRatedTVShowsQuery,
  useLazyGetTrendingTVShowsQuery,
  useLazyGetActionTVShowsQuery,  
  useLazyGetComedyTVShowsQuery,   
  useLazyGetSimilarTVShowsQuery,
  useLazyGetTVShowTrailerQuery,

  // Movies hooks (non-lazy)
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetComedyMoviesQuery,
  useGetActionMoviesQuery,
  useGetSimilarMoviesQuery,
  useGetMovieTrailerQuery,

  // TV Shows hooks (non-lazy)
  useGetPopularTVShowsQuery,
  useGetTopRatedTVShowsQuery,
  useGetTrendingTVShowsQuery,
  useGetActionTVShowsQuery,
  useGetComedyTVShowsQuery,
  useGetSimilarTVShowsQuery,
  useGetTVShowTrailerQuery,

  // Etc hooks
  useLazySearchMoviesAndTVShowsQuery,
  useLazyGetTrendingAllQuery,
  useLazyGetLogosQuery,
} = tmdbApiSlice;
