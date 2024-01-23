function GetData(url) {
  return new Promise(function (resolve, reject) {
    const xhttp = new XMLHttpRequest();
    xhttp.open("GET", url);

    xhttp.onreadystatechange = () => {
      if (xhttp.readyState === 4) {
        if (xhttp.status === 200) {
          const data = JSON.parse(xhttp.responseText);
          resolve(data);
        } else {
          reject(new Error(`HTTP error! Status: ${xhttp.status}`));
        }
      }
    };
    xhttp.send();
  });
}

GetData("./data.json")
  .then((response) => {
    let data = response.contractDetails;
    contractList = data.map((element) => {
      let link = `${element.type}/${element.number}.json`;
      // console.log(link);
      return GetData(link);
    });
    console.log(contractList);
    Promise.allSettled(contractList).then((result) => {
      // console.log(result);
      document.getElementById("load").style.display = "none";
      result.forEach((element) => {
        if (element.status == "fulfilled") {
          console.log("Account Number: ", element.value.accountNumber);
        } else {
          console.error("Error fetching data:", result.reason);
        }
      });
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });
