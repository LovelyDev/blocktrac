<!--
  * Profile Form
  * High level user account settings and options. Here the user
  * can change their email, password, and billing information.
  *
  * Copyright (c) 2020 Dev Null Productions - All Rights Reserved
  -->
<template>
  <b-container id="profile_form">
    <b-row class="header_row">
      <b-col class="label">
        My profile
      </b-col>
    </b-row>

    <b-row class="input_row">
      <b-col  class="label" cols=4>
        Email address
      </b-col>

      <b-col v-if="!editing_email"
             class="value">
        {{email}}
      </b-col>

      <b-col v-else>
        <input class="form_input" type="text"
               v-model="auth_email" />

        <div class="form_text form_error">
          <span v-if="invalid_email">Invalid Email</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col v-if="mq_gt_md"
             @click="editing_email = !editing_email"
             class="action" cols=2>
        <span v-if="!editing_email">Update</span>
        <span v-else>Cancel</span>
      </b-col>

      <b-col v-else
             @click="editing_email = !editing_email"
             class="action" cols="1">
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row id="password_row"
           class="input_row">
      <b-col class="label" cols=4>
        Password
      </b-col>

      <b-col v-if="!editing_password"
             class="value">
       *****
      </b-col>

      <b-col v-else>
        <input class="form_input" type="password"
               v-model="auth_password" />

        <div class="form_text form_error">
          <span v-if="weak_password">Weak password</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col v-if="mq_gt_md"
             @click="editing_password = !editing_password"
             class="action" cols=2>
        <span v-if="!editing_password">Change Password</span>
        <span v-else>Cancel</span>
      </b-col>

      <b-col v-else
             @click="editing_password = !editing_password"
             class="action" cols=1>
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row v-if="editing_password"
           id="confirm_password_row"
           class="input_row">
      <b-col class="label" cols=4>
        Confirm Password
      </b-col>

      <b-col>
        <input class="form_input" type="password"
               v-model="auth_password_confirm" />

        <div class="form_text form_error">
          <span v-if="password_mismatch">Passwords do not match</span>
          <span v-else class="placeholder" />
        </div>
      </b-col>

      <b-col :cols="mq_gt_md ? 2 : 1">
        &nbsp;
      </b-col>
    </b-row>

    <b-row class="header_row">
      <b-col class="label">
        Plan details
      </b-col>
    </b-row>

    <b-row class="input_row">
      <b-col class="label" cols=4>
        Plan details
      </b-col>

      <b-col id="membership_level" class="value">
        {{membership_level}}
      </b-col>

      <b-col v-if="mq_gt_md"
             class="action" cols=2>
        <router-link to="/plans">Change plan</router-link>
      </b-col>

      <b-col v-else
             class="action" cols=1>
        <img src="../../assets/pencil-blue.svg" />
      </b-col>
    </b-row>

    <b-row class="header_row">
      <b-col class="label">
        Billing
      </b-col>
    </b-row>

    <b-row class="input_row">
      <b-col>
        TODO
      </b-col>
    </b-row>
  </b-container>
</template>

<script>
import Authentication from '../../mixins/authentication'
import Validator      from '../../mixins/validator'

export default {
  name: 'Profile',

  mixins : [Authentication, Validator],

  data : function(){
    return {
      editing_email : false,
      editing_password : false
    }
  },

  computed : {
    editing_fields : function(){
      return this.editing_email || this.editing_password;
    },

    is_valid : function(){
      return (!this.editing_email    || (this.have_email && !this.invalid_email)) &&
             (!this.editing_password || (this.have_passwords && !this.invalid_passwords));
    }
  },

  watch : {
    editing_email : function(){
      this.auth_email = ''
    },

    editing_password : function(){
      this.auth_password = ''
      this.auth_password_confirm = ''
    },

    editing_fields : function(){
      if(this.editing_fields)
        this.$emit('editing')
      else
        this.$emit('not_editing')
    }
  },

  methods : {
    reset : function(){
      this.editing_email = false
      this.editing_password = false
    }
  },

  created : function(){
    this.auth_email = ''
  }
}
</script>

<style scoped>
.label{
  padding: 0;
}

#main_layout.md .label,
#main_layout.sm .label,
#main_layout.xs .label,
#main_layout.md .value,
#main_layout.sm .value,
#main_layout.xs .value{
  font-size: 3.6vw;
}

.header_row{
  margin: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ededed;
  font-weight: bold;
}

#main_layout.md .header_row,
#main_layout.sm .header_row,
#main_layout.xs .header_row{
  margin: 10px 0;
}

.input_row{
  margin: 20px;
}

#main_layout.md .input_row,
#main_layout.sm .input_row,
#main_layout.xs .input_row{
  margin: 20px 0;
}

#password_row{
  margin-bottom: 0;
}

#confirm_password_row{
  margin-top: 5px;
}

.action{
  color: blue;
  cursor: pointer;
}

.action a{
  color: blue;
}

.action a:hover{
  text-decoration: none;
}

#membership_level{
  text-transform: capitalize;
}
</style>
