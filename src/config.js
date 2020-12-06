/*
 * Zitui Application configuration
 *
 * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
 */

const currency_icons = require("./assets/currencies.json")

module.exports = {
  // Backend URL to get/set data
  BACKEND_URL : "http://localhost:3000",
  //BACKEND_URL : "https://api.zerptracker.com",

  // Network to connect to.
  // Supported: xrp_mainnet, xlm_mainnet
  NETWORK : 'xlm_mainnet',

  // Ripple Websocket URI
  RIPPLE_WS : "wss://s2.ripple.com:443",

  // Enable to disable site functionaily,
  // display maintenance page
  MAINTENANCE_MODE : false,

  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // From the XRP Protocol
  DROPS_PER_XRP : 1000000,

  // List of currency icons
  currency_icons : currency_icons,

  // Return bool indicating if we have currency icon
  have_currency_icon : function(c){
    return currency_icons.includes(c);
  },

  // Categories TXs fall in to
  TX_CATEGORIES : [
    'ALL',
    'PAYMENTS',
    'OFFERS',
    'TRUST LINES',
    'ACCOUNT SETS',
    'ESCROWS',
    'PAYMENT CHANNELS'
  ],

  // After this index categories are
  // displayed in a consise manner
  SECONDARY_TX_CATEGORIES_INDEX : 4,

  // General TX category for each ledger type
  tx_category_for_type : function(t){
    switch(t){
      case "Payment":
        return "PAYMENTS";
  
      case "OfferCreate":
      case "OfferCancel":
        return "OFFERS";

      case "TrustSet":
        return "TRUST LINES";

      case "AccountSet":
      case "AccountDelete":
      case "SignerListSet":
        return "ACCOUNT SETS";
  
      case "EscrowCreate":
      case "EscrowFinish":
      case "EscrowCancel":
        return "ESCROWS";
  
      case "PaymentChannelCreate":
      case "PaymentChannelClaim":
      case "PaymentChannelFund":
        return "PAYMENT CHANNELS";
  
      default:
        return null;
    }
  }
}
