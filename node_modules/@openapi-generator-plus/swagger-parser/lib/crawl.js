"use strict";

const url = require("url");

/**
 * Used when crawling the document while resolving refs. This enables us to
 * correct some things that are peculiar to OpenAPI that the JSON schema parser
 * cannot pickup.
 */
function resolveCrawl (obj, path, $refs, options, external) {
  /* Handle discriminator mappings, as they may include refs that don't look like refs to
     the JSON schema parser. See the documentation for more information:
     https://github.com/OAI/OpenAPI-Specification/blob/master/versions/3.0.3.md#discriminator-object
   */
  if (external && path.endsWith("/discriminator/mapping") && typeof obj === "object") {
    for (const key of Object.keys(obj)) {
      const value = obj[key];
      if (typeof value === "string" && value.indexOf("#") !== -1) {
        /* Correct the reference in the external document so we can resolve it */
        const withoutHash = path.substring(0, path.indexOf("#"));
        obj[key] = url.resolve(withoutHash, value);
      }
    }
  }
}

module.exports = {
  resolveCrawl,
};
