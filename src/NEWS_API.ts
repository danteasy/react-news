import { INewsResponse } from "./exports";

const API_KEY = process.env.REACT_APP_API_KEY;

const GET_API_URL = (
    query: string,
    filter: string,
    page: number,
    pageSize: number,
    language: string
): string => {
    const url = `https://newsapi.org/v2/everything?q=${query}&sortBy=${filter}&page=${page}&pageSize=${pageSize}&apiKey=${API_KEY}&language=${language}`;
    return url;
};

interface INewsApi {
    fetchNews: (
        query: string,
        filter: string,
        page: number,
        pageSize: number,
        language: string
    ) => Promise<INewsResponse>;
    getUserLanguageByLocation: () => Promise<string>;
}

class NewsApi implements INewsApi {
    async fetchNews(
        query: string,
        filter: string,
        page: number,
        pageSize: number,
        language: string
    ): Promise<INewsResponse> {
        try {
            let searchQuery = query || "everything";
            let searchFilter = filter || "publishedAt";
            const res = await fetch(
                GET_API_URL(searchQuery, searchFilter, page, pageSize, language)
            );
            const data: INewsResponse = await res.json();
            if (data.status !== "ok") {
                throw new Error(
                    `Invalid response from the server, status: ${data.status}`
                );
            }
            return data;
        } catch (err) {
            throw new Error(
                `Something is wrong with the response: ${
                    (err as Error).message
                }`
            );
        }
    }
    async getUserLanguageByLocation() {
        try {
            const userIp = await fetch("https://api.ipify.org?format=json")
                .then(res => res.json())
                .then(data => data.ip);
            const language = await fetch(
                `https://api.iplocation.net/?ip=${userIp}`
            )
                .then(res => res.json())
                .then(data => data);
            return language["country_code2"];
        } catch (err) {
            throw new Error(
                `Something went wrong during defining user's location`
            );
        }
    }
}

export const NEWS_API = new NewsApi();
