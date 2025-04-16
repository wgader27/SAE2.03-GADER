let templateFile = await fetch("./component/TvCard/template.html");
let template = await templateFile.text();

let TvCard = {};

TvCard.render = function() {
    return template;
}

export { TvCard };