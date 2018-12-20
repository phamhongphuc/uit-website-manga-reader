import { ReadStream, PathLike } from 'fs';

/**
 * @see {@link https://github.com/jaydenseric/graphql-upload/blob/master/src/GraphQLUpload.mjs}
 */
export interface FileUpload {
    /**
     * File name.
     */
    filename: string;
    /**
     * File MIME type. Provided by the client and can’t be trusted.
     */
    mimetype: string;
    /**
     * File stream transfer encoding.
     */
    encoding: string;
    /**
     * Returns a Node.js readable stream of the file contents, for processing and storing the file. Multiple calls create independent streams. Throws if called after all resolvers have resolved, or after an error has interrupted the request.
     */
    createReadStream: (
        path: PathLike,
        options?:
            | string
            | {
                  flags?: string;
                  encoding?: string;
                  fd?: number;
                  mode?: number;
                  autoClose?: boolean;
                  start?: number;
                  end?: number;
                  highWaterMark?: number;
              },
    ) => ReadStream;
}
