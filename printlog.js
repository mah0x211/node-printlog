/*
 *  printlog.js
 *
 *  Created by Masatoshi Teruya on 13/05/20.
 *  Copyright 2013 Masatoshi Teruya. All rights reserved.
 *
 */
"use strict";
var util = require('util'),
    cc = require('cli-color'),
    // constants
    IGNORE_INSPECT = {
        'string': true,
        'number': true
    };

function isFormat( arg )
{
    return ( arg && ( typeof arg === 'string' || arg.constructor === String ) &&
             arg.match( /[^\\]%/ ) );
}

function toStr( args )
{
    return args.map(function(item){
        return IGNORE_INSPECT[(typeof item)] ? item : util.inspect(item);
    });
}

function format( args )
{
    args = toStr( Array.prototype.slice.call( arguments ) );
    return util.format.apply( util.format, args );
}

function log( msg )
{
    util.puts( format.apply( format, Array.prototype.slice.call( arguments ) ) );
}

function colorLog( color, args )
{
    if( isFormat( args[0] ) ){
        args[0] = color( args[0] );
        util.puts( format.apply( format, args ) );
    }
    else {
        util.puts( color( format.apply( format, args ) ) );
    }
}

function warn( args ){
    args = Array.prototype.slice.call( arguments );
    colorLog( cc.yellow, args );
}

function error( args ){
    args = Array.prototype.slice.call( arguments );
    colorLog( cc.redBright, args );
}

function info( args ){
    args = Array.prototype.slice.call( arguments );
    colorLog( cc.green, args );
}

cc.format = format;
cc.log = log;
cc.info = info;
cc.warn = warn;
cc.error = error;

module.exports = cc;

