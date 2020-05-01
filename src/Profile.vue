<template>
  <MainLayout section="profile">
    <div id="profile">
      <h1>Account:</h1>

      <b-container id="profile_content">
        <b-row class="header_row">
          <b-col>
            My profile
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Email address
          </b-col>

          <b-col>
            {{email}}
          </b-col>

          <b-col class="action">
            Update
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Password
          </b-col>

          <b-col>
           *****
          </b-col>

          <b-col class="action">
            Change Password
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col>
            Plan details
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            Plan details
          </b-col>

          <b-col id="membership_level">
            {{membership_level}}
          </b-col>

          <b-col class="action">
            Change plan
          </b-col>
        </b-row>

        <b-row class="header_row">
          <b-col>
            Billing
          </b-col>
        </b-row>

        <b-row class="input_row">
          <b-col>
            TODO
          </b-col>
        </b-row>
      </b-container>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout     from './components/MainLayout'
import Authentication from './mixins/authentication'

export default {
  name: 'Profile',

  mixins : [Authentication],

  components: {
    MainLayout
  }
}
</script>

<style scoped>
#profile{
  width: 50%;
  margin: auto;
  margin-top: 20px;
  font-family: var(--theme-font4);
}

#profile h1{
  font-family: var(--theme-font3);
}

#profile_content{
  background-color: white;
  border: 1px solid #ededed;
  padding: 25px;
}

.header_row{
  margin: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #ededed;
  font-weight: bold;
}

.input_row{
  margin: 20px;
}

.input_row .col{
  padding: 10px;
}

.action{
  color: blue;
  cursor: pointer;
}

#membership_level{
  text-transform: capitalize;
}
</style>
