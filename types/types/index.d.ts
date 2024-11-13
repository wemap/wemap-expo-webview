export type Coordinates = {
    latitude: number;
    longitude: number;
};
export type Filters = {
    query?: string;
    endDate?: string;
    startDare?: string;
    tags?: string[];
};
export type Pinpoint = {
    id: number;
    latitude: number;
    longitude: number;
    name: string;
    address?: string;
    altitude?: number | null;
    description?: string;
    image_url?: string;
    link_url?: string | null;
    media_url?: string | null;
    media_type?: "image" | "video" | null;
    tags?: string[];
    external_data?: Record<string, any>;
};
export type DrawPolylineOptions = {
    color?: string;
    opacity?: number;
    useNetwork?: boolean;
    width?: number;
};
