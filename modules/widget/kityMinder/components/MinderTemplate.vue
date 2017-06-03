<template>
	<div class="btn-group">
      <button type="button" class="btn btn-default" @click="changeMinderTemplate('default')">风格模板</button>
      <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showSlide">
        <span class="caret"></span>
        <span class="sr-only">Toggle Dropdown</span>
      </button>
      <ul class="dropdown-menu" v-show="show">
        <li :class="{'active':(name == 'default')}" @click="changeMinderTemplate('default')"><a href="javascript:void(0)">思维导图</a></li>
        <li :class="{'active':(name == 'filetree')}" @click="changeMinderTemplate('filetree')"><a href="javascript:void(0)">目录组织图</a></li>
        <li :class="{'active':(name == 'fish-bone')}" @click="changeMinderTemplate('fish-bone')"><a href="javascript:void(0)">鱼骨头图</a></li>
        <li :class="{'active':(name == 'right')}" @click="changeMinderTemplate('right')"><a href="javascript:void(0)">逻辑结构图</a></li>
        <li :class="{'active':(name == 'structure')}" @click="changeMinderTemplate('structure')"><a href="javascript:void(0)">组织结构图</a></li>
        <li :class="{'active':(name == 'tianpan')}" @click="changeMinderTemplate('tianpan')"><a href="javascript:void(0)">天盘图</a></li>
      </ul>
    </div>
</template>
<script>
import EventListener from '../../../static/utils/EventListener'

export default{
    props: [],
    data(){
    	return {
    		show:false,
            name:'default'
    	}
    },
    methods:{
    	showSlide(){
            this.show = !this.show;
        },
        changeMinderTemplate(name){
            this.$emit('changeTemplate',name);
            this.show = false;
            this.name = name;
        }
    },
    mounted(){
        this._closeEvent = EventListener.listen(window, 'click', (e)=> {
            if (this.$el && !this.$el.contains(e.target)){
                this.show = false;
            }
        })
    }
    
}

</script>
