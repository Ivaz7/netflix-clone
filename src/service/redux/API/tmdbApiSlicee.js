import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const TMDB_API_TOKEN = import.meta.env.VITE_TOKEN_TMDB_API;

// Filter untuk endpoint movie
const appendAgeFilter = (url, age) => {
  let filter = "";
  if (age === true) {
    filter = "certification_country=US&certification.lte=G";
  } else if (age === false) {
    filter = "certification_country=US&certification=R";
  }
  return filter ? (url.includes("?") ? `${url}&${filter}` : `${url}?${filter}`) : url;
};

// Filter untuk endpoint TV
const appendTVBoolAgeFilter = (url, age) => {
  let filter = "";
  if (age === true) {
    filter = "with_content_ratings=TV-PG";
  } else if (age === false) {
    filter = "with_content_ratings=TV-MA";
  }
  return filter ? (url.includes("?") ? `${url}&${filter}` : `${url}?${filter}`) : url;
};

// Helper function for mediatypea added
const addMediaType = (data, mediaType) => ({
  ...data,
  results: data.results.map(item => ({
    ...item,
    media_type: mediaType
  }))
});

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
      transformResponse: (response) => addMediaType(response, "movie")
    }),
    getTopRatedMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/movie/top_rated`, age),
      transformResponse: (response) => addMediaType(response, "movie")
    }),
    getTrendingMovies: builder.query({
      query: ({ age, timeWindow = "week" } = {}) =>
        appendAgeFilter(`/trending/movie/${timeWindow}`, age),
      transformResponse: (response) => addMediaType(response, "movie")
    }),
    getComedyMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/movie?with_genres=35`, age),
      transformResponse: (response) => addMediaType(response, "movie")
    }),
    getActionMovies: builder.query({
      query: ({ age } = {}) => appendAgeFilter(`/discover/movie?with_genres=28`, age),
      transformResponse: (response) => addMediaType(response, "movie")
    }),

    // TV Shows endpoints
    getPopularTVShows: builder.query({
      query: () => `/tv/popular`,
      transformResponse: (response) => addMediaType(response, "tv")
    }),
    getTopRatedTVShows: builder.query({
      query: () => `/tv/top_rated`,
      transformResponse: (response) => addMediaType(response, "tv")
    }),
    getTrendingTVShows: builder.query({
      query: ({ timeWindow = "week" } = {}) => `/trending/tv/${timeWindow}`,
      transformResponse: (response) => addMediaType(response, "tv")
    }),
    getActionTVShows: builder.query({
      query: ({ age } = {}) =>
        age !== undefined
          ? appendTVBoolAgeFilter(`/discover/tv?with_genres=10759`, age)
          : `/discover/tv?with_genres=10759`,
      transformResponse: (response) => addMediaType(response, "tv")
    }),
    getComedyTVShows: builder.query({
      query: ({ age } = {}) =>
        age !== undefined
          ? appendTVBoolAgeFilter(`/discover/tv?with_genres=35`, age)
          : `/discover/tv?with_genres=35`,
      transformResponse: (response) => addMediaType(response, "tv")
    }),

    // searching
    searchMoviesAndTVShows: builder.query({
      query: ({ query }) => `/search/multi?query=${encodeURIComponent(query)}`,
    }),

    // Trending All
    getTrendingAll: builder.query({
      query: ({ timeWindow = "week" } = {}) => `/trending/all/${timeWindow}`,
    }),

    // Get Logos
    getLogos: builder.query({
      query: ({ category, id }) => `/${category}/${id}/images?include_image_language=en,null`
    }),

    // Get Detail (TV & Movie)
    getDetail: builder.query({
      query: ({ category, id }) => `/${category}/${id}?append_to_response=credits`
    }),

    // Get Trailer (TV & Movie)
    getTrailer: builder.query({
      query: ({ category, id }) => `/${category}/${id}/videos`
    }),

    // Get Similar (TV & Movie)
    getSimilar: builder.query({
      query: ({ category, id }) => `/${category}/${id}/similar`
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

  // TV Shows hooks
  useLazyGetPopularTVShowsQuery,
  useLazyGetTopRatedTVShowsQuery,
  useLazyGetTrendingTVShowsQuery,
  useLazyGetActionTVShowsQuery,  
  useLazyGetComedyTVShowsQuery,   

  // Movies hooks (non-lazy)
  useGetPopularMoviesQuery,
  useGetTopRatedMoviesQuery,
  useGetTrendingMoviesQuery,
  useGetComedyMoviesQuery,
  useGetActionMoviesQuery,

  // TV Shows hooks (non-lazy)
  useGetPopularTVShowsQuery,
  useGetTopRatedTVShowsQuery,
  useGetTrendingTVShowsQuery,
  useGetActionTVShowsQuery,
  useGetComedyTVShowsQuery,

  // Etc hooks
  useLazySearchMoviesAndTVShowsQuery,
  useLazyGetTrendingAllQuery,
  useLazyGetLogosQuery,
  useLazyGetDetailQuery,
  useLazyGetTrailerQuery,
  useLazyGetSimilarQuery,
} = tmdbApiSlice;
