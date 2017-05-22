/**
 * NotificationController
 *
 * @description ::
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
'use strict';
var util = require('util');
var responseFormatter = require('../../helpers/format-response.js');
var notification = require('../services/NotificationService.js');

module.exports = {

  createNotification: createNotification,
  getNotificationsForUser: getNotificationsForUser,
  getNotificationForID: getNotificationForID,
  markAllNotificationsRead: markAllNotificationsRead,
  markNotificationRead: markNotificationRead

};

function createNotification(req, res){

    var auth = JWT.verifyToken(req.swagger.params.Authorization, function(response) {

      if(!response.error){

        notification.createNotification(req, function (response) {
          res.status(response.status).json(response);
        });

      }else{
        res.status(response.status).json(response);
      }

    });
}

function getNotificationsForUser(req, res){

    var auth = JWT.verifyToken(req.swagger.params.Authorization, function(response) {

      if(!response.error){

        var bsuid = response.data.body.sub || "";
        var read = req.swagger.params.read.value || "";

        notification.getNotificationsForUser(bsuid, read, function (response) {
          res.status(response.status).json(response);
        });

      }else{
        res.status(response.status).json(response);
      }

    });
}

function getNotificationForID(req, res){

    var auth = JWT.verifyToken(req.swagger.params.Authorization, function(response) {

      if(!response.error){

        var id = req.swagger.params.id.value || "";

        notification.getNotificationForID(id, function (response) {
          res.status(response.status).json(response);
        });

      }else{
        res.status(response.status).json(response);
      }

    });
}

function markAllNotificationsRead(req, res){

  var auth = JWT.verifyToken(req.swagger.params.Authorization, function(response) {

    if(!response.error){

      var bsuid = response.data.body.sub || "";
      var read = req.swagger.params.read.value || false;

      notification.markAllNotificationsRead(bsuid, read, req, function(response){
        res.status(response.status).json(response);
      });

    }else{
      res.status(response.status).json(response);
    }

  });
}

function markNotificationRead(req, res){

  var auth = JWT.verifyToken(req.swagger.params.Authorization, function(response) {

    if(!response.error){

      var id = req.swagger.params.id.value || "";
      var read = req.swagger.params.read.value || false;

      notification.markNotificationRead(id, read, req, function(response){
        res.status(response.status).json(response);
      });

    }else{
      res.status(response.status).json(response);
    }

  });
}
