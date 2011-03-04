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
var version = Titanium.UI.createLabel(
{
    text:'version: 0.894',
    top:240,
    font:{fontSize:12},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(version);
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
    font:{fontSize:14},
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
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(mean);
var units = Titanium.UI.createLabel(
{
    text:'Units in mm/s^2',
    top:130,
    left:10,
    font:{fontSize:14},
    color:'#555',
    width:300,
    height:'auto'
});
win.add(mean);
var scale_div = Titanium.UI.createLabel(
{
    text:'20',
    top:180,
    font:{fontSize:48},
    color:'#000',
    height:'auto',
    textAlign:'center'
});
win.add(scale_div);


// Accelerometer Event listener
// samples every 100ms
Ti.App.addEventListener('vibration_update', function(e) 
{
    var v, display;
    
    v = e.vibration;
    variance.text = 'v:' + v + " mm/s^2";

    display = v.toFixed(1);
    scale_div.text = display;

});

Ti.App.fireEvent('vibration_update', {vibration: 5});

Vibration.start();


win.open();
