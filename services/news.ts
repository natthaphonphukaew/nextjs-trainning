import axios from "axios";

export type NewsItem = {
  id: number;
  title: string;
  description: string;
};

type NewsResponse = {
  news: NewsItem[];
};

export function getNews() {
  return axios.get<NewsResponse>("/api/news").then((res) => res.data.news);
}
