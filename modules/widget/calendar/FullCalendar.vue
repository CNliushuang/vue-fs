<style src="fullcalendar/dist/fullcalendar.min.css"></style>
<template>
  	<div id="full-calendar" class="full-calendar">
  		<div id="calendar"></div>
  	</div>
</template>
<style>
	.full-calendar{
		height: 100%;
	}
</style>
<script>
import fullcalendar from 'fullcalendar'
import locale from 'fullcalendar/dist/locale-all.js'

export default{
    props: [],
    methods:{
    	createCalendar(){
    		var _this = this;
			$('#calendar').fullCalendar({
				customButtons: {//自定义按钮
			        myCustomButton: {
			            text: '删除一个event',
			            click: function() {
			                $('#calendar').fullCalendar( 'removeEvents',['first'] );
			            }
			        }
			    },
			    views: {
			        agendaFourDay: {
			            type: 'agenda',
			            duration: { days: 4 },
			            buttonText: '最近4天'
			        }
			    },
				header: {//header头部设置
		            left: 'prev,next, today myCustomButton ',
		            center: 'prevYear title nextYear',
		            right: 'agendaFourDay month,,agendaWeek,agendaDay,listYear,listMonth,listWeek,listDay'//basicWeek,basicDay,listYear
		        },
		        footer: {//footer尾部设置
		            left: 'prev,next, today myCustomButton',
		            center: 'prevYear title nextYear',
		            right: 'month,agendaWeek,agendaDay'
		        },
		        buttonIcons:{//针对按钮添加特殊的class,以便自己自定义样式，前提是没有使用主题的情况下，使用主题用themeButtonIcons代替
				    prev: 'left-single-arrow',
				    next: 'right-single-arrow',
				    prevYear: 'left-double-arrow',
				    nextYear: 'right-double-arrow'
				},
				buttonText:{
					listYear:"年日程",
					listMonth:"月日程",
					listWeek:"周日程"
				},
				// theme:true,//主题，需要自己下载主题包
				// themeButtonIcons:{//更换主题icons
				// 	prev: 'circle-triangle-w',
				//     next: 'circle-triangle-e',
				//     prevYear: 'seek-prev',
				//     nextYear: 'seek-next'
				// },
		        firstDay: 1,//定义每周的开始
		        // isRTL:true,//日期从左开始还是从右开始，默认false,从左开始
		        // weekends:false,//是否显示周六日，默认true
		        // hiddenDays: [ 2, 4 ], // 隐藏 Tuesdays and Thursdays
		        // weekNumbers:true,显示第几周
		        // height: 650,//设置高度
		        eventLimit: true, // for all non-agenda views
			    // views: {
			    //     agenda: {
			    //         eventLimit: 6 // adjust to 6 only for agendaWeek/agendaDay
			    //     }
			    // },
			    // defaultView: 'agenda',
			    // duration: { days: 3 },
			    defaultView:'month',
			    allDaySlot:true,
		        allDayText:'全天',
		        locale: 'zh-cn',
		        defaultDate: new Date(),
		        // nowIndicator:true,//Whether or not to display a marker indicating the current time.
		        navLinks: true, // can click day/week names to navigate views
		        selectable: true,
		        selectHelper: true,
		        select: function (start, end) {
		            var title = prompt('Event Title:');
		            var eventData;
		            if (title) {
		              eventData = {
		                title: title,
		                start: start,
		                end: end,
		                color:'orange',
		                textColor:'black'
		              };
		              $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
		            }
		            $('#calendar').fullCalendar('unselect');
		        },
		        editable: true,
		        viewRender:function(view, element){//切换视图或者日期时触发，可据此分时间取数据
		        	console.log("viewRender");
		        	console.log(view);
		        	console.log(element);
		        },
		        viewDestroy:function(view, element){
		        	console.log("viewDestroy");
		        	console.log(view);
		        	console.log(element);
		        },
		        // dayRender:function(date, cell){//日渲染，貌似没啥用
		        // 	console.log("dayRender");
		        // 	console.log(date);
		        // 	console.log(cell);
		        // },
		        windowResize: function(view) {//不如自己监听效果圆滑
			        // _this.setCalendarHeight();
			    },
			    dayClick: function(date, jsEvent, view) {//点击某天
			        console.log('Clicked on: ' + date.format());
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('Current view: ' + view.name);
			        // change the day's background color just for fun
			        $(this).css('background-color', 'pink');

			    },
			    eventClick: function(calEvent, jsEvent, view) {//点击某个event
			        console.log('eventClick: ' + calEvent.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			        // change the border color just for fun
			        $(this).css('border-color', 'red');

			    },
			    eventDragStart: function(calEvent, jsEvent, view) {
			        console.log('eventDragStart: ' + calEvent.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			        // change the border color just for fun
			    },
			    eventDragStop: function(calEvent, jsEvent, view) {
			        console.log('eventDragStop: ' + calEvent.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			        // change the border color just for fun
			    },
			    eventDrop:function( event, delta, revertFunc, jsEvent, ui, view ) { 
			    	console.log('eventDrop: ' + event.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			    },
			    eventResizeStart: function(event, jsEvent, ui, view) {
			        console.log('eventResizeStart: ' + event.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			        // change the border color just for fun
			    },
			    eventResizeStop: function(event, jsEvent, ui, view) {
			        console.log('eventResizeStop: ' + event.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			        // change the border color just for fun
			    },
			    eventResize:function( event, delta, revertFunc, jsEvent, ui, view ) { 
			    	console.log('eventResize: ' + event.title);
			        console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        console.log('View: ' + view.name);
			    },
			    eventMouseover:function(calEvent, jsEvent, view) {//点击某个event
			        // console.log('Event: ' + calEvent.title);
			        // console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        // console.log('View: ' + view.name);
			        // change the border color just for fun
			        $(this).css('background', 'green');
			        $(this).css('color', 'black');

			    },
			    eventMouseout:function(calEvent, jsEvent, view) {//点击某个event
			        // console.log('Event: ' + calEvent.title);
			        // console.log('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
			        // console.log('View: ' + view.name);
			        // change the border color just for fun
			        $(this).css('background', '#3a87ad');
			        $(this).css('color', 'white');

			    },
				events: [
					{
						id:'first',
						title: 'All Day Event',
						start: '2017-05-01',
						color:'orange',
						textColor:'black'
					},
					{
						title: 'Long Event',
						start: '2017-05-07',
						end: '2017-05-10'
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: '2017-05-09T16:00:00'
					},
					{
						id: 999,
						title: 'Repeating Event',
						start: '2017-05-16T16:00:00'
					},
					{
						title: 'Conference',
						start: '2017-05-11',
						end: '2017-05-13'
					},
					{
						title: 'Meeting',
						start: '2017-05-12T10:30:00',
						end: '2017-05-12T12:30:00'
					},
					{
						title: 'Lunch',
						start: '2017-05-12T12:00:00'
					},
					{
						title: 'Meeting',
						start: '2017-05-12T14:30:00'
					},
					{
						title: 'Happy Hour',
						start: '2017-05-12T17:30:00'
					},
					{
						title: 'Dinner',
						start: '2017-05-12T20:00:00'
					},
					{
						title: 'Birthday Party',
						start: '2017-05-13T07:00:00'
					},
					{
						title: 'Click for Google',
						url: 'http://google.com/',
						start: '2017-05-28'
					}
				],
			});

			this.setCalendarHeight();
			$(window).resize(() => {
				this.setCalendarHeight();
			})
				
    	},
    	setCalendarHeight(){
    		var height = $('#full-calendar').height();
    		$('#calendar').fullCalendar('option', 'height', height);
    		$('#calendar').fullCalendar('option', 'contentHeight', height - 130);
    	}

    },
    mounted(){
    	this.createCalendar();
    }
    
}

</script>
