import { DataProfil } from '../../data/dataProfil.js';

let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();


let NavBar = {};

NavBar.format = async function (hAbout) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);

  // nom de l'utilisateur courant
  let currentUserName = DataProfil.currentUserName;
  html = html.replace("{{currentUser}}", currentUserName);

  // l'avatar de l'utilisateur courant
  let userImageHtml;
  if (DataProfil.currentUserImage && !DataProfil.currentUserImage.includes('Invité')) {
    userImageHtml = `<img src="../server/images/avatar/${DataProfil.currentUserImage}" alt="User Image" />`;
  } else {
    userImageHtml = `<img src="https://api.dicebear.com/9.x/initials/svg?seed=${currentUserName}" alt="User Image" />`;
  }
  html = html.replace("{{userImage}}", userImageHtml);


  let profils = await DataProfil.request();
  let profilsHTML = "";

  if (profils) {
    for (let profil of profils) {
      if (profil.id != DataProfil.currentUserId) {
        const birth = new Date(profil.birth);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();

        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }

        const userImage = profil.image
          ? `../server/images/avatar/${profil.image}`
          : `https://api.dicebear.com/9.x/initials/svg?seed=${profil.name}`;


        profilsHTML += `<li>
        <a href="#" onclick="C.handleUserSelect('${profil.id}', '${profil.name}', '${profil.image || ''}')">
            <img src="${userImage}" width="20" alt="Photo profil"/>
            ${profil.name} <span class="user-age">${age} ans</span>
        </a>
    </li>`;
      }
    }
  }

  html = html.replace("{{profils}}", profilsHTML);
  return html;
};

NavBar.initDropdown = function () {
  const navbarUser = document.querySelector('.navbar__user');
  if (navbarUser) {
    navbarUser.onclick = function (event) {
      event.stopPropagation();
      const dropdown = this.querySelector('.dropdown');
      dropdown.classList.toggle('dropdown--active');
    }
  }
};

export { NavBar };