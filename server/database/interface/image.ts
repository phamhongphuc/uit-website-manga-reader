import { Stream } from 'stream';
import { FileUpload } from '../../graphql/interface/interface';

export interface IImageInput {
    file: ImageUploadInput;
    name?: string;
    chapterId?: number;
}

export declare type ImageUploadInput =
    | string
    | Buffer
    | Stream
    | Promise<FileUpload>;
