<template>
  <div id="contact_form">
    <div class="header">
      Email address:
    </div>

    <div>
      <input type="text"
             v-model="email" />
    </div>

    <div class="header">
      How can we help you?
    </div>

    <div>
      <textarea rows="20"
                v-model="body" />
    </div>

    <div id="submit">
      <button :disabled="!is_valid"
              @click="submit">Submit</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactForm',

  data : function(){
    return {
      email : "",
      body : ""
    }
  },

  computed : {
    is_valid : function(){
      return this.email != "" &&
             this.body  != ""
    }
  },

  methods : {
    submit : function(){
      // TODO - submit and notify user
      this.email = ""
      this.body = ""
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
