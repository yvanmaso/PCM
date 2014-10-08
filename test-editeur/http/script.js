$(document).ready(function() {
  colors = ["yellow", "red", "orange", "green", "blue", "gray", "black", "white", "purple", "lime", "olive", "cyan"];

  function getCarData() {
    return [
      {car: "Nissan", year: 2009, color1: "black", color2: "black"},
      {car: "Nissan", year: 2006, color1: "blue", color2: "blue"},
      {car: "Chrysler", year: 2004, color1: "yellow", color2: "black"},
      {car: "Volvo", year: 2012, color1: "white", color2: "gray"}
    ];
  }

  function createJSON(changes, source) {
    return {
      source: source, // Useful?
      changes: changes.map(function(e, i) {
        return {
          id: i, // Useful?
          row: e[0],
          column: e[1],
          oldValue: e[2],
          newValue: e[3]
        };
      })
    };
  }

  function reflectChanges(ht, json) {
    json.changes.forEach(function(e, i) {
      ht.setDataAtRowProp(e.row, e.column, e.newValue);
      /*
      var cell = ht.getCell(e.row, ht.propToCol(e.column));
      console.log(cell);
      */
    });
  }

  var honData = {
    data: getCarData(),
    startRows: 7,
    startCols: 4,
    minSpareRows: 1,
    contextMenu: true,
    colHeaders: ["Car", "Year", "Chassis color<br>(allowInvalid false)", "Bumper color<br>(allowInvalid true)"],
    columns: [
      {
        data: "car",
        type: "autocomplete",
        source: ["BMW", "Chrysler", "Nissan", "Suzuki", "Toyota", "Volvo"]

      },
      {
        data: "year",
        type: "numeric"
      },
      {
        data: "color1",
        type: "autocomplete",
        source: colors,
        strict: true,
        allowInvalid: false
      },
      {
        data: "color2",
        type: "autocomplete",
        source: colors,
        strict: true,
        allowInvalid: true //true is default
      }
    ]
  };
  $("#table").handsontable(honData);
  $("#preview").handsontable(honData);

  var previewHt = $('#preview').handsontable('getInstance');

  $("#table").handsontable({
    afterChange: function(changes, source) {
      console.log("Changes:", changes);
      var json = createJSON(changes, source);
      //console.log(JSON.stringify(json));
      console.log("JSON:", json);
      reflectChanges(previewHt, json);

      $.ajax({
        url: "callback.rpy",
        type: "POST",
        dataType: "text",
        data: (function() {
          var obj = {};
          changes.forEach(function(e, i) {
            obj[i] = e.map(function(v) {return v === null ? "" : v});
          });
          return obj;
        })(),
        success: function(data) {
          var res = $("#result");
          res.append("<pre>" + data + "</pre>");
          res.scrollTop(res.prop("scrollHeight"));
        }
      });
    }
  });

  $("#preview").handsontable({
    cells: function(row, cell, prop) {
      return {readOnly: true};        
    }
  });
});
