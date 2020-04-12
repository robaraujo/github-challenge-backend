var express = require("express");
var router = express.Router();
var axios = require("axios");
var config = require("../config.json");

router.get("/users/:page?", async (req, res) => {
  const page = parseInt(req.params["page"]) || 0;

  try {
    raw = await axios.get(config.githubUrl + "?since=" + page, getHeader());
    let lastId = 0;

    if (raw.data.length) {
      lastId = raw.data[raw.data.length - 1].id;
    }

    res.json({
      list: raw.data,
      lastId: lastId,
    });
  } catch (e) {
    console.error(e.response);
    res.status(400).send("Error found");
  }
});

router.get("/user/:id", async (req, res) => {
  const id = req.params["id"];
  try {
    const raw = await axios.get(config.githubUrl + "/" + id, getHeader());
    res.json(raw.data);
  } catch (e) {
    console.error(e.response);
    res.status(400).send("Error found");
  }
});

router.get("/user/:id/repos", async (req, res) => {
  const id = req.params["id"];
  const url = config.githubUrl + "/" + id + "/repos";

  try {
    const raw = await axios.get(url, getHeader());
    res.json(raw.data);
  } catch (e) {
    console.error(e.response);
    res.status(400).send("Error found");
  }
});

const getHeader = () => ({
  headers: {
    Authorization: "token " + config.githubToken,
  },
});

module.exports = router;
