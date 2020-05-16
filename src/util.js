/*
 * Misc helper logic used throughout the application
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

const jsonpath = require('./vendor/jsonpath')

// 'Smart' rounding, rounds given float
// to specified number of decimals. If not
// specified, decimals will be inferred from
// precision
function round_value(value, decimals){
  if(!value) {
    value = 0;
  }

  if(decimals == 0)
    return parseInt(value);

  if(!decimals)
    decimals = Math.abs(value) < 0.0001 ? 10 : 5;

  value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
  return value;
}

export default {
  // Deminate value with commas
  delim_value : function(value){
    var delim = parseFloat(value).toString().split(".");
    delim[0] = delim[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return delim.join(".");
  },

  round_value : round_value,

  // Abbreviate number by rounding off excess digits and
  // appending a scale indicator.
  // T for Trillion
  // B for Billion
  // M for Million
  // K for Kilo (thousand)
  abbrev : function(value){
    if(value > 1000000000000)
      return round_value(value/1000000000000, 2) + "T"

    else if(value > 1000000000)
      return round_value(value/1000000000, 2) + "B"

    else if(value > 1000000)
      return round_value(value/1000000, 2) + "M"

    else if(value > 1000)
      return round_value(value/1000, 2) + "K"

    return round_value(value)
  },

  // Convert rippled time to unix time
  ledger_time_to_unix : function(t){
    return (t + 946684800)*1000;
  },

  // Convert hex integer value to ASCII text
  hex_to_ascii : function(hex){
    var hex = hex.toString();
    var str = '';
    for (var n = 0; n < hex.length; n += 2) {
      str += String.fromCharCode(parseInt(hex.substr(n, 2), 16));
    }
    return str;
  },

  // Capitalize and return string
  capitalize : function(string){
    return string[0].toUpperCase() + string.slice(1);
  },

  ///

  // XXX: validator methods copied from ziti util module

  // Return bool if input is valid jsonpath expression
  is_valid_jsonpath : function(jp){
    try{
      jsonpath.parse(jp);
      return true;

    }catch(err){
      return false;
    }
  },

  // Return bool if input is valid email
  is_valid_email : function(email){
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  },

  // Return bool if input is valid sms phone number
  is_valid_sms : function(test){
    return (/^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im).test(test);
  },

  // Return bool if input is valid url
  is_valid_url : function(test){
    return (/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi).test(test)
  },

  // Return bool if input is valid integer
  is_valid_integer : function(test){
    return Number(test) === test &&
                     test % 1 === 0
  },

  // Return bool if input is valid float
  is_valid_float : function(test){
    return Number(test) === test &&
                     test % 1 !== 0
  },

  // Return bool if input is valid string
  is_valid_string : function(test){
    return typeof test === 'string' ||
            test instanceof String
  },

  ///

  // Compile matcher from filter object. Returns jsonpath
  // expression or applies filter parameters to filter template.
  //
  // XXX: copied from ziti Filter#matcher and Template#apply_params
  filter_matcher : function(filter){
    if(filter.Template){
      if(filter.params.length != Object.keys(filter.Template.params).length)
        throw "params mismatch"

      var jp = filter.Template.jsonpath;
      for(var p = 0; p < filter.params.length; p++){
        jp = jp.replace(new RegExp("PARAM_" + (p+1), "g"), filter.params[p])
      }

      return jp
    }

    return filter.jsonpath;
  }
}
