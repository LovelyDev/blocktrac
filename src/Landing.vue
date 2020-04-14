<template>
  <MainLayout section="landing">
    <div id="landing_container">
      <div id="section1" class="section">
        <div id="section1_subsection1">
          <div id="main_title">Zerp Tracker</div>

          <ul id="main_features">
            <li>Monitor your account</li>
            <li>Look for money flow/volume patterns</li>
            <li>Watch order book updates &amp; status</li>
            <li>Much more!</li>
          </ul>

          <b-button id="begin_today" variant="primary">
            <b>Begin today</b>
          </b-button>
        </div>

        <div id="section1_subsection2">
          <img id="section1_img" src="./assets/landing/section1.png" />
        </div>
      </div>

      <div id="section2" class="section">
        <div class="sub_title">Alert Notifications</div>

        <div id="section2_subsection">
          <img id="section2_img" src="./assets/landing/section2.png" />

          <div id="section2_content">
            <p>Monitor XRP Blockchain transactions in real time and setup alerts to be delivered via email, text message, and more</p>

            <b-button id="setup_notifications" variant="primary">
              <b>Setup Notifications</b>
            </b-button>
          </div>
        </div>
      </div>

      <div id="section3" class="section">
        <div class="sub_title">Filtering</div>

        <div id="section3_content">
          With Zerp Tracker you can setup powerful filtering expressions to hone in on exactly the type of activity that you are interested in...
        </div>

        <img id="section3_img" src="./assets/landing/section3.png" />
      </div>

      <div id="section4" class="section">
        <div class="sub_title">Pre-existing templates</div>

        <div id="section4_content1">
          Use pre-existing templates to setup alerts for many types of common patterns
        </div>

        <img id="section4_img1" src="./assets/landing/section4a.png" />

        <div id="section4_subsection">
          <img id="section4_img2" src="./assets/landing/section4b.png" />

          <div id="section4_content2">
            <div class="sub_sub_title">Create your first filter</div>

            <p>Get notified when an interesting offer appears</p>

            <b-button id="create_personalized_filter" variant="primary">
              <b>Create your personalized filter</b>
            </b-button>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout.vue'

export default {
  name: 'Landing',

  components: {
    MainLayout
  }
}
</script>

<style scoped>
#landing_container{
  display: flex;
  flex-direction: column;
  margin: auto;
  margin-top: 50px;
}

.section{
  padding-left: 250px;
}

.sub_title{
  font-size: 2.9rem;
  font-weight: bold;
  margin-bottom: 20px;
}

.sub_sub_title{
  font-size: 2.2rem;
  font-weight: bold;
}

/****/

#section1{
  display: flex;
  font-size: 1.5rem;
  padding-bottom: 50px;
}

#section1_subsection1{
  flex-basis: 30%;
  display: flex;
  flex-direction: column;
}

#section1_subsection2{
  flex-basis: 55%;
}

#main_title{
  font-size: 4rem;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 20px;
}

#main_features {
  list-style: none;
}

#main_features li::before{
  content: "\2022";
  color: #0091FF;
  font-weight: bold;
  display: inline-block; 
  width: 1em; 
  margin-left: -1em;
}

#begin_today{
  align-self: center;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 25px;
  font-size: 2rem;
}

#section1_img{
  max-width: 100%;
}

/****/

#section2{
  padding-top: 50px;
  padding-bottom: 75px;
  background-color: white;
  text-align: center;
}

#section2_subsection{
  display: flex;
  align-items: center;
}

#section2_img{
  flex-basis: 60%;
  max-width: 50%;
}

#section2_content{
  flex-basis: 40%;
  font-size: 1.5rem;
  padding-top: 50px;
  padding-left: 45px;
}

#setup_notifications{
  align-self: center;
  border-radius: 25px;
  font-size: 1.5rem;
}

/****/

#section3{
  padding-top: 50px;
  padding-left: 350px;
  padding-right: 250px;
}

#section3_img{
  flex-basis: 60%;
  max-width: 100%;
}

#section3_content{
  margin: 20px;
  margin-bottom: 50px;
  font-size: 1.5rem;
}

/****/

#section4{
  padding-top: 50px;
  padding-bottom: 50px;
  padding-left: 350px;
  padding-right: 250px;
  margin-bottom: 15px;
  background-color: white;
  border-bottom: 1px solid #ECECEC;
}

#section4_img1{
  max-width: 100%;
}

#section4_subsection{
  margin-top: 50px;
  padding: 30px;
  display: flex;
  align-items: center;
  background-color: #f8f8f9;
}

#section4_content2{
  font-size: 1.4rem;
  padding-left: 50px;
}

#create_personalized_filter{
  border-radius: 25px;
  font-size: 1.2rem;
}

</style>
