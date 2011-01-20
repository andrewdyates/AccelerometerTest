// Javascript : Appcelerator Titanium
// -*- coding: utf-8 -*-
// Copyright © 2011 Andrew D. Yates
// All Rights Reserved

/* Vibration.js: Detect iPhone and Android vibrations with Appcelerator.
 * 
 * andrewyates.name@gmail.com
 * https://github.com/andrewdyates
 */

var DFT_SAMPLE_SIZE = 20;


Sampler = {
    size: DFT_SAMPLE_SIZE,
    // sample vector
    items: [],
    // cache
    cache: {
	item: null,
	sums: null,
	sum_sqs: null
    },
    // flag "use cache" for variance computation
    // can only push one item per computation before cache is expired
    
    push: function(x, y, z) {
	this.items.push([x,y,z]);
	if (this.items.length > this.size) {
	    this.cache.item = this.items.shift();
	}
	// track status of cache
    },

    variance: function() {
	var sums = [0, 0, 0];
	var sum_sqs = [0, 0, 0];
	var sum_var = 0;
	var avg_var, avg;
	var n;
	var i, k;

	n = this.items.length;
	// edge case if no samples
	if(n == 0) {
	    return 0.0;
	}
	
	// compute sums if the cache is incomplete
	if (!(this.cache.item && this.cache.sums && this.cache.sum_sqs)) {
	    for (i=0; i<n; i++) {
		for (k=0; k<=2; k++) {
		    sums[k] += this.items[i][k];
		    sum_sqs[k] += Math.pow(this.items[i][k], 2);
		}
	    }
	// update sums from cache values otherwise
	} else {
	    for (k=0; k<=2; k++) {
		sums[k] = this.cache.sums[k] - 
		    this.cache.item[k] + this.items[n-1][k];
		sum_sqs[k] = this.cache.sum_sqs[k] - 
		    Math.pow(this.cache.item[k], 2) + 
		    Math.pow(this.items[n-1][k], 2);
	    }
	}

	// update cache
	this.cache.sums = sums.slice();
	this.cache.sum_sqs = sum_sqs.slice();
	this.cache.item = this.items[n-1].slice();

	// compute sum of variance
	for (k=0; k<=2; k++) {
	    avg = sums[k] / n;
	    // fix for div by zero
	    sum_var += (sum_sqs[k] - n * Math.pow(avg, 2)) / n; 
	}

	// return average deviation over three dimensions
	avg_var = sum_var / 3;
	return avg_var;
    }
};
