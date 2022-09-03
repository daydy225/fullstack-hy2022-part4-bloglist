const _ = require('lodash') 

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

const mostBlogs = (blogs) => {
  
 let blogOccurences = _.entries(_.countBy(blogs.map(blog => blog.author))).map(([author, blogs])=> ({author, blogs}))

 let blog_index = 0
    for (let i = 0; i < blogOccurences.length; i++) {
       if (blogOccurences[i].blogs > blogOccurences[blog_index].blogs) {
         blog_index = i
       }    
    }

 const mostBlog = blogOccurences[blog_index]

 return mostBlog

}



module.exports = {
    dummy,
    totalLikes,
    favoritesBlog,
    mostBlogs
}
