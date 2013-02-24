var assert = require('assert'),
    fs = require('fs'),
    conscience = require('./index');

suite('Conscience', function () {
    suite('Context', function () {
        var path = [
                __dirname,
                '/case/quote1.txt'
            ].join(''),
            quote = conscience(
                path
            );

        test('attribute context', function () {
            var content = fs.readFileSync(
                path, 'utf-8'
            ).replace('\n', '', 'gi');

            assert.equal(
                quote.context,
                content
            );
        });

        test('setting string not path', function () {
            var example = 'My simple quote!',
                quote = conscience( example, true );

            assert.equal(
                quote.context,
                example
            );
        });

        test('tokenize', function () {
            var example = 'My simple quote!',
                reSeparator = /[\s]/,
                quoteArray = example.split(
                    reSeparator 
                ),
                c = quoteArray.length, word,
                comparison = [],
                quote = conscience( 
                    example, true 
                ); 

            while ( c-- && ( word = quoteArray[c] ) ) {
                comparison.push( word );
            }

            assert.deepEqual(
                quote.tokenize(),
                comparison 
            );

            assert.equal(
                quote.tokenize().length,
                comparison.length
            );
        });

        test('tokenize with file', function () {
            var path = [
                __dirname, '/case/quote1.txt'
            ].join(''),
            reSeparator = /[\s]/,
            content = fs.readFileSync( 
                path, 'utf-8' 
            ).replace('\n', '', 'gi').split( reSeparator ),
            c = content.length, word,
            comparison = [],
            quote = conscience( path );    

            while ( c-- && ( word = content[c] ) ) {
                if ( word ) {
                    comparison.push( word );    
                }    
            }
            
            assert.deepEqual(
                quote.tokenize(),
                comparison 
            );
        });

        test('frequency of tokens', function () {
            var quote = 'My quote it\'s simple, just another quote',
                comparison = {
                    'My': 1,
                    'quote': 2,
                    'it\'s': 1,
                    'simple,': 1,
                    'just': 1,
                    'another': 1 
                },
                q = conscience( quote, true );

            for ( var key in comparison ) {
                var tokenF = comparison[ key ];

                assert.equal(
                    q.frequency()[ key ],
                    tokenF
                );
            }
        });

        test('frequency of tokens', function () {
            var quote = 'My quote it\'s simple, just another quote',
                comparison = {
                    'quote': 2,
                },
                q = conscience( quote, true );

            assert.deepEqual(
                q.findFrequency('quote').frequency,
                comparison
            );
        });

        test('frequency with regexp filter', function () {
            var quote = 'My quote it\'s simple, just another quote.',
                comparison = {
                    'quote.': 1,
                    'quote': 1
                },
                q = conscience( quote, true );

                assert.deepEqual(
                    q.findFrequency('quote').frequency,
                    comparison
                );
        });

        test('frequency counter', function () {
            var quote = 'My quote it\'s simple, just another quote.',
                comparison = {
                    'quote.': 1,
                    'quote': 1
                },
                q = conscience( quote, true );

                assert.equal(
                    q.findFrequency('quote').count(),
                    2
                );
        });
    });    
});
