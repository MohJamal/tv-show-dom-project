const grid = document.getElementById("grid");

//You can edit ALL of the code here
function setup() {
  const allEpisodes = getAllEpisodes();
  makePageForEpisodes(allEpisodes);
  live_search(allEpisodes);
  episode_selector(allEpisodes);
}

/* makePageForEpisodes*/

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;

  episodeList.forEach((episode) => {
    let card = `
      <div class="card">
        <div id="header">
            <h1><a href="${episode.url}" target="_blank">${text_combine(
      episode.name,
      episode.season,
      episode.number,
      true
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

/* live search */

function live_search(episodeList) {
  const search = document.getElementById("search");
  const search_result = document.getElementById("search_result");

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

/* Episode Selector */

function episode_selector(episodeList) {
  const select = document.getElementById("select");
  let position = "beforeend";
  let all_episodes = `<option value="All Episodes">All Episodes</option>`;
  select.insertAdjacentHTML(position, all_episodes);

  episodeList.forEach((episode) => {
    let option = `<option value="${text_combine(
      episode.name,
      episode.season,
      episode.number,
      false
    )}">${text_combine(
      episode.name,
      episode.season,
      episode.number,
      false
    )}</option>`;

    select.insertAdjacentHTML(position, option);
  });

  select.addEventListener("input", (event) => {
    let select_term = event.target.value.toLowerCase();
    let selected_episode = episodeList.find((episode) => {
      return select_term.includes(episode.name.toLowerCase());
    });
    grid.innerHTML = "";
    selected_episode === undefined
      ? makePageForEpisodes(episodeList)
      : makePageForEpisodes([selected_episode]);
  });
}

/* text combine function */

function text_combine(name, season, number, ltr) {
  let s, n;

  season < 10 ? (s = "0" + season) : (s = season);
  number < 10 ? (n = "0" + number) : (n = number);

  return ltr === true
    ? `<span>${name}</span> - S${s}E${n}`
    : `S${s}E${n} - <span>${name}</span>`;
}

window.onload = setup;
