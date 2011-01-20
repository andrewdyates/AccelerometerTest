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
    top:90,
    left:10,
    font:{fontSize:18},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(variance);


// Accelerometer Event listener
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
});

// note: Accelerometer does not work in simulator

win.open();
