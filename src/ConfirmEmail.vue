<!--
  * ConfirmEmail Page
  * Issues a /confirm request to the server to confirm email and
  * reports result
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <MainLayout section="confirm">
    <div id="confirm">
      <h2>Confirming Email... <b-spinner type="grow" /></h2>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout'
import Authentication from './mixins/authentication'
import ServerAPI      from './mixins/server_api'

import util   from './util'
import config from './config'

export default {
  name: 'ConfirmEmail',

  mixins : [Authentication, ServerAPI],

  components: {
    MainLayout
  },

  props : {
    code : {
      type : String,
      required : true
    }
  },

  methods : {
    send_request : function(){
      const params = {code : this.code}
      this.confirm_email(params)
          .then(function(res){
            alert("Email successfully confirmed, you may now login")
            this.$router.push("/txs")

          }.bind(this)).catch(function(err){
            const msg = util.capitalize(err.body.error)
            alert("Could not confirm email: " + msg)
            this.$router.push("/txs")
          })
    }
  },

  created : function(){
    if(config.MAINTENANCE_MODE){
      this.$router.push({path : '/maintenance'});
      return;
    }

    this.send_request()
  }
}
</script>

<style scoped>
#confirm{
  min-height: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  font-family: var(--theme-font4);
}
</style>
