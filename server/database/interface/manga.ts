import { ImageUploadInput } from './image';

export interface IMangaInput {
    name: string;
    associatedNames?: string[];
    type?: number;
    status?: number;
    publishedFrom?: Date;
    publishedTo?: Date;
    genres: string[];
    authors?: string;
    description?: string;

    image: ImageUploadInput;
}
