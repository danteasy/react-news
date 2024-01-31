export interface INewsArticle {
    source: {
        id: string | null;
        name: string;
    };
    author: string;
    title: string;
    description: string;
    url: string;
    urlToImage: string;
    publishedAt: string;
    content: string;
}

export interface INewsResponse {
    status: string;
    totalResults: number;
    articles: INewsArticle[];
}

export interface ISelectOption {
    value: string | number;
    label: string | number;
}

export interface ILanguage {
    value: string;
    key: string;
}
