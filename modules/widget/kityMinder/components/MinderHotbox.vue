<template>
	<div class="hotbox" v-show="rightMenu.show" :style="{left:rightMenu.left+'px',top:rightMenu.top+'px'}">
        <div v-show="nodeShow" class="state main active">
            <div class="ring-shape" style="margin-top: -90px; margin-left: -90px; height: 180px; width: 180px;"></div>
            <div class="center">
                <div class="button enabled selected" @click="minderOperate('Edit')">
                    <span class="label">编辑</span>
                    <span class="key">F2</span>
                </div>
            </div>
            <div class="ring">
                <div class="button enabled" @click="minderOperate('ArrangeUp')" style="left: 5.51091e-15px; top: -90px;">
                    <span class="label">前移</span>
                    <span class="key">Alt+Up</span>
                </div>
                <div class="button enabled" @click="minderOperate('AppendChildNode')" style="left: 77.9423px; top: -45px;">
                    <span class="label">下级</span>
                    <span class="key">Tab</span>
                </div>
                <div class="button enabled" @click="minderOperate('AppendSiblingNode')" style="left: 77.9423px; top: 45px;">
                    <span class="label">同级</span>
                    <span class="key">Enter</span>
                </div>
                <div class="button enabled" @click="minderOperate('ArrangeDown')" style="left: 5.51091e-15px; top: 90px;">
                    <span class="label">后移</span>
                    <span class="key">Alt+Down</span>
                </div>
                <div class="button enabled" @click="minderOperate('RemoveNode')" style="left: -77.9423px; top: 45px;">
                    <span class="label">删除</span>
                    <span class="key">Delete</span>
                </div>
                <div class="button enabled" @click="minderOperate('AppendParentNode')" style="left: -77.9423px; top: -45px;">
                    <span class="label">上级</span>
                    <span class="key">Shift+Tab</span>
                </div>
            </div>
            <div class="top" style="margin-left: -267.5px; margin-top: -200.5px;">
                <!-- <div class="button enabled">
                    <span class="label">撤销</span>
                    <span class="key">Ctrl + Z</span>
                </div>
                <div class="button">
                    <span class="label">重做</span>
                    <span class="key">Ctrl + Y</span>
                </div> -->
            </div>
            <div class="bottom" style="margin-left: -128px; margin-top: 159.5px;">
                <div @click="goShowPriority" class="button enabled">
                    <span class="label">优先级</span>
                    <span class="key">P</span>
                </div>
                <div @click="goShowProgress" class="button enabled">
                    <span class="label">进度</span>
                    <span class="key">G</span>
                </div>
            </div>
        </div>
        <div v-show="priorityShow" class="state priority">
            <div class="ring-shape" style="margin-top: -135px; margin-left: -135px; height: 270px; width: 270px;"></div>
            <div class="center">
                <div class="button enabled" @click="goSetPriority('')">
                    <span class="label">移除</span>
                    <span class="key">Del</span>
                </div>
            </div>
            <div class="ring">
                <div class="button enabled" @click="goSetPriority('1')" style="left: 8.26637e-15px; top: -135px;">
                    <span class="label">P1</span>
                    <span class="key">1</span>
                </div>
                <div class="button enabled" @click="goSetPriority('2')" style="left: 86.7763px; top: -103.416px;">
                    <span class="label">P2</span>
                    <span class="key">2</span>
                </div>
                <div class="button enabled" @click="goSetPriority('3')" style="left: 132.949px; top: -23.4425px;">
                    <span class="label">P3</span>
                    <span class="key">3</span>
                </div>
                <div class="button enabled" @click="goSetPriority('4')" style="left: 116.913px; top: 67.5px;">
                    <span class="label">P4</span>
                    <span class="key">4</span>
                </div>
                <div class="button enabled" @click="goSetPriority('5')" style="left: 46.1727px; top: 126.859px;">
                    <span class="label">P5</span>
                    <span class="key">5</span>
                </div>
                <div class="button enabled" @click="goSetPriority('6')" style="left: -46.1727px; top: 126.859px;">
                    <span class="label">P6</span>
                    <span class="key">6</span>
                </div>
                <div class="button enabled" @click="goSetPriority('7')" style="left: -116.913px; top: 67.5px;">
                    <span class="label">P7</span>
                    <span class="key">7</span>
                </div>
                <div class="button enabled" @click="goSetPriority('8')" style="left: -132.949px; top: -23.4425px;">
                    <span class="label">P8</span>
                    <span class="key">8</span>
                </div>
                <div class="button enabled" @click="goSetPriority('9')" style="left: -86.7763px; top: -103.416px;">
                    <span class="label">P9</span>
                    <span class="key">9</span>
                </div>
            </div>
            <div class="top" style="margin-left: -76px;margin-top: -240.5px;">
                <div class="button enabled" @click="closePriority">
                    <span class="label">返回</span>
                    <span class="key">esc</span>
                </div>
            </div>
            <div class="bottom" style="margin-left: 0px; margin-top: 270px;"></div>
        </div>

        <div v-show="progressShow" class="state progress">
            <div class="ring-shape" style="margin-top: -135px; margin-left: -135px; height: 270px; width: 270px;"></div>
            <div class="center">
                <div class="button enabled" @click="goSetProgress('')">
                    <span class="label">移除</span>
                    <span class="key">Del</span>
                </div>
            </div>
            <div class="ring">
                <div class="button enabled" @click="goSetProgress('0')" style="left: 8.26637e-15px; top: -135px;">
                    <span class="label">G0</span>
                    <span class="key">0</span>
                </div>
                <div class="button enabled" @click="goSetProgress('1')" style="left: 86.7763px; top: -103.416px;">
                    <span class="label">G1</span>
                    <span class="key">1</span>
                </div>
                <div class="button enabled" @click="goSetProgress('2')" style="left: 132.949px; top: -23.4425px;">
                    <span class="label">G2</span>
                    <span class="key">2</span>
                </div>
                <div class="button enabled" @click="goSetProgress('3')" style="left: 116.913px; top: 67.5px;">
                    <span class="label">G3</span>
                    <span class="key">3</span>
                </div>
                <div class="button enabled" @click="goSetProgress('4')" style="left: 46.1727px; top: 126.859px;">
                    <span class="label">G4</span>
                    <span class="key">4</span>
                </div>
                <div class="button enabled" @click="goSetProgress('5')" style="left: -46.1727px; top: 126.859px;">
                    <span class="label">G5</span>
                    <span class="key">5</span>
                </div>
                <div class="button enabled" @click="goSetProgress('6')" style="left: -116.913px; top: 67.5px;">
                    <span class="label">G6</span>
                    <span class="key">6</span>
                </div>
                <div class="button enabled" @click="goSetProgress('7')" style="left: -132.949px; top: -23.4425px;">
                    <span class="label">G7</span>
                    <span class="key">7</span>
                </div>
                <div class="button enabled" @click="goSetProgress('8')" style="left: -86.7763px; top: -103.416px;">
                    <span class="label">G8</span>
                    <span class="key">8</span>
                </div>
            </div>
            <div class="top" style="margin-left: -76px;margin-top: -240.5px;">
                <div class="button enabled" @click="closeProgress">
                    <span class="label">返回</span>
                    <span class="key">esc</span>
                </div>
            </div>
            <div class="bottom" style="margin-left: 0px; margin-top: 270px;"></div>
        </div>

    </div>
</template>
<script>
import EventListener from '../../../static/utils/EventListener'
export default{
    props: ['rightMenu'],
    data(){
    	return {
            nodeShow:true,
            priorityShow:false,
            progressShow:false
    	}
    },
    methods:{
    	hideMenu(){
            this.nodeShow = true;
            this.priorityShow = false;
            this.progressShow = false;
            this.$emit('hideRightMenu');
        },
        minderOperate(type){
            this.$emit("minderOperate",type);
            this.hideMenu();
        },
        goShowPriority(){
            this.nodeShow = false;
            this.priorityShow = true;
            this.progressShow = false;
        },
        closePriority(){
            this.nodeShow = true;
            this.priorityShow = false;
            this.progressShow = false;
        },
        goSetPriority(pri){//设置优先级
            this.$emit("minderPriority",pri);
            this.hideMenu();
        },
        goShowProgress(){
            this.nodeShow = false;
            this.priorityShow = false;
            this.progressShow = true;
        },
        closeProgress(){
            this.nodeShow = true;
            this.priorityShow = false;
            this.progressShow = false;
        },
        goSetProgress(progress){
            var result = null;
            if(progress){
                result  = parseInt(progress,10)+1;
            }
            this.$emit("minderProgress",result);
            this.hideMenu();
        }
    },
    mounted(){
        this._closeEvent = EventListener.listen(window, 'click', (e)=> {
            if (this.$el && !this.$el.contains(e.target)){
                this.hideMenu();
            }
        })
        this.num = this.total;
    }
    
}

</script>
