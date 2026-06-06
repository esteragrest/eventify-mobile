import { mapImageUrl, mapPersonalData } from "@/utils";
import { baseApi } from "./baseApi";

//TODO: вынести в типы типы
interface LoginRequest {
  email: string;
  password: string;
}

interface LoginResponse {
  user: any;
  token: string;
  error?: string;
}

interface RegisterRequest {
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
}

interface RegisterResponse {
  user: any;
  token: string;
  error?: string;
}

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<LoginResponse, LoginRequest>({
      query: (body) => ({
        url: "/api/auth/login",
        method: "POST",
        body,
      }),
      transformResponse: (res: LoginResponse) => ({
        ...res,
        user: {
          ...res.user,
          photo: mapImageUrl(res.user.photo),
        },
      }),
    }),
    register: builder.mutation<RegisterResponse, RegisterRequest>({
      query: (body) => ({
        url: "/api/auth/register",
        method: "POST",
        body: { ...body, ...mapPersonalData(body.firstName, body.lastName) },
      }),
      transformResponse: (res: RegisterResponse) => ({
        ...res,
        user: {
          ...res.user,
          photo: mapImageUrl(res.user.photo),
        },
      }),
    }),
  }),
});

export const { useLoginMutation, useRegisterMutation } = authApi;
