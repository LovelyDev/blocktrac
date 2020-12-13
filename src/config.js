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
  //BACKEND_URL : "https://api.stracker.io",

  // Network to connect to.
  // Supported: xrp_mainnet, xlm_mainnet
  NETWORK : 'xlm_mainnet',

  // Network Endpoints
  NETWORK_URIS : {
    'xrp_mainnet' : "wss://s2.ripple.com:443",
    'xlm_mainnet' : "https://horizon.stellar.org"
  },

  // Network Identifier
  network_id : function(){
    return this.NETWORK.split("_")[0];
  },

  // Enable to disable site functionaily,
  // display maintenance page
  MAINTENANCE_MODE : false,

  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // From the XRP Protocol
  DROPS_PER_XRP : 1000000,

  // From the XLM Protocol
  STROOPS_PER_XLM : 10000000,

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
      case "Payment":                  // XRP
      case "payment":                  // XLM
      case "paymentPathStringSend":    // XLM
      case "paymentPathStringReceive": // XLM
        return "PAYMENTS";
  
      case "OfferCreate":              // XRP
      case "OfferCancel":              // XRP
      case "manageBuyOffer":           // XLM
      case "manageSellOffer":          // XLM
      case "createPassiveSellOffer":   // XLM
        return "OFFERS";

      case "TrustSet":                 // XRP
      case "changeTrust":              // XLM
      case "allowTrust":               // XLM
        return "TRUST LINES";

      case "AccountSet":               // XRP
      case "AccountDelete":            // XRP
      case "SignerListSet":            // XRP
      case "createAccount":            // XLM
      case "setOptions":               // XLM
      case "accountMerge":             // XLM
      case "manageData":               // XLM
      case "bumpSequence":             // XLM
        return "ACCOUNT SETS";
  
      case "EscrowCreate":             // XRP
      case "EscrowFinish":             // XRP
      case "EscrowCancel":             // XRP
        return "ESCROWS";
  
      case "PaymentChannelCreate":     // XRP
      case "PaymentChannelClaim":      // XRP
      case "PaymentChannelFund":       // XRP
        return "PAYMENT CHANNELS";
  
      default:
        return null;
    }
  }
}
