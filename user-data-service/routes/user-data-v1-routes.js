/**
 * @name user-data-v1-api
 * @description This module packages the User-data API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');

let serverResponse = new ServerResponse();
serverResponse.enableCORS(true); express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();

api.post('/', (req, res) => {
  let cachedUsersList = {
    "bhushan": {
      pwd: "bhushan",
      mobile: "1234567890"
    },
    "prasad": {
      pwd: "prasad",
      mobile: "1234567890"
    }
  }

  if (!req.body.userId){
    res.sendError({errMsg : "No userId is provided"})
    return;
  }
  if (cachedUsersList[req.body.userId]) {

    res.sendOk(cachedUsersList[req.body.userId]);
  } else {
    res.sendError({ errMsg: "No user found with id " + req.body.userId })
  }
});

module.exports = api;
