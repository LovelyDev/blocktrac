<template>
  <MainLayout section="help">
    <div id="help">
      <h1 style="text-align: center">Help</h1>

      <VueFaqAccordion :items="faq_data" />
    </div>
  </MainLayout>
</template>

<script>
import VueFaqAccordion from 'vue-faq-accordion'

import MainLayout from './components/MainLayout.vue'
import config     from './config'

// TODO finish flushing out FAQ answers

export default {
  name: 'Help',
  components: {
    MainLayout,
    VueFaqAccordion
  },


  data : function(){
    return {
      faq_data : [
        {
             title : "What is " + config.SITE_NAME + "?",
             value : config.SITE_NAME + " is a persistent transaction tracker for the XRP Blockchain. It allows you to setup filter-based alerts to be notified via any number of mechanisms (known as 'sinks') upon XRP Ledger activity.",
          category : "General"
        },

        {
             title : "What is XRP?",
             value : "XRP is a popular Blockchain technology being adopted by banks and financial institutions worldwide for cross border remittances.",
          category : "General"
        },

        {
             title : "Why should I care about transactions?",
             value : "Transactions are a core component of the XRP Ledger, allowing users to send and receive currencies and tokens representing value over the Internet.",
          category : "General"
        },

        {
             title : "Where can I find out more?",
             value : "Many resources are avaiable online pertaining to XRP technologies. See the <a href='https://en.wikipedia.org/wiki/Ripple_(payment_protocol)'>Ripple</a> Wikipedia article and the <a href='https://xrpl.org'>XRPL.org</a> dev portal.",
          category : "General"
        },

        {
             title : "How do I sign up?",
             value : "Answer5",
          category : "Account"
        },

        {
             title : "What if I forgot my password?",
             value : "Answer6",
          category : "Account"
        },

        {
             title : "How do I modify my profile?",
             value : "Answer7",
          category : "Account"
        },

        {
             title : "How do I create new transaction sinks?",
             value : "Answer8",
          category : "Account"
        },

        {
             title : "What kind of sinks are available for me?",
             value : "Answer9",
          category : "Account"
        },

        {
             title : "How do I create new filters?",
             value : "Answer10",
          category : "Filters"
        },

        {
             title : "What is this JSONPath buisiness?",
             value : "Answer11",
          category : "Filters"
        },

        {
             title : "How often am I notified of matched filters?",
             value : "Answer12",
          category : "Filters"
        },

        {
             title : "How can I be altered more frequently / instantaneously?",
             value : "Answer13",
          category : "Filters"
        },

        {
             title : "What are the different membership levels?",
             value : "Answer14",
          category : "Payments"
        },

        {
             title : "What is a premium account?",
             value : "Answer15",
          category : "Payments"
        },

        {
             title : "What payment options are available to me?",
             value : "Answer16",
          category : "Payments"
        },

        {
             title : "What happs when my account becomes unfunded?",
             value : "Answer17",
          category : "Payments"
        },
      ]
    }
  }
}
</script>

<style scoped>
#help{
  border: 1px solid black;
  width: 75%;
  margin: auto;
  margin-bottom: 25px;
  padding: 15px;
}

/deep/ .faq-wrapper{
  max-width: unset;
}
</style>
