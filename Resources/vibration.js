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


function push_rotate(v, x, size) {
    /* Add element to fixed-size array. 
     * 
     * Arguments:
     *   v: Array
     *   x: item to add to Array
     *   size: int > 0, >= |v| of max array size
     * Modifies:
     *   v: adds `x` as first item, may remove last item
     * Returns:
     *   item removed from `v` or null
     * */
    var last;
    v.push(x);
    if (v.length > size) {
	last = v.shift();
    } else {
	last = null;
    }
    return last;
}

function std_deviation(v, last_item, last_sum, last_sum_sqs) {
    /* Return the standard deviation of an array of numbers.
     * 
     * Arguments:
     *   v: Array of num
     *   last: [optional] num of last item removed from v
     *   last_sum: [optional] num of the sum of v(n-1)
     *   last_sum_sqs: [optional] num of the sum of squares of v(n-1)
     * Returns:
     *   num of sample variance
     */
    var sum, sum_of_sqs, avg, sigma_sq, sigma;

    // compute or update sums
    if(last_item && last_sum && last_sum_sqs) {
	var new_item = v[v.length - 1];
	sum = last_sum - last_item + new_item;
	sum_sqs = last_sum_sqs - last_item^2 + new_item^2;
    } else {
	sum = v.reduce(function(a, b){return a + b;});
	sum_sqs = v.reduce(function(a, b){return a + b^2;});
    }

    avg = sum / v.length;
    sigma_sq = sum_sqs / v.length - avg^2;
    sigma = Math.sqrt(sigma_sq);
    return sigma;
}
