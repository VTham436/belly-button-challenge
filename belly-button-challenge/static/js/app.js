const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

let data2 = d3.json(url).then(function(data){
    console.log(data);
    
   
    var selector = d3.select("#selDataset");
    var sampleName = data.names;
    sampleName.forEach((sample)=> {
        selector.append("option").text(sample).property("value",sample);
       
    });
    
    var firstSample = sampleName[0];
    Charts(firstSample);
    Metadata(firstSample);


    function optionChanged(newSample) {
        console.log(newSample);
        Charts(newSample);
        MetaData(newSample);
        
    }
    optionChanged();
    
    //bar and bubble functions
    function Charts(firstSample){
    
        var samples = data.samples;
        var sampledataArray = samples.filter(sampleObj => sampleObj.id == firstSample);
        var result = sampledataArray[0];
        
        let sortedByOtuid = result.otu_ids.sort((a, b) => b.otu_ids - a.otu_ids);
        slicedData = sortedByOtuid.slice(0, 10);
        reverseData = slicedData.reverse();
        let sortedBySampleValues = result.sample_values.sort((a, b) => b.sample_values - a.sample_values);
        slicedData2 = sortedBySampleValues.slice(0, 10);
        reverseData2 = slicedData2.reverse();
        let trace1 = {
            x: reverseData2,
            y: reverseData.map(object => `OTU ${object}`),
            text: reverseData.map(object => object.otu_labels),
            type: "bar",
            orientation: "h"
        };
        let traceData = [trace1];
        let layout = {
            title: "Top 10 OTUs",
            margin: {
                l:100,
                r:100,
                t:100,
                b:100
            }
        };
        Plotly.newPlot("bar", traceData, layout);
    
       var bubbleData = [{
        x:result.otu_ids,
        y:result.sample_values,
        text: result.otu_labels,
        mode:"markers",
        marker:{
            size: result.sample_values,
            color: result.otu_ids
        }
       }]; 
    
       var bubbleLayout =[{
        title: "Bacteria Values by Size",
        xaxis: {title: "OTU ID"}
       }];
    
       Plotly.newPlot("bubble", bubbleData, bubbleLayout);
    }

 
/*Display demographic info*/
    function Metadata(firstSample){
        var metadata = data.metadata;
        var metadataArray = metadata.filter(sampleObj => sampleObj.id == firstSample);
        var result = metadataArray[0];

        var PANEL = d3.select(`#sample-metadata`);
        Object.entries(result).forEach(([key, value]) => {
        PANEL.append("h4").text(`${key}: ${value}`);
        });
    
    }

    

    

});