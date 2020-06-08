/*
 * Misc helper logic used throughout the application
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

var estraverse = require('estraverse')

const jsonpath = require('./vendor/jsonpath')
const aesprim  = require('./vendor/aesprim')

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

// XXX: Code and JSONPath safety methods copied from ziti util module (also is_jsonpath_unsafe below)

function why_code_unsafe(code){
  var ast;

  try{
    ast = aesprim.parse(code)
  }catch(err){
    return {invalid_code : true}
  }

  var reasons = {}
  estraverse.traverse(ast, {
      enter: function (node, parent) {
        if(node.type == 'FunctionExpression'      ||
           node.type == 'ArrowFunctionExpression' ||
           node.type == 'FunctionDeclaration')
          reasons.has_function = true

        else if(node.type == "DoWhileStatement" ||
                node.type == "ForStatement"     ||
                node.type == "ForInStatement"   ||
                node.type == "ForOfStatement"   ||
                node.type == "WhileStatement")
          reasons.has_loop = true

        else if(node.type == 'CallExpression'  &&
                node.callee.name != "parseInt" &&
                node.callee.name != "parseFloat")
          reasons.has_call = true
      }
  });

  return reasons
}

function why_jsonpath_unsafe (jp){
  const parsed = jsonpath.parse(jp)
  const expressions = parsed.filter(function(p){
    return p.expression.type == 'filter_expression' ||
           p.expression.type == 'script_expression'
  }).map(function(p){
    const begin = p.expression.type == 'filter_expression' ? 2 : 1
    return p.expression.value.slice(begin, -1)
  })

  var reasons = {}
  expressions.forEach(function(expression){
    Object.assign(reasons, why_code_unsafe(expression))
  })

  return reasons
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

  // Return bool if input is valid credit card number
  is_valid_credit_card_number : function(test){
    return /^[0-9]{14}[0-9]{0,2}$/.test(test);
  },

  // Return bool if input is valid credit card cvc
  is_valid_credit_card_cvc : function(test){
    return /^[0-9]{3}$/.test(test);
  },

  ///

  why_jsonpath_unsafe : function(jsonpath){
    return why_jsonpath_unsafe(jsonpath);
  },

  is_jsonpath_unsafe : function(jsonpath){
    return Object.keys(why_jsonpath_unsafe(jsonpath)).length > 0
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
