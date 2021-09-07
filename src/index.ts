import { PivotGridPlus } from "/@/main";
let fields = [];
let options = {};

function fetchData() {
  return new Promise((res) => {
    fetch("/reports")
      .then((r) => r.json())
      .then(({ data }) => {
        let { result, options: rowColOptions } = data;
        options = rowColOptions;
        res(result);
      });
  });
}

function fetchFields() {
  return new Promise((res) => {
    fetch("/fields")
      .then((r) => r.json())
      .then(({ data }) => {
        fields = data;
        res();
      });
  });
}

function getDimensions(data) {
  const dimensions = data[0].fields.map((field) => {
    return {
      field: field.field,
      title: formatVaulesKey(field.field),
      area: options.row.includes(field.field) ? "row" : "column",
      dataType: "string",
    };
  });

  data[0].values.forEach((item) => {
    dimensions.push({
      field: item.id,
      title: formatVaulesKey(item.id),
      area: "data",
      dataType: "number",
    });
  });

  return dimensions;
}

function getMeasures(data) {
  let id = 0;
  return data.map((item) => {
    const data: any = { id };
    item.fields.forEach((field) => {
      data[field.field] = field.title;
    });
    item.values.forEach((item) => {
      data[item.id] = item.value;
    });
    id++;
    return data;
  });
}

function formatData(data) {
  return {
    dimensions: getDimensions(data),
    measures: getMeasures(data),
  };
}

function formatVaulesKey(keyName) {
  if (keyName == "count") return "记录数量";
  const norms: any = {
    filled: "已填写",
    unfilled: "未填写",
    sum: "求和",
    avg: "平均值",
    max: "最大值",
    mix: "最小值",
  };
  const split = keyName.split("_");
  if (split) {
    const field = fields.find((f) => f.id == split[0]);
    if (field) {
      return split[1] ? `${field.field}（${norms[split[1]]}）` : field.field;
    }
  }
  return keyName;
}

(async () => {
  await fetchFields();
  let data = await fetchData();
  let { dimensions, measures } = formatData(data);
  let div = document.createElement("div");
  div.style.cssText = `width:1200px;`;
  document.querySelector(".grid-box").append(div);

  let fields = JSON.parse(JSON.stringify(dimensions)).map((item) => {
    let obj = {
      caption: item.title,
      dataField: item.field,
      area: item.area,
      // summaryDisplayMode:"percentOfGrandTotal",
      dataType: item.dataType,
    };

    return obj;
  });

  fields = fields.filter((item) => item.area !== "column");

  /* fields.push({
    area: "data",
    caption: "上线率",
    dataType: "number",
    // format: "percent",
    dataField: "count",
    visible: true,
    showValues: false,
    summaryDisplayMode: "sum",
    calculateSummaryValue: function (summaryCell) {
      console.log(summaryCell.value('count',true))
      let value  = summaryCell.value('count')
      return summaryCell.value('count')
    },
  });
*/
  let P = new PivotGridPlus({
    el: div,
    allowExpandAll: true,
    // dataFieldArea: "row",
    dataFieldArea: "column",
    summaryType: "avg",
    exportable: true,
    // dataFieldArea: "row",
    inheritHeight: true,
    paginate: true,
    emptyPlaceHolder: "-",
    tdCustomStyle: {
      data: {
        textAlign: "center",
        display: "inline-block",
        width: "100%",
      },
    },
    useBetterScroller: true,
    dataSource: {
      fields,
      store: measures,
    },
    customFields: [
      {
        caption: "上线率",
        area: "data",
        calculateSummaryValue: function (e) {
          let cell = e.cell();
          let arrayLength = 6;
          if (cell) {
            let value =
              cell.slice(0, arrayLength).reduce((a, b) => a + b, 0) /
              arrayLength;
            return Math.trunc(value * 100) + "%";
          } else {
            return "null";
          }
        },
      },
    ],

    onContentReady: function (e) {
      console.log(e.component.getDataSource());
    },
  });

  window.P = P

  document.getElementById("expandAll").addEventListener("click", () => {
    P.expandAll();
  });
  document.getElementById("collapseAll").addEventListener("click", () => {
    P.collapseAll();
  });
  document.getElementById("changeHeight").addEventListener("click", () => {
    document.querySelector(".parent-parent").style.height = `${
      Math.ceil(Math.random() * 300) + 200
    }px`;
  });
  document.getElementById("export").addEventListener("click", () => {
    console.log(P.destroy());
  });
  document.getElementById("emptyPlaceHolder").addEventListener("click", () => {
    P.updateOptions({
      // emptyPlaceHolder: "123",
      // summaryType: "max",
      dataFieldArea: "row",
    });
  });
})();
