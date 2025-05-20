import axios from "axios";
import { ApiResponse, Image } from "../../types/types";

const unsplashKey = "Tn7WxP5cH-r-qYvvPsHefdafpkjf_cCiQz49cnQA7Ig";

axios.defaults.baseURL = "https://api.unsplash.com/";
axios.defaults.headers.common["Authorization"] = `Client-ID ${unsplashKey}`;

axios.defaults.params = {
  orientation: "landscape",
  per_page: 12,
};

export const api = async (
  query: string,
  page: number = 1
): Promise<{ results: Image[]; totalPage: number }> => {
  try {
    const { data } = await axios.get<ApiResponse>("search/photos", {
      params: {
        query,
        page,
      },
    });
    return {
      results: data.results,
      totalPage: data.total_pages,
    };
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
