import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const messagesApi = createApi({
  reducerPath: 'messages',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1/messages',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
    }),
    editMessageById: builder.mutation({
      query: (message) => ({
        method: 'PATCH',
        body: message,
        url: message.id,
      }),
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      })
    }),
    removeMessage: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      })
    })
  }),
})

export const {
  useGetMessagesQuery,
  useEditMessageByIdMutation,
  useAddMessageMutation,
  useRemoveMessageMutation,
} = messagesApi;

export default messagesApi;