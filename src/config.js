module.exports = {
  // Balance needed to be considered a premium account (in USD)
  MINUMUM_PREMIUM_BALANCE : 5,

  // Backend URL to get/set data
  // TODO: load from config and/or change to fr.0xr.pl in production
  BACKEND_URL : "http://localhost:3000",

  // Used for account links and similar
  XRP1NTEL_URL : "https://xrp1ntel.com",

  // Ripple Websocket URI
  RIPPLE_WS : "wss://s2.ripple.com:443",

  // Number of TXs to retain in history
  TX_HISTORY : 75,

  // From the XRP Protocol
  DROPS_PER_XRP : 1000000,

  // TODO other currency unicodes (or replace all w/ SVG icons?)
  CURRENCY_UNICODES : {
    'USD' : '&#36;',
    'CNY' : '&#165;',
    'JPY' : '&#165;',
    'BTC' : '&#8383;',
    'GBP' : '&#163;',
    'EUR' : '&euro;'
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
