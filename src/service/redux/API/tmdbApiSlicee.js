import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query";

const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

export const tmdbApiSlice = createApi({
  reducerPath: "tmdbApiSlice",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.themoviedb.org/3",
  }),
  endpoints: (builder) => ({
    getPopularMovies: builder.query({
      query: () => `/movie/popular?api_key=${TMDB_API_KEY}`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApiSlice;