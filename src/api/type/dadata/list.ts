import { RequestStatus } from "@types";

export type TDadataApi<T> = {
  suggestions: T | null;
  requestStatus: RequestStatus;
  error: string | null;
};

export type TSuggestionApi = {
	suggestions: TAddressApi[]
}

export type TAddressApi = {
	id: string
	value: string 
	unrestricted_value?: string
	data: {
		postal_code: string
		city: string
		geo_lat: string
		geo_lon: string
	}
}
