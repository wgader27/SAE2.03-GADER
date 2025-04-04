let templateFile = await fetch('./component/CardMovie/template.html');
let template = await templateFile.text();

let CardMovie = {};

CardMovie.format = function (obj) {
  let html = template;
  html = html.replace("{{alt}}", obj.name);

  if(obj.name.length > 20){
    html = html.replace("{{title}}", obj.name.substring(0, 20) + "...");
  }
  else{
    html = html.replace("{{title}}", obj.name);
  }


  let imageName = obj.image;   
  let imagePath = "../server/images/" + imageName;
  
  // On vérifie si l'image existe en utilisant un XMLHttpRequest simple
  let xhr = new XMLHttpRequest();
  xhr.open('HEAD', imagePath, false); // false pour synchrone
  xhr.send();
  
  // Si l'image existe, on remplace par son nom, sinon par 'no_image.jpg'
  html = html.replace("{{img}}", (xhr.status >= 200 && xhr.status < 300) ? imageName : "no_image.jpg");
  return html;  
} 

CardMovie.formatMany = function(movies){
  let html = "";
  for(const obj of movies){
      html = html + CardMovie.format(obj)
  }
  return html;
}


export { CardMovie };
