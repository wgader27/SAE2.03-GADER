let templateFile = await fetch('./component/AddUser/template.html');
let template = await templateFile.text();

let AddUser = {};


AddUser.format = function(handler){
    let html= template;
    html = html.replace('{{handlerUser}}', handler);
    return html;
}


export {AddUser};