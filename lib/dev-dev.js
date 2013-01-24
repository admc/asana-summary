var asana = require('asana-api')
  , _ = require('underscore')
  , colors = require('colors');

require('date-utils');


var client = asana.createClient({
  apiKey: 'bw6zkYC.excHWRlwte16XuDdnmQsYIf9'
});

var today = new Date(Date.now());
var lastFriday = new Date();
lastFriday.setDate(new Date(Date.now()).getDate()-7);

var header = "Development Summary, from " + lastFriday.toYMD() + " to " + today.toYMD() + ".\n";
console.log(header.green);

//Iterate workspaces to find "Sauce Engineering"
client.workspaces.list(function (err, workspaces) {
  _.each(workspaces, function(v, k, l) {
    //Iterate all the devs
    client.users.list(function (err, users) {
      _.each(users, function(uv, uk, ul) {
        //Iterate all their tasks
        client.workspaces.tasks({
          workspace: v.id
          , assignee: uv.id
        }, function(err, tasks) {
          _.each(tasks, function(tv, tk, tl) {
            //Get the task details
            client.tasks.get(tv.id, function(err, task) {
              if (task != undefined) {
                if (!task.parent) {
                  // If it was marked completed in the last week, display it
                  var completed = new Date(task.completed_at);
                  if (completed.isAfter(lastFriday)) {
                    console.log(completed.toYMD().toString().underline.cyan,": "+ task.name);
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
