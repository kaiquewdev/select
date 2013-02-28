// Memory
(function () {
    var memory = function () {
        var self = this;

        self.hippocampus = [];
        
        self.add = function ( o ) {
            self.hippocampus.push( o );

            return self;
        };

        self.find = function ( o ) {
            var out = [],
                h = self.hippocampus,
                m = h.length, cell;

            if ( o ) {
                while ( m-- && ( cell = h[ m ] ) ) {
                    var keys = Object.keys( cell );

                    for ( var k in o ) {
                        var i = keys.indexOf( k );

                        if ( 
                            i > -1 && 
                            cell[ keys[i] ] === o[ k ] 
                        ) {
                            out.push( cell );
                        }
                    }
                } 
            }

            self.result = out;
            
            self.count = function () {
                return self.result.length;    
            };

            return self;
        };

        return self;
    };    

    module.exports = memory;
}).call( this );
