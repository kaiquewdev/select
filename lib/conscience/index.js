// Conscience
(function () {
    'use strict';    
    var fs = require('fs');

    var Conscience = function (
        origin, flag
    ) {
        var self = this;

        self.context = (
            ( flag ) ? 
            origin : 
            fs.readFileSync( origin, 'utf-8' )
        ).replace(/\n/gi, ''); 

        self.tokenize = function ( separator ) {
            var out = [],
                separator = separator || ' ',
                context = self.context,
                words = context.split(
                    separator
                ), c = words.length, word;

            while ( c-- && ( word = words[c] ) ) {
                if ( word ) {
                    out.push( word );    
                }
            }
            
            return out;
        };

        self.frequency = function () {
            var out = {},
                tokens = self.tokenize(),
                c = tokens.length, token;

            while ( c-- && ( token = tokens[c] ) ) {
                if ( !( token in out ) ) {
                    out[ token ] = 1;
                } else {
                    out[ token ] += 1;    
                } 
            }

            return out;
        };

        self.findFrequency = function ( hint ) {
            var out = function () {},
                frequencyObj = {},
                frequency = self.frequency();

            for ( var key in frequency ) {
                if ( key.search(hint, 'i') > -1 )
                    frequencyObj[ key ] = frequency[ key ];
            }

            out.prototype.count = function () {
                var o = 0;

                for ( var key in frequencyObj ) {
                    o += frequencyObj[ key ];    
                }

                return o;
            };

            out.prototype.frequency = frequencyObj;
            
            return new out;
        };

        return self;
    };

    module.exports = function ( origin, flag ) { 
        return new Conscience( origin, flag );
    };
}).call( this );
