var summary = require("asana-summary")()
  , colors = require("colors")
  ;

summary.on('header', function(line) {
  console.log(line.green);
});

summary.on('bullet', function(date, task) {
  console.log(date.underline.cyan, task);
});

/*
summary.on('workspace', function(line) {
  console.log(line);
});

summary.on('user', function(line) {
  console.log(line);
});

summary.on('task', function(line) {
  console.log(line);
});
*/

summary.go();

