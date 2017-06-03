<template>
    <div class="btn-group minder-theme">
        <button  @click="showSlide" type="button" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            {{filterThemeName}}<span class="caret"></span>
        </button>
        <ul class="dropdown-menu" v-show="show">
            <li class="classic" @click="changeMinderTheme('classic')"><a href="javascript:void(0)">脑图经典</a></li>
            <li class="classic-compact" @click="changeMinderTheme('classic-compact')"><a href="javascript:void(0)">紧凑经典</a></li>
            <li class="fresh-blue" @click="changeMinderTheme('fresh-blue')"><a href="javascript:void(0)">天空蓝</a></li>
            <li class="fresh-blue-compat" @click="changeMinderTheme('fresh-blue-compat')"><a href="javascript:void(0)">紧凑蓝</a></li>
            <li class="fresh-green" @click="changeMinderTheme('fresh-green')"><a href="javascript:void(0)">文艺绿</a></li>
            <li class="fresh-green-compat" @click="changeMinderTheme('fresh-green-compat')"><a href="javascript:void(0)">紧凑绿</a></li>
            <li class="fresh-pink" @click="changeMinderTheme('fresh-pink')"><a href="javascript:void(0)">脑残粉</a></li>
            <li class="fresh-pink-compat" @click="changeMinderTheme('fresh-pink-compat')"><a href="javascript:void(0)">紧凑粉</a></li>
            <li class="fresh-purple" @click="changeMinderTheme('fresh-purple')"><a href="javascript:void(0)">烂漫紫</a></li>
            <li class="fresh-purple-compat" @click="changeMinderTheme('fresh-purple-compat')"><a href="javascript:void(0)">紧凑紫</a></li>
            <li class="fresh-red" @click="changeMinderTheme('fresh-red')"><a href="javascript:void(0)">清新红</a></li>
            <li class="fresh-red-compat" @click="changeMinderTheme('fresh-red-compat')"><a href="javascript:void(0)">紧凑红</a></li>
            <li class="fresh-soil" @click="changeMinderTheme('fresh-soil')"><a href="javascript:void(0)">泥土黄</a></li>
            <li class="fresh-soil-compat" @click="changeMinderTheme('fresh-soil-compat')"><a href="javascript:void(0)">紧凑黄</a></li>
            <li class="snow" @click="changeMinderTheme('snow')"><a href="javascript:void(0)">温柔冷光</a></li>
            <li class="snow-compact" @click="changeMinderTheme('snow-compact')"><a href="javascript:void(0)">紧凑冷光</a></li>
            <li class="tianpan" @click="changeMinderTheme('tianpan')"><a href="javascript:void(0)">经典天盘</a></li>
            <li class="tianpan-compact" @click="changeMinderTheme('tianpan-compact')"><a href="javascript:void(0)">紧凑天盘</a></li>
            <li class="fish" @click="changeMinderTheme('fish')"><a href="javascript:void(0)">鱼骨图</a></li>
            <li class="wire" @click="changeMinderTheme('wire')"><a href="javascript:void(0)">线框</a></li>
         </ul>
    </div>
</template>
<style>
    
</style>
<script>
import EventListener from '../../../static/utils/EventListener'

export default{
    props: [],
    data(){
    	return {
    		show:false,
            name:"fresh-blue-compat"
    	}
    },
    methods:{
    	showSlide(){
            this.show = !this.show;
        },
        changeMinderTheme(name){
            this.$emit('changeTheme',name);
            this.show = false;
            this.name = name;
        }
    },
    computed:{
        filterThemeName(){
            var result = '紧凑蓝';
            switch(this.name){
                case 'classic':result = '脑图经典';break;
                case 'classic-compact':result = '紧凑经典';break;
                case 'fresh-blue':result = '天空蓝';break;
                case 'fresh-blue-compat':result = '紧凑蓝';break;
                case 'fresh-green':result = '文艺绿';break;
                case 'fresh-green-compat':result = '紧凑绿';break;
                case 'fresh-pink':result = '脑残粉';break;
                case 'fresh-pink-compat':result = '紧凑粉';break;
                case 'fresh-purple':result = '烂漫紫';break;
                case 'fresh-purple-compat':result = '紧凑紫';break;
                case 'fresh-red':result = '清新红';break;
                case 'fresh-red-compat':result = '紧凑红';break;
                case 'fresh-soil':result = '泥土黄';break;
                case 'fresh-soil-compat':result = '紧凑黄';break;
                case 'snow':result = '温柔冷光';break;
                case 'snow-compact':result = '紧凑冷光';break;
                case 'tianpan':result = '经典天盘';break;
                case 'tianpan-compact':result = '紧凑天盘';break;
                case 'fish':result = '鱼骨图';break;
                case 'wire':result = '线框';break;
            }
            return result;
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
