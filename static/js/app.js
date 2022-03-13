async function getBellyButtonData() {
    var response = await fetch("./samples.json"); 
    var data = await response.json();
    console.log(data);

    //making arrays for each element, sorting by the top 10, and then slicing those 10 from the rest of the data
    //sample at given index---filtered for top 10 otu
    var samps = Object.values(data.samples[0]).sort((firstNum, secondNum) => secondNum.sample_values - firstNum.sample_values);
    console.log(samps);

    //creating a list of ids 
    var idlist = Object.values(data.names)
    console.log(idlist);

    //sample id 
    var samplenum = samps[0]
    console.log(samplenum)

    //otu ids 
    var otu_ids = Object.values(samps[1]).slice(0, 10);
    console.log(otu_ids)

    //sample values 
    var sample_values = Object.values(samps[2]).slice(0, 10);
    console.log(sample_values);

    //otu labels 
    var labels = Object.values(samps[3]).slice(0, 10);
    console.log(labels)

    //setting up bar chart 
    let trace1 = {
        x: sample_values, 
        y: otu_ids.toString(),
        type: "bar",
        orientation: 'h'
    };

    let traceData = [trace1];

    let layout = {
        title: "Otu_IDS",
      };

    Plotly.newPlot("bar", traceData, layout);

    //populating dropdown menu
    
    for (var i = 0; i < idlist.length;  i++) {
        var currentOption = document.createElement('option');
        currentOption.textContent = data.samples[i];
        document.querySelector("selDataset").append(currentOption)
    }


    //adding event listener 

    document.querySelector("#selDataset").addEventListener("change", event => {
        let samples = []

        for (let i = 0; i <samplenum.length; i++) {
            if (event.target.value === i);
            samples = data.samples[i];

        }
    })
};


getBellyButtonData();



//for (let i = 0; i < stooges.length; i++) {
//     console.log(stooges[i]);
// }




//create function 
    //make arrays and put into variables 
        //pull with fetch 
        //create an array for x values (Top 10 OTU_IDS)
        //create an array for y values (Sample Values)
        //create a labels array (OTU_labels)
    //put arrays into chart structure....
        //code that can be made into bar chart 
        //html plot.ly chart that has the code in it that we are looking for 
        //
    //relate charts to html
