function App() {
  //Function para fetch da api
  const search = async (event) => {
    document.getElementById("divinformation").style.borderTop =
      "3px solid #124AA5";
    event.preventDefault();
    const InputSearch = event.target.InputSearch.value;
    var data;
    await fetch(`https://api.github.com/search/repositories?q=${InputSearch}`, {
      headers: {
        "Content-Type": "Application/Json",
      },
      method: "GET",
    })
      .then((response) => response.json())
      .then((json) => (data = json))
      .catch((error) => console.log(error));

    if (data.hasOwnProperty("message")) {
      document.getElementById("divinformation").innerHTML = "";
      document.getElementById(
        "divresults"
      ).innerHTML = `<h1>Erro: ${data.message}</h1>`;
    } else if (data.total_count >= 1) {
      document.getElementById("divresults").innerHTML = "";
      document.getElementById(
        "divinformation"
      ).innerHTML = `${InputSearch}<br/>${data.total_count} repositórios`;
      for (var i in data.items) {
        document.getElementById("divresults").innerHTML += `
        <div class="box">
          <a href="${data.items[i].html_url}">${data.items[i].name}</a>
          <div class="description">
            ${data.items[i].description}
          </div> 
          <div class="stars">
            <i class="bi bi-star-fill"></i>
            ${data.items[i].watchers}
          </div>
          <div class="language">
            ${data.items[i].language}
          </div>
          <div class="forks">
            <i class="bi bi-diagram-2-fill"></i>
            ${data.items[i].forks_count}
          </div>
          <div class="owner">
            <a href="${data.items[i].owner.html_url}">${data.items[i].owner.login}</a>
          </div>
        </div>`;
        i++;
      }
    } else {
      document.getElementById("divinformation").innerHTML = "";
      document.getElementById("divresults").innerHTML =
        "<h1> Sem resultados</h1>";
    }

    document.getElementById("divinformation").style.borderTop = "none";
    removeNull();
  };

  //Function para remover informações nulas
  function removeNull() {
    var language = document.querySelectorAll("div.language");
    var description = document.querySelectorAll("div.description");
    for (var i = 0; i < language.length; i++) {
      if (language[i].innerText == "NULL") {
        language[i].style.display = "none";
      }
    }

    for (var i = 0; i < description.length; i++) {
      if (description[i].innerText == "Null") {
        description[i].style.visibility = "hidden";
      }
    }
  }

  //body
  return (
    <>
      <header id="header">
        <h1>GitHubSearch</h1>
        <form id="FormSearch" onSubmit={search}>
          <input
            type="text"
            id="InputSearch"
            placeholder="O que estamos procurando?"
          />
        </form>
      </header>

      <div id="divinformation" className="divinformation"></div>

      <div id="divresults" className="divresults">
        <h1>Ainda não há nada aqui!</h1>
      </div>
    </>
  );
}

export default App;
