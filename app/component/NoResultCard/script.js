let templateFile = await fetch('./component/NoResultCard/template.html');
let template = await templateFile.text();

let NoResultCard = {};

NoResultCard.format = function(message) {
    let html = template;
    html = html.replace("{{message}}", message);
    return html;
}

export { NoResultCard };