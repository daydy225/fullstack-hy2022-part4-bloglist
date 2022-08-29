const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
  
 const total = blogs.map(blog => blog.likes)
                  .reduce((sum, likes) => sum + likes, 0)


return blogs.length === 0 ? 0 : total


}

module.exports = {
    dummy,
    totalLikes,
}
