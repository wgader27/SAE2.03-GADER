let templateFile = await fetch("./component/CardMovie/template.html");
let template = await templateFile.text();

let CardMovie = {};

CardMovie.format = function (hAbout, hHome) {
  let html = template;
  html = html.replace("{{hAbout}}", hAbout);
  return html;
};

export { CardMovie };
