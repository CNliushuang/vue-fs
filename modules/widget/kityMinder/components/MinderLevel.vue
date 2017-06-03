<template>
	<div class="btn-group">
        <button type="button" class="btn btn-default" @click="changeMinderLevel()">
            <template v-if="num == total">全部收起</template>
            <template v-else>全部展开</template>
        </button>
        <button type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="showSlide">
            <span class="caret"></span>
            <span class="sr-only">Toggle Dropdown</span>
        </button>
        <ul class="dropdown-menu" v-show="show">
            <li v-for="(item, index) in total" :class="{'active':(index==num-1)}" @click="changeMinderLevel(index)"><a href="javascript:void(0)">展开到第{{index+1}}层级</a></li>
        </ul>
    </div>
</template>
<script>
import EventListener from '../../../static/utils/EventListener'

export default{
    props: ['total'],
    data(){
    	return {
    		show:false,
            num:1
    	}
    },
    methods:{
    	showSlide(){
            this.show = !this.show;
        },
        changeMinderLevel(num){
            if(!num){
                num = this.num == this.total?0:(this.total-1);
            }
            this.$emit('changeLevel',num);
            this.show = false;
            this.num = num+1;
        }
    },
    mounted(){
        this._closeEvent = EventListener.listen(window, 'click', (e)=> {
            if (this.$el && !this.$el.contains(e.target)){
                this.show = false;
            }
        })
        this.num = this.total;
    }
    
}

</script>
