"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const helloRouter = (0, express_1.Router)();
helloRouter.get("/", (req, res) => {
    res.json({ "Data": "Server is running on http://localhost:3000/api/v1/" });
});
helloRouter.get("/profile", (req, res) => {
    res.json({ "Data": "This is profile page" });
});
exports.default = helloRouter;
