import { handleAdd, handleTask } from "./task.js";
import { handleList, handleSubmit, handleImg } from "./list.js";

const isTheme = localStorage.getItem("theme");
if (isTheme == "white") {
  document.querySelector(".isToggle").classList.remove("isActive");
  document.querySelector(".isToggle").classList.remove("fa-toggle-on");
  document.querySelector(".isToggle").classList.add("fa-toggle-off");
  document.body.classList.add("white");
  document.body.classList.remove("black");
} else if (isTheme == "black") {
  document.querySelector(".isToggle").classList.add("isActive");
  document.querySelector(".isToggle").classList.add("fa-toggle-on");
  document.querySelector(".isToggle").classList.remove("fa-toggle-off");
  document.body.classList.remove("white");
  document.body.classList.add("black");
}

const isList = document.querySelector(".list");
const isContent = document.getElementsByClassName("tab-content");
const isTable = document.querySelector(".data-table tbody");
const isForm = document.querySelector("form");
const isOrderList = document.querySelector("ol");
const isAddBtn = document.getElementById("isAdd-btn");
const taskField = document.getElementById("task-field");
const isImgField = document.querySelector("input[type='file']");
const isUser = isForm.querySelector("#username");
const isEmail = isForm.querySelector("#email");

document.addEventListener("DOMContentLoaded", async () => {
  const isBlob = localStorage.getItem("blob");
  const isActiveTab = localStorage.getItem("tab");

  if (isBlob) {
    const isImg = document.querySelector("img");
    const isIcon = document.querySelector(".img-icon");
    isImg.setAttribute("src", isBlob);
    isIcon.style.display = "none";
  }
  if (isActiveTab) {
    if (isActiveTab == "contact") {
      await handleList(isTable);
    } else if (isActiveTab == "task") {
      await handleTask(isOrderList);
    }
    const isactive = isList.querySelector(".isActive");
    const isContentActive = document
      .querySelector(".content")
      .querySelector(".isActive");
    if (isactive) {
      isactive.classList.remove("isActive");
    }
    if (isContentActive) {
      isContentActive.classList.remove("isActive");
    }
    const allIcons = document.querySelectorAll("i");
    for (let i = 0; i < allIcons.length; i++) {
      if (
        allIcons[i].classList.contains("fa-toggle-off") ||
        allIcons[i].classList.contains("fa-toggle-on")
      )
        continue;
      if (allIcons[i].title == isActiveTab) {
        for (let j = 0; j < isContent.length; j++) {
          if (isContent[j].dataset.content == isActiveTab) {
            allIcons[i].classList.add("isActive");
            isContent[j].classList.add("isActive");
          }
        }
      }
    }
  }
});

isList.addEventListener("click", async (e) => {
  const curr = e.target;
  if (curr.classList.contains("isToggle")) {
    if (curr.classList.contains("fa-toggle-off")) {
      curr.classList.remove("fa-toggle-off");
      curr.classList.add("fa-toggle-on");
      curr.classList.add("isActive");
      document.body.classList.remove("white");
      document.body.classList.add("black");
      localStorage.setItem("theme", "black");
    } else {
      curr.classList.remove("fa-toggle-on");
      curr.classList.add("fa-toggle-off");
      curr.classList.remove("isActive");
      document.body.classList.remove("black");
      document.body.classList.add("white");
      localStorage.setItem("theme", "white");
    }
    return;
  }
  if (e.target.tagName !== "I") return;
  const active = isList.querySelector(".isActive");
  if (active) {
    active.classList.remove("isActive");
  }
  e.target.classList.add("isActive");
  const isTitle = e.target.title;
  for (let i = 0; i < isContent.length; i++) {
    if (isContent[i].dataset.content == isTitle) {
      isContent[i].classList.add("isActive");
      localStorage.setItem("tab", isContent[i].dataset.content);
      if (isContent[i].dataset.content == "contact") {
        await handleList(isTable);
      }
      if (isContent[i].dataset.content == "task") {
        await handleTask(isOrderList);
      }
    } else {
      isContent[i].classList.remove("isActive");
    }
  }
});

isImgField.addEventListener("change", handleImg);

isAddBtn.addEventListener("click", () => {
  handleAdd(taskField);
  handleTask(isOrderList);
});

isForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  await handleSubmit(isUser, isEmail);
  isForm.reset();
});
