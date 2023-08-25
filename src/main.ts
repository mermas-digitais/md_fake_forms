import { db, firestore } from "./firebaseConfig";

const form = document.querySelector("form") as HTMLFormElement;

const docRef = firestore.collection(db, "usersData");

const errorContainer = document.querySelector("#error-box") as HTMLDivElement;

const submitContainer = document.querySelector(
  "#submit-box"
) as HTMLButtonElement;

const submitButton = form.querySelector("#submit-btn") as HTMLInputElement;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const formData = new FormData(form);
  const data = Object.fromEntries(formData.entries());

  const nome = form.nome.value;
  const email = form.email.value;

  if (nome === "" || email === "") {
    errorContainer.style.visibility = "visible";
    errorContainer.style.background = "#FFD2B2";
    errorContainer.style.color = "#C08500";

    errorContainer.innerHTML = `<p>Por favor, preencha todos os campos!</p>`;

    setTimeout(() => {
      errorContainer.innerHTML = "";
      errorContainer.style.visibility = "hidden";
    }, 3000);
    return; // Impedir o envio do formulário se houver campos vazios
  }

  submitButton.disabled = true;
  submitButton.innerHTML =
    '<i class="fas fa-circle-notch fa-spin"></i> Enviando...'; // Ícone de carregamento
  submitButton.style.cursor = "not-allowed";
  submitButton.classList.add("loading");

  try {
    await firestore.addDoc(docRef, data);
    form.reset();
    submitContainer.style.visibility = "visible";
    submitContainer.innerHTML = `<p>Presença adicionada com sucesso!</p>`;
    setTimeout(() => {
      submitContainer.innerHTML = "";
      submitContainer.style.visibility = "hidden";
    }, 3000);
  } catch (error) {
    console.log("Falha ao adicionar dados: ", error);
    errorContainer.style.visibility = "visible";
    errorContainer.innerHTML = `<p>Falha ao adicionar dados: ${error}</p>`;
    setTimeout(() => {
      errorContainer.innerHTML = "";
      errorContainer.style.visibility = "hidden";
    }, 3000);
  } finally {
    setTimeout(() => {
      submitButton.disabled = false;
      submitButton.innerHTML = "Marcar presença";
      submitButton.classList.remove("loading");
    }, 200);
  }
});
