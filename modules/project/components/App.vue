<template>
  	<div class="page_container">
      <nav class="navbar navbar-default">
        <div class="container-fluid">
          <div class="navbar-header"><a class="navbar-brand">Sniper</a></div>
          <div class="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
            <ul class="nav navbar-nav">
              <li :class="{
                'active':(path.indexOf('/index') >=0)
                }"><router-link to="/index">FullCalendar</router-link></li>
              <li :class="{
                'active':(path.indexOf('/minder') >= 0)
                }"><router-link to="/minder">Minder</router-link></li>
              <!-- <li :class="{
                'active':(path.indexOf('/video') >= 0)
                }"><router-link to="/video">Video</router-link></li> -->
            </ul>
          </div>
        </div>
      </nav>
      <div class="page_content">
        <router-view></router-view> 
      </div>
    </div>
</template>
<style>
  html,body{
    width: 100%;
    height: 100%;
  }
  .navbar{
    margin-bottom: 0;
  }
  .page_container{
    width:100%;
    height: 100%;
  }
  .page_content{
    height: calc(100% - 52px);
  }
</style>
<script>
export default {
  components: {
  
  },
  data(){
    return {
      path:window.router.history.current.path
    }
  },
  watch: {
    '$route' (to, from) {
      this.path = to.path;
    }
  }
}
</script>
