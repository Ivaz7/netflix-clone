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
    getPopularMovies: builder.query({
      query: () => `/movie/popular`,
    }),
  }),
});

export const { useGetPopularMoviesQuery } = tmdbApiSlice;
