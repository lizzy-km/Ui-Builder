import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/dist/query/react";

export const PostApi = createApi({
  reducerPath: "MangaPhotoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.escuelajs.co/api/v1",
  }),

  // key = pk_test_54711a697f0046f3701557dfa14b1a0dfe62f9f75b2b6
  //  secret sk_test_547119af7e85ada3386f8521c9a296bca29ebebc5fcd5

  tagTypes: ["fakeAuth"],
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: () => ({
        url: `/products/`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    getCategories: builder.query({
      query: () => ({
        url: `/categories`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    getSingleProducts: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    deleteProducts: builder.mutation({
      query: (id) => ({
        url: `/products/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    getSingleUser: builder.query({
      query: () => ({
        url: `/users`,
        method: "GET",
      }),
      providesTags: ["fakeAuth"],
    }),
    createProducts: builder.mutation({
      query: (products) => ({
        url: `/products/`,
        method: "POST",
        body: products,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    createCategories: builder.mutation({
      query: (category) => ({
        url: `/categories/`,
        method: "POST",
        body: category,
      }),
      invalidatesTags: ["fakeAuth"],
    }),
    search: builder.query({
      query: (id) => ({
        url: `/search/users?query=${id}`,
      }),

      providesTags: ["photo"],
    })
  }),
});

export const {
  useGetProductsQuery,
  useGetSingleProductsQuery,
  useGetSingleUserQuery,
  useGetCategoriesQuery,
  useCreateProductsMutation,
  useCreateCategoriesMutation,
  useDeleteProductsMutation,
} = PostApi;
