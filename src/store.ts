import { create } from "zustand";
import { devtools } from "zustand/middleware";

import { NEWS_API, INewsArticle, INewsResponse, ILanguage } from "./exports";

interface IStore {
    error: string;
    searchQuery: string;
    sortBy: string;
    articles: INewsArticle[];
    notifications: string[];
    page: number;
    pageSize: number;
    totalPages: undefined | number;
    newsLanguages: ILanguage[];
    language: ILanguage;
    loading: boolean;
    totalResults: undefined | number;

    fetchNewsByQuery: () => void;
    updateStore: (obj: { [key: string]: string | number | boolean }) => void;
    getLanguage: () => void;
    changeLanguage: (key: string) => void;
    setNotification: (text: string) => void;
    deleteNotification: () => void;
}

export const useStore = create<IStore>()(
    devtools(set => ({
        error: "",
        searchQuery: "",
        sortBy: "relevancy",
        articles: [],
        notifications: [],
        page: 1,
        totalPages: undefined,
        pageSize: 10,
        newsLanguages: [
            {
                key: "ar",
                value: "Arabic",
            },
            {
                key: "de",
                value: "German",
            },
            {
                key: "en",
                value: "English",
            },
            {
                key: "es",
                value: "Spanish",
            },
            {
                key: "fr",
                value: "French",
            },
            {
                key: "he",
                value: "Hebrew",
            },
            {
                key: "it",
                value: "Italian",
            },
            {
                key: "nl",
                value: "Dutch",
            },
            {
                key: "no",
                value: "Norwegian",
            },
            {
                key: "pt",
                value: "Portuguese",
            },
            {
                key: "ru",
                value: "Russian",
            },
            {
                key: "sv",
                value: "Swedish",
            },
            {
                key: "ud",
                value: "Urdu",
            },
            {
                key: "zh",
                value: "Chinese",
            },
        ],
        language: {
            key: "en",
            value: "English",
        },
        loading: false,
        totalResults: undefined,
        fetchNewsByQuery: async () => {
            try {
                const { searchQuery, sortBy, page, pageSize, language } =
                    useStore.getState();

                set({ loading: true });

                const news: INewsResponse = await NEWS_API.fetchNews(
                    searchQuery,
                    sortBy,
                    page,
                    pageSize,
                    language.key
                );
                set({
                    totalResults: news.totalResults,
                    articles: news.articles.filter(
                        (article: INewsArticle) => article.author
                    ),
                    totalPages: Math.ceil(
                        news.totalResults / Number(useStore.getState().pageSize)
                    ),
                });
            } catch (err) {
                set({ error: (err as Error).message });
            } finally {
                set({ loading: false });
            }
        },

        updateStore: (obj: { [key: string]: string | number | boolean }) => {
            set(obj);
        },
        changeLanguage: (key: string) => {
            const language = useStore
                .getState()
                .newsLanguages.filter(
                    lang => lang.key.toLowerCase() === key.toLowerCase()
                )[0];
            set({ language: language });
        },
        getLanguage: async () => {
            try {
                const countryCode = await NEWS_API.getUserLanguageByLocation();
                const { newsLanguages, fetchNewsByQuery, setNotification } =
                    useStore.getState();
                const language = newsLanguages.filter(
                    lang => lang.key.toLowerCase() === countryCode.toLowerCase()
                )[0];
                if (language && language.key !== "en") {
                    set({ language: language });
                    fetchNewsByQuery();
                    setNotification(
                        `News language is set to ${language.value} (based on your location)`
                    );
                }
            } catch (err) {
                set({ error: (err as Error).message });
            }
        },
        setNotification: (text: string) => {
            set({
                notifications: [...useStore.getState().notifications, text],
            });
        },
        deleteNotification: () => {
            set({
                notifications: useStore
                    .getState()
                    .notifications.filter((_, i) => i !== 0),
            });
        },
    }))
);
