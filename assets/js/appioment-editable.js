
mobiscroll.setOptions({
  theme: "ios",
  themeVariant: "light",
});

function hasOverlap(event, inst) {
  var events = inst
    .getEvents(event.start, event.end)
    .filter(function (e) {
      return e.id !== event.id && e.resource === event.resource;
    });
  return events.length > 0;
}

var externalCont = document.getElementById("md-docs-appointment-cont");
var now = new Date();
var today = new Date(now.setMinutes(59));
var yesterday = new Date(
  now.getFullYear(),
  now.getMonth(),
  now.getDate() - 1
);

var myData = [
  {
    id: "job1",
    start: "2023-09-19T14:00",
    end: "2023-09-19T16:00",
    resource: 1,
    title: "Myla Bennett aligf",
    job: "Wisdom tooth removal",
    color: "#334ab9",
  },
  {
    id: "job2",
    start: "2023-09-19T17:00",
    end: "2023-09-19T18:30",
    resource: 1,
    title: "Beatrix Foley",
    job: "Braces",
    color: "#177e70",
  },
  {
    id: "job3",
    start: "2023-09-19T08:00",
    end: "2023-09-19T09:30",
    resource: 3,
    title: "Frank Watson",
    job: "Teeth whitening",
    color: "#d1891f",
  },
  {
    id: "job4",
    start: "2023-09-19T10:00",
    end: "2023-09-19T12:30",
    resource: 3,
    title: "Jaime Joyce",
    job: "Root canal treatment",
    color: "#cb3939",
  },
  {
    id: "job5",
    start: "2023-09-19T13:00",
    end: "2023-09-19T14:00",
    resource: 3,
    title: "Corey Shepard",
    job: "Tooth extraction",
    color: "#aba343",
  },
  {
    id: "job6",
    start: "2023-09-19T14:00",
    end: "2023-09-19T16:00",
    resource: 4,
    title: "Callie Leonard",
    job: "Crown and bridge",
    color: "#1ca11a",
  },
  {
    id: "job7",
    start: "2023-09-19T17:00",
    end: "2023-09-19T18:00",
    resource: 4,
    title: "Harley Thomson",
    job: "Tartar removal",
    color: "#a446b5",
  },
  {
    id: "job8",
    start: "2023-09-19T09:00",
    end: "2023-09-19T11:00",
    resource: 6,
    title: "Ricky Welch",
    job: "Wisdom tooth removal",
    color: "#334ab9",
  },
];

for (var i = 0; i < myData.length; ++i) {
  var event = myData[i];
  // convert dates to date objects
  event.start = event.start ? new Date(event.start) : event.start;
  event.end = event.end ? new Date(event.end) : event.end;
  // mark past events as fixed by setting the event.editable property to false
  event.editable = event.start && today < event.start;
}

var myCalendar = mobiscroll.eventcalendar(
  "#md-docs-appointment-calendar",
  {
    // timezonePlugin: mobiscroll.momentTimezone,
    dataTimezone: 'utc',
    displayTimezone: 'local',
    // timezonePlugin: mobiscroll.momentTimezone,   
    view: {
      schedule: {
        type: "day",
        startTime: "08:00",
        endTime: "20:00",
        allDay: false,
      },
      
    },
    data: myData,
    resources: [
      {
        id: 1,
        name: "Dr. Keila Delores",
        img: 'https://img.mobiscroll.com/demos/m1.png',
      },
      {
        id: 2,
        name: "Dr. Gene Cortez",
        img: 'https://img.mobiscroll.com/demos/f1.png',
      },
      {
        id: 3,
        name: "Dr. Paula Bush",
        img: 'https://img.mobiscroll.com/demos/m2.png',
      },
      {
        id: 4,
        name: "Dr. Pete Nichols",
        img: 'https://img.mobiscroll.com/demos/m1.png',
      },
      {
        id: 5,
        name: "Dr. Jean Pearson",
        color: "#8f1ed6",
        img: 'https://img.mobiscroll.com/demos/f1.png',
      },
      {
        id: 6,
        name: "Dr. Thelma Cain",
        img: 'https://img.mobiscroll.com/demos/m2.png',
      },
    ],
    invalid: [
      {
        recurring: {
          repeat: "daily",
          until: yesterday,
        },
      },
      {
        start: yesterday,
        end: today,
      },
    ],
    dragToMove: true,
    dragToCreate: true,
    externalDrop: true,
    externalDrag: true,
    extendDefaultEvent: function () {
      return {
        job: "Tartar removal",
        color: "#a446b5",
      };
    },
    onEventCreate: function (args, inst) {
      var event = args.event;
      event.unscheduled = false;
      myCalendar.setOptions({
        colors: [],
      });
      if (hasOverlap(event, inst)) {
        mobiscroll.toast({
          message: "Make sure not to double book",
        });
        return false;
      } else if (!(today < event.start)) {
        mobiscroll.toast({
          message: "Can't add event in the past",
        });
      } else {
        // event.unscheduled = false;
        mobiscroll.toast({
          message: args.event.title + " added",
        });
        var elm = document.getElementById("md-event-" + args.event.id);
        if (elm) {
          elm.remove();
        }
      }
    },
    onEventDelete: function (args, inst) {
      mobiscroll.toast({
        message: args.event.title + " unscheduled",
      });
    },
    onEventDragEnter: function (args) {
      myCalendar.setOptions({
        colors: [
          {
            background: "#f1fff24d",
            start: "08:00",
            end: "20:00",
            recurring: {
              repeat: "daily",
            },
          },
        ],
      });
    },
    onEventDragLeave: function () {
      myCalendar.setOptions({
        colors: [],
      });
    },
    renderResource: function (resource) {  // More info about renderResource: https://docs.mobiscroll.com/5-26-2/javascript/eventcalendar#opt-renderResource
        return '<div class="header-resource-template-content">' +
            '<img class="header-resource-avatar" src="' + resource.img + '"/>' +
            '<div class="header-resource-name">' + resource.name + '</div>' +
            '</div>';
    },
  }
);

mobiscroll.dropcontainer("#md-docs-appointment-cont", {
  onItemDrop: function (args) {
    if (args.data) {
      var event = args.data;
      var eventLength =
        Math.abs(new Date(event.end) - new Date(event.start)) /
        (60 * 60 * 1000);
      var elm = document.createElement("div");

      elm.setAttribute("id", "md-event-" + event.id);
      elm.classList.add("docs-appointment-task");
      elm.style.background = event.color;
      elm.innerHTML =
        "<div>" +
        event.title +
        " - " +
        event.job +
        "</div><div>" +
        eventLength +
        " hour" +
        (eventLength > 1 ? "s" : "") +
        "</div>";

      event.unscheduled = true;

      document.getElementById("md-docs-tasks").appendChild(elm);

      mobiscroll.draggable("#md-event-" + event.id, {
        dragData: event,
      });
    }
    externalCont.style.backgroundColor = "";
  },
  onItemDragEnter: function (args) {
    if (!(args.data && args.data.unscheduled)) {
      externalCont.style.backgroundColor = "#d0e7d2cc";
    }
  },
  onItemDragLeave: function (args) {
    externalCont.style.backgroundColor = "";
  },
});



// other js 

const mbscButtons = document.getElementsByClassName('mbsc-calendar-button');
const mbscButtonsArray = Array.from(mbscButtons);
mbscButtonsArray.forEach(function(trigger) {
    if(trigger.classList.contains('mbsc-calendar-button-prev')){
        const span = document.createElement('span');
        span.textContent = 'Previous';
        trigger.appendChild(span);
    }
    if(trigger.classList.contains('mbsc-calendar-button-next')){
        const span = document.createElement('span');
        span.textContent = 'Next';
        trigger.appendChild(span);
    }
   
});