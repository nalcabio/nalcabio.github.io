import {
  HtmlBasePlugin,
  I18nPlugin,
  IdAttributePlugin,
  InputPathToUrlTransformPlugin,
} from "@11ty/eleventy";
import eleventyNavigationPlugin from "@11ty/eleventy-navigation";
import pluginRss from "@11ty/eleventy-plugin-rss";

import { DateTime } from "luxon";

export const config = {
  dir: {
    data: "../data",
    includes: "../includes",
    input: "src/site",
    layouts: "../layouts",
    output: "dist",
  },
  htmlTemplateEngine: "njk",
  markdownTemplateEngine: "njk",
};

export default function (eleventyConfig) {
  eleventyConfig.addBundle("js", {
    toFileDirectory: "js",
  });

  eleventyConfig.addPassthroughCopy({
    css: "/css/",
    "src/static": "/",
  });

  eleventyConfig.addPassthroughCopy(
    "src/site/**/*.{gif,jpeg,jpg,mp4,png,svg}",
    {
      mode: "html-relative",
    },
  );

  eleventyConfig.addWatchTarget("css/*.css");

  eleventyConfig.addPlugin(HtmlBasePlugin, {
    baseHref: "https://nalca.bio/",
    extensions: false,
  });

  eleventyConfig.addPlugin(I18nPlugin, {
    defaultLanguage: "en", // Required
  });

  eleventyConfig.addPlugin(IdAttributePlugin);

  eleventyConfig.addPlugin(InputPathToUrlTransformPlugin);

  eleventyConfig.addPlugin(eleventyNavigationPlugin);

  eleventyConfig.addPlugin(pluginRss);

  eleventyConfig.addFilter("matchPageLang", function (collection = []) {
    return collection.filter((item) => {
      return this.page.lang === item.page.lang;
    });
  });

  eleventyConfig.addFilter("siteLangs", function (collection = []) {
    return Array.from(
      collection
        .map((item) => item.data.page.lang)
        .reduce((set, lang) => set.add(lang), new Set()),
    );
  });

  eleventyConfig.addFilter(
    "tagsByLang",
    function (collection = [], langs = []) {
      return langs.reduce((accum, lang) => {
        const tags = collection
          .filter((item) => item.data.page.lang === lang && !!item.data.tags)
          .map((item) => item.data.tags)
          .flat();
        accum[lang] = Array.from(new Set(Array.isArray(tags) ? tags : [tags]));
        return accum;
      }, {});
    },
  );

  eleventyConfig.addFilter("sortPages", function (collection = []) {
    return collection.sort((item1, item2) => {
      return item1.page.url.localeCompare(item2.page.url);
    });
  });

  eleventyConfig.addFilter("filterTags", function (tags = []) {
    return tags.filter((tag) => {
      return ["all", "posts"].indexOf(tag) === -1;
    });
  });

  eleventyConfig.addFilter("sortAlphabetically", function (strings = []) {
    return strings.sort((s1, s2) => {
      return s1.localeCompare(s2);
    });
  });

  eleventyConfig.addFilter("htmlDateString", function (dateObj, zone = "utc") {
    return DateTime.fromJSDate(dateObj, { zone: zone }).toFormat("yyyy-LL-dd");
  });

  eleventyConfig.addFilter(
    "readableDate",
    (dateObj, format = "dd LLLL yyyy", zone = "utc") => {
      return DateTime.fromJSDate(dateObj, { zone: zone }).toFormat(format);
    },
  );
}
