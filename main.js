(() => document.addEventListener('DOMContentLoaded', () => {

    let helpers = {
        months: [
            "January",
            "February",
            "March",
            "April",
            "May",
            "June",
            "July",
            "August",
            "September",
            "October",
            "November",
            "December"
        ],
        today: new Date(),
        days: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
        // time: ['00:00AM', '12:00PM']
    }

    let model = {
        day: helpers.today.getDate(),
        month: helpers.today.getMonth(),
        year: helpers.today.getFullYear(),
        daysInMonth: (month, year) => new Date(year, month + 1, 0).getDate(),
        
        leftArrow: document.querySelector('#l-arrow'),
        rightArrow: document.querySelector('#r-arrow'),
        eventInput: document.querySelector('#eventInput'),
        
        leftArrowListener: () => {
            model.leftArrow.addEventListener('click', () => {
                model.month !== 0 ? model.month-- : model.month = 11;
                model.year = model.month === 11 ? model.year-1 : model.year;
                controller.init();  
            })
        },

        rightArrowListener: () => {
            model.rightArrow.addEventListener('click', () => {
                model.month !==11 ? model.month++ : model.month = 0;
                model.year = model.month === 0 ? model.year+1 : model.year;
                controller.init();  
            })
        },

        eventInputListener: (e) => {
            if(e) {
                model.eventInput.addEventListener('change', () => {
                    const value =+ e.target.value; 
                    console.log(value)
                })
            }
            
        },

        cellClickListeners: (e) => {
            if(e) {
                const cell = document.querySelector(`${e.target.id}`);
                const reminder = document.querySelector('.reminder');
                reminder.style.display = 'block';
                model.eventInputListener(e);
            }
            
        },

        listeners: () => {
            model.leftArrowListener();
            model.rightArrowListener();
            model.cellClickListeners();
            model.eventInputListener();
        },


    }

    let view = {
        counter:1,
        createUI: () => {
            // above navigations
            const currentMonth = document.querySelector('#current-month');
            const currentYear = document.querySelector('#current-year');
            currentMonth.innerHTML = helpers.months[model.month];
            currentYear.innerHTML = model.year;
            let calendar = document.querySelector('.calendar');
            let days = document.querySelector('.days');
            // calendar
            this.firstDay = new Date(model.year, model.month).getDay();
            this.indexCounter = this.firstDay;
            this.totalDaysInMonth = model.daysInMonth( model.month, model.year);
            // remove older nodes
            let myNode = calendar;
            while (myNode.firstChild) {
                myNode.removeChild(myNode.firstChild);
                view.counter =1;
            }

            //create new nodes
            
            for(let i=0; i<7; i++) {
                cell = document.createElement('li');
                cell.classList.add('cell');
                cell.innerHTML = helpers.days[i];
                calendar.appendChild(cell);
            }

            for (let j=0; j<(this.totalDaysInMonth+this.firstDay); j++) {
                cell = document.createElement('li');
                cell.classList.add('cell');
                cell.setAttribute('id', `cell_${j}`);
                cell.innerHTML = '';
                // cell.addEventListener('click', (e) => {
                //     model.cellClickListeners(e)
                // })
                
                calendar.appendChild(cell);
            }
            while(this.totalDaysInMonth--) {
                const li = document.querySelector(`#cell_${this.indexCounter}`);
                li.innerHTML = view.counter;    
                view.counter++;
                this.indexCounter++;
                
            }

            if(new Date().getMonth() === model.month && new Date().getFullYear() === model.year) {
                const todayIndex = new Date().getDay();
                const todayCell = document.querySelector(`#cell_${todayIndex}`)
                todayCell.classList.add('active');
            }
            
        },
        
        
    }

    let controller = {
        init:() => view.createUI(),

        daysInMonth: (month, year) => new Date(year, month + 1, 0).getDate()
        
    }

    controller.init();
    model.listeners();
    

}, true))()
