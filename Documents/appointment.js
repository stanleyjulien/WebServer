$(document).ready(
    function () {
        $("#divForm").hide();

        $("#idBtnNew").click(
            function () {
                $("#idBtnNew").hide();
                $("#divForm").show();
            }
        );

        $("#idBtnCancel").click(
            function () {
                $("#idBtnNew").show();
                $("#divForm").hide();
                $("#idDivError").empty();
            }
        );

        $("p").click(function () {
            $(this).hide();
        });

        $("#idBtnSearch").click(function () {
            getAppointments();

        }
        );

        $("#idBtnAdd").click(function(){
            addAppointment();
        }

        );

        //$('#idDate').attr('min', todayDate());

        /*$("#idDescription").on("input", function(){
            var desc = $(this).val();
            console.log(desc);
            if(desc){
                $(this).removeClass("invalid").addClass("valid");
            }
            else{
                $(this).removeClass("valid").addClass("invalid");
            }
            }
        
        );*/
        
        $("#formSubmit button").click( function(event){
            var formData=$("#idForm").serializeArray();

            var today = new Date(); // get the current date
            var error = false;
            var desc = $("#idDescription").val();
            var time = $("#idTime").val();
            var date = $("#idDate").val();
            var descMessage = $("<span></span> <br />");
            var timeMessage = $("<span></span> <br />");
            var dateMessage = $("<span></span> <br />");
            //alert(desc);
            console.log(today+"="+date+"="+todayDate());
            console.log(typeof(date));
            console.log(typeof(todayDate()));
            console.log(date>=todayDate());
            $("#idDivError").empty();
            if(!desc)
            {
                error = true;
                descMessage.text("Description can't be empty!");
                //$("#idDivError").append(addMessage);
            }
            if(!time)
            {
                error = true;
                timeMessage.text("Time can't be empty!");
                //$("#idDivError").append(addMessage);
            }
            if(!date)
            {
                error = true;
                dateMessage.text("Date can't be empty!");
                //$("#idDivError").append(addMessage);
            }
            else if(date<todayDate())
            {
                error = true;
                dateMessage.text("Date can't be less than today!");
            }
            
            
            $("#idDivError").append(dateMessage, timeMessage, descMessage);
            //alert(desc + ":"+time+":"+date+":"+error);
            
            

            if (error){
                event.preventDefault(); 
                //console.log(event.preventDefault());
            }
            else{
                //alert('No errors: Form will be submitted');
                console.log('No errors: Form will be submitted');
            }

            }
                        
        );

        getAppointments();

    }
);

function getAppointments() {
    $("#divDebuging").load("cgi-bin/appointment.pl");

    $.ajax({
        type: 'GET',
        url: 'cgi-bin/appointment.pl',
        dataType: 'json',
        //data: { action: "request", pam: "test" },
        success: function (data) {
            $("tbody").empty();

            var txtSearch = $("#idTxtSearch").val();
            console.log(data.entries);
            var dataJson = data.entries;
            console.log(typeof (dataJson));
            console.log(dataJson.date);
            console.log(dataJson);
            console.log(dataJson["1"]["description"]);

            var dateObj = {
                Jan : "01", Feb : "02", Mar : "03", Apr : "04", May : "05",
                Jun : "06", Jul : "07", Aug : "08", Sep : "09", Oct : "10",
                Nov : "11", Dec : "12"
            }

            for (var key1 in dataJson) {
                //Do stuff here
                //var desc = dataJson2["description"];
                var dataJson2 = dataJson[key1];
                var desc = dataJson2["description"];
                console.log(dataJson2["date"]);
                var tableLine = $("<tr></tr>");
                var dateName="";
                for(var key in dateObj)
                {
                    var d = dateObj[key];
                    var date = dataJson2["date"];
                    var month = date.slice(5, 7);
                    var day = Number(date.slice(8, 10));
                    //console.log(typeof(s));
                    //console.log(s.slice(5, 7));
                    if(dateObj[key] == month){
                        dateName = key+ " "+day;
                    }
                }
                getTime = dataJson2["time"];
                timeSplit = getTime.split(":");
                var hours = timeSplit[0];
                var minutes = timeSplit[1];
                if (hours > 12) {
                  meridian = 'pm';
                  hours -= 12;
                } 
                else if (hours < 12) {
                  meridian = 'am';
                  if (hours == 0) {
                    hours = 12;
                  }
                }
                else {
                  meridian = 'pm';
                }
                //alert(hours + ':' + minutes + meridian);
                var timeFormat = Number(hours) + ':' + minutes + meridian;
                //alert(timeSplit);
                //var date = $("<td></td>").text(dataJson2["date"]);
                var date = $("<td></td>").text(dateName);
                //var time = $("<td></td>").text(dataJson2["time"]);
                var time = $("<td></td>").text(timeFormat);
                var description = $("<td></td>").text(dataJson2["description"]);

                if (typeof (txtSearch) == 'undefined' || txtSearch == null || txtSearch.length == 0) {
                    $("tbody").append(tableLine);
                    $(tableLine).append(date, time, description);
                }
                //else if(desc.includes(txtSearch))
                else if (desc.search(txtSearch) != -1) {
                    $("tbody").append(tableLine);
                    $(tableLine).append(date, time, description);
                }


            }
        },
        error: function () {
            //alert("Handle Errors here");
            console.log("Handle Errors here");
        },
        complete: function () {
        }
    });
}

function addAppointment()
{
    var date = $("#idDate").val();
    var time = $("#idTime").val();
    var description = $("#idDescription").val();
    console.log(date);
}

function todayDate() {
    var today = new Date(); // get the current date
    var dd = today.getDate(); //get the day from today.
    var mm = today.getMonth()+1; //get the month from today +1 because january is 0!
    var yyyy = today.getFullYear(); //get the year from today
    console.log(today);
    //if day is below 10, add a zero before (ex: 9 -> 09)
    if(dd<10) {
        dd='0'+dd
    }

    //like the day, do the same to month (3->03)
    if(mm<10) {
        mm='0'+mm
    }

    //finally join yyyy mm and dd with a "-" between then
    return yyyy+'-'+mm+'-'+dd;
}
