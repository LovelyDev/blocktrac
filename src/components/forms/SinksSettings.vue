<template>
  <div id="sinks">
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

      <tr v-if="advanced_sinks_disabled">
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
    // TODO: more elegant solution,
    //       deduce from fr0xrpl MEMBERSHIP_LEVEL config
    advanced_sinks_disabled : function(){
      return this.is_basic_member;
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
}

#sinks table{
  width: 100%;

  border-collapse:separate;
  border-spacing: 0 15px;
}

#sinks_footer{
  font-size: 0.75rem;
}

.pro{
  border-radius: 15px;
  padding-left: 10px;
  padding-right: 10px;
  background-color: #eff2f8;
  color: #629ffb;
}
</style>
