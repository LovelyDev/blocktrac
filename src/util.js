export default {
  delim_value : function(value){
    var delim = parseFloat(value).toString().split(".");
    delim[0] = delim[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return delim.join(".");
  },

  round_value : function(value, decimals){
    if(!value) {
      value = 0;
    }

    if(decimals == 0)
      return parseInt(value);

    if(!decimals)
      decimals = Math.abs(value) < 0.0001 ? 10 : 5;

    value = Math.round(value * Math.pow(10, decimals)) / Math.pow(10, decimals);
    return value;
  },

  ledger_time_to_unix : function(t){
    return (t + 946684800)*1000;
  }
}
