/* 
export default (req, res) => {
  const {
    query: { id },
  } = req;

  getGameRepository()
    .create({
      player1_nickname: "Jane",
      grid: "[]",
    })
    .then((game) => {
      res.end(`First Game Id:`);
    });
};
 */