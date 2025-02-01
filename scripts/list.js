const isFactory = indexedDB.open("form");

isFactory.addEventListener("upgradeneeded", (ev) => {
  const hasDatabase = ev.target.result;
  hasDatabase.createObjectStore("user", {
    keyPath: "id",
    autoIncrement: true,
  });
});

export function handleList(table) {
  table.innerHTML = "";

  const isDATA = indexedDB.open("form");
  isDATA.addEventListener("success", (ev) => {
    const isDb = ev.target.result;
    const hasGetRequest = isDb.transaction("user").objectStore("user").getAll();
    hasGetRequest.addEventListener("success", (eve) => {
      const isResult = eve.target.result;
      if (isResult.length === 0) {
        const isP = document.createElement("p");
        isP.textContent = "No user is granted permission";
        isP.setAttribute("class", "table-text");
        table.appendChild(isP);
        return;
      }
      isResult.forEach((result) => {
        const isEntry = `<td>${result.id}</td><td>${result.name}</td><td>${result.isEmail}</td>`;
        const isRow = document.createElement("tr");
        isRow.innerHTML = isEntry;
        table.appendChild(isRow);
      });
    });
  });
}

export function handleSubmit(user, email) {
  let hasTrue = false;
  if (hasTrue) {
    return;
  }
  const name = user.value;
  const isEmail = email.value;

  const IsDATA = indexedDB.open("form");

  IsDATA.addEventListener("success", (eve) => {
    const hasSuccess = eve.target.result;
    const isSubmit = hasSuccess
      .transaction("user")
      .objectStore("user")
      .getAll();
    isSubmit.addEventListener("success", async (even) => {
      const hasResult = even.target.result;
      if (hasResult.length >= 3) {
        hasTrue = true;
      } else {
        const isTransaction = hasSuccess.transaction("user", "readwrite");
        await isTransaction.objectStore("user").add({ name, isEmail });
        isTransaction.addEventListener("complete", () => {
          console.log("Transaction has been completed");
        });
      }
    });
  });
  IsDATA.addEventListener("error", () => {
    console.log("Error creating database");
  });
}

export function handleImg(e) {
  const isFile = e.target.files[0];
  const isBlob = URL.createObjectURL(isFile);
  const isImg = document.querySelector(".isImg");
  const isIcon = document.querySelector(".img-icon");
  isImg.setAttribute("src", isBlob);
  isIcon.style.display = "none";
  localStorage.setItem("blob", isBlob);
  return;
}
