const newMonth = document.getElementById('cal__month');
const dateDisplay = document.getElementById('cal__date');
const allDates = document.getElementById('cal__days');
const prevBtn = document.getElementById('back__arrow');
const nxtBtn = document.getElementById('next__arrow');
const timeDisplay = document.getElementById('cal__time');

const date = new Date();

// Current Date Display
currentDate = () => {
	const twelveMonths = [
		'January',
		'February',
		'March',
		'April',
		'May',
		'June',
		'July',
		'August',
		'September',
		'October',
		'November',
		'December',
	];

	const sevenDays = [
		'Sunday',
		'Monday',
		'Tuesday',
		'Wednesday',
		'Thursday',
		'Friday',
		'Saturday',
	];
	const date__weekDay = sevenDays[date.getDay()];
	const date__day = date.getDate();
	const date__year = date.getFullYear();

	newMonth.innerHTML = twelveMonths[date.getMonth()];
	dateDisplay.innerHTML = `${date__weekDay} ${date__day}, ${date__year}`;
};
currentDate();

// Current Time Display
const showTime = () => {
	let time = new Date();
	let hour = time.getHours();
	let min = time.getMinutes();
	let sec = time.getSeconds();
	am_pm = 'AM';
	if (hour > 12) {
		hour -= 12;
		am_pm = 'PM';
	}
	if (hour == 0) {
		hr = 12;
		am_pm = 'AM';
	}
	if (min < 10) {
		min = '0' + min;
	}
	let currentTime = `${hour}:${min} ${am_pm}`;
	timeDisplay.innerHTML = currentTime;
};
setInterval(showTime, 1000);

// Get data from res.render()
var tasksDataElement = document.querySelector(".data").innerHTML;
var tasks = JSON.parse(tasksDataElement); 

// Generating Dates per Month
const glassCalendar = () => {
	currentDate();

	let days = '';
	let lastDay = 32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();

	const emptyDates = new Date(date.getFullYear(), date.getMonth(),1).getDay();

	// For lopp to iterates empty spot where there's no date.
	for (let x = emptyDates; x > 0; x--) {
		days += `<span></span>`;
	}

	// json for collecting the tasks
	// json for collecting the tasks
	const task_collection = {
		index_collection: {}
	};
	let index_collection = 0;
	
	// For loop to iterate through each day
	for (let i = 1; i <= lastDay; i++) {
		let detect = false;
	
		for (let j = 0; j < tasks.length; j++) {
		if (
			i === new Date(tasks[j].date).getDate() &&
			date.getMonth() === new Date(tasks[j].date).getMonth()
		) {
			detect = true;
			let key = 'key' + index_collection;
			let value = [
			tasks[j].title,
			tasks[j].description,
			tasks[j].date,
			tasks[j].progress_level
			];
			task_collection.index_collection[key] = value;
	
			index_collection++;
			break;
		}
		}
		if(!detect){
			if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
				days += `<span class="today">${i}</span>`;
			}
			else{
				days += `<span>${i}</span>`;
			}
		}
		else{
			if (i === new Date().getDate() && date.getMonth() === new Date().getMonth()){
				days += `<span class="redmark today">${i}</span>`;
			}
			else{
				days += `<span class="redmark">${i}</span>`;
			}
		}

		allDates.innerHTML = days;
	}

	// click tasks event
	let task_mark = document.getElementsByClassName("redmark");
	for(let i = 0; i < tasks.length;i++){
		task_mark[i].onclick = function(){
			var box = document.getElementById("popup_box");
			var form_container = document.getElementById("show_form_container");
			var show_form = document.getElementById("show_form");

			box.style.display = "block";
			form_container.style.display = "block";

			var json_key = "key" + i;

			show_form.getElementsByTagName("p")[0].innerHTML = task_collection.index_collection[json_key][0];
			show_form.getElementsByTagName("p")[1].innerHTML = task_collection.index_collection[json_key][1];
			show_form.getElementsByTagName("p")[2].innerHTML = new Date(task_collection.index_collection[json_key][2]).getDate() + "/" + (Number(new Date(task_collection.index_collection[json_key][2]).getMonth()) + 1 )+ "/" + new Date(task_collection.index_collection[json_key][2]).getFullYear();
			show_form.getElementsByTagName("p")[3].innerHTML = task_collection.index_collection[json_key][3] + "%";
			document.body.style.background = "#555";
		};
	}
};
glassCalendar();

function closeTask(){
	var box = document.getElementById("popup_box");
	var form_container = document.getElementById("show_form_container");
	var show_form = document.getElementById("show_form");

	box.style.display = "none";
	form_container.style.display = "none";
	document.body.style.background = "#fff";
}

// Added event listener to buttons for
function previous() {  
	date.setMonth(date.getMonth() - 1);
	glassCalendar();
};

function next(){
	date.setMonth(date.getMonth() + 1);
	glassCalendar();
};



