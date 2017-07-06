/**
 * Created by gogli on 06.07.17.
 */
    var currentDate = new Date();
    function getCurrentYear(){
        return currentDate.getFullYear();
    }
    function getCurrentMonth(){
        return currentDate.getMonth();
    }
    function getCurrentDay(){
        return currentDate.getDate();
    }
    var selectYear = document.getElementById("selectYear");
    for (i=1900; i<2100; ++i){
         var opt = document.createElement("option");
         opt.value = i;
         opt.innerHTML = i;
         selectYear.appendChild(opt);
     }
    var selectMonth = document.getElementById("selectMonth");
    var monthArray = ["January", "February", "March", "April", "May", "June",
        "July", "August","September", "October", "November", "December" ];
    for (i=0; i<=11; ++i){
    var opt = document.createElement("option");
    opt.value = monthArray[i];
    opt.innerHTML = monthArray[i];
    selectMonth.appendChild(opt);
    }

    function isLeap(year){   //nahanj tari a te che
        if( (year%400==0 || year%100!=0) &&(year%4==0)) return true; else return false;
    }

    function daysOfMonth(){
        var monthNumber = monthArray.indexOf(monthToShow);
        if (monthNumber == 0 || monthNumber == 2 || monthNumber == 4 || monthNumber == 6 || monthNumber == 7
            || monthNumber == 9 || monthNumber == 11) {
                return 31;
        }
        if (monthNumber == 1) {
            if (isLeap(yearToShow)) {
                return 29;
            } else {
                return 28;
            }
        }
        return 30;
    }

    function firstDayOfMonth() {
        if (isLeap(yearToShow) && (monthToShow == "January" || monthToShow == "February")){
            return (codeOfMonth() + codeOfYear()) % 7;
        }else {
            return (1 + codeOfMonth() + codeOfYear()) % 7;
        }
    }

    function codeOfYear() {
       var temp;
       if (yearToShow >= 1900 && yearToShow <= 1999) {
           temp = 0;
       } else {
           if (yearToShow >= 2000 && yearToShow <= 2099) {
                temp = 6;
           }
       }
       var lastNumbers = yearToShow % 100;
       return (temp + lastNumbers + Math.floor(lastNumbers/4)) % 7;
    }

    function codeOfMonth(){
        var monthNumber = monthArray.indexOf(monthToShow);
        switch (monthNumber){
            case 0:
            case 9: return 1; break;
            case 4: return 2; break;
            case 7: return 3;break;
            case 1:
            case 2:
            case 10: return 4; break;
            case 5: return 5;break;
            case 8:
            case 11: return 6;
            case 3:
            case 6: return 0;
        }
    }
    function isCurrent(){
       return (yearToShow == getCurrentYear() && monthArray.indexOf(monthToShow) == getCurrentMonth()
                        && day == getCurrentDay() ) ;
    }
    function changeBackground(){
        switch (monthToShow){
            case "December":
            case "January":
            case "February": document.body.style.backgroundImage = "url('winter.jpeg')";break;
            case "March":
            case "April":
            case "May": document.body.style.backgroundImage = "url('spring.jpg')";break;
            case "June":
            case "July":
            case "August": document.body.style.backgroundImage = "url('summer.jpg')";break;
            case "September":
            case "October":
            case "November": document.body.style.backgroundImage = "url('autumn.jpg')";break;
        }
    }

    selectMonth.addEventListener("change",drawCalendar);
    var yearToShow;
    var monthToShow;
    var day;
    function drawCalendar() {
        selectYear.addEventListener("change", drawCalendar);
        yearToShow = selectYear.value;
        monthToShow = selectMonth.value;
        changeBackground();
        var bodyTable = document.getElementById("bodyTable");
        bodyTable.innerHTML = "";
        var k = 0;
        day = 0;
        var flag = false;
        var i = 0;
        var row = bodyTable.insertRow(0);
        for (j = 0; j < 7; j++) {
            var cell = row.insertCell(j);
            if (firstDayOfMonth() == (j + 2) % 7) {
                k = 1;
            }
            if (k == 1) {
                day = day + 1;
                cell.innerHTML = day;
                if (isCurrent()){
                    cell.style.backgroundColor = "grey";
                }
            }
        }
        while (flag == false) {
            if (day == daysOfMonth()){
                break;
            }
            i = i + 1;
            var row = bodyTable.insertRow(i);
            for (j = 0; j < 7; j++) {
                day = day + 1;
                var cell = row.insertCell(j);
                if (day <= daysOfMonth()) {
                        cell.innerHTML = day;
                        if (isCurrent()){
                            cell.style.backgroundColor = "grey";
                        }
                    } else {
                        flag = true;
                    }
                }
            }
        }









