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
  
 let blogOccurences = _.entries(_.countBy(blogs, 'author')).map(([author, blogs])=> ({author, blogs}))

 const mostBlog = _.maxBy(blogOccurences, 'blogs')

 return mostBlog

}


const mostLikes = blogs => {

  const groupByAuthor =  _.groupBy(blogs, 'author')

  let authorAndSumOfLikes =  []

  _.forIn(groupByAuthor, (value, author)=> {
     let obj = {
      author: author,
      likes: value.map(val=> val.likes).reduce((sum, num)=> sum + num) 
    }
    return authorAndSumOfLikes.push(obj)
  })
 
 largestNumOfLikes = _.maxBy(authorAndSumOfLikes, 'likes') 
    


 
  return largestNumOfLikes

} 



module.exports = {
    dummy,
    totalLikes,
    favoritesBlog,
    mostBlogs,
    mostLikes
}
