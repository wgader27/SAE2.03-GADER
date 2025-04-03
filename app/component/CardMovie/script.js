let templateFile = await fetch('./component/CardMovie/template.html');
let template = await templateFile.text();

let CardMovie = {};

CardMovie.format = function (obj) {
  let html = template;
  html = html.replace("{{title}}", obj.name);
  html = html.replace("{{img}}", obj.image);
  html = html.replace("{{link}}", obj.trailer);
  html = html.replace("{{title}}", obj.name);


  return html;
};


CardMovie.formatMany = function(movies){
  let html = "";
  for(const obj of movies){
      html = html + CardMovie.format(obj)
  }
  return html;
}


export { CardMovie };
