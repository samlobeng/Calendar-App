let appointments = []; //to store my appointments
//Create how many days we have in a month
function daysInThisMonth() {
  let now = new Date();

  //To calculate the last day of the current month,
  //We need to jump to the first day of the next month and subtract one day.
  let lastDateOfTheMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);
  let numberOfDays = lastDateOfTheMonth.getDate();

  return numberOfDays;
}

function showAppointments(index){
 let appointmentsToShow =  appointments[index] //get a particular appointment at a particular index
 let appointmentList = document.getElementById("appointment-list")
 
  appointmentList.innerHTML = "" //empty the appointment list before adding new one 
 for(let i=0; i<appointmentsToShow.length; i++){
   let listItem = document.createElement("li")
   listItem.innerHTML = appointmentsToShow[i]
   appointmentList.appendChild(listItem);
   
 }
 document.getElementById("appointments").style.display = "block";
}

window.onload = function () {

  //display the current month
  const dateObj = new Date()
  const monthName = dateObj.toLocaleString("default", { month: "long" })
  let month = document.getElementById("month");
  month.innerText = monthName;


  let numberOfDays = daysInThisMonth();

  //a reference to the calendar section of the html page
  let calendar = document.getElementById("calendar");

  for (let i = 0; i < numberOfDays; i++) {
    //creating the cells for the days
    let cell = document.createElement("div");
    cell.classList.add("day");

    //creating an h3 header with the number of days and appending it to the cells
    let day = document.createElement("h3");
    day.innerText = i + 1;
    cell.appendChild(day);

    calendar.appendChild(cell);

    appointments[i] = []; //pushing every appointments(an array of arrays)

    cell.onclick = function (event) {
      let alreadySelectedElement = document.getElementsByClassName("selected"); //alreadySelectedElement is an array containing all the cells with the 'selected' class at this moment in time.
      if (alreadySelectedElement.length > 0) {
        //if there is a selected cell, then lets remove the selected class from every other element
        for (let i = 0; i < alreadySelectedElement.length; i++) {
          alreadySelectedElement[i].classList.remove("selected");
        }
      }
      event.currentTarget.classList.add("selected"); //adding a class to the selected number

      let clickOnADay = document.getElementById("meeting-day");
      clickOnADay.textContent = i + 1; //event.currentTarget.children[0].innerText;

      //output the events/appointments
      let todayAppointments = appointments[i]
      if(todayAppointments.length>0){
        showAppointments(i)
      }
      else{
        console.log("No events for today");
        document.getElementById('appointments').style.display  = "none";
      }
    };
  }
};

function saveMeeting() {
  let meetingDay = document.getElementById("meeting-day").innerText;
  let meetingTime = document.getElementById("meeting-time").value;
  let meetingName = document.getElementById("meeting-name").value;

  // console.log(meetingDay);
  // console.log(meetingTime);
  // console.log(meetingName);

  let eventString = meetingTime + ' - ' + meetingName; //saving meeting time and name 
  appointments[parseInt(meetingDay)-1].push(eventString); // pushing the details into a particular position in the appointment array

  showAppointments(meetingDay - 1); //show appointment at runtime

}
