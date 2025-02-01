const isDp = indexedDB.open("tasks");
isDp.addEventListener("upgradeneeded", (e) => {
  const isDatabase = e.target.result;
  isDatabase.createObjectStore("task", {
    keyPath: "id",
    autoIncrement: true,
  });
});

export function handleTask(list) {
  list.innerHTML = "";
  const isP = document.createElement("p");
  isP.innerText = "No Task is available, add your task";
  isP.setAttribute("class", "table-text");

  const MyDatabase = indexedDB.open("tasks");
  MyDatabase.addEventListener("success", (e) => {
    const isResult = e.target.result
      .transaction("task")
      .objectStore("task")
      .getAll();
    isResult.addEventListener("success", (ev) => {
      const isData = ev.target.result;
      if (isData.length === 0) {
        list.appendChild(isP);
      } else {
        isData.forEach((value) => {
          const isTask = `<div><p>${value.text}</p></div><div><span>
                          <span><button id="isDelete-btn">Delete</button></span></span></div>`;
          const isLi = document.createElement("li");
          isLi.setAttribute("class", "task-list");
          isLi.setAttribute("data-id", value.id);
          isLi.innerHTML = isTask;
          list.appendChild(isLi);
          const isDelBtn = isLi.querySelector("button");
          isDelBtn.addEventListener("click", () => {
            handleDelete(value.id);
            const isList = list.querySelectorAll("li");
            isList.forEach((elem) => {
              if (elem.dataset.id == value.id) {
                elem.remove();
              }
            });
          });
        });
      }
    });
  });
}

export function handleAdd(text) {
  if (text.value.length === 0) return;
  const AddData = indexedDB.open("tasks");
  AddData.addEventListener("success", (e) => {
    const isTransaction = e.target.result.transaction("task", "readwrite");
    isTransaction.objectStore("task").add({ text: text.value.trim() });
    text.value = "";
  });
}

function handleDelete(id) {
  const DelData = indexedDB.open("tasks");
  DelData.addEventListener("success", (e) => {
    const isDel = e.target.result;
    isDel.transaction("task", "readwrite").objectStore("task").delete(id);
  });
}
