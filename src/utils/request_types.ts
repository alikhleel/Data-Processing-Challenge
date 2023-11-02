import { REQUEST_TYPES } from "../constants";

export function get_request_type(request_type: number): string {
  return REQUEST_TYPES[request_type - 1];
}
