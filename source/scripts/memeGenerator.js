/**
 * New meme appears on page refresh
 */
document.addEventListener("DOMContentLoaded", () => {
  let random = Math.floor(Math.random() * 624);
  /**
   * Memes sourced from https://github.com/schesa/ImgFlip575K_Dataset/tree/master/dataset/memes
   * Took 10 memes from each template and pasted them into source/memes/json
   */
  fetch("./memes.json")
    .then((response) => response.json())
    .then((data) => {
      let randMeme = document.createElement("img");
      randMeme.src = data[random].url;
      randMeme.className = "meme";
      randMeme.width = 300;
      document.getElementById("random-meme").append(randMeme);
    });
});
