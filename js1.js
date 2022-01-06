// window.localStorage.clear()
window.onload = function() {
    let donne = window.localStorage.getItem("stocks");
    if (donne) {
        donne = donne.split(",");
        for (let i = 0; i < donne.length; i++) {
            let message = donne[i].split(": ")[1];
            if (i === donne.length - 1) {
                message = message.slice(1, message.length - 3);
                createTask(message)
            } else {
                message = message.slice(1, message.length - 2);
                createTask(message)
            }

        }
    }

}

function createTask(msg) {
    let taskContain = document.createElement("div");
    taskContain.classList.add("task");
    let taskText = document.createTextNode(msg);
    let textCont = document.createElement("div");
    textCont.classList.add("text");
    textCont.appendChild(taskText);
    taskContain.appendChild(textCont);

    let dlt = document.createElement("div");
    let dltText = document.createTextNode("Delete");
    dlt.appendChild(dltText);
    dlt.classList.add("btn");
    dlt.classList.add("dlt");
    taskContain.appendChild(dlt);
    document.querySelector(".result").appendChild(taskContain);
}


function addLocalStorage() {
    let obj = {}
    let texts = document.querySelectorAll(".text");
    obj.title = texts[texts.length - 1].textContent;
    console.log(obj);
    let data = window.localStorage.getItem("stocks");
    if (data) {
        data = data.slice(0, data.length - 1);
        window.localStorage.setItem("stocks", `${data},{"title": "${obj.title}"}]`);
    } else {
        window.localStorage.setItem("stocks", `[{"title": "${obj.title}"}]`);
    }
}

function deleteItem(item) {
    let taxt = item.previousSibling.textContent;
    console.log(taxt)
    let donnes = window.localStorage.getItem("stocks");
    console.log(donnes)
    let indice = donnes.indexOf(`"${taxt}"`);
    console.log(indice++);
    let start, end
    for (let i = 0; i < indice; i++) {
        if (donnes[i] === "{") {
            start = i;
        }
    }
    for (let i = start;; i++) {
        if (donnes[i] === "}") {
            end = i;
            break;
        }
    }
    end++;
    if (donnes[end] === ",") {
        end = end + 1
    } else {
        start -= 1;
    }
    console.log(start);
    console.log(end)
    donnes = `[${donnes.slice(1,start)} ${donnes.slice(end)}`;
    console.log(donnes)
    window.localStorage.setItem("stocks", donnes);
    item.parentElement.remove();
}

let submit = document.querySelector("input[type='submit']");
let inputText = document.querySelector("input[type='text']");
submit.addEventListener("click", function(e) {
    e.preventDefault();
    if (inputText.value !== "") {
        createTask(inputText.value);
        addLocalStorage();
        inputText.value = "";
    }
})

window.addEventListener("click", function(e) {
    if (e.target.classList.contains("dlt")) {
        deleteItem(e.target);
    }
})