"use strict";

const express = require("express");
const bodyParser = require("body-parser");

const modelType = process.env.DBTYPE || "datastore";
const db = require(`./db-datastore`);

const api = express.Router();

api.get("/", async (req, res) => {
  try {
    res.json(await db.list());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.get("/:id(\\w+)", async (req, res) => {
  try {
    const response = await db.get(req.params.id);
    res.send(response.toString());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.put("/:id(\\w+)", bodyParser.text(), async (req, res) => {
  try {
    const response = await db.put(req.params.id, req.body);
    res.send(response.toString());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.post("/:id(\\w+)", bodyParser.text(), async (req, res) => {
  try {
    const response = await db.post(req.params.id, req.body);
    res.send(response.toString());
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

api.delete("/:id(\\w+)", async (req, res) => {
  try {
    await db.delete(req.params.id);
    res.sendStatus(204);
  } catch (e) {
    console.error(e);
    res.sendStatus(500);
  }
});

module.exports = api;
