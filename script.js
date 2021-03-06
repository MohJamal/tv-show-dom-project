const grid = document.getElementById("grid");
const select_show = document.getElementById("select_show");

add_show_list();

select_show.addEventListener("input", (event) => {
  let show_id =
    event.target.options[select_show.selectedIndex].getAttribute("show_id");
  setup(show_id);
});

//You can edit ALL of the code here
async function setup(show_id) {
  let episodes = [];
  try {
    episodes = await get_show_episodes(show_id);
  } catch (error) {
    console.log("Error!", error);
  }

  makePageForEpisodes(episodes);
  live_search(episodes);
  episode_selector(episodes);
}

/* Show Selector */
function add_show_list() {
  const show_list = getAllShows();
  const select = document.getElementById("select_show");
  let position = "beforeend";
  let select_show = `<option value="Select Show">Select Show</option>`;
  select.insertAdjacentHTML(position, select_show);

  show_list.forEach((show) => {
    let option = `<option value="${show.name}" show_id=${show.id}>${show.name}</option>`;

    select.insertAdjacentHTML(position, option);
  });
}

/* get_show_episodes */

async function get_show_episodes(show_id) {
  const response = await fetch(
    `https://api.tvmaze.com/shows/${show_id}/episodes`
  );
  const episodes = await response.json();
  return episodes;
}

/* makePageForEpisodes*/

function makePageForEpisodes(episodeList) {
  // const rootElem = document.getElementById("root");
  // rootElem.textContent = `Got ${episodeList.length} episode(s)`;
  grid.innerHTML = "";
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
  const select = document.getElementById("select_episode");
  select.innerHTML = "";
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

// window.onload = setup;
