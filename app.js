document.addEventListener("DOMContentLoaded", () => {
  let input = document.getElementById("input_text");
  let add_Button = document.getElementById("add_Button");
  let unordered_list = document.querySelector("ul");

  let task = JSON.parse(localStorage.getItem("Anything")) || [];

  task.forEach((task) => {
    renderElement(task);
  });

  //   Functions to do work

  function setlocalvalue() {
    localStorage.setItem("Anything", JSON.stringify(task));
  }

  function additem() {
    let value = input.value.trim();

    if (!value) {
      return;
    }

    let unique_Id = Date.now();
    let task_Status = false;

    let obj = {
      Id: unique_Id,
      Status: task_Status,
      val: value,
    };

    task.push(obj);
    setlocalvalue();
    renderElement(obj);
  }

  function renderElement(obje) {
    let li = document.createElement("li");
    li.setAttribute("uniqueId", obje.Id);
    li.setAttribute("class", "list_added");
    li.innerHTML = `
        <input type="checkbox">
        <span>${obje.val}</span>
        <button>Delete</button>
    `;

    unordered_list.appendChild(li);
    input.value = "";

    li.addEventListener("click", (e) => {
      e.stopPropagation();
      if (e.target.tagName == "INPUT") {
        li.classList.toggle("completed");
        obje.Status = !obje.Status;
        setlocalvalue();
      }
    });

    li.querySelector("button").addEventListener("click", (e) => {
        e.stopPropagation();
        console.log("li");
        task = task.filter((t) => t.Id !== obje.Id);
        setlocalvalue();
        li.remove();
      });
  }

  //   Event Listeners

  document.addEventListener("keypress", (e) => {
    if (e.key == "Enter") {
      additem();
    }
  });
  add_Button.addEventListener("click", () => additem());
});
