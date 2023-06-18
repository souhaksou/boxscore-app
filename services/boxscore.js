const axios = require('axios');
const cheerio = require('cheerio');

// const title = ['塞爾蒂克', '上場時間', '得分', '籃板', '助攻', '抄截', '阻攻', '投籃', '投籃命中(%)',
//   '3分球', '3分球命中(%)', '罰球', '罰球命中(%)', '進攻籃板', '防守籃板', '失誤', '犯規', '+/-'];
// const title = ['PLAYER', 'MIN', 'PTS', 'REB', 'AST', 'STL', 'BLK', 'FG', 'FG%',
//   '3P', '3P%', 'FT', 'FT%', 'OREB', 'DREB', 'TO', 'PF', '+/-'];

const boxscore = async (url) => {
  try {
    const { status, data } = await axios.get(url);
    if (status === 200) {
      const $ = cheerio.load(data);

      // title
      const title = $('.box-title');
      const boxTitle = title.text();
      console.log(boxTitle);

      // 對戰組合隊伍
      const teams = $('.schedule_date_team');
      let teamName = [];
      teams.each((teamIndex, team) => {
        const name = $(team).text().trim();
        teamName.push(name);
      });

      // 數據
      const trs = $('.matchup tr');
      let teamCount = 0;
      const boxscoreArr = [[], []];
      trs.each((trIndex, tr) => {
        const hasTh = $(tr).has('th').length > 0;
        // th
        if (hasTh) {
          teamCount += 1;
        }
        // td
        else {
          const player = [];
          const tds = $(tr).find('td');
          tds.each((tdIndex, td) => {
            let text = '';
            const hasA = $(td).has('th').length > 0;
            if (hasA) {
              text = $(td).find('a').text();
            }
            else {
              text = $(td).text();
            }
            player.push(text);
          });
          boxscoreArr[teamCount - 1].push(player);
        }
      });

      return { boxTitle, teamName, boxscoreArr };
    }
  }
  catch (err) {
    console.log(err);
  }
}

module.exports = boxscore;