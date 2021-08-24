//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  live_search(allEpisodes);
}

/* makePageForEpisodes start */
function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  const grid = document.getElementById("grid");
  episodeList.forEach((episode) => {
    let card = `
      <div class="card">
        <div id="header">
            <h1><a href="${episode.url}" target="_blank">${header_text_combine(
      episode.name,
      episode.season,
      episode.number
    )}</a></h1>
        </div>
        <div id="main">
            <img src="${episode.image.medium}" alt="episode-photo" />
            ${episode.summary}
        </div>
      </div>
    `;

    let position = "beforeend";

    grid.insertAdjacentHTML(position, card);
  });
}

function header_text_combine(name, season, number) {
  let s, n;

  season < 10 ? (s = "0" + season) : (s = season);
  number < 10 ? (n = "0" + number) : (n = number);

  return `<span>${name}</span> - S${s}E${n}`;
}

/* live search start */

function live_search(episodeList) {
  const search = document.getElementById("search");
  const search_result = document.getElementById("search_result");
  const grid = document.getElementById("grid");
  let search_term = "";

  search.addEventListener("input", (event) => {
    let search_term = event.target.value.toLowerCase();
    grid.innerHTML = "";

    let filtered_episodeList = episodeList.filter((episode) => {
      return (
        episode.name.toLowerCase().includes(search_term) ||
        episode.summary.toLowerCase().includes(search_term)
      );
    });

    makePageForEpisodes(filtered_episodeList);

    if (search_term.length > 0) {
      search_result.innerHTML = `Displaying ${filtered_episodeList.length}/${episodeList.length} episodes`;
    } else {
      search_result.innerHTML = "";
    }
  });
}

window.onload = setup;
