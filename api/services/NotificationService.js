var responseFormatter = require('../../helpers/format-response.js');

module.exports = {

  createNotification: function(req, callback) {

    var notification = {
      title: req.param('title'),
      content: req.param('content'),
      read: req.param('read')
    };
    var toArray = req.param('to');

    var notifications = [];
    for (var i = 0; i < toArray.length; i++){
        notification['to'] = toArray[i];
        notifications.push(clone(notification));
    }

    Notification.create(notifications).exec(function(err, result) {
      if (err) {
        return callback(responseFormatter.fail("Failed to create notification", err, 500));
      } else {
        return callback(responseFormatter.success("Notification creation success", result, 200));
      }
    });

  },

  getNotificationForID: function(id, callback){

    var params = {
      id: id
    };

    Notification.find(params).exec(function(err, result) {
      if (err) {
        return callback(responseFormatter.fail("Failed to find notifications", err, 500));
      } else {
        return callback(responseFormatter.success("Notification for ID.", result, 200));
      }
    });
  },

  getNotificationsForUser: function(bsuid, read, callback) {

    if (read == "unread"){
      var params = {
        read: false,
        to: bsuid
      };
    }else if (read == "read"){
      var params = {
        read: true,
        to: bsuid
      };
    }

    Notification.find(params).exec(function(err, result) {
      if (err) {
        return callback(responseFormatter.fail("Failed to find notifications", err, 500));
      } else {
        return callback(responseFormatter.success("All notifications for user.", result, 200));
      }
    });
  },

  markAllNotificationsRead: function(bsuid, read, req, callback) {
    var updateItem = {
      read: read
    };

    Notification.update({
      to: bsuid
    }, updateItem).exec(function afterwards(err, result) {
      if (err) {
        return callback(responseFormatter.fail("Failed to update notifications", err, 500));
      } else {
        return callback(responseFormatter.success("Update notification success", result, 200));
      }
    });
  },

  markNotificationRead: function(id, read, req, callback) {
    var updateItem = {
      read: read
    };

    Notification.update({
      id: id
    }, updateItem).exec(function afterwards(err, result) {

      if (err) {
        return callback(responseFormatter.fail("Failed to update notification", err, 500));
      } else {
        return callback(responseFormatter.success("Update notification success", result, 200));
      }
    });
  },

}

function clone(obj) {
    if (null == obj || "object" != typeof obj) return obj;
    var copy = obj.constructor();
    for (var attr in obj) {
        if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
    }
    return copy;
}
