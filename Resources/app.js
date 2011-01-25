// note: Accelerometer does not work in simulator
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
    text:'v:',
    top:85,
    left:10,
    font:{fontSize:18},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(variance);
var mean = Titanium.UI.createLabel(
{
    text:'u:',
    top:115,
    left:10,
    font:{fontSize:18},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(mean);



// Accelerometer Event listener
// samples every 100ms
Ti.Accelerometer.addEventListener('update',function(e)
{
    var v;
    var sum = function(a,b){ return a+b; };
    ts.text = e.timestamp;
    Sampler.push(e.x, e.y, e.z);

    x.text = 'x: ' + e.x + ' => ' + Sampler.items[Sampler.items.length-1][0];
    y.text = 'y:' + e.y + ' => ' + Sampler.items[Sampler.items.length-1][1];
    z.text = 'z:' + e.z + ' => ' + Sampler.items[Sampler.items.length-1][2];

    v = Sampler.std_dev.reduce(sum, 0);
    v = Math.round(v*10)/10;
    variance.text = 'v:' + v;
    mean.text = 'mx:' + Math.round(Sampler.mean[0]) + 
	' my:' + Math.round(Sampler.mean[1]) +
	' mz:' + Math.round(Sampler.mean[2]);
});


win.open();
