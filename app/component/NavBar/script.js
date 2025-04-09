import { DataProfil } from '../../data/dataProfil.js';

let templateFile = await fetch("./component/NavBar/template.html");
let template = await templateFile.text();


let NavBar = {};

NavBar.format = async function (hAbout) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  
  // Afficher le nom de l'utilisateur courant
  let currentUserName = DataProfil.currentUserName || "Sélectionnez un profil";
  html = html.replace("{{currentUser}}", currentUserName);
  
  // Afficher l'avatar de l'utilisateur courant
  let currentUserImage = DataProfil.currentUserName || "Guest";
  html = html.replace("{{currentUserImage}}", currentUserImage);
  
  let profils = await DataProfil.request();
  let profilsHTML = "";
  
  if (profils && profils.length != 0) {
    for (let profil of profils) {
      if (profil.id != DataProfil.currentUserId) {
        // Calcul de l'âge pour chaque profil
        const birth = new Date(profil.birth);
        const today = new Date();
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        
        if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
          age--;
        }

        profilsHTML += `<li>
          <a href="#" onclick="C.handleUserSelect('${profil.id}', '${profil.name}')">
            <img src="https://api.dicebear.com/9.x/initials/svg?seed=${profil.name}" width="20"/>
            ${profil.name} <span class="user-age">${age} ans</span>
          </a>
        </li>`;
      }
    }
  }
  else {
    profilsHTML = `<li class="no-users">
      <span>Aucun utilisateur disponible</span>
    </li>`;
  }
  
  html = html.replace("{{profils}}", profilsHTML);
  return html;
};

NavBar.initDropdown = function() {
  const navbarUser = document.querySelector('.navbar__user');
  if (navbarUser) {
    navbarUser.onclick = function(event) {
      event.stopPropagation();
      const dropdown = this.querySelector('.dropdown');
      dropdown.classList.toggle('dropdown--active');
    }
  }
};

export { NavBar };