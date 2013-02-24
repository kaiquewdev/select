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
            );

            assert.equal(
                quote.context.toString('utf-8'),
                content
            );
        });

        test('context error if not have argument', function () {
            assert.throws(
                conscience,
                Error
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
                quote = conscience( 
                    example, true 
                ); 

            assert.deepEqual(
                quote.tokenize(),
                example.split( reSeparator )
            );

            assert.equal(
                quote.tokenize().length,
                example.split( reSeparator ).length
            );
        });

        test('tokenize with file', function () {
            var path = [
                __dirname, '/case/quote1.txt'
            ].join(''),
            reSeparator = /[\s]/,
            content = fs.readFileSync( 
                path, 'utf-8' 
            ),
            quote = conscience( path );    

            assert.deepEqual(
                quote.tokenize(),
                content.split( reSeparator )
            );
        });
    });    
});
