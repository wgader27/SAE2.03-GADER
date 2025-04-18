let templateFile = await fetch('./component/SearchBar/template.html');
let template = await templateFile.text();

let SearchBar = {};

SearchBar.render = function() {
    return template;
}

export { SearchBar };

