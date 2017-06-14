<template>
  <div class="video">
    <div>
      <input id="upload" ref="files" type="file" value="" @change="play"/>
    </div>


    <video id="video" src="https://static-app01.yugusoft.com/yugu-guide.mp4" width="400" height="400" controls="controls">
    您的浏览器不支持 video 标签。
    </video>


  </div>
</template>

<script>
export default {
  props: {
    
  },
  methods:{
    play(){
      var file = document.getElementById('upload');  
      var url = this.getUrl(file);  
      var video = document.getElementById('video');
      video.setAttribute('src',url);
      video.play();
    },
    getUrl(node){
      var imgURL = "";
      try{
          var file = null;
          if(node.files && node.files[0] ){
              file = node.files[0];
          }else if(node.files && node.files.item(0)) {
              file = node.files.item(0);
          }
          //Firefox 因安全性问题已无法直接通过input[file].value 获取完整的文件路径
          try{
              //Firefox7.0
              imgURL =  file.getAsDataURL();
              //alert("//Firefox7.0"+imgRUL);
          }catch(e){
              //Firefox8.0以上
              imgURL = window.URL.createObjectURL(file);
              //alert("//Firefox8.0以上"+imgRUL);
          }
      }catch(e){      //这里不知道怎么处理了，如果是遨游的话会报这个异常
          //支持html5的浏览器,比如高版本的firefox、chrome、ie10
          if (node.files && node.files[0]) {
              var reader = new FileReader();
              reader.onload = function (e) {
                  imgURL = e.target.result;
              };
              reader.readAsDataURL(node.files[0]);
          }
      }
      return imgURL;
    }
  }
}
</script>
