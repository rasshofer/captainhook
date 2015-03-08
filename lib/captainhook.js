#!/usr/bin/env node

/*
* Captain Hook
* https://github.com/rasshofer/captainhook
*
* Copyright (c) 2015 Thomas Rasshofer <hello@thomasrasshofer.com>
* Licensed under the MIT license.
* https://github.com/rasshofer/captainhook/blob/master/LICENSE
*/

'use strict';

var fs = require('fs');
var path = require('path');
var argv = require('yargs').argv;
var shell = require('shelljs');

module.exports = {

   start: function(dir, port) {

        dir = dir || argv.d || argv.dir || process.cwd();
        port = port || argv.p || argv.port || 8080;
        var app = require('sinodetra')(port);

        app.post('/(.+)', function(request, response, collection) {
            var file = path.join(dir, collection + '.json');
            if (fs.existsSync(file)) {
                var commands = JSON.parse(fs.readFileSync(file)) || [];
                console.log(collection);
                var cache = [];
                commands.forEach(function(command) {
                    cache.push(shell.exec(command, {
                        silent:true
                    }).output);
                });
               response.send(cache.join('\n'), 200, 'text/plain; charset=utf-8');
            } else {
                response.send('Invalid request.', 404, 'text/plain; charset=utf-8');
            }
        });

        app.error(function(request, response) {
            response.send('Invalid request.', 404, 'text/plain; charset=utf-8');
        });

        console.log('Listening on port ' + port + '.');
        console.log('Using `' + dir + '` for requested collections.');

    }

};
