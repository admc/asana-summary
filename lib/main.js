"use strict";
var asana = require('asana-api')
  , _ = require('underscore')
  , util = require('util')
  , events = require('events')
  ;

require('date-utils');

var Summary = function(key) {
  events.EventEmitter.call(this);

  if (!key) {
    var key = process.env.asanaKey;
  }
  this.client = asana.createClient({
    apiKey: 'bw6zkYC.excHWRlwte16XuDdnmQsYIf9'
  });
  this.today = new Date(Date.now());
  this.lastFriday = new Date();
  this.lastFriday.setDate(new Date(Date.now()).getDate()-7);
};

util.inherits(Summary, events.EventEmitter);


Summary.prototype.go = function() {
  var _this = this;

  _this.emit('header', "Development Summary, from " + _this.lastFriday.toYMD() + " to " + _this.today.toYMD() + ".\n");

  //Iterate workspaces to find "Sauce Engineering"
  _this.client.workspaces.list(function (err, workspaces) {
    _.each(workspaces, function(v, k, l) {
      _this.emit("workspace", v.name);
      //Iterate all the devs
      _this.client.users.list(function (err, users) {
        _.each(users, function(uv, uk, ul) {
          _this.emit("user", uv.name);
          //Iterate all their tasks
          _this.client.workspaces.tasks({
            workspace: v.id
            , assignee: uv.id
          }, function(err, tasks) {
            _.each(tasks, function(tv, tk, tl) {
              _this.emit("task", tv.name);
              //Get the task details
              _this.client.tasks.get(tv.id, function(err, task) {
                if (task != undefined) {
                  //no sub-tasks
                  if (!task.parent) {
                    // If it was marked completed in the last week, display it
                    var completed = new Date(task.completed_at);
                    if (completed.isAfter(_this.lastFriday)) {
                      _this.emit("bullet", completed.toYMD().toString()+":", task.name);
                    }
                  }
                }
              });
            });
          })
        });
      });
    });
  });
};

// Setup all the command line argument parsing
module.exports = function(key) {
  return new Summary(key);
}
