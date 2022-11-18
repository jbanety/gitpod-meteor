import { Meteor } from 'meteor/meteor';

// Collections
import { Exports } from '../imports/api/exports.js';

let i = 0;
const intervals = {};

const urls = [
  "https://www.lempire.com/",
  "https://www.lemlist.com/",
  "https://www.lemverse.com/",
  "https://www.lemstash.com/"
];

const randomNumber = (min, max) => Math.floor(Math.random() * (max - min) + min);

Meteor.methods({
  async 'export.start'() {
    const _id = Exports.insert({
      name: 'Export ' + (++i),
      progress: 0,
      done: false,
      url: urls[randomNumber(0,3)]
    });
    intervals[_id] = Meteor.setInterval(() => {
      const doc = Exports.findOne(_id);
      const progress = doc.progress + 5;
      console.log('progress', _id, progress);
      Exports.update(_id, {
        ...doc,
        progress: progress,
        done: progress === 100,
      })
      if (progress === 100) {
        Meteor.clearInterval(intervals[_id]);
      }
    }, 1000);
  },
  async 'export.clean'() {
    Object.values(intervals).forEach(i => Meteor.clearInterval(i));
    if (Exports.find().count() > 0) {
      await Exports.rawCollection().drop();
    }
  }
});

Meteor.startup(() => {
    
});
