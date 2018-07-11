const express = require ("express");
const app = express();
const bodyParser = require ('body-parser')

const port = 8080

let blogs = [
    {
      id: 'blog-title-1',
      title: 'Blog Title 1',
      summary: 'This is a blog summary.',
      content: 'This is the blog content',
      author: 'John Smith',
      created: 'February 5, 2018'
    },
    {
      id: 'blog-title-2',
      title: 'Blog Title 2',
      summary: 'This is a blog summary.',
      content: 'This is the blog content',
      author: 'John Smith',
      created: 'February 6, 2018'
    }
  ];

function BlogPost (id, title, summary, content, author, created) {
    this.id = id;
    this.title = title;
    this.summary = summary;
    this.content = content;
    this.author = author;
    this.created = created;
}

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({extended: false}));

app.use (express.static("public"));

app.get("/blog", (req, res) => {
    res.render("blog", {blogs});
});

app.get("/blog/:blogId", (req, res) => {
    let { blogId } = req.params;
    let blog = blogs.find((post) => {
        return blogId === post.id;
    });
    res.render("post", {blog});
});

app.get("/addpost", (req, res) => {
    res.render("addpost")
})

app.post("/blog", (req, res) => {
    console.log(req.body)
    let {newTitle, newSummary, newContent, newAuthor, newDate} = req.body;
    let post = new BlogPost();
    post.title = newTitle;
    post.author = newAuthor;
    post.summary = newSummary;
    post.created = newDate;
    post.content = newContent;
    post.id = newTitle.replace(/ /g, "-").toLowerCase();
    blogs.push(post);
    res.render("blog", {blogs});
});

app.delete("/blog/:blogId", (req, res) => {
    res.send("delete request");
});

app.listen(port, () => {
    console.log ("Listening on port " + port);
});
