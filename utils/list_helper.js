const dummy = (blogs) => {
    return 1
}

const totalLikes = blogs => {
  
 const total = blogs.map(blog => blog.likes)
                  .reduce((sum, likes) => sum + likes, 0)


return blogs.length === 0 ? 0 : total


}




const favoritesBlog = blogs => {
  
    let most_liked = 0
   
    for(let i=0; i< blogs.length; i++) {
      if(blogs[i].likes > blogs[most_liked].likes) {
        most_liked = i
      }
    }

 const favoriteBlog = {
    title: blogs[most_liked].title,
    author: blogs[most_liked].author,
    likes: blogs[most_liked].likes
 }

    
return  favoriteBlog


}



module.exports = {
    dummy,
    totalLikes,
    favoritesBlog,
}
