"use strict"

const publicaciones = document.querySelector(".publicaciones");
let contador = 0;

const createPublicationCode = (name,content)=>{
    const container = document.createElement("div");
    const comentarios = document.createElement("div");
    const nombre = document.createElement("h3");
    const contenido = document.createElement("p");
    const btnComentario = document.createElement("input");
    const btnEnviar = document.createElement("input");

    container.classList.add("publicacion");
    comentarios.classList.add("comentarios");
    btnEnviar.classList.add("enviar");
    btnComentario.classList.add("comentario");

    btnComentario.setAttribute("placeholder","Deja un comentario");
    nombre.textContent = name;
    contenido.textContent = content;

    btnEnviar.type = "submit"

    comentarios.appendChild(btnComentario);
    comentarios.appendChild(btnEnviar);

    container.appendChild(nombre);
    container.appendChild(contenido);
    container.appendChild(comentarios);

    return container;
}

const cargarMasPublis = entry=>{
    if (entry[0].isIntersecting) cargarPublicaciones(4);
}

const observer = new IntersectionObserver(cargarMasPublis);

const cargarPublicaciones = async num=>{
    const request = await fetch("info.txt");
    const content = await request.json();
    const arr = content.content;
    const documentFragment = document.createDocumentFragment(); 
    for (let i = 0; i < num; i++) {
        if (arr[contador] != undefined) {
            const newPublicacion = createPublicationCode(arr[contador].nombre,arr[contador].contenido);
            documentFragment.appendChild(newPublicacion);
            contador++;
            if(i == num-1) observer.observe(newPublicacion);
        }
        else { 
            if(publicaciones.lastElementChild.id !== "noMore") {
                let noMore = document.createElement("h3");
                noMore.textContent = "No hay mas publicaciones";
                noMore.id = "noMore"
                documentFragment.appendChild(noMore);
                publicaciones.appendChild(documentFragment);
                break;
            }
        }
    }
    publicaciones.appendChild(documentFragment);
}

cargarPublicaciones(4)




