import { ApiAdvice } from "@/types/crypto";

const API_BASE_URL = "";

export class ApiError extends Error {
  constructor(
    message: string,
    public status?: number
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Fetch latest investment advices from backend
 * Returns up to 10 most recent advices sorted by predicted_at DESC
 */
export async function fetchLatestAdvices(): Promise<ApiAdvice[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/api/get_last_10_advises`, {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      if (response.status === 500) {
        const errorData = await response.json().catch(() => ({}));
        const errorMsg = errorData.message 
          ? `Backend Error: ${errorData.message}` 
          : "Backend returned 500 Internal Server Error. Please check backend logs.";
        throw new ApiError(errorMsg, response.status);
      }
      throw new ApiError(`HTTP ${response.status}`, response.status);
    }

    const data = (await response.json()) as ApiAdvice[];

    // Ensure data is sorted by predicted_at DESC
    data.sort((a, b) => b.predicted_at - a.predicted_at);

    return data;
  } catch (error) {
    if (error instanceof ApiError) {
      throw error;
    }
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Cannot connect to backend server. Please ensure the API server is running at http://127.0.0.1:8000"
      );
    }
    throw new ApiError("Failed to fetch advice data");
  }
}
