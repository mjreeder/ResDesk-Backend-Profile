/**
 * Notification.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {

    _id:{
      type: 'string'
    },

    to: {
      type: 'string',
      required: true
    },

    title: {
      type: 'string',
      required: true
    },

    content: {
      type: 'string',
      required: true
    },

    read: {
      type: 'boolean',
      required: false,
      defaultsTo: false
    }
  }
};
