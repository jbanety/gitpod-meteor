import { Mongo } from 'meteor/mongo';
 
export const Exports = new Mongo.Collection('exports');
Exports.allow({
    insert() { return true; },
    update() { return true; },
    remove() { return true; },
})