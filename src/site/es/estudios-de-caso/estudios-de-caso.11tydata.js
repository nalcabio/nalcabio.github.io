export default {
  layout: "post.njk",
  tags: ["estudios-de-caso"],
  eleventyComputed: {
    posts: (data) => data.collections["estudios-de-caso"],
  },
  author: {
    avatar: "webmaster.html",
    name: "Nalca Biotech",
    email: "webmaster@nalca.bio",
    title: "Webmaster",
  },
};
