////// Project Details Page for NeCTAR Allocations

//==== Details Table

var headings = {
  "modified_time" : "Modified time",
  "project_name" : "Project name",
  "start_date" : "Start date",
  "end_date" : "End date",
  "instance_quota" : "Instance quota",
  "core_quota" : "Core quota",
  "submit_date" : "Submit date"
};


function projectDetails(elementId) {
  d3.json("/allocations/rest/applications/" + allocationId + "/history", function(error, allocations) {
    var allocationCount = allocations.length;
    for (var allocationIndex = 0; allocationIndex < allocationCount; allocationIndex++) {
      var allocation = allocations[allocationIndex];

      var table = d3.select(elementId)
            .append("table")
            .attr("class", "table-striped table-bordered table-condensed")
            .style("margin-bottom", "20px");

      var tbody = table.append("tbody");

      var rows = tbody.selectAll("tr")
            .data(function(row) {
              var keys = [];
              for (var key in headings) {
                keys.push(key);
              }
              return keys; })
            .enter()
            .append("tr");

      rows.append("th")
        .style("min-width", "100px")
        .text(function(row) {
          return headings[row];
        });

      rows.append("td")
        .text(function(row) {
          return allocation[row];
        });
    }
  });
}

projectDetails("#project-details");
