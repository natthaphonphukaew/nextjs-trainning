"use client";

import { useEffect, useState } from "react";
import { getNews, type NewsItem } from "@/services/news";

export default function Home() {
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getNews()
      .then(setNews)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="bg-white py-6 px-10">
        <p className="text-gray-700">Loading...</p>
      </div>
    );
  }

  return (
    <div className="bg-white py-6 px-10 ">
      <div className="grid grid-cols-3 gap-4">
        {news.map((newsItem) => (
          <div
            key={newsItem.id}
            className="bg-white border-2 border-gray-200 p-4 rounded-lg space-y-2"
          >
            <h2 className="text-lg font-semibold">{newsItem.title}</h2>
            <p className="text-gray-700 line-clamp-3">{newsItem.description}</p>
            <button className="bg-blue-300 p-2 rounded-lg">Read More</button>
          </div>
        ))}
      </div>
    </div>
  );
}
