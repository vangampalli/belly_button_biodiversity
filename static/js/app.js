var names = []
var metadata = []
var sample = []

var otu_id_list = []
var sample_value = []
var otu_label = []



async function main() {
    //get data and put variables to work with later
    const response = await fetch("./samples.json");
    data = await response.json();
    for (var i=0; i<153; i++) {
        names.push(data.names[i])
        metadata.push(data.metadata[i])
        sample.push(data.samples[i])
        otu_id_list.push(sample[i].otu_ids)
        otu_label.push(sample[i].otu_labels)
        sample_value.push(sample[i].sample_values)
    };  

    console.log(names.length)
    console.log(metadata)
    console.log(sample) 
    console.log(otu_id_list)
    console.log(otu_label)
    console.log(sample_value)
    console.log(names[0])

    //add event listener to change the webpage when selecting an option
    document.querySelector("#selDataset").value = names;

    document.querySelector("#selDataset").addEventListener("change", event => {
        metadata_fn(event.target.value);
        charts(event.target.value);
      })

    for (var i=0; i<153; i++) {
        var currentOption = document.createElement("option");
        currentOption.text = names[i];
        document.querySelector("select").append(currentOption);
    };


    metadata_fn(names[0]);
    charts(names[0]);

};


async function metadata_fn(sample) {
    
    dem_info = data.metadata.filter(col => col.id == sample)[0];
    
    console.log(dem_info);

    panel = document.querySelector("#sample-metadata");

    panel.innerHTML = ''; 

    Object.entries(dem_info).forEach(([_key, _value]) => {
        const h6 = document.createElement("h6");
        h6.textContent = _key + ':' + _value
        panel.append(h6);
    });
};

async function charts(sample) {

    bub_data = data.samples.filter(col => col.id == sample)[0];

    var bubble_chart = { 
        title: 'Bacteria Cultures Per Sample',
        margin: { t:0 },
        hovermade: "closest",
        xaxis: { title: "OTU_IDS"},
        margin: { t:30 }
    };

    var bubbleData = [
        {
          x: bub_data.otu_ids,
          y: bub_data.sample_values,
          text: bub_data.otu_labels,
          mode: "markers",
          marker: {
            size: bub_data.sample_values,
            color: bub_data.otu_ids,
            colorscale: "Earth"
          }
        }
      ];

      Plotly.newPlot("bubble", bubbleData, bubble_chart);

      for (var i=0; i<153; i++) {
            if (sample === names[i]) {
            dependent = sample_value[i];
            independent  = otu_id_list[i]
            words = otu_label[i]}
            num_otu = otu_id_list[i]
            sample_count = sample_value[i]
      };
  
      var trace1 = {
        x: dependent.sort((secondNum, firstNum) => firstNum - secondNum).slice(0,10),
        y: independent.toString(),
        type: "bar",
        text: words, 
        orientation: 'h'
        };

      var bar_data = [trace1];

      var layout = {title:'Top 10 OTUs per Subject'};

      Plotly.newPlot('bar', bar_data, layout);

};
    

//function for plotting graphs based on decision made above

// function graph_vals(sample) {for (var i=0; i<153; i++) {
//     var currentOption = document.createElement("option");
//     currentOption.text = names[i];
//     document.querySelector("select").append(currentOption);

// //bar graph
//     for (var i=0; i<153; i++) {
//         if (sample === names[i]) {
//         dependent = sample_value[i];
//         independent  = otu_id_list[i]
//         words = otu_label[i]}
//         num_otu = otu_id_list[i]
//         sample_count = sample_value[i]

//     };

//     var trace1 = {
//         x: dependent.sort((secondNum, firstNum) => firstNum - secondNum).slice(0,10),
//         y: independent.toString(),
//         type: "bar",
//         text: words, 
//         orientation: 'h'
//     };

//     var bar_data = [trace1];

//     var layout = {title:'Top 10 OTUs per Subject'};

//     Plotly.newPlot('bar', bar_data, layout);

// //bubble graph
//     var trace2 = {
//         x: independent, 
//         y: dependent, 
//         text: words,
//         mode: 'markers',
//         marker: {
//             size: dependent,
//             color: independent,
//             colorscale: "Earth"
//           }
//     }; 

//     var scat_data = [trace2]; 
    
//     var layout2 = {title: 'OTU IDs'}

//     Plotly.newPlot('bubble', scat_data, layout2)
// };
data = {};
main();
// async function dropdown() {main()} {
//     for (var i=0; i<153; i++) {
//         var currentOption = document.createElement("option");
//         currentOption.text = names[i];
//         document.querySelector("select").append(currentOption);
//     };
// };

// dropdown();

// function setPlot(chosen_OTU) {
//     get_sample_data(chosen_OTU); 

//     var trace1 = {
//         x: sample_values, 
//         y: otu_ids.toString(),
//         type: "bar",
//         text: otu_labels, 
//         orientation: 'h'
//     };

//     var bar_data = [trace1];

//     var layout = {title:'Top 10 OTUs'};

//     Plotly.newPlot('bar', bar_data, layout);
// };

// // function assignOptions(textArray, selector) {
// //     for (var i = 0; i< textArray.length; i++) {
// //         var currentOption = document.createElement('option');
// //         currentOption.text = textArray[i];
// //         selector.appendChild(currentOption);
// //     };
// // };

// // assignOptions(otu_ids, IDselector);

// // function updateOTUIDS(){
// //     setPlot(IDselector.value);
// // }

// // updataeOTUIDS();