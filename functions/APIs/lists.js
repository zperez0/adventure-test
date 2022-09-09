exports.getAllLists = (request, response) => {
  lists = [
    {
      id: "1",
      title: "greeting",
      body: "Hello world",
    },
    {
      id: "2",
      title: "greeting2",
      body: "Hello world 2.0",
    },
  ];
  return response.json(lists);
};
