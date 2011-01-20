Ti.include("vibration.js");


// Window
Titanium.UI.setBackgroundColor('#000');
var win = Titanium.UI.createWindow(
{  
    title:'Root Window',
    backgroundColor:'#fff',
    exitOnClose: true
});

// Labels
var x = Titanium.UI.createLabel(
{
    text:'x:',
    top:10,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(x);

var y = Titanium.UI.createLabel(
{
    text:'y:',
    top:30,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(y);

var z = Titanium.UI.createLabel(
{
    text:'z:',
    top:50,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(z);

var ts = Titanium.UI.createLabel(
{
    text:'timestamp:',
    top:70,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(ts);

var variance = Titanium.UI.createLabel(
{
    text:'deviation:',
    top:85,
    left:10,
    font:{fontSize:18},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(variance);

var is_vibrating_label = Titanium.UI.createLabel(
{
    text:'is_vibrating: ',
    top:105,
    left:10,
    font:{fontSize:18},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(is_vibrating_label);

// if avg variance is <, assume not vibrating, 
// else assume vibration
var VIBRATION_THRESHOLD = 0.00009;
var is_vibrating = false;


Ti.App.addEventListener('stop_vibration', function(e) 
{
    is_vibrating = false;
    is_vibrating_label.text = "is_vibrating: " + is_vibrating;
});

Ti.App.addEventListener('start_vibration', function(e) 
{
    is_vibrating = true;
    is_vibrating_label.text = "is_vibrating: " + is_vibrating;
});


// Accelerometer Event listener
// samples every 100ms
Ti.Accelerometer.addEventListener('update',function(e)
{
    var v;
    ts.text = e.timestamp;
    x.text = 'x: ' + e.x;
    y.text = 'y:' + e.y;
    z.text = 'z:' + e.z;

    Sampler.push(e.x, e.y, e.z);
    v = Sampler.variance();
    variance.text = 'v:' + v;

    // vibration handler test
    if (!is_vibrating && v > VIBRATION_THRESHOLD) {
	Ti.App.fireEvent('start_vibration', {v:v});
    } else if (is_vibrating && v <= VIBRATION_THRESHOLD) {
	Ti.App.fireEvent('stop_vibration', {v:v});
    }
    
});

// note: Accelerometer does not work in simulator

win.open();
