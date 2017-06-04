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
        <minder-hotbox :right-menu="rightMenu" @hideRightMenu="goHideRightMenu" @minderOperate="goOperateMinder"></minder-hotbox>
        <div class="edit_box" v-show="isEdit" :style="{left: editLeft+'px',top: editTop+'px'}">
            <div id="edit_input" @keydown.enter="goChangeText" ref="editbox" contenteditable="true" tabindex="-1" :class="{
                'receiver':true,
                'input':(isEdit)
                }">
            </div>
        </div>
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
            },
            editLeft:0,//节点名称编辑位置left
            editTop:0,//节点名称编辑位置top
            isEdit:false,//是否显示名称编辑框
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
            .on('dblclick',function(){//监听双击事件，判断是否需要编辑节点
                _this.goEditNode();
            })
            .on('selectionchange',function(){//监听选中节点的变化
                _this.goChangeText();
            })



    	},
        goEditNode(){//编辑节点
            var _this = this;
            var select = window.km.getSelectedNode();
            if(select && !select.isRoot()){
                var data = select.data;
                _this.updatePosition(data);
            }
        },
        updatePosition(data){//更新编辑框位置
            var _this = this;
            var minder = window.km;
            var planed = {};
            var focusNode = minder.getSelectedNode();
            _this.curEditId =  focusNode.data.id;//保存当前所编辑的节点id

            if (!focusNode) return;
            if (!planed.timer) {
                planed.timer = setTimeout(function() {
                    var box = focusNode.getRenderBox('TextRenderer');
                    console.log(box);
                    var left = Math.round(box.x);
                    var top = Math.round(box.bottom+25);//Math.round(box.y)
                    planed.timer = 0;
                    _this.editTop = top;
                    _this.editLeft = left;
                    _this.isEdit = true;
                    _this.$refs.editbox.innerHTML = data.text;
                    setTimeout(function(){
                        _this.selectText('edit_input');
                    },0)
                },500);
            }
        },
        selectText(containerid) {//设置编辑框选中
            if (document.selection) {
                var range = document.body.createTextRange();
                range.moveToElementText(document.getElementById(containerid));
                range.select();
            } else if (window.getSelection) {
                var range = document.createRange();
                range.selectNodeContents(document.getElementById(containerid));
                window.getSelection().removeAllRanges();
                window.getSelection().addRange(range);
            }
        },
        goChangeText(){//编辑节点操作,键盘事件
            console.log("change text");
            var text = this.$refs.editbox.innerHTML;
            if(!text || $.trim(text) == ''){
                text = '新建节点';
            }
            var focusNode = window.km.getSelectedNode();
            var focusId = focusNode && focusNode.data.id;
            if(focusId != this.curEditId){
                focusNode = window.km.getNodeById(this.curEditId);
            }
            if(focusNode && this.isEdit){
                focusNode.data.text = text;
                this.isEdit = false;
                window.receiver && window.receiver.focus();//设置焦点
                this.$refs.editbox.innerHTML = "";
                window.km.refresh();
            }
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
        getTempData(){//生成节点临时数据
            var result = {
                "text":"新建节点",
                "name":"新建节点",
            }
            return result;
        },
        goHideRightMenu(){//隐藏右键菜单
            this.rightMenu.show = false;
        },
        goOperateMinder(type){
            var km = window.km;
            if(type == 'Edit'){//编辑节点
                this.goEditNode();
            }else if(type == 'AppendChildNode' || type == 'AppendSiblingNode' || type == 'AppendParentNode'){
                var data = this.getTempData();
                km.execCommand(type, data);
                this.goEditNode();
            }else{
                this.minderOperate(type);
            }
        },
        minderOperate(type){
            var km = window.km;
            km.execCommand(type);
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
