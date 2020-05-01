<template>
  <MainLayout section="landing">
    <div id="landing_container">
      <div id="section1" class="section">
        <div id="section1_subsection1">
          <div id="main_title">Zerp Tracker</div>

          <ul class="main_features" v-if="mq_gt_md">
            <li>Monitor your account</li>
            <li>Look for money flow/volume patterns</li>
            <li>Watch order book updates &amp; status</li>
            <li>Much more!</li>
          </ul>

          <div class="begin_today_wrapper">
            <b-button v-if="mq_gt_md"
                      class="begin_today"
                      variant="primary">
              <router-link to="/txs">
                <b>Begin today</b>
              </router-link>
            </b-button>
          </div>
        </div>

        <div id="section1_subsection2">
          <img id="section1_img" src="./assets/landing/section1.png" />
        </div>

        <div id="section1_subsection3" v-if="mq_lt_lg">
          <ul class="main_features">
            <li>Monitor your account</li>
            <li>Look for money flow/volume patterns</li>
            <li>Watch order book updates &amp; status</li>
            <li>Much more!</li>
          </ul>

          <div class="begin_today_wrapper">
            <b-button v-if="mq_lt_lg"
                      class="begin_today"
                      variant="primary">
              <router-link to="/txs">
                <b>Begin today</b>
              </router-link>
            </b-button>
          </div>
        </div>
      </div>

      <div id="section2" class="section">
        <div class="sub_title">Alert Notifications</div>

        <div id="section2_subsection">
          <img id="section2_img" src="./assets/landing/section2.png" />

          <div id="section2_content">
            <p>Monitor XRP Blockchain transactions in real time and setup alerts to be delivered via email, text message, and more</p>

            <router-link to="/txs">
              <b-button id="setup_notifications" variant="primary">
                <b>Setup Notifications</b>
              </b-button>
            </router-link>
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
          <img v-if="mq_gt_md"
               class="section4_img2"
               src="./assets/landing/section4b.png" />

          <div id="section4_content2">
            <div class="sub_sub_title">Create your first filter</div>

            <img v-if="mq_lt_lg"
                 class="section4_img2"
                 src="./assets/landing/section4b.png" />

            <p>Get notified when an interesting offer appears</p>

            <router-link to="/txs">
              <b-button id="create_personalized_filter" variant="primary">
                <b>Create your personalized filter</b>
              </b-button>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </MainLayout>
</template>

<script>
import MainLayout from './components/MainLayout'

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

#main_layout.md #landing_container,
#main_layout.sm #landing_container,
#main_layout.xs #landing_container{
  margin-top: unset;
}

.section{
  padding-left: 7%;
  padding-right: 7%;
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
  align-items: center;
}

#main_layout.xxxl #section1{
  font-size: 3rem;
}

#main_layout.xxl #section1{
  font-size: 2.5rem;
}

#main_layout.xl #section1{
  font-size: 2.25rem;
}

#main_layout.lg #section1{
  font-size: 1.25rem;
}

#main_layout.md #section1,
#main_layout.sm #section1,
#main_layout.xs #section1{
  flex-direction: column;
}

#section1_subsection1{
  flex-basis: 35%;
  flex-shrink: 0;
}

#section1_subsection2{
  flex-basis: 65%;
}

#main_title{
  font-size: 4rem;
  font-weight: bold;
  margin-top: 25px;
  margin-bottom: 20px;
}

#main_layout.xxxl #main_title{
  font-size: 6rem;
}

#main_layout.xxl #main_title{
  font-size: 4.5rem;
}

#main_layout.xl #main_title{
  font-size: 3.5rem;
}

#main_layout.lg #main_title{
  font-size: 3.0rem;
}

#main_layout.xs #main_title{
  font-size: 3rem;
}

.main_features {
  list-style: none;
}

.main_features li::before{
  content: "\2022";
  color: var(--theme-color1);
  font-weight: bold;
  display: inline-block; 
  width: 1em; 
  margin-left: -1em;
}

#section1_subsection3{
  padding-top: 10px;
  align-self: flex-start;
  width: 100%;
}

.begin_today_wrapper{
  width: 100%;
  text-align: center;
}

#main_layout.xxxl .begin_today_wrapper{
  text-align: unset;
}

.begin_today{
  align-self: center;
  margin-top: 20px;
  padding-left: 30px;
  padding-right: 30px;
  border-radius: 30px;
  font-size: 2rem;
}

.begin_today a{
  color: white;
  text-decoration: none;
}

#section1_img{
  width: 100%;
}

/****/

#section2{
  padding-top: 50px;
  padding-bottom: 75px;
  background-color: white;
  text-align: center;
}

#main_layout.xs #section2 .sub_title{
  font-size: 2.1rem;
}

#section2_subsection{
  display: flex;
  align-items: center;
}

#main_layout.md #section2_subsection,
#main_layout.sm #section2_subsection,
#main_layout.xs #section2_subsection{
  display: flex;
  flex-direction: column;
}

#section2_img{
  flex-basis: 60%;
  max-width: 50%;
}

#main_layout.md #section2_img,
#main_layout.sm #section2_img,
#main_layout.xs #section2_img{
  max-width: 100%;
}

#section2_content{
  flex-basis: 40%;
  font-size: 1.5rem;
  padding-top: 50px;
  padding-left: 45px;
}

#main_layout.md #section2_content,
#main_layout.sm #section2_content,
#main_layout.xs #section2_content{
  font-size: 1rem;
  padding-left: unset;
}

#setup_notifications{
  align-self: center;
  border-radius: 25px;
  font-size: 1.5rem;
}

/****/

#section3{
  padding-top: 50px;
  padding-bottom: 20px;
}

#main_layout.md #section3 .sub_title,
#main_layout.sm #section3 .sub_title,
#main_layout.xs #section3 .sub_title{
  text-align: center;
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

#main_layout.md #section3_content,
#main_layout.sm #section3_content,
#main_layout.xs #section3_content{
  font-size: 1rem;
}

/****/

#section4{
  padding-top: 50px;
  padding-bottom: 50px;
  background-color: white;
}

#main_layout.md #section4 .sub_title,
#main_layout.sm #section4 .sub_title,
#main_layout.xs #section4 .sub_title{
  text-align: center;
}

#section4_img1{
  width: 100%;
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

#main_layout.md #section4_content2,
#main_layout.sm #section4_content2,
#main_layout.xs #section4_content2{
  padding-left: unset;
  width: 100%;
  text-align: center;
}

.section4_img2{
  max-width: 25%;
}

#create_personalized_filter{
  border-radius: 25px;
  font-size: 1.2rem;
}

#main_layout.xs #create_personalized_filter{
  font-size: 0.9rem;
}
</style>
