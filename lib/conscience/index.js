// Conscience
(function () {
    'use strict';    
    var fs = require('fs'),
        conscience;

    conscience = function (
        origin, flag
    ) {
        var self = {};

        if ( !arguments.length ) {
            throw new Error(
                'Conscience expect 2 arguments'
            );
        }

        if ( flag === undefined || !flag ) {
            self.context = fs.readFileSync( 
                origin 
            );
        } else if ( flag ) {
            self.context = origin;    
        }

        self.tokenize = function ( separator ) {
            var out,
                separator = separator || /[\s]/,
                context = self.context.toString('utf-8');

            if ( context ) {
                out = context.split(
                    separator
                );
            } else {
                throw new Error('Context not defined');    
            }
            
            return out;
        };

        return self;
    };

    module.exports = conscience;
}).call( this );
