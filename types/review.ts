export interface Review {
    id: number;
    content: string;
    rating: number;
    published_at: string;
    client: {
        id: number;
        name: string;
    },

}