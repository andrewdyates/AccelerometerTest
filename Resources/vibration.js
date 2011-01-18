// Javascript : Appcelerator Titanium
// -*- coding: utf-8 -*-
// Copyright © 2010 Andrew D. Yates
// All Rights Reserved

/* Vibration.js: Detect iPhone and Android vibrations with Appcelerator.
 * 
 * andrewyates.name@gmail.com
 * https://github.com/andrewdyates
 */

var DFT_SAMPLE_SIZE = 20;

function Sampler(size) {
    /* Fixed-size circular numeric array for collecting data samples.
     * 
     * Arguments:
     *   size: int > 0 of number of samples to store. Default: DFT_SAMPLE_SIZE
     * 
     * Properties:
     *   last_pushed: numeric of most recently added sample, or null
     *   last_shifted: numeric of most recently removed sample, or null
     *   samples: array[numeric] of samples of length <= `size`
     *   get_size: return int > 0 of this Sampler's maximum size
     *   is_populated return bool if Sampler is populated with > `size` samples
     */
    if(!size) { size = DFT_SAMPLE_SIZE; } 

    this.last_pushed = null;
    this.last_shifted = null;
    this.samples = [];

    this.get_size = function() { return size; };
    this.is_populated = function() {
	return this.last_pushed && this.last_shifted; 
    };

    this.push = function(x) {
	/* Add numeric sample to Sampler.
	 * 
	 * Arguments:
	 *   x: numeric value to add to Sampler
	 * Returns:
	 *   numeric value shifted off Sampler or null.
	 */
	this.last_pushed = x;
	samples.push(x);
	if (samples.length > size) {
	    this.last_shifted = samples.shift();
	}
	return this.last_shifted;
    };
}

function variance(v) {
    var sum, sum_of_sqs, avg;
    sum = v.reduce(function(a, b){return a + b;}, 0);
    sum_of_sqs = v.reduce(function(a, b){return a + b*b;}, 0);
    avg = sum / v.size;
    return sum_of_sqs / v.size - avg*avg;;
}

function sum(v, prev_sum, less_x, plus_x) {
    /* Sum a vector. Compute using previous values if available. 
     * 
     * Arguments:
     *   v: Array of num; any NaN, null, or undefined members assumed == 0
     *   prev_sum: [optional] num of previously computed sum
     *   less_x: [optional] num of member to subtract from prev_sum
     *   plus_x: [optional] num of member to add to prev_sum
     * 
     * Returns:
     *   num of sum of v
     * */
    if (prev_sum && less_x && plus_x) {
	return prev_sum - less_x + plus_x;
    } else {
	return v.reduce(function(a, b){return a + b;}, 0);
    }
}

function square(x){return x * x;}

function squares(v){return v.map(square);}

function variance(v, last_sum, last_sum_sqs) {
    
}