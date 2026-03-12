export default {
  layout: "post.njk",
  tags: ["case-studies"],
  eleventyComputed: {
    posts: (data) => data.collections["case-studies"],
  },
  author: {
    avatar: "webmaster.html",
    name: "Nalca Biotech",
    email: "webmaster@nalca.bio",
    title: "Webmaster",
  },
};
