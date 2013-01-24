#!/usr/bin/env node
"use strict";

var net = require('net')
  , repl = require('repl')
  , underscore = require('underscore')
  , colors = require('colors')
  , summary  = require('asana-summary')()
  ;

var startRepl = function() {
  var help = function() {
    console.log("\nWelcome to Asana Summary".cyan);
    return 'Thanks for asking';
  };

  help();

  var r = repl.start('(ass): ');
  r.context.summary= summary;
  r.context.help = help;

  var connections = 0;
  var server = net.createServer(function (socket) {
    connections += 1;
    socket.setTimeout(5*60*1000, function() {
      socket.destroy();
    });
    repl.start("(ass): ", socket);
  }).listen(process.platform === "win32" ? "\\\\.\\pipe\\node-repl-sock-" + process.pid : "/tmp/node-repl-sock-" + process.pid);

  r.on('exit', function () {
    server.close();
    process.exit();
  });
};

if (process.argv[2] === "shell") {
  startRepl();
}
else {
  summary.on('header', function(line) {
    console.log(line.green);
  });

  summary.on('bullet', function(date, task) {
    console.log(date.underline.cyan, task);
  });
  summary.go(process.argv[2]);
}
