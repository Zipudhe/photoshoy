let counter = 0;

function addSpeakerBtnsDiv() {
  const addButton = document.createElement("button");
  addButton.className = "btn-add";
  addButton.innerHTML = "+";
  addButton.addEventListener("click", (e) => {
    e.preventDefault();
    createNewInput(e.target);
  });

  function removeDiv(element) {
    const fatherNode = element.parentNode;
    const grandFatherNode = fatherNode.parentNode;
    if (grandFatherNode === "speaker0") return;
    document.getElementById(grandFatherNode.id).remove();
  }


  const removeButton = document.createElement("button");
  removeButton.className = "btn-remove";
  removeButton.innerHTML = "-";
  removeButton.addEventListener("click", (e) => {
    e.preventDefault();
    removeDiv(e.target);
  });

  const buttonDiv = document.createElement("div");
  buttonDiv.className = "speaker-btn";
  buttonDiv.appendChild(addButton);
  buttonDiv.appendChild(removeButton);

  return buttonDiv;
}

function createNewInput() {
  counter++;
  const newSpeakerDiv = document.createElement("div");
  newSpeakerDiv.className = "field speaker";
  newSpeakerDiv.id = `speaker${counter}`;
  const newInput = document.createElement("input");
  const buttonDiv = addSpeakerBtnsDiv();

  newInput.type = "text";
  newInput.name = "github";
  newInput.required = true;
  newInput.placeholder = "username do palestrante";

  newSpeakerDiv.appendChild(newInput);
  newSpeakerDiv.appendChild(buttonDiv);

  document.querySelector(".speakers--div").appendChild(newSpeakerDiv);
}

document.forms[0].addEventListener("submit", (e) => {
  e.preventDefault();
  lecturerCount = 0;
  let dict = {
    github: (value) => {
      fetch(`https://api.github.com/users/${value}`)
        .then((api) => api.json())
        .then((user) => {
          document.querySelector(`.preview .lecturer #lecturer${lecturerCount}`).src =
            user["avatar_url"];
            lecturerCount++;
        });
      return ".lecturer .username span";
    },
    title: (v) => ".title",
    date: (v) => ".date span",
    time: (v) => ".time span",
  };
  Object.keys(dict).forEach((key) => {
    document.querySelectorAll(`[name=${key}]`).forEach((div) => {
      if(key == "github" && counter > 0){
        setLecturerDiv();
        counter++;
      }
      document.querySelector(`.preview ${dict[key](div.value)}`)
      .innerHTML = div.value;
    });
  });
});

function setLecturerDiv() {
  
  const lecturerDiv = document.createElement("div");
  lecturerDiv.className = "lecturer";
  const img = document.createElement("img");
  img.alt = "lecturer photo";
  img.className =  "picture";
  img.id = `lecturer${counter}`;
  const span = document.createElement("span");
  span.className = "username";
  span.innerHTML = "@";

  lecturerDiv.appendChild(img);
  lecturerDiv.appendChild(span);
  document.querySelector(".lecturers").appendChild(lecturerDiv);
} 

// cria link para imagem do preview, porem não esta funcionando corretamente
// document.querySelector('.options form .submit').onclick = () => {
//   html2canvas(document.querySelector('.preview')).then((canvas) => {
//     document.querySelector('main').innerHTML += `<a href="${canvas.toDataURL(
//       'image/png'
//     )}" download="class.png" style="display: none">Download</a>`;
//     document.querySelector('main a').click();
//   });
// };

// Adiciona input de novo speaker
document
  .querySelector(".speaker-btn .btn-add")
  .addEventListener("click", (e) => {
    e.preventDefault();
    createNewInput();
  });

// remove input de speaker
document
  .querySelector(".speaker-btn .btn-remove")
  .addEventListener("click", (e) => {
    e.preventDefault();
    removeDiv(e.target);
  });
