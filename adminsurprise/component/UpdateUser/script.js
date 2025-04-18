import { DataProfil } from "../../data/dataProfil.js";

let templateFile = await fetch('./component/UpdateUser/selectuser.html');
let template = await templateFile.text();

let templateFile2 = await fetch('./component/UpdateUser/template.html');
let template2 = await templateFile2.text();


let UpdateUser = {};


UpdateUser.format = function(user) {
    let html = template;
    html = html.replace("{{id}}", user.id);
    html = html.replace("{{name}}", user.name);
    return html;
}


UpdateUser.formatMany = async function(handler) {
    let html = template2;
    let users = await DataProfil.request();
    let optionshtml = "";
    
    for (let user of users) {
        optionshtml += UpdateUser.format(user);
    }
    
    html = html.replace("{{users}}", optionshtml);
    html = html.replace("{{handlerUpdateUser}}", handler);
    
    return html;
}

export { UpdateUser };