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
            var out = [],
                separator = separator || /[\s]/,
                context = self.context.toString('utf-8');

            if ( context ) {
                var words = context.split(
                    separator
                ), c = words.length, word;

                while ( c-- && ( word = words[c] ) ) {
                    if ( word ) {
                        out.push( word );    
                    }
                }
            }
            
            return out;
        };

        return self;
    };

    module.exports = conscience;
}).call( this );
