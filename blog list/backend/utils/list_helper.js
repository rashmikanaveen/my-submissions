const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let totalLikesCount = 0
    for (let i = 1; i < blogs.length; i++) {
        totalLikesCount += blogs[i].likes
    }
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
    if (blogs.length === 0) {
        return null
    }
    let favorite = blogs[0]
    for (let i = 1; i < blogs.length; i++) {
        if (blogs[i].likes > favorite.likes) {
            favorite = blogs[i]
        }
    }
    return favorite
}

const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
        return null;
    }

    // Count blogs per author using an object (hash map)
    const authorCounts = {};

    for (const blog of blogs) {
        authorCounts[blog.author] = (authorCounts[blog.author] || 0) + 1;
    }

    // Find the author with most blogs
    let maxAuthor = null;
    let maxCount = 0;

    for (const [author, count] of Object.entries(authorCounts)) {
        if (count > maxCount) {
            maxAuthor = author;
            maxCount = count;
        }
    }

    return { author: maxAuthor, blogs: maxCount };
};

const mostLikes = (blogs) => {
  if (blogs.length === 0) {
    return null
  }

  const authorLikes = {}

  // Count likes
  blogs.forEach(blog => {
    authorLikes[blog.author] =
      (authorLikes[blog.author] || 0) + blog.likes
  })

  // Convert object -> array
  const authorsArray = Object.entries(authorLikes)

  // Find max
  let topAuthor = authorsArray[0]

  for (const author of authorsArray) {
    if (author[1] > topAuthor[1]) {
      topAuthor = author
    }
  }

  return topAuthor[1]
}

    module.exports = {
        dummy,
        totalLikes,
        favoriteBlog,
        mostBlogs,
        mostLikes
    }