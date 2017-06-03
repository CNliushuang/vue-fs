<template>
  	<div class="project_container">
  		<full-calendar></full-calendar>
  	</div>
</template>
<style>
	.project_container{
		height: 100%;
		padding: 20px 10px 0 10px;
	}
</style>
<script>
import FullCalendar from '../../widget/calendar/FullCalendar.vue'
export default {
  components: {
  	FullCalendar
  }
}
</script>
