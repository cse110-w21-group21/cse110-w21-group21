/*eslint-disable*/
document.addEventListener("DOMContentLoaded", () => {
  let random = Math.floor((Math.random() * 1733) % 311);

  fetch("./db.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      // data.forEach((meme) => {
      //     i++;
      // });
      for (let i = 0; i < 311; i++) {
        if (i == random) {
          let randMeme = document.createElement("img");
          randMeme.src = data["_default"][i].media;
          randMeme.className = "meme";
          randMeme.width = 300;
          randMeme.height;
          document.getElementById("random-meme").append(randMeme);
          break;
        }
      }
    });
});
