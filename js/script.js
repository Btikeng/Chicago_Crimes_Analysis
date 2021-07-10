var types=[];
var districts=[];
var location_desc=[];
var arrested=0;
var not_arrested=0;
var types_data=[];
var district_data=[];
var locationss=[];
$.ajax({
    url: "https://data.cityofchicago.org/resource/ijzp-q8t2.json",
    type: "GET",
    data: {
      "$limit" : 50000
      
    }
}).done(function(data) {
    // console.log(data);
    var cdata=data;
    for (var i = 0; i < cdata.length; i++) {
        // console.log(cdata[i]);
        types.push(cdata[i]["primary_type"]);
        districts.push(cdata[i]["district"]);
        location_desc.push(cdata[i]["location_description"]);
        locationss.push(cdata[i]["location"]);
        if (cdata[i]["arrest"]==true) {
            arrested++;
        }else{
            not_arrested++;
        }
    }
    
    var uniquetypes=Array.from(new Set(types));
    var uniquedistrict=Array.from(new Set(districts));
    var uniquelocation_desc=Array.from(new Set(location_desc));
    for (var i = 0; i < uniquetypes.length; i++) {
        var count=0;
        for (var j = 0; j < cdata.length; j++) {
            
            if (cdata[j]["primary_type"]===uniquetypes[i]) {
                count++;
            }
        }
        types_data.push(count);
    }

    //.....district data
    for (var i = 0; i < uniquedistrict.length; i++) {
        var count=0;
        for (var j = 0; j < cdata.length; j++) {
            
            if (cdata[j]["district"]===uniquedistrict[i]) {
                count++;
            }
        }
        district_data.push(count);
    }
   
//......first chart........

var cttx = document.getElementById("myareaChart").getContext('2d');

var myChart = new Chart(cttx, {
    type: 'line',
    data: {
        labels: uniquedistrict,
        datasets: [{
            label: 'Reported Crimes By District', // Name the series
            data: district_data, // Specify the data values array
            fill: true,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]
    },
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

//........end first chart.........
//........third chart
var ctxx = document.getElementById("mylineChart").getContext('2d');


var myChart = new Chart(ctxx, {
    type: 'line',
    data: {
        labels: uniquetypes,
        datasets: [{
            label: 'Reported Crimes by Primary Type', // Name the series
            data: types_data, // Specify the data values array
            fill: false,
            borderColor: '#2196f3', // Add custom color border (Line)
            backgroundColor: '#2196f3', // Add custom color background (Points and Fill)
            borderWidth: 1 // Specify bar border width
        }]},
    options: {
      responsive: true, // Instruct chart js to respond nicely.
      maintainAspectRatio: false, // Add to prevent default behaviour of full-width/height 
    }
});

//.......end third chart.......

//......second chart............
var ctx = document.getElementById("mybarChart");
var myChart = new Chart(ctx, {
  type: 'bar',
  data: {
    labels: ["Arrested","Not-Arrested"],
    datasets: [{
      label: 'Reported Crimes By Arrest',
      data: [arrested, not_arrested],
      backgroundColor: [
        'rgba(255, 99, 132, 1)',
        
        'rgba(255, 159, 64, 1)'
      ],
      borderColor: [
        'rgba(255,99,132,1)',
        
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }]
  },
  options: {
    responsive: false,
    scales: {
      xAxes: [{
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
          gridLines: {
          offsetGridLines: true // à rajouter
        }
      },
      {
        position: "top",
        ticks: {
          maxRotation: 90,
          minRotation: 80
        },
        gridLines: {
          offsetGridLines: true // et matcher pareil ici
        }
      }],
      yAxes: [{
        ticks: {
          beginAtZero: true
        }
      }]
    }
  }
});
  
});

//.........end second chart.........