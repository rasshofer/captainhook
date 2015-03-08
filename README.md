# Captain Hook

> Generic webhook endpoint written in JavaScript running pre-defined scripts based on the called URLs

## Installation

	npm install -g captainhook

## Usage

### Create the central collection directory

`captainhook` uses a central directory containing all pre-defined script collections. Each collection you create in this directory will be executed when the corresponding endpoint is called. Thus, if you have a collection named `simple-example.json`, you would trigger it by calling `http://example.com:8080/simple-example` via `POST`.

```sh
mkdir ~/hooks
```

### Add a collection of scripts to be executed

Let’s assume the following file is called `simple-example.json`. The scripts in this JSON file are executed sequentially and the output is displayed to the caller within the response body. Thus, the response always has an HTTP status code of `200`—even if a script failed.

```json
[
	"whoami",
	"uptime"
]
```

### Start the service

```shell
captainhook -p 8080 -d ~/hooks
```

```shell
captainhook --port 8080 --dir ~/hooks
```

### Test using cURL

```
curl -X POST http://example.com:8080/simple-example
```

## Real world example

Assuming you want to deploy your application each time you push changes in Git, this simple example shows you how to solve that task and may be called from within a `post-receive` hook on your Git remote or simply by using stuff like [Webhooks](https://developer.github.com/webhooks/) if you’re using GitHub.

```json
[
	"cd /var/apps/example-app",
	"git pull origin master",
	"npm install",
	"forever restartall"
]
```

## Changelog

* 0.0.1
	* Initial version

## TODO

- Documentation
- Tests

## License

Copyright (c) 2015 [Thomas Rasshofer](http://thomasrasshofer.com/)  
Licensed under the MIT license.

See LICENSE for more info.
