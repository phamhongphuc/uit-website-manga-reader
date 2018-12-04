import moment from 'moment';
import isUrl from 'is-url';
import { Stream } from 'stream';
import { Genre } from '../model';
import { MangaType, StatusType } from '../model/Manga';

export function isNameValid(name) {
    if (typeof name !== 'string') throw new Error('Tên phải là chuỗi');
    if (name.length <= 1) throw new Error('Tên phải có nhiều hơn 1 kí tự');
}

export function isAssociatedNamesValid(associatedNames) {
    if (!Array.isArray(associatedNames)) {
        throw new Error('AssociatedNames không phải là mảng');
    }
    associatedNames.forEach(associatedName => {
        isNameValid(associatedName);
    });
}

export function isDateValid(date) {
    if (!moment(date, 'DD-MM-YYYY').isValid()) {
        throw new Error('Thời gian không đúng định dạng (DD-MM-YYYY)');
    }
}

export function isAuthorsValid(author) {
    if (typeof author !== 'string') {
        throw new Error('Tên tác giả phải là chuỗi');
    }
    if (author.length <= 3) {
        throw new Error('Tên tác giả phải có nhiều hơn 3 kí tự');
    }
}

export function isDescriptionValid(description) {
    if (typeof description !== 'string') {
        throw new Error('Mô tả phải là chuỗi');
    }
    if (description.length <= 10) {
        throw new Error('Mô tả phải có nhiều hơn 10 kí tự');
    }
}

/** @param {Buffer} buffer */
export function isBufferValid(buffer) {
    if (typeof buffer !== 'object' || !(buffer instanceof Buffer)) {
        throw new Error('Buffer không khớp kiểu dữ liệu');
    }
}

/** @param {Stream} stream */
export function isStreamValid(stream) {
    if (typeof stream !== 'object' || !(stream instanceof Stream)) {
        throw new Error('Stream không khớp kiểu dữ liệu');
    }
}

/** @param {Promise} promise */
export function isPromiseValid(promise) {
    if (typeof promise !== 'object' || !(promise instanceof Promise)) {
        throw new Error('Promise không khớp kiểu dữ liệu');
    }
}

export function isMangaTypeValid(type) {
    for (const key in MangaType) {
        if (type === MangaType[key]) return;
    }
    throw new Error('Manga phải là một số trong các số 0, 1, 2, 3');

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // const isValid = Object.entries(MangaType).some(([key, value]) => value === type);
    // if (!isValid) throw new Error('Manga phải là một số trong các số 0,1,2,3');
}

export function isStatusTypeValid(type) {
    for (const key in StatusType) {
        if (type === StatusType[key]) return;
    }
    throw new Error('Status phải là một số trong các số 0,1,2');
}

/**
 * @param {String[]} genreNames
 */
export function isGenreNamesValid(genreNames) {
    const isInvalid = genreNames.some(
        genreName => Genre.getByName(genreName) === undefined,
    );
    if (isInvalid) throw new Error(`Tên thể loại không tồn tại: ${genreNames}`);
}

/**
 * @param {String} url
 */
export function isUrlValid(url) {
    if (!isUrl(url)) {
        throw new Error('Không phải là đường dẫn hợp lệ');
    }
}

/**
 * @param {import('../interface/image').ImageUploadInput} input
 */
export function isUploadInputValid(input) {
    const allThrow =
        isThrow(() => isUrlValid(input)) &&
        isThrow(() => isBufferValid(input)) &&
        isThrow(() => isStreamValid(input)) &&
        isThrow(() => isPromiseValid(input));
    if (allThrow) {
        throw new Error(
            'Không phải là chuỗi, Buffer Stream hay một Promise<FileUpload> (không thể kiểm tra kiểu trả về của Promise)',
        );
    }
}

/**
 * @param {function} callback
 * @return {Boolean}
 */
export function isThrow(callback) {
    try {
        callback();
        return false;
    } catch (e) {
        return true;
    }
}
