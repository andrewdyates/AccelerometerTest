// Javascript : Appcelerator Titanium
// -*- coding: utf-8 -*-
// Copyright © 2011 Andrew D. Yates
// All Rights Reserved

/* Vibration.js: Detect iPhone and Android vibrations with Appcelerator.
 * 
 * andrewyates.name@gmail.com
 * https://github.com/andrewdyates
 */

Sampler = {
    /* Model Accelerometer samples.
     * 
     * Attributes:
     *   UNIT_SCALE: CONST num of input scale, 
     *   MAX_SIZE: CONST int >0 of maximum samples saved
     *   items: [[int, int, int],] of (x,y,z) saved samples
     *   timestamps: [int] of saved sample timestamps
     *   mean: [int, int, int] of (x,y,z) means
     *   std_dev: [int, int, int] of (x,y,z) standard deviations
     */

    // units m/s^2, measured for iPhone 3GS (Andrew's model)
    UNIT_SCALE: 0.0181121826171875,
    MAX_SIZE: 15,

    items: [],
    timestamps: [],

    mean: [null, null, null],
    std_dev: [null, null, null],

    clear: function() {
	/* Clear all sample values. 
	 * */
	this.items = [];
	this.timestamps = [];
	this.mean = [null, null, null];
	this.std_dev = [null, null, null];
    },

    sum_std_dev: function() {
	/* Return error-corrected average standard deviation.
	 * 
	 * Returns: 
	 *   num: average standard deviation filtering for errors.
	 */
	var k, sum=0;	
	for (k=0;k<=2;k++) {
	    // std_dev <=0.5 is zero
	    if (this.std_dev[k] >= 0.5) {
		sum += this.std_dev[k];
	    }
	}
	return sum;
    },

    lg: function() {
	return Math.log(this.sum_std_dev());
    },

    push: function(x, y, z, t) {
	/* Save scaled sample on this.items.
	 * 
	 * Each call updates computed values and resizes this.items.
	 * 
	 * Args:
	 *   x: num of x coordinate from accelerometer reading
	 *   y: num of y coordinate from accelerometer reading
	 *   z: num of z coordinate from accelerometer reading
	 *   t: int of timestamp from accelerometer reading
	 */
	var sample = [x, y, z];
	sample = sample.map(this._scale);
	this.items.push(sample);
	this.timestamps.push(t);
	if (this.items.length > this.MAX_SIZE) {
	    this.items.shift();
	    this.timestamps.shift();
	}
	this._update();
    },

    _scale: function(x) {
	return Math.round(x / Sampler.UNIT_SCALE);
    },

    _update: function() {
	/* Update computed values: mean, std_dev.
	 *  */
	var sums = [0, 0, 0];
	var sum_sqs = [0, 0, 0];
	var n;
	var i, k;
	var variance_k;
	var scale_n = function(x) { return x/n; };
	var square = function(x) { return Math.pow(x, 2); };

	n = this.items.length;
	// edge case if no samples: exit, do not update
	if(n == 0) {
	    return null;
	}
	
	// Compute sums
	for (i=0; i<n; i++) {
	    for (k=0; k<=2; k++) {
		sums[k] += this.items[i][k];
		sum_sqs[k] += square(this.items[i][k]);
	    }
	}

	// Compute means
	this.mean = sums.map(scale_n);

	// Compute standard deviations
	for (k=0; k<=2; k++) {
	    variance_k = (sum_sqs[k] - n * square(this.mean[k], 2)) / n;
	    this.std_dev[k] = Math.sqrt(variance_k);
	}

	return true;
    }
};
