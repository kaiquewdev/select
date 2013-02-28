var assert = require('assert'),
    memory = require('./index'),
    game = require('./case/game1');

suite('Memory', function () {
    suite('store', function () {
        var brain = new memory();

        test('add', function () {
            brain.add( game );    

            assert.equal(
                brain.hippocampus.length > 0,
                true
            );
        });

        test('find', function () {
            assert.equal(
                brain.find({
                    series: 'Metal Gear'
                }).count() > 0,
                true
            );
        });
    });    
});
