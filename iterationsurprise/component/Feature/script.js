let templateFile = await fetch('./component/Feature/template.html');
let template = await templateFile.text();

let Feature = {};

Feature.render = function(){
    return template;
}

export {Feature};