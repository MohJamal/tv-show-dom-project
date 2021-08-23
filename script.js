//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
}

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

window.onload = setup;
