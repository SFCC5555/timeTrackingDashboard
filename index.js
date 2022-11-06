let main = document.querySelector("main");

let dailyButton = document.querySelector(".dailyButton");
let weeklyButton = document.querySelector(".weeklyButton");
let monthlyButton = document.querySelector(".monthlyButton");




fetch("./data.json")
    .then(response => response.json())
    .then(data => {

        dailyButton.addEventListener("click",renderData);
        weeklyButton.addEventListener("click",renderData);
        monthlyButton.addEventListener("click",renderData);
        
        for (activity of data) {
            
            activityMainContainer=document.createElement("section");
            activityMainContainer.setAttribute("class","activityMainContainer");
            activityMainContainer.setAttribute("id",activity.title.toLowerCase().replace(/ /g,""));
            main.appendChild(activityMainContainer);

            activityDataContainer=document.createElement("div");
            activityDataContainer.setAttribute("class","activityDataContainer");
            activityMainContainer.appendChild(activityDataContainer);


            activityDataBlockOne=document.createElement("div");
            activityDataBlockOne.setAttribute("class","activityDataBlockOne");
            activityDataContainer.appendChild(activityDataBlockOne);

            activityName=document.createElement("div");
            activityName.setAttribute("class","activityName");
            activityName.innerText=activity.title;
            activityDataBlockOne.appendChild(activityName);

            menuIcon=document.createElement("span");
            menuIcon.setAttribute("class","menuIcon");
            activityDataBlockOne.appendChild(menuIcon);

            activityDataBlockTwo=document.createElement("div");
            activityDataBlockTwo.setAttribute("class","activityDataBlockTwo");
            activityDataContainer.appendChild(activityDataBlockTwo);

            time=document.createElement("div");
            time.setAttribute("class","time");

            activityDataBlockTwo.appendChild(time);

            last=document.createElement("div");
            last.setAttribute("class","last");
            activityDataBlockTwo.appendChild(last);

        }
        
        function renderData(event) {
            
            if (event==undefined) {
                option = "weekly";

            }

            else {
                option = event.target.textContent.toLowerCase()
                optionElement = event.target 
            }

            let timeList = document.querySelectorAll(".time");
            let lastList = document.querySelectorAll(".last");

            count=-1

            for (activity of data) {
                count++

                if (option=="daily") {
                    timeList[count].innerText=activity.timeframes.daily.current+"hrs";
                    lastList[count].innerText="Last Day - "+activity.timeframes.daily.previous+"hrs";
                    dailyButton.setAttribute("style","color:hsl(236, 100%, 87%)");
                    weeklyButton.removeAttribute("style");
                    monthlyButton.removeAttribute("style");

                }

                else if (option=="weekly") {
                    timeList[count].innerText=activity.timeframes.weekly.current+"hrs";
                    lastList[count].innerText="Last Week - "+activity.timeframes.weekly.previous+"hrs";
                    weeklyButton.setAttribute("style","color:hsl(236, 100%, 87%)");
                    dailyButton.removeAttribute("style");
                    monthlyButton.removeAttribute("style");
                }

                else if (option=="monthly") {
                    timeList[count].innerText=activity.timeframes.monthly.current+"hrs";
                    lastList[count].innerText="Last Month - "+activity.timeframes.monthly.previous+"hrs";
                    monthlyButton.setAttribute("style","color:hsl(236, 100%, 87%)");
                    weeklyButton.removeAttribute("style");
                    dailyButton.removeAttribute("style");
                }


            }
        }

        renderData()

    })

