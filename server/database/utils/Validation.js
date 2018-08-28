import moment from 'moment';
import { MangaType, StatusType } from '../model/Manga';
import { Genre } from '../database';

export function isNameValid(name) {
    if (typeof name !== 'string') throw 'Tên phải là chuỗi';
    if (name.length <= 1) throw 'Tên phải có nhiều hơn 1 kí tự';
}

export function isAssociatedNamesValid(associatedNames) {
    if (!Array.isArray(associatedNames)) {
        throw 'AssociatedNames không phải là mảng';
    }
    associatedNames.forEach(associatedName => {
        isNameValid(associatedName);
    });
}

export function isDateValid(date) {
    if (!moment(date, 'DD-MM-YYYY').isValid())
        throw 'Thời gian không đúng định dạng (DD-MM-YYYY)';
}

export function isAuthorsValid(author) {
    if (typeof author !== 'string') throw 'Tên tác giả phải là chuỗi';
    if (author.length <= 3) throw 'Tên tác giả phải có nhiều hơn 3 kí tự';
}

export function isDescriptionValid(description) {
    if (typeof description !== 'string') throw 'Mô tả phải là chuỗi';
    if (description.length <= 10) throw 'Mô tả phải có nhiều hơn 10 kí tự';
}

export function isBufferValid(buffer) {
    if (typeof buffer !== 'object' || !(buffer instanceof Buffer)) {
        throw 'Buffer không khớp kiểu dữ liệu';
    }
}

export function isMangaTypeValid(type) {
    for (const key in MangaType) {
        if (type === MangaType[key]) return;
    }
    throw 'Manga phải là một số trong các số 0,1,2,3';

    // https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some
    // const isValid = Object.entries(MangaType).some(([key, value]) => value === type);
    // if (!isValid) throw 'Manga phải là một số trong các số 0,1,2,3';
}

export function isStatusTypeValid(type) {
    for (const key in StatusType) {
        if (type === StatusType[key]) return;
    }
    throw 'Status phải là một số trong các số 0,1,2';
}

/**
 * @param {String[]} genreNames
 */
export function isGenreNamesValid(genreNames) {
    // for (let i = 0; i < genreNames.length; i++) {
    //     if (Genre.getByName(genreNames[i]) === undefined) {
    //         throw 'Tên thể loại không tồn tại';
    //     }
    // }

    const isInvalid = genreNames.some(
        genreName => Genre.getByName(genreName) === undefined,
    );
    if (isInvalid) throw 'Tên thể loại không tồn tại';
}

// export function isImageValid(imageId) {
//     if (Image.getById(imageId) === undefined) {
//         throw 'imageId không tồn tại';
//     }
// }
