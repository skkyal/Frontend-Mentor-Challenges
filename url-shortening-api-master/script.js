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
  //childdiv1.classList.add("new-link-1");

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
  maindiv.appendChild(childdiv);
  maindiv.appendChild(childdiv1);
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
  ele.style.backgroundColor = "hsl(257, 27%, 26%)";
  setTimeout(function () {
    ele.textContent = "Copy";
    ele.style.backgroundColor = "hsl(180, 66%, 49%)";
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

      console.log(err);
    });

  // console.log("shorten link");
};

getStarted = () => {
  document.querySelector("#link").focus();
};
