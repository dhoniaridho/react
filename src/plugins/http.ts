import axios, { type AxiosRequestConfig } from "axios";
import {
  useQuery,
  UseQueryOptions,
  useMutation,
  UseMutationOptions,
} from "@tanstack/react-query";

export const http = axios.create({
  baseURL: Env.API_BASE_URL,
});

type UseHttpOptions = {
  axiosOptions?: AxiosRequestConfig;
  queryOptions?: UseQueryOptions;
};

type UseHttpMutationOptions = {
  axiosOptions?: AxiosRequestConfig;
  mutationOptions?: UseMutationOptions;
};

export function useHttp(url: string, options?: UseHttpOptions) {
  return useQuery({
    queryKey: ["http", url],
    queryFn: () =>
      http.request({
        url,
        ...options?.axiosOptions,
      }),
    ...options,
  });
}

export function useHttpMutation(url: string, options?: UseHttpMutationOptions) {
  return useMutation({
    mutationKey: ["http", url],
    mutationFn: () =>
      http.request({
        url,
        ...options?.axiosOptions,
      }),
    ...options,
  });
}
