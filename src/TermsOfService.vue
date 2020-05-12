<template>
  <MainLayout section="terms">
    <div id="terms">
      <h1 id="terms_title">Terms Of Service</h1>

      <div id="terms_content">
        <p>
        Welcome to <b>Zerp Tracker</b>. If you continue to use this website and/or services, you are agreeing to comply with and be bound by the following terms and conditions of use, which govern Dev Null Productions' relationship with you in relation to this website/service. If you disagree with any part of these terms and conditions, please do not use our website/services.
        </p>

        <p>
        The use of this <b>Zerp Tracker</b> is subject to the following terms of use:
        </p>

        <ul>
          <li>
          Neither Dev Null Productions nor any third parties provide any warranty or guarantee as to the accuracy, timeliness, performance, completeness or suitability of the information and materials found or offered on this website or from the Zerp Tracker service for any particular purpose. You acknowledge that such information and materials may contain inaccuracies or errors and we expressly exclude liability for any such inaccuracies or errors to the fullest extent permitted by law.
          </li>

          <li>
          Your use of the services provided here is entirely at your own risk, for which we shall not be liable. It shall be your own responsibility to ensure that any products, services or information available through this website meet your specific requirements.
          </li>

          <li>
          This website contains material which is owned by or licensed to us. This material includes, but is not limited to, the design, layout, look, appearance and graphics. Reproduction is prohibited other than in accordance with the copyright notice, which forms part of these terms and conditions.
          </li>

          <li>
          All trade marks reproduced in this website which are not the property of, or licensed to, the operator are acknowledged on the website.
          </li>

          <li>
          Unauthorised use of this website may give rise to a claim for damages and/or be a criminal offence.
          </li>

          <li>
          From time to time this website may also include links to other websites. These links are provided for your convenience to provide further information. They do not signify that we endorse the website(s). We have no responsibility for the content of the linked website(s).
          </li>

          <li>
          Your use of this website and any dispute arising out of such use of the website is subject to the laws of New York, United States of America
          </li>
        </ul>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

export default {
  name: 'TermsOfService',
  components: {
    MainLayout
  }
}
</script>

<style scoped>
#terms{
  padding: 25px;
}

#terms_title{
  font-weight: bold;
  font-family: var(--theme-font4);
}

#terms_content{
  font-family: var(--theme-font1);
  background-color: white;
  padding: 25px;
}
</style>
