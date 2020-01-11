import Vue from 'vue';
import util from './util';

// Deliminate the value
Vue.filter('delim', function(value) {
  return util.delim_value(value);
});

// Round the decimal to the given place
Vue.filter('round', function(value, decimals) {
  return util.round_value(value, decimals);
});

// Return string as is if < length, else truncate and add ellipsis
Vue.filter("ellipsis", function(value, length){
  if(!length || value.length <= length)
    return value;

  return value.substr(0, length) + "...";
})
