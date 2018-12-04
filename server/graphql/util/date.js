import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';
import moment from 'moment';

export default new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',

    /**
     * Parse value from client to Date
     * @param {String} value value from client
     * @return {Date}
     */
    parseValue(value) {
        const date = moment(value, 'DD-MM-YYYY');
        if (!date.isValid()) throw new Error('Lỗi định dạng');
        return moment(value, 'DD-MM-YYYY').toDate();
    },

    /**
     * Parse Date Object from server to String
     * @param {Date} value
     * @return {String}
     */
    serialize(value) {
        return moment(value).format('DD-MM-YYYY');
    },

    parseLiteral(ast) {
        if (ast.kind === Kind.STRING) {
            return this.parseValue(ast.value);
        }
        return null;
    },
});
