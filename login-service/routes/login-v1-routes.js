/**
 * @name login-v1-api
 * @description This module packages the Login API.
 */
'use strict';

const hydraExpress = require('hydra-express');
const hydra = hydraExpress.getHydra();
const express = hydraExpress.getExpress();
const ServerResponse = require('fwsp-server-response');
var helper = require('../scripts/helper.js');
let serverResponse = new ServerResponse();
serverResponse.enableCORS(true);
express.response.sendError = function (err) {
  serverResponse.sendServerError(this, { result: { error: err } });
};
express.response.sendOk = function (result) {
  serverResponse.sendOk(this, { result });
};

let api = express.Router();

api.post('/user-login', (req, res) => {
  helper.makeServiceCall(hydra, "user-data-service:[post]/v1/user-data/", req.body, false).then((servRes)=>{

    let curUserCred = servRes
    
    if (curUserCred && curUserCred.pwd == req.body.pwd) {
      res.sendOk({ msg: "User authorized", serviceId: hydra.getInstanceID(),  token : Math.random().toString(20)});
    }
    else {
      res.sendError({ errMsg: "This is unknown user " })
    }
  })
});

module.exports = api;
