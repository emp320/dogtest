/* eslint-disable no-use-before-define */

import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const maxhealth = 100;
const feedVal = 10;
const schema = new Schema({
  name: { type: String,
        required: true,
        minlength: 3,
        validate: { validator: duplicateDogNameValidator } },
  age: { type: Number },
  health: { type: Number, min: 0, max: maxhealth },
  toy: { type: String, enum: ['Bones', 'Ball'] },
  dateCreated: { type: Date, default: Date.now },
});

schema.methods.feed = function () {

  this.health = ((this.health + feedVal) > maxhealth) ?
      this.health = maxhealth : this.health += feedVal;

  // this.save((err, dog) => {
  //   cb(dog.health);
  // });
};

function duplicateDogNameValidator(name, cb) {
  this.model('Dog').find({ name }, (err, dogs) => {
    cb(!dogs.length);
  });
}

module.exports = mongoose.model('Dog', schema);
