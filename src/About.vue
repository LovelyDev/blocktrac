<template>
  <MainLayout section="about">
    <div id="about">
      <h1 style="text-align: center">About</h1>

      <p>
        {{site_name}} is a persistent transaction tracker for the XRP Blockchain. It allows you to monitor XRPL transactions in real time and setup alters to be notified of ledger activity via any number of mechanisms (known as “sinks”). By leveraging filters using a rich and powerful pattern matching system, {{site_name}} facilitates the inclusion (and/or exclusion) of the exact transactions that you are interested in!
      </p>

      <p>
        You may set up transaction alerts in{{site_name}} to be notified of transactions via the following sinks:
      </p>

      <ul>
        <li>Email</li>
        <li>Text Message (SMS)</li>
        <li>Webhooks</li>
        <li>&amp; more</li>
      </ul>

      <p>
        Upon creating an account and setting up your profile, you are given the ability to write custom expressions that will be matched against XRPL activity as it occurs. Additional {{site_name}} provides may pre-built parameterized expression templates right out of the box so that you can quickly be notified of common ledger activity. Expressions and templates may be tested in real time against the live transaction stream, right in the web browser, as well as against a re-captured database of actual XRPL transactions. Once you have established the specific expression for the type of ledger activity you are looking for, you can then save it to our servers so as to be notified of corresponding transactions via you configured data sink, even when you close your browser.
      </p>

      <p>
        {{site_name}} membership levels comes in tiers, the basic (free) plan allows you to create {{membership_levels['basic']['num_filters']}} filters, each associated with {{membership_levels['basic']['num_sinks_per_filter']}} sink{{pluralizer(membership_levels['basic']['num_sinks_per_filter'])}} to output ledger activity. Matched transactions will be relayed at an interval of {{membership_levels['basic']['min_tx_batch']}} transactions or {{membership_levels['basic']['min_alert_interval']}} minutes, whichever comes later.
      </p>

      <p>
        Premium plans allow you to create more filters and allow you to associated each with multiple sinks. Furthermore alters can be configured to be invoked immediately upon match in the transaction stream.
      </p>

      <p>
        Pricing:
      </p>

      <ul>
        <li>Basic: Free</li>
        <li>Premium:</li>
        <li style="list-style-type: none">
          <ul>
            <li>
              Additional Filters: ${{membership_levels['premium']['monthly_filter_cost']}} per filter per month
            </li>

            <li>
              Additional Sinks: ${{membership_levels['premium']['monthly_sink_cost']}} per sink per month
            </li>

            <li>
              Additional Sinks Per Filter: ${{membership_levels['premium']['monthly_sink_per_filter_cost']}} per filter-sink per month
            </li>

            <li>
              Quicker Alert Time ({{membership_levels['premium']['min_alert_interval']}} minute{{pluralizer(membership_levels['premium']['min_alert_interval'])}}):  ${{membership_levels['premium']['monthly_alert_cost']}} per month
            </li>

            <li>
              Instant Alerts: ${{membership_levels['premium']['instant_alert_cost']}} per month
            </li>
          </ul>
        </li>
      </ul>

      <p>
        Be sure to check back regularly for updates and new features!
      </p>

      <p style="text-align: center">
        <img src='./assets/placeholder-logo.png' style="width: 50%" />
      </p>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'
import config     from './config'

export default {
  name: 'About',

  components: {
    MainLayout
  },

  methods : {
    pluralizer : function(num){
      return num == 1 ? '' : 's';
    }
  },

  computed : {
    site_name : function(){
      return config.SITE_NAME;
    },

    membership_levels : function(){
      return config.MEMBERSHIP_LEVELS;
    }
  }
}
</script>

<style scoped>
#about{
  border: 1px solid black;
  width: 50%;
  margin: auto;
  margin-bottom: 25px;
  padding: 15px;
}
</style>
