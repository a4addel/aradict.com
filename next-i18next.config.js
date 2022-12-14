const path  = require("path");


module.exports = {
  i18n: {
    defaultLocale: "ar",
    locales: ["en", "ar", "es", "nl", "id"],
    localePath: path.resolve("./src/json"),
    localeDetection: false
  },
};
