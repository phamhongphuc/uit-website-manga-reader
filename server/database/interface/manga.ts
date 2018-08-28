export interface Input {
    name: string;
    associatedNames?: string[];
    type?: number;
    status?: number;
    publishedFrom?: Date;
    publishedTo?: Date;
    genreNames: string[];
    authors?: string;
    description?: string;
    imageId: number;
}
