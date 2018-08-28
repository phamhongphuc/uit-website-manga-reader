import moment from 'moment';
import { db } from '../database';

export class Model {
    /**
     * @param {Model} instance
     */
    static has(instance) {
        if (!instance) return false;
        if (instance instanceof this === false) return false;

        return (
            db.realm.objects(this.schema.name).filtered(`id == ${instance.id}`)[0] !==
            undefined
        );
    }

    static isIdValid(id) {
        if (typeof id == 'string') id = Number(id);
        if (typeof id !== 'number') throw 'Id phải là number';
        if (this.getById(id) === undefined)
            throw `Không tồn tại đối tượng {${this.name}} có id là ${id}`;
    }

    static get nextId() {
        const items = db.realm.objects(this.schema.name);
        return items.length == 0 ? 1 : items.max('id') + 1;
    }

    /**
     *
     * @param {Number} id
     * @returns {Realm.Object}
     */
    static getById(id) {
        return this.list.filtered('id == $0', Number(id))[0];
    }

    /**
     *
     * @param {Object} data
     * @param {Boolean} overwrite
     */
    static write(data, overwrite = false) {
        return new Promise(resolve => {
            db.realm.write(() =>
                resolve(db.realm.create(this.schema.name, data, overwrite)),
            );
        });
    }

    /**
     * @return {Object}
     */
    get object() {
        const properties = this.constructor.schema.properties;
        const object = {};
        for (const property in properties) {
            if (properties.hasOwnProperty(property)) {
                if (['int', 'string'].indexOf(properties[property]) !== -1) {
                    object[property] = this[property];
                }
                if (properties[property] === 'date') {
                    object[property] = moment(this[property]).format(
                        'hh:mm:ss DD-MM-YYYY',
                    );
                }
            }
        }
        return object;
    }

    /**
     * @returns {Realm.Results<Model>}
     */
    static get list() {
        return db.realm.objects(this.schema.name);
    }
}
