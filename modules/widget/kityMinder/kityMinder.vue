<style src="./css/minder.css"></style>
<template>
	<div class="minder-container">
		<div class="tools">
			<minder-template @changeTemplate="goChangeTemplate"></minder-template>
            <minder-level @changeLevel="goChangeLevel" :total="getAllLevel"></minder-level>
            <minder-theme @changeTheme="goChangeTheme"></minder-theme>
            <a @click="goResetLayout" role="button" class="btn btn-link"><span class="glyphicon glyphicon-wrench" aria-hidden="true"></span> 整理布局</a>
            <a @click="zoomIn" role="button" class="btn btn-link"><span class="glyphicon glyphicon-zoom-in" aria-hidden="true"></span> 放大</a>
            <a @click="zoomOut" role="button" class="btn btn-link"><span class="glyphicon glyphicon-zoom-out" aria-hidden="true"></span> 缩小</a>
		</div>
		<div id="minder-view"></div>
        <minder-hotbox :right-menu="rightMenu" @hideRightMenu="goHideRightMenu"></minder-hotbox>
	</div>
</template>
<script>
import { data } from './data'
import MinderTemplate from './components/MinderTemplate.vue'
import MinderLevel from './components/MinderLevel.vue'
import MinderTheme from './components/MinderTheme.vue'
import MinderHotbox from './components/MinderHotbox.vue'

export default{
    props: [],
    data(){
    	return {
    		zoom:100,
            rightMenu:{//右键菜单的显示位置
                show:false,
                left:0,
                top:0
            }
    	}
    },
    methods:{
    	createMinder(){//创建脑图
    		var km = window.km = new kityminder.Minder({
       			enableKeyReceiver: false,//禁用脑图自带的键盘监听事件，方便自己自定义节点
            	enableAnimation: true
       		});
            km.renderTo('#minder-view');
            km.importData('json', JSON.stringify(data));

            /*监听事件*/
            var _this = this;
            km.on('mouseup', function(e) {
                var button = e.originEvent.button;
                var select = window.km.getSelectedNode();
                if(button == 2 && select){//鼠标右键事件
                    _this.showRightMenu(e.originEvent);
                }else{

                }
            })



    	},
        goChangeTemplate(name){//修改模板
            var minder = window.km;
            minder.execCommand('Template', name);
        },
        goChangeLevel(num){//展开层级
            var minder = window.km;
            minder.execCommand('ExpandToLevel', num);
        },
        goChangeTheme(name){//修改主题
            var minder = window.km;
            minder.execCommand('Theme', name);
        },
        goResetLayout(){//整理布局
            var km = window.km;
            km.execCommand('ResetLayout');
        },
        zoomIn(){//放大
            var minder = window.km;
            var zoom = this.zoom;
            var key = zoom + 10;
            if(key <= 200){
                this.zoom = key;
                minder.execCommand('Zoom',key);
            }
        },
        zoomOut(){//缩小
            var minder = window.km;
            var zoom = this.zoom;
            var key = zoom - 10;
            if(key >= 10){
                this.zoom = key;
                minder.execCommand('Zoom',key);
            }
        },
        showRightMenu(e){//显示右键菜单
            var left = e.clientX;
            var top = e.clientY;
            var select = window.km.getSelectedNode();
            if(select){//有选中的节点时，显示右键菜单
                this.rightMenu.show = true;
                this.rightMenu.left = left;
                this.rightMenu.top = top;
            }
        },
        goHideRightMenu(){//隐藏右键菜单
            this.rightMenu.show = false;
        }
    },
    computed:{
        getAllLevel(){
            var tree = data.root;
            var result = 1;
            function visit(obj,level){
                if(obj.length > 0){
                    level++;
                    if(level > result){
                        result = level;
                    }
                    for(var i=0;i<obj.length;i++){
                        if(obj[i].children.length > 0){
                            visit(obj[i].children,level);
                        }
                    }
                }
            }
            visit(tree.children,1);
            return result;
        }
    },
    components:{
    	MinderTemplate,
        MinderLevel,
        MinderTheme,
        MinderHotbox
    },
    mounted(){
    	this.createMinder();
    }
    
}

</script>
