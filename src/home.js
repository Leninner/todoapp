import { doFormItem, doTareas } from "./popups.js";

const main = document.querySelector(".main");

let tareas = [];

function doHeader() {
    let header = document.createElement("div"),
        titleHeader = document.createElement("h1");

    titleHeader.textContent = "TODO List";

    header.classList.add("header");

    header.appendChild(titleHeader);
    main.appendChild(header);
}

function doMainButtoms() {
    let divMainButtoms = document.createElement("div"),
        addItem = document.createElement("input"),
        addProject = document.createElement("input");

    addItem.type = "button";
    addItem.value = "Añadir Tarea";
    addItem.setAttribute("id", "addItem");
    addProject.type = "button";
    addProject.value = "Añadir Proyecto";
    addProject.setAttribute("id", "addProjects");

    divMainButtoms.classList.add("main-buttoms");

    divMainButtoms.append(addItem, addProject);
    main.appendChild(divMainButtoms);
}

function doBoxTodosMain() {
    let boxTask = document.createElement("div"),
        titleTask = document.createElement("h1"),
        boxTodosMain = document.createElement("div"),
        penMain = document.createElement("div"),
        wentMain = document.createElement("div");

    let titlePendiente = document.createElement("h2"),
        titleRealizado = document.createElement("h2");

    titlePendiente.textContent = "Pendiente";
    titleRealizado.textContent = "Realizado";
    titleTask.textContent = "Tareas";

    penMain.classList.add("boxesMain");
    penMain.setAttribute("id", "pendientesMain");
    wentMain.classList.add("boxesMain");
    wentMain.setAttribute("id", "realizadasMain");
    boxTodosMain.classList.add("boxTodosMain");
    boxTask.classList.add("boxProjects");

    penMain.appendChild(titlePendiente);
    wentMain.appendChild(titleRealizado);
    boxTodosMain.append(penMain, wentMain);
    boxTask.append(titleTask, boxTodosMain);
    main.appendChild(boxTask);
}

function doBoxesProject() {
    let boxProjects = document.createElement("div"),
        titleProjects = document.createElement("h1"),
        upBoxProjects = document.createElement("div"),
        penProjects = document.createElement("div"),
        wentProjects = document.createElement("div");

    let titlePenProjects = document.createElement("h2"),
        titlewentProjects = document.createElement("h2");

    titleProjects.textContent = "Proyectos";
    titlePenProjects.textContent = "Proyectos Pendientes";
    titlewentProjects.textContent = "Proyectos Realizados";

    boxProjects.classList.add("boxProjects");
    upBoxProjects.classList.add("boxTodosMain");
    penProjects.classList.add("boxesMain");
    wentProjects.classList.add("boxesMain");

    penProjects.appendChild(titlePenProjects);
    wentProjects.appendChild(titlewentProjects);
    upBoxProjects.append(penProjects, wentProjects);
    boxProjects.append(titleProjects, upBoxProjects);
    main.appendChild(boxProjects);
}

function doHomePage() {
    doHeader();
    doMainButtoms();
    doBoxTodosMain();
    doBoxesProject();
}

// Para añadir cajas a las tareas pendientes
function addItemToPendient(title, description, date, priority) {
    const pendientesMain = document.querySelector("#pendientesMain");

    let tarea = new doTareas(title, description, date, priority);

    tareas.push(tarea);
    console.log(tareas);

    let divMuestra = document.createElement("div"),
        titleMuestra = document.createElement("h3"),
        descripcionMuestra = document.createElement("p"),
        fechaMuestra = document.createElement("p");

    titleMuestra.textContent = tarea.title;
    descripcionMuestra.textContent = tarea.description;
    fechaMuestra.textContent = tarea.date;

    divMuestra.classList.add("muestra");

    if (tarea.priority == 1) {
        divMuestra.classList.add("one");
    } else if (tarea.priority == 2) {
        divMuestra.classList.add("two");
    } else {
        divMuestra.classList.add("three");
    }

    divMuestra.append(titleMuestra, descripcionMuestra, fechaMuestra);
    pendientesMain.appendChild(divMuestra);
}

function displayFormItemMain() {
    const addItems = document.querySelector("#addItem");

    addItems.addEventListener("click", () => {
        // NOTE: Código para solucionar problema de las cajas repetidas
        if (main.childNodes[4]) {
            main.removeChild(main.childNodes[4]);
        }

        console.log(main.childNodes);

        doFormItem();

        let cerrarPopup = document.querySelector(".cerrarPopup"),
            overlay = document.querySelector(".overlay"),
            popup = document.querySelector(".popup"),
            btnAñadir = document.querySelector(".btn-añadir"),
            titleItem = document.querySelector("#titleItem"),
            descriptionItem = document.querySelector("#descriptionItem"),
            dueDate = document.querySelector("#dueDate"),
            priorityListItem = document.querySelector("#priorityItem");

        overlay.classList.add("active");
        popup.classList.add("active");

        cerrarPopup.addEventListener("click", () => {
            overlay.classList.remove("active");
            popup.classList.remove("active");
        });

        btnAñadir.addEventListener("click", () => {
            overlay.classList.remove("active");
            popup.classList.remove("active");

            addItemToPendient(
                titleItem.value,
                descriptionItem.value,
                dueDate.value,
                priorityListItem.value
            );
        });
    });
}

export { doHomePage, doBoxTodosMain, displayFormItemMain };
