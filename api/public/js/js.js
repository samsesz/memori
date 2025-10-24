//const date = new Date();
//const day = date.getDate()
//const month = date.getMonth() + 1
//const year = date.getFullYear()
//const currentDate = document.querySelector('.currentDate')
//currentDate.innerHTML = `Novos pedidos foram realizados desde o último acesso ao sistema. Hoje é <strong>${day}/${month}/${year}</strong>.`

// Modal Mapa

const dialog = document.querySelector("#conteudo-mapa");
const openButton = document.querySelector("#abrir-mapa");
const closeButton = document.querySelector("#fechar-mapa");

openButton.addEventListener("click", (e) => {
  dialog.showModal();
})

closeButton.addEventListener("click", (e) => {
    dialog.close();
})

// Modal Mapa

const dialogModelagem = document.querySelector("#conteudo-modelagem");
const openButtonModelagem = document.querySelector("#abrir-modelagem");
const closeButtonModelagem = document.querySelector("#fechar-modelagem");

openButtonModelagem.addEventListener("click", (e) => {
  dialogModelagem.showModal();
})

closeButtonModelagem.addEventListener("click", (e) => {
    dialogModelagem.close();
})



