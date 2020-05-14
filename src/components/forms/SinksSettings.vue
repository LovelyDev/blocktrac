<template>
  <div id="sinks">
    <h4 id="sinks_title">Notifications:</h4>

    <div>
    Send me notifications via
    </div>

    <table>
      <tr>
        <td>Email</td>

        <td>
          <input type="text"
                class="form_input" />
        </td>
      </tr>

      <tr id="sinks_pro" v-if="advanced_sinks_disabled">
        <td></td>

        <td>
          Available with <span class="pro">Pro</span> plans
        </td>
      </tr>

      <tr>
        <td>Text Message</td>

        <td>
          <input type="text"
                class="form_input"
            :disabled="advanced_sinks_disabled" />
        </td>
      </tr>

      <tr>
        <td>URL</td>

        <td>
          <input type="text"
                class="form_input"
            :disabled="advanced_sinks_disabled" />
        </td>
      </tr>
    </table>

    <div id="sinks_footer">
      <div>
        {{remaining_sinks}} are left.
      </div>

      <div>
        To create more, purchase a <span class="pro">Pro</span> plan.
      </div>
    </div>
  </div>
</template>

<script>
import Authentication from '../../mixins/authentication'


export default {
  name: 'SinksSettingsForm',

  mixins : [Authentication],

  computed : {
    advanced_sinks_disabled : function(){
      return !this.membership_features.advanced_sinks
    },

    remaining_sinks : function(){
      // TODO
      return "2 available sinks"
    }
  }
}
</script>

<style scoped>
#sinks{
  margin-top: 10px;
  font-family: var(--theme-font1);
}

#sinks_title{
  font-family: var(--theme-font5);
}

#sinks table{
  width: 100%;

  border-collapse:separate;
  border-spacing: 0 15px;
}

#sinks_pro{
  font-family: var(--theme-font4);
  font-size: 0.9rem;
}

#sinks_footer{
  font-size: 0.75rem;
  font-family: var(--theme-font4);
}

.pro{
  border-radius: 15px;
  padding: 3px 10px;
  background-color: var(--theme-color5);
  color: white;
}
</style>
