loadList = () => {
  const links = JSON.parse(localStorage.getItem("links"));
  if (links) {
    let list = document.querySelector("#link-list");
    for (let i = 0; i < links.length; i++) {
      createLink(links[i], list);
    }
  }
};
createLink = (link, list) => {
  let maindiv = document.createElement("div");
  maindiv.classList.add("new-link");

  let childdiv1 = document.createElement("div");
  childdiv1.textContent = link.original;
  //childdiv1.classList.add("new-link-1");

  let childdiv = document.createElement("div");
  childdiv.classList.add("new-link-1");

  let textdiv = document.createElement("div");
  textdiv.textContent = link.short;
  textdiv.classList.add("new-link-div");

  let btndiv = document.createElement("div");
  btndiv.textContent = "Copy";
  btndiv.classList.add("new-link-btn");
  btndiv.setAttribute("onclick", `copytext(${btndiv})`);

  childdiv.appendChild(textdiv);
  childdiv.appendChild(btndiv);
  maindiv.appendChild(childdiv);
  maindiv.appendChild(childdiv1);
  list.appendChild(maindiv);
};
window.onload = loadList;

copytext = (ele) => {
  console.log("click");
};

shorten = async () => {
  const inputEle = document.querySelector("#link");
  const inputText = inputEle.value;
  let url = new URL("https://api.shrtco.de/v2/shorten");
  url.search = new URLSearchParams({ url: inputText }).toString();

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let links = JSON.parse(localStorage.getItem("links"));
      if (links) {
        links.push({ original: inputText, short: data.result.short_link });
        localStorage.setItem("links", JSON.stringify(links));
      } else {
        let curr = [{ original: inputText, short: data.result.short_link }];
        localStorage.setItem("links", JSON.stringify(curr));
      }
    })
    .catch((err) => {
      inputEle.style.border = "solid";
      inputEle.style.borderColor = "red";
      inputEle.style.borderWidth = "2px";
      inputEle.classList.add("input-error");
      console.log(err);
    });

  // console.log("shorten link");
};

getStarted = () => {
  document.querySelector("#link").focus();
};
