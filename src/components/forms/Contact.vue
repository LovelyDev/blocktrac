<template>
  <div id="contact_form">
    <div class="header">
      Email address:
    </div>

    <div>
      <input type="text"
             @keyup.enter="submit"
             v-model="email" />
    </div>

    <div class="header">
      How can we help you?
    </div>

    <div>
      <textarea rows="20"
                @keyup.enter="submit"
                v-model="inquiry" />
    </div>

    <div id="submit">
      <button :disabled="!is_valid"
              @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
import ServerAPI from '../../mixins/server_api'

import util from '../../util'

export default {
  name: 'ContactForm',

  mixins : [ServerAPI],

  data : function(){
    return {
      email : "",
      inquiry : ""
    }
  },

  computed : {
    is_valid : function(){
      return this.email != "" &&
             this.inquiry  != ""
    }
  },

  methods : {
    submit : function(){
      if(!this.is_valid) return

      const params = {email : this.email, inquiry : this.inquiry}
      this.$http.post(this.backend_url + "/contact", params)
                .then(function(response){
                  alert("Your inquiry has been sent to us, we will get back to you as soon as possible")
                  this.email = ""
                  this.inquiry = ""

                }.bind(this)).catch(function(err){
                  const msg = util.capitalize(err.body.error)
                  alert("Could not submit form: " + msg)
                })
    }
  }
}
</script>

<style scoped>
#contact_form{
  width: 50%;
  margin: auto;
}

input,
textarea{
  width: 100%;
}

.header{
  margin-top: 10px;
}

#submit{
  margin-top: 10px;
}

#submit button{
  display: block;
  margin: auto;
}
</style>
