// Custom Jest Matchers

expect.extend({
  toExist : function(received){
    const pass = received.exists();
    const message = pass ? () => this.utils.printReceived(received) + " exists" :
                           () => this.utils.printReceived(received) + " does not exist";

    return {
      message,
      pass
    }
  },

  // XXX: would like to use jest-dom but that checks for inclusion in the document:
  // https://github.com/testing-library/jest-dom#tobevisible
  // TODO: add other visibility conditions from that
  toBeVisible : function(received){
    const pass = received.element.style.getPropertyValue('display') != 'none';
    const message = pass ? () => this.utils.printReceived(received) + " is visible" :
                           () => this.utils.printReceived(received) + " is not visible";
    return {
      message,
      pass
    }
  }
})
