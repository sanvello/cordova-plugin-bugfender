#!/usr/bin/env node
var path = require("path");
var semver = require('semver');

module.exports = function (context) {
    var rootPath = context.opts.projectRoot;
    var configXmlPath = path.join(rootPath, 'config.xml');
    var configParser = getConfigParser(context, configXmlPath);
    var iosMinVersion = configParser.getPreference('deployment-target', 'ios') ||
        configParser.getPreference('deployment-target') ||
        '7.0';

    if (iosMinVersion.substring(0,iosMinVersion.indexOf('.')) < 8) {
        throw 'Deployment target version is required to be 8.0 at least. Detected version '+iosMinVersion+' instead.\n'+
              'Add something like this to your iOS target:\n'+
              '<preference name="deployment-target" value="8.0" />';
    }
}

function getConfigParser(context, config) {
	var ConfigParser = require('cordova-common').ConfigParser;
// 	if (semver.lt(context.opts.cordova.version, '5.4.0')) {
// 	    ConfigParser = require('cordova-lib').ConfigParser;
// 	} else {
// 	    ConfigParser = 
// 	}
	return new ConfigParser(config);
}
