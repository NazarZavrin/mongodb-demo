// 📁 site/script/script.js
import { addRecord, deleteAll, countRecords, getAdults, updateTable, deleteOne } from "./database-fns.js";

const dataTable = document.querySelector(".data-table");
const addRecordBtn = document.querySelector(".add-record-btn");
const deleteAllBtn = document.querySelector(".delete-all-btn");
const countRecordsBtn = document.querySelector(".count-records-btn");
const getAdultsBtn = document.querySelector(".get-adults-btn");

addRecordBtn.addEventListener("mouseup", async event => {
    event.preventDefault();
    if (addRecordBtn.dataset.disabled === "true") {
        return;
    }
    let data = {};
    data.name = prompt("Enter the name of the user") || "";
    data.surname = prompt("Enter the surname of the user") || "";
    data.age = Number(prompt("Enter the age of the user")) || 0;
    disableButtons();
    await addRecord(data);
    await updateTable(dataTable, getAdultsBtn);
    enableButtons();
});
deleteAllBtn.addEventListener("mouseup", async event => {
    event.preventDefault();
    if (deleteAllBtn.dataset.disabled === "true") {
        return;
    }
    disableButtons();
    await deleteAll();
    await updateTable(dataTable, getAdultsBtn);
    enableButtons();
});
countRecordsBtn.addEventListener("mouseup", async event => {
    event.preventDefault();
    if (countRecordsBtn.dataset.disabled === "true") {
        return;
    }
    disableButtons();
    if (getAdultsBtn.textContent.includes("age greater or equal 18")) {
        await updateTable(dataTable, getAdultsBtn);
    }
    await countRecords();
    enableButtons();
});
getAdultsBtn.addEventListener("mouseup", async event => {
    event.preventDefault();
    if (getAdultsBtn.dataset.disabled === "true") {
        return;
    }
    disableButtons();
    if (getAdultsBtn.textContent.includes("age greater or equal 18")) {
        await getAdults(dataTable);
        getAdultsBtn.textContent = "Display all users";
    } else {
        await updateTable(dataTable, getAdultsBtn);
    }
    enableButtons();
});

dataTable.addEventListener('mouseup', async event => {
    event.preventDefault();
    let element = event.target.closest('.delete-this-btn');
    if (element) {
        disableButtons();
        await deleteOne(element.dataset.id);
        await updateTable(dataTable, getAdultsBtn);
        enableButtons();
    }
})

function disableButtons(){
    [addRecordBtn, deleteAllBtn, countRecordsBtn, getAdultsBtn].forEach(btn => {
        btn.dataset.disabled = true;
    });
}
function enableButtons(){
    [addRecordBtn, deleteAllBtn, countRecordsBtn, getAdultsBtn].forEach(btn => {
        btn.dataset.disabled = false;
    });
}
updateTable(dataTable, getAdultsBtn);
enableButtons();