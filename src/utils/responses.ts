import { get_request_type } from "./request_types";

export function create_response_data_Processing(counters: number[]): any {
  return {
    requests: counters.map((count: any, index: any) => ({
      type: get_request_type(index + 1),
      count,
    })),
  };
}
