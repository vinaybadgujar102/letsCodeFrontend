const PROD_API = "https://api.letscode.vinaybadgujar.online";

export const PROBLEM_ADMIN_BASE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_PROBLEM_ADMIN_BASE_URL ?? "http://localhost:3000")
  : PROD_API;

export const SUBMISSION_SERVICE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_SUBMISSION_SERVICE_URL ?? "http://localhost:3001")
  : PROD_API;

export const SOCKET_SERVICE_URL = import.meta.env.DEV
  ? (import.meta.env.VITE_SOCKET_SERVICE_URL ?? "http://localhost:3003")
  : PROD_API;
