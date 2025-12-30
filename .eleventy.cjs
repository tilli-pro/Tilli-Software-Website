module.exports = function(eleventyConfig) {
  // Configure Nunjucks to not autoescape (11ty handles safety)
  eleventyConfig.setNunjucksEnvironmentOptions({
    autoescape: false
  });

  // Passthrough copy for assets from root (not src/)
  eleventyConfig.addPassthroughCopy({ "*.js": "." });
  eleventyConfig.addPassthroughCopy({ "*.css": "." });
  eleventyConfig.addPassthroughCopy({ "Images": "Images" });
  eleventyConfig.addPassthroughCopy({ "api": "api" });
  eleventyConfig.addPassthroughCopy({ "favicon.ico": "favicon.ico" });
  eleventyConfig.addPassthroughCopy({ "*.png": "." });
  eleventyConfig.addPassthroughCopy({ "site.webmanifest": "site.webmanifest" });
  eleventyConfig.addPassthroughCopy({ "apple-touch-icon.png": "apple-touch-icon.png" });

  // Copy image directories with spaces in names
  eleventyConfig.addPassthroughCopy({ "Blog Page images": "Blog Page images" });
  eleventyConfig.addPassthroughCopy({ "Industries Home page": "Industries Home page" });
  eleventyConfig.addPassthroughCopy({ "About Us <>": "About Us <>" });
  eleventyConfig.addPassthroughCopy({ "industries": "industries" });

  // Filters
  eleventyConfig.addFilter("jsonify", (value) => JSON.stringify(value));

  // Shortcodes for inline SVG icons
  eleventyConfig.addShortcode("icon", function(name, classes = "icon-inline") {
    const icons = {
      "arrow-right": `<svg class="${classes}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 12h14m0 0l-7-7m7 7l-7 7"></path></svg>`,
      "check": `<svg class="${classes}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7"></path></svg>`,
      "check-circle": `<svg class="${classes}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
      "x": `<svg class="${classes}" fill="none" stroke="currentColor" stroke-width="2" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"></path></svg>`
    };
    return icons[name] || "";
  });

  // Collections
  eleventyConfig.addCollection("pages", function(collectionApi) {
    return collectionApi.getFilteredByGlob("src/pages/**/*.njk");
  });

  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes/layouts",
      data: "_data"
    },
    templateFormats: ["njk", "html", "md"],
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk"
  };
};
