const dayDisplay = document.getElementById("days");
const episodeDisplay = document.getElementById("episode");
const progressDisplay = document.getElementById("progress");

function episodeTotal(data) {
  let total = 0;
  total += data["Duel Monsters"].total;
  total += data["GX"].total;
  total += data["5Ds"].total;
  total += data["Zexal"].total;
  total += data["Arc-V"].total;
  total += data["VRAINS"].total;
  total += data["Sevens"].total;
  total += data["Go Rush!!"].total;

  return total;
}

function findEpisodeNumber(data, search) {
  const [series, season, episode] = search;
  console.log(series, season, episode);

  const seasons = Object.keys(data);
  const seriesIndex = seasons.findIndex((s) => s === series);
  let episodeNum = 0;

  switch (true) {
    case seriesIndex > 6:
      //! season less than limit of season length, only add episodes in
      //! done seasons then add current episodes up to
      if (seriesIndex === 7 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["Go Rush!!"].total;
        console.log("Go Rush!!", seriesIndex);
      }
    case seriesIndex > 5:
      if (seriesIndex === 6 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["Sevens"].total;
        console.log("Sevens", seriesIndex);
      }
    case seriesIndex > 4:
      if (seriesIndex === 5 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["VRAINS"].total;
        console.log("VRAINS", seriesIndex);
      }
    case seriesIndex > 3:
      if (seriesIndex === 4 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["Arc-V"].total;
        console.log("Arc-V", seriesIndex);
      }
    case seriesIndex > 2:
      if (seriesIndex === 3 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["Zexal"].total;
        console.log("Zexal", seriesIndex);
      }
    case seriesIndex > 1:
      if (seriesIndex === 2 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["5Ds"].total;
        console.log("5Ds", seriesIndex);
      }
    case seriesIndex > 0:
      if (seriesIndex === 1 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["GX"].total;
        console.log("GX", seriesIndex);
      }
    case seriesIndex > -1:
      if (seriesIndex === 0 && seriesIndex < data[series].seasons.length) {
        let i = 0;
        while (i < season) {
          if (seriesIndex > i) {
            episodeNum += data[series].seasons[i];
          } else if (seriesIndex === i) {
            episodeNum += episode;
          }
          i++;
        }
      } else {
        episodeNum += data["Duel Monsters"].total;
        console.log("Duel Monsters", seriesIndex);
      }
      break;
    default:
      episodeNum = 0;
      break;
  }

  return episodeNum;
}

async function gatherData() {
  const slug = await fetch("./yugioh.json");
  const data = await slug.json();

  const episodes = episodeTotal(data);
  const currentEpisode = findEpisodeNumber(data, data.currentEpisode);
  console.log({ currentEpisode });
  progressDisplay.max = episodes;
  progressDisplay.value = currentEpisode ?? 0;

  const startDate = new Date(Date.parse("20 Sep 2021"));
  const currentDate = new Date();

  const marathonLength = Math.round(
    (currentDate - startDate) / (1000 * 60 * 60 * 24)
  );

  dayDisplay.innerText = marathonLength;
  episodeDisplay.innerText = `Yu-Gi-Oh! ${data.currentEpisode[0]}\n Season ${data.currentEpisode[1]} Episode ${data.currentEpisode[2]}`;
}

gatherData();
