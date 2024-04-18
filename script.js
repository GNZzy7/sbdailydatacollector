function copy(text) {
  navigator.clipboard.writeText(text);
  console.log(text);
}

var countsArrays = {
  c1: [],
  c2: [],
  c3: [],
  c4: [],
};

var acData;
var newACDATA;
var itemCount = 0;

function addify() {
  if (document.getElementById("rawDataInput").value === "") {
    alert(
      "you must to paste the data in input box before clicking this button."
    );
  } else {
    acData = document.getElementById("rawDataInput").value;
    newACDATA = acData.split('"').join("").split(" + ").join("").split(/\\/g);
    for (let i = 1; i < newACDATA.length; i++) {
      newACDATA[i] = newACDATA[i].split("n").join("");
    }
    newACDATA = newACDATA.join("\n");
    acData = newACDATA;
    console.log(acData);

    for (let i = 0; i < itemCount.length; i++) {
      countsArrays["c" + (i + 1)] = [];
    }
    itemCount = acData.split("\n")[0].split(",");

    for (let i = 1; i < acData.split("\n").length; i++) {
      if (itemCount.length == 4) {
        countsArrays.c1.push(acData.split("\n")[i].split(",")[0]);
        countsArrays.c2.push(acData.split("\n")[i].split(",")[1]);
        countsArrays.c3.push(acData.split("\n")[i].split(",")[2]);
        countsArrays.c4.push(acData.split("\n")[i].split(",")[3]);
      } else if (itemCount.length == 3) {
        countsArrays.c1.push(acData.split("\n")[i].split(",")[0]);
        countsArrays.c2.push(acData.split("\n")[i].split(",")[1]);
        countsArrays.c3.push(acData.split("\n")[i].split(",")[2]);
        countsArrays.c4 = [];
      } else if (itemCount.length == 2) {
        countsArrays.c1.push(acData.split("\n")[i].split(",")[0]);
        countsArrays.c2.push(acData.split("\n")[i].split(",")[1]);
        countsArrays.c3 = [];
        countsArrays.c4 = [];
      } else {
        countsArrays.c1.push(acData.split("\n")[i].split(",")[0]);
        countsArrays.c2 = [];
        countsArrays.c3 = [];
        countsArrays.c4 = [];
      }
    }

    if (document.getElementById("vir").checked == true) {
      document.getElementById("exData").innerHTML = "";
      for (let i = 0; i < acData.split("\n").length; i++) {
        let eachLineOfData = acData.split("\n")[i];
        document.getElementById(
          "exData"
        ).innerHTML += `<span>${eachLineOfData}</span><br>`;
      }

      document.getElementById("buttons").innerHTML = "";
      for (let i = 0; i < itemCount.length; i++) {
        countsArrays["c" + (i + 1)] = countsArrays["c" + (i + 1)].join("\n");

        document.getElementById(
          "buttons"
        ).innerHTML += `<button onclick="copy(countsArrays.c${i + 1})">Copy "${
          itemCount[i]
        }"</button>`;
      }
    } else {
      document.getElementById("exData").innerHTML = "";
      document.getElementById("buttons").innerHTML = "";
      for (let i = 0; i < itemCount.length; i++) {
        countsArrays["c" + (i + 1)] = countsArrays["c" + (i + 1)].join("\t");

        let D = countsArrays["c" + (i + 1)].split("\t").join(",");
        document.getElementById(
          "exData"
        ).innerHTML += `<span>${itemCount[i]},${D}</span><br>`;
        document.getElementById(
          "buttons"
        ).innerHTML += `<button onclick="copy(countsArrays.c${i + 1})">Copy "${
          itemCount[i]
        }"</button>`;
      }
    }
  }
}

function download() {
  let a = document.createElement("a");
  a.href = "data:text/csv;charset=utf-8," + encodeURI(test);
  a.download = "a.csv";
  a.click();
}
