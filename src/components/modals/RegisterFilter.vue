<template>
  <b-modal id="register_filter_modal"
           title="Your filter is almost set"
           ok-title="Create Account"
           cancel-variant="light"
           header-class="modal_header"
           centered
           @ok="register"
           :ok-disabled="ok_disabled"
           no-stacking>
    <div id="register_filter_details">
      <div id="register_filter_details_icon">
        <img src="../../assets/down-triangle-lines-white.svg" />
      </div>

      <FilterSummary :filter="filter" />
    </div>

    <div id="register_filter_info">
      In order to save your filter, please create an account
    </div>

    <RegistrationForm ref="registration_form"
                   @valid="ok_disabled = false"
                 @invalid="ok_disabled = true" />
  </b-modal>
</template>

<script>
import FilterSummary    from '../FilterSummary.vue'
import RegistrationForm from '../forms/Registration.vue'

export default {
  name: 'RegistrationModal',

  components : {
    FilterSummary,
    RegistrationForm
  },

  data : function(){
    return {
      // XXX: $refs not available to
      //      tie to ok-disabled directly
      ok_disabled : true
    }
  },

  computed : {
    filter : function(){
      return this.$store.state.in_progress_filter.client;
    }
  },

  methods : {
    register : function(){
      this.$refs.registration_form.register();
    }
  }
}
</script>

<style scoped>
#register_filter_details{
  padding: 20px;
  background-color: #97d59d;
  color: white;
  border-radius: 5px;
  font-family: "Inter Regular";
  font-size: 1.2rem;

  display: flex;
  align-items: center;
}

#register_filter_details_icon{
  margin-right: 20px;
  padding: 10px;
  padding-left: 15px;
  padding-right: 15px;
  background-color: #90cf9d;
  border-radius: 5px;
  font-family: "Helvetica Regular";
}

#register_filter_info{
  margin-top: 20px;
  margin-bottom: 20px;
  text-align: center;
  font-family: "Helvetica Regular";
}
</style>
