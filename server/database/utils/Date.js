import moment from 'moment';

export const parseDate = date => {
    return moment(date, 'DD-MM-YYYY').toDate();
};
