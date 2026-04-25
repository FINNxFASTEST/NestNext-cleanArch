import { request } from "./http-client";
import type { PaginatedResponse } from "@/types";

export interface AmenityDto {
  id: string;
  label: string;
  englishName: string;
  iconKey: string;
  createdAt?: string;
}

export const amenitiesApi = {
  list: (search?: string): Promise<PaginatedResponse<AmenityDto>> => {
    const qs = search?.trim()
      ? `?search=${encodeURIComponent(search.trim())}&limit=100`
      : "?limit=100";
    return request<PaginatedResponse<AmenityDto>>(`/amenities${qs}`);
  },

  create: (data: {
    label: string;
    englishName: string;
    iconKey: string;
  }): Promise<AmenityDto> =>
    request<AmenityDto>("/amenities", {
      method: "POST",
      body: JSON.stringify(data),
    }),
};
