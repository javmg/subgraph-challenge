import express from "express";

import {roleRestInstance} from "../rest/roleRest";

const router = express.Router();

router.get("/v1/roles", async (_req, res, next) => {

  return roleRestInstance.getRoles()

  .then((result) => {
    res.status(200).json(result);
  })

  .catch(next);
});

export = router;
