import { Template } from 'meteor/templating';

// Templates
import './main.html';

// Collections
import { Exports } from '../imports/api/exports.js';

Template.export.helpers({
  exports() {
    return Exports.find();
  },
});

Template.export.events({
  async 'click button#export'(event, instance) {
    Meteor.call('export.start');
  },
  async 'click button#clean'(event, instance) {
    Meteor.call('export.clean');
  },
});
