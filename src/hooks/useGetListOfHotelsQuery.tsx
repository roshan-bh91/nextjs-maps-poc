import { generateNewAccessToken } from "@/services";
import { ApiResponse } from "@/types/getHotelList.type";
import { UseQueryOptions, useQuery } from "@tanstack/react-query";
import ky, { HTTPError } from "ky";

const getListOfHotelsApiCall = async ({ queryKey }) => {
  const response = await ky.get(
    `https://test.api.amadeus.com/v1/reference-data/locations/hotels/by-city?cityCode=${queryKey[1]}&radius=5&radiusUnit=KM&hotelSource=ALL`,
    {
      hooks: {
        beforeRequest: [
          async (request) => {
            const accessTokenInLocalStorage =
              localStorage.getItem("access_token");
            if (accessTokenInLocalStorage) {
              request.headers.set("Content-Type", "application/json");

              request.headers.set(
                "Authorization",
                `Bearer ${accessTokenInLocalStorage ?? ""}`
              );
            }
          },
        ],
        beforeRetry: [
          async ({ error }) => {
            //@ts-ignore
            const statusCode = error.response?.status;
            if (statusCode === 401) {
              const responseForNewAccessToken =
                (await generateNewAccessToken()) ?? { access_token: "" };
              localStorage.removeItem("access_token");
              localStorage.setItem(
                "access_token",
                responseForNewAccessToken?.access_token
              );
            }
          },
        ],
      },
      retry: {
        statusCodes: [401],
        limit: 3,
        methods: ["get"],
      },
    }
  );

  return response.json() as Promise<ApiResponse>;
};
const useGetListOfHotelsQuery = (
  { cityCode }: Record<string, string>,
  options: Omit<
    UseQueryOptions<ApiResponse, HTTPError, ApiResponse, Array<string>>,
    "queryKey" | "queryFn"
  > = {}
) => {
  return useQuery({
    queryKey: ["hotels-list", cityCode],
    queryFn: getListOfHotelsApiCall,
    ...options,
  });
};
export default useGetListOfHotelsQuery;
