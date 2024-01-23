const url = "https://jsonplaceholder.typicode.com/users";

let cardContainer = document.getElementById("container");
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
GetData(url)
  .then((data) => {
    console.log("received data", data);
    data.map((currentUser, index) => {
      cardContainer.innerHTML += `
        <div id="card">
        <h2><span>ID: </span>${currentUser?.id}</h2>
        <p><span>- Name: </span> ${currentUser?.name}</p>
        <p><span>- Username: </span>${currentUser?.username}</p>
        <p><span>- Email: </span>${currentUser?.email}</p>
        <p><span>- Phone: </span>${currentUser?.phone}</p>
        <p><span>- Address: </span>${currentUser?.address?.street}, ${currentUser?.address?.suite}, ${currentUser?.address?.city}</p>
        <p><span>- Website: </span>${currentUser?.website}</p>
    </div>
        `;
    });
  })
  .catch((error) => {
    console.error("Error fetching data:", error);
  });

// fetch
