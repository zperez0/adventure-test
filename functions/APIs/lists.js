const { db } = require("../util/admin");

exports.getAllLists = (request, response) => {
  db.collection("lists")
    .orderBy("createdAt", "desc")
    .get()
    .then((data) => {
      let lists = [];
      data.forEach((doc) => {
        lists.push({
          listId: doc.id,
          title: doc.data().title,
          body: doc.data().body,
          createdAt: doc.data().createdAt,
        });
      });
      return response.json(lists);
    })
    .catch((err) => {
      console.error(err);
      return response.status(500).json({ error: err.code });
    });
};
