function w(s) {
    document.writeln(s);
}

function run_tests() {
    w('Running Tests...');
    test_push();
    test_scale();
    test_map();
}

function test_push() {
    w('Test Push');
    Sampler.push(1,1,1,0);
    w('Items');
    w(Sampler.items);
    w('Timestamps');
    w(Sampler.timestamps);    
}

function test_scale() {
    w('Test _scale');
    Sampler.clear();
    var a = Sampler._scale(Sampler.UNIT_SCALE);
    var b = Sampler._scale(0.8);
    w('a=1; a=' + a);
    w('b=' + b);
}

function test_map() {
    w('Test mapping');
    Sampler.clear();
    var sample = [1, 2, 0.4];
    w(sample);
    var mapped = sample.map(Sampler._scale);
    w(mapped );
}