import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const customizationApi = createApi({
  reducerPath: "customizationApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3500/" }),
  tagTypes: ["Users"],
  endpoints: (build) => ({
    registerUser: build.mutation({
      query: ({ user, pwd }) => ({
        url: "register",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      options: { withCredentials: true },
    }),
    loginUser: build.mutation({
      query: ({ user, pwd }) => ({
        url: "auth",
        method: "POST",
        body: { user, pwd },
        headers: {
          "Content-Type": "application/json",
        },
      }),
      options: { withCredentials: true },
    }),
    refresh: build.mutation({
      query: () => ({
        url: "refresh",
        method: "GET",
      }),
      options: { withCredentials: true },
    }),
    resetPwdRequest: build.mutation({
      query: ({ username }) => ({
        url: "reset-email",
        method: "POST",
        body: { username },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    resetPassword: build.mutation({
      query: ({ token, newPassword }) => ({
        url: "reset-password",
        method: "POST",
        body: { token, newPassword },
        headers: {
          "Content-Type": "application/json",
        },
      }),
    }),
    getUsers: build.query({
      query: () => "users",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Users", id })),
              { type: "Users", id: "LIST" },
            ]
          : [{ type: "Users", id: "LIST" }],
    }),
  }),
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useRefreshMutation,
  useResetPwdRequestMutation,
  useResetPasswordMutation,
} = customizationApi;
