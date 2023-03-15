// 📁 site/script/database-fns.js
export async function addRecord(data){
    console.log(JSON.stringify(data));
    let response = await fetch("/add-record", {
        method: "PUT",
        body: JSON.stringify(data),
    });
    if (response.ok) {
        let result = await response.text();
        if (result !== "success") {
            alert("Failed to add a user.");
        }
    } else {
        console.log("Error " + response.status);
    }
}

export async function updateTable(tableElement, getAdultsBtn){
    getAdultsBtn.textContent = "Display the users with age greater or equal 18";
    let data;// will be an array of objects-users
    let response = await fetch("/get-records");
    if (response.ok) {
        data = await response.json();
        console.log("All users:", data);
    } else {
        console.log("Error " + response.status);
        alert("Failed to fetch the data.");
        return;
    }
    if (data.length === 0) {
        tableElement.style.gridTemplateColumns = "";
        tableElement.style.gridTemplateRows = "";
        tableElement.innerHTML = "Database is empty.";
        return;
    }
    tableElement.innerHTML = "";
    tableElement.style.gridTemplateColumns = "1fr ".repeat(Object.keys(data[0]).length);
    tableElement.style.gridTemplateRows = "1fr ".repeat(data.length + 1);// +1 for the head of the table
    for (const key of Object.keys(data[0])) {
        if (key !== "_id") {
            tableElement.insertAdjacentHTML("beforeend", 
                "<div>" + key + "</div>"
            );
        }
    }
    tableElement.insertAdjacentHTML("beforeend", 
        "<div>" + "Delete this user" + "</div>"
    );
    data.forEach(obj => {
        let userId = obj._id;
        delete obj._id;
        for (const key in obj) {
            tableElement.insertAdjacentHTML("beforeend", 
                "<div>" + obj[key] + "</div>"
            );
        }
        let deleteThisUser = document.createElement("div");
        deleteThisUser.classList.add("delete-this-btn");
        deleteThisUser.dataset.id = userId;
        deleteThisUser.innerHTML = "<img class='delete-icon' src='../img/delete-btn.png'></img>";
        tableElement.append(deleteThisUser);
    })
}
export async function deleteAll(){
    let response = await fetch("/delete-all", {
        method: "DELETE",
    });
    if (response.ok) {
        let result = await response.text();
        if (result !== "success") {
            alert("Failed to delete all users.");
        }
    } else {
        console.log("Error " + response.status);
    }
}
export async function countRecords(){
    let response = await fetch("/count-records");
    if (response.ok) {
        let result = await response.json();
        if (result.status !== "success") {
            alert("Failed to get the info.");
        } else {
            alert("Number of records found: " + result.numOfRecords);
        }
    } else {
        console.log("Error " + response.status);
    }
}
export async function getAdults(tableElement){
    let data;// will be an array of objects-users
    let response = await fetch("/get-adults");
    if (response.ok) {
        data = await response.json();
        console.log("Adults:", data);
    } else {
        console.log("Error " + response.status);
        alert("Failed to fetch the data.");
        return;
    }
    if (data.length === 0) {
        tableElement.style.gridTemplateColumns = "";
        tableElement.style.gridTemplateRows = "";
        tableElement.innerHTML = "There is no one user with age greater or equal 18 in the database.";
        return;
    }
    tableElement.innerHTML = "";
    tableElement.style.gridTemplateColumns = "1fr ".repeat(Object.keys(data[0]).length);
    tableElement.style.gridTemplateRows = "1fr ".repeat(data.length + 1);// +1 for the head of the table
    for (const key of Object.keys(data[0])) {
        if (key !== "_id") {
            tableElement.insertAdjacentHTML("beforeend", 
                "<div>" + key + "</div>"
            );
        }
    }
    tableElement.insertAdjacentHTML("beforeend", 
        "<div>" + "Delete this user" + "</div>"
    );
    data.forEach(obj => {
        let userId = obj._id;
        delete obj._id;
        for (const key in obj) {
            tableElement.insertAdjacentHTML("beforeend", 
                "<div>" + obj[key] + "</div>"
            );
        }
        let deleteThisUser = document.createElement("div");
        deleteThisUser.classList.add("delete-this-btn");
        deleteThisUser.dataset.id = userId;
        deleteThisUser.innerHTML = "<img class='delete-icon' src='../img/delete-btn.png'></img>";
        tableElement.append(deleteThisUser);
    })
}

export async function deleteOne(userId){
    let response = await fetch("/delete-one/" + userId, {
        method: "DELETE",
    });
    if (response.ok) {
        let result = await response.text();
        if (result !== "success") {
            alert("Failed to delete the chosen user.");
        }
    } else {
        console.log("Error " + response.status);
    }
}