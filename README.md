# asana-summary

## Update node to latest

http://nodejs.org/#download

## Install

<pre>
npm install asana-summary
</pre>

## Authors

  - Adam Christian ([admc](http://github.com/admc))

## License

  * License - Apache 2: http://www.apache.org/licenses/LICENSE-2.0

## Usage
<pre>
> export asanaKey='asana key goes here'
</pre>

<pre>
var summary = require("asana-summary")()
  , colors = require("colors")
  ;

summary.on('header', function(line) {
  console.log(line.green);
});

summary.on('bullet', function(date, task) {
  console.log(date.underline.cyan, task);
});

summary.on('workspace', function(line) {
  console.log(line);
});

summary.on('user', function(line) {
  console.log(line);
});

summary.on('task', function(line) {
  console.log(line);
});

summary.go();
</pre>


