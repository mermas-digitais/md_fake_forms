import { db, firestore } from "./firebaseConfig";

type UserData = {
  nome: string;
  email: string;
};

const containerUsers = document.querySelector(
  ".container-user"
) as HTMLDivElement;
const deleteBtn = document.querySelector(".btn-delete") as HTMLButtonElement;
const submitContainer = document.querySelector(
  "#submit-box"
) as HTMLButtonElement;

const userData: UserData[] = [];
const docRef = firestore.collection(db, "usersData");

const emptyElement = `
      <div class="content-user error-data">
          <p>Nenhum usuário cadastrado</p>
      </div>
    `;

(async function () {
  try {
    const dataRequest = await firestore.getDocs(docRef);
    dataRequest.forEach((doc) => {
      userData.push({
        nome: doc.data().nome,
        email: doc.data().email,
      });
    });

    if (!userData.length) {
      containerUsers.innerHTML = emptyElement;
      return;
    }

    userData.map((user) => {
      containerUsers.innerHTML += `
       <div class="content-user">
          <p><span>Nome:</span> ${user.nome}</p>
          <p><span> Email:</span> ${user.email}</p>
        </div>
      `;
    });
  } catch (error) {
    console.log(error);
    containerUsers.innerHTML = `
      <div class="content-user error-data">
          <p>Não foi possível carregar os dados</p>
      </div>
    `;
  }
})();

deleteBtn.addEventListener("click", async () => {
  try {
    const dataRequest = await firestore.getDocs(docRef);

    if (!userData.length) return;

    dataRequest.forEach(async (doc) => {
      try {
        await firestore.deleteDoc(doc.ref);
      } catch (error) {
        console.error("Erro ao apagar o documento:", error);
      }
    });

    // Limpar o conteúdo após apagar os documentos
    containerUsers.innerHTML = emptyElement;
    submitContainer.style.visibility = "visible";
    submitContainer.innerHTML = `<p>Dados deletados com sucesso!</p>`;
    userData.splice(0, userData.length);
    setTimeout(() => {
      submitContainer.innerHTML = "";
      submitContainer.style.visibility = "hidden";
    }, 3000);
  } catch (error) {
    console.error("Erro ao obter documentos para apagar:", error);
  }
});
