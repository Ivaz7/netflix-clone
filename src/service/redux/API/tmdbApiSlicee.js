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

    // Etc
    searchMoviesAndTVShows: builder.query({
      query: ({ query }) => `/search/multi?query=${encodeURIComponent(query)}`,
    }),
    getTrendingAll: builder.query({
      query: ({ timeWindow = "week" } = {}) => `/trending/all/${timeWindow}`,
    }),
    getLogos: builder.query({
      async queryFn({ category, id }, _queryApi, _extraOptions, fetchWithBQ) {
        if (category) {
          return await fetchWithBQ(`/${category}/${id}/images?include_image_language=en,null`);
        }
    
        const [tvResponse, movieResponse] = await Promise.all([
          fetchWithBQ(`/tv/${id}/images?include_image_language=en,null`),
          fetchWithBQ(`/movie/${id}/images?include_image_language=en,null`)
        ]);
    
        const tvLogos = tvResponse.data?.logos;
        const movieLogos = movieResponse.data?.logos;
    
        if (tvLogos?.[0]) {
          return { data: tvResponse.data };
        } else if (movieLogos?.[0]) {
          return { data: movieResponse.data };
        } else {
          return { data: null };
        }
      }
    }),
    getDetail: builder.query({
      async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
        const [tvResponse, movieResponse] = await Promise.all([
          fetchWithBQ(`/tv/${id}?append_to_response=credits`),
          fetchWithBQ(`/movie/${id}?append_to_response=credits`)
        ]);
    
        const data = tvResponse.data ? tvResponse.data : movieResponse.data;
    
        return { data: { ...data } };
      }
    }),
    getTrailer: builder.query({
      async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
        const [movieResponse, tvResponse] = await Promise.all([
          fetchWithBQ(`/movie/${id}/videos`),
          fetchWithBQ(`/tv/${id}/videos`)
        ]);
    
        const movieTrailers = movieResponse.data?.results || [];
        const tvTrailers = tvResponse.data?.results || [];
    
        const trailers = [...movieTrailers, ...tvTrailers];
        
        return { data: trailers.length ? trailers : null };
      }
    }),
    getSimilar: builder.query({
      async queryFn({ id }, _queryApi, _extraOptions, fetchWithBQ) {
        const [movieResponse, tvResponse] = await Promise.all([
          fetchWithBQ(`/movie/${id}/similar`),
          fetchWithBQ(`/tv/${id}/similar`)
        ]);
    
        const movieResults = movieResponse.data?.results || [];
        const tvResults = tvResponse.data?.results || [];
    
        const similarResults = [...movieResults, ...tvResults];
        
        return { data: similarResults.length ? similarResults : null };
      }
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
