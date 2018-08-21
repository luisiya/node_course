const { JSDOM } = require("jsdom");




module.exports.checkTechnologies = async (req, res, next) => {
    const {url} = req.query;
    const dom = await JSDOM.fromURL(url, {});
    let TECH = {
        js: "false",
        css: "false",
        html: "false"
    };
    let description = dom.window.document.querySelector(".card.wordwrap").textContent.toLowerCase();
    Object.keys(TECH).forEach((tech) => {
        TECH[tech] = description.includes(tech.toLowerCase());
    });

    res.send(TECH);
    next();

};