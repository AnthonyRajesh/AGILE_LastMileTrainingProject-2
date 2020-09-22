const { authenticate } = require('@feathersjs/authentication').hooks;

const {
  hashPassword, protect
} = require('@feathersjs/authentication-local').hooks;


const createdAt = async context => {
  context.data.createdAt = new Date();
  
  return context;
};
const updatedAt = async context => {
  context.data.updatedAt = new Date();
  
  return context;
};
module.exports = {
  before: {
    all: [],
    find: [],
    get: [],
    create: [hashPassword('password'),createdAt],
  update: [ hashPassword('password'),updatedAt],
    patch: [ hashPassword('password') ],
    remove: [ ]
  },

  after: {
    all: [ 
      // Make sure the password field is never sent to the client
      // Always must be the last hook
      protect('password')
    ],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  },

  error: {
    all: [],
    find: [],
    get: [],
    create: [],
    update: [],
    patch: [],
    remove: []
  }
};
