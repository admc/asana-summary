# asana-summary

  * Get a summary of the tasks that were marked completed in the last week in your asana projects

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

## Just run it
<pre>
> sudo npm install asana-summary -g
> source your bin (> source ~/.zshrc for example, or open a new tab)
> asana-summary
</pre>

## Make the scripts
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


