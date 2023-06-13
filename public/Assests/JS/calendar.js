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

// Generating Dates per Month
const glassCalendar = () => {
	// Get data from res.render()
	var tasksDataElement = document.querySelector(".data").innerHTML;
	var tasks = JSON.parse(tasksDataElement); 
	currentDate();

	let days = '';
	let lastDay =
		32 - new Date(date.getFullYear(), date.getMonth(), 32).getDate();
	const emptyDates = date.getDay();

	// For lopp to iterates empty spot where there's no date.
	for (let x = emptyDates; x > 0; x--) {
		days += `<span></span>`;
	}

	// For lopp to iterates through month to generate days & today's date.
	for (let i = 1; i <= lastDay; i++) {
		detect = false;

		for(let j = 0; j < tasks.length ;j++){
			if(i === new Date(tasks[j].date).getDate()){
				days += `<span class="redmark">${i}</span>`;
				detect = true;
				break;
			}
		}
		if (
			i === new Date().getDate() &&
			date.getMonth() === new Date().getMonth()
		) {
			days += `<span class="today">${i}</span>`;
		} else {
			if(!detect){
				days += `<span>${i}</span>`;
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

			show_form.getElementsByTagName("p")[0].innerHTML = tasks[i].title;
			show_form.getElementsByTagName("p")[1].innerHTML = tasks[i].description;
			show_form.getElementsByTagName("p")[2].innerHTML = new Date(tasks[i].date).getDate() + "/" + (Number(new Date(tasks[i].date).getMonth()) + 1 )+ "/" + new Date(tasks[i].date).getFullYear();
			show_form.getElementsByTagName("p")[3].innerHTML = tasks[i].progress_level + "%";
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
prevBtn.addEventListener('click', () => {
	date.setMonth(date.getMonth() - 1);
	glassCalendar();
});

nxtBtn.addEventListener('click', () => {
	date.setMonth(date.getMonth() + 1);
	glassCalendar();
});



