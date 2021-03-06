loadList = () => {
  const links = JSON.parse(localStorage.getItem("links"));
  if (links) {
    let list = document.querySelector("#link-list");
    for (let i = 0; i < links.length; i++) {
      createLink(links[i], list, i);
    }
  }
};
createLink = (link, list, id) => {
  let maindiv = document.createElement("div");
  maindiv.classList.add("new-link");

  let childdiv1 = document.createElement("div");
  childdiv1.textContent = link.original;
  childdiv1.classList.add("new-link-2");

  let childdiv = document.createElement("div");
  childdiv.classList.add("new-link-1");

  let textdiv = document.createElement("div");
  textdiv.textContent = link.short;
  textdiv.setAttribute("id", `div-${id}`);
  textdiv.classList.add("new-link-div");

  let btndiv = document.createElement("div");
  btndiv.textContent = "Copy";
  btndiv.classList.add("new-link-btn");
  btndiv.setAttribute("id", `btn-${id}`);
  btndiv.setAttribute("onclick", `copytext(this)`);

  childdiv.appendChild(textdiv);
  childdiv.appendChild(btndiv);
  maindiv.appendChild(childdiv1);
  maindiv.appendChild(childdiv);
  list.appendChild(maindiv);
};
window.onload = loadList;

copytext = (ele) => {
  let id = "div" + ele.id.slice(3);
  //console.log(id);

  const copyText = document.querySelector(`#${id}`).textContent;
  //console.log(copyText);
  CopyTextToClipboard(copyText);

  ele.textContent = "Copied!";
  ele.classList.add("div-copied");
  ele.classList.remove("new-link-btn");

  setTimeout(function () {
    ele.textContent = "Copy";
    ele.classList.add("new-link-btn");
    ele.classList.remove("div-copied");
  }, 2000);
};

function CopyTextToClipboard(text) {
  var textArea = document.createElement("textarea");
  textArea.value = text;

  // Avoid scrolling to bottom
  textArea.style.top = "0";
  textArea.style.left = "0";
  textArea.style.position = "fixed";

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    var successful = document.execCommand("copy");
    //var msg = successful ? "successful" : "unsuccessful";
    //console.log("Copied ");
  } catch (err) {
    console.error("Unable to copy", err);
  }

  document.body.removeChild(textArea);
}

shorten = async () => {
  const inputEle = document.querySelector("#link");
  const inputText = inputEle.value;

  const btntext = document.querySelector("#btn-text");
  btntext.textContent = "";
  const loader = document.querySelector("#loader");
  loader.style.display = "flex";
  // console.log(loader);

  let url = new URL("https://api.shrtco.de/v2/shorten");
  url.search = new URLSearchParams({ url: inputText }).toString();

  await fetch(url)
    .then((response) => response.json())
    .then((data) => {
      let links = JSON.parse(localStorage.getItem("links"));
      //console.log(data)
      if (data.ok == false) {
        throw "Enter Valid link";
      }
      if (links) {
        links.push({ original: inputText, short: data.result.short_link });
        localStorage.setItem("links", JSON.stringify(links));
      } else {
        let curr = [{ original: inputText, short: data.result.short_link }];
        localStorage.setItem("links", JSON.stringify(curr));
      }
      location.reload();
    })
    .catch((err) => {
      inputEle.style.border = "solid";
      inputEle.style.borderColor = "red";
      inputEle.style.borderWidth = "2px";
      inputEle.classList.add("input-error");

      const s1 = document.querySelector(".shorten-link");
      s1.style.paddingBottom = "30px";

      const error = document.querySelector(".error-message");
      error.style.display = "block";

      //console.log(err);
    });
  btntext.textContent = "Shorten it!";
  loader.style.display = "none";

  // console.log("shorten link");
};

const showmenus = (parent) => {
  const menu = document.querySelector(".nav-options");
  const dis = menu.style.display;

  const ele = parent.querySelectorAll("div");
  //console.log(ele);
  if (dis == "block") {
    for (let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundColor = "hsl(0, 0%, 75%)";
    }
    menu.style.display = "none";
  } else {
    menu.style.display = "block";
    for (let i = 0; i < ele.length; i++) {
      ele[i].style.backgroundColor = "hsl(260, 8%, 14%)";
    }
  }
};

getStarted = () => {
  document.querySelector("#link").focus();
};
