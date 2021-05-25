### UNHM Programming Club Webpage

Available at https://unhm-programming-club.github.io

Uses [Jekyll](https://jekyllrb.com/docs/), a Ruby based static site generator, and Github Pages.

This is a static site in a blog-oriented format.

### _authors

These markdown pages provide little blurbs about authors. They are appended to the end of posts by those authors.

### _data

This contains collections that are used by other parts of the jekyll application.

### _includes

These are snippets of html that can be inserted into other parts of the page like so:

```
{% include nav.html %}
```

### _layouts

These describe how a page will be laid out. When you make a _post, for example, you will add YAML front matter at the top of the document like so:

```
---
layout: post
title:  "My Post!"
date:   2021-03-20 14:56:45 -0400
---
```
The layout attribute tells Jekyll which layout it should place the content of your post in.

### _posts

These are posts. They must be titled in this format:

```
YYYY-MM-DD-post-name-separated-by-dashes.md
```

### _sass

### _site

This is where Jekyll generates the actual site from the markdown. Nothing in here needs to be modified and will be overwritten anyway when Jekyll generates the site

### .jekyll-cache

This is internally for Jekyll. Nothing needs to be modified in here, and will be overwritten anyway when Jekyll generates the site.

### assets

Contains css, images, and javascript assets used on site pages.

To include javascript in a page, put the script under assets/js. Then, in the YAML front-matter, include it under the attribute `local-js-dependencies`.

e.g:

```
---
layout: page
title: Constitution
permalink: /constitution/
local-js-dependencies: 
    - "/constitution-vote-toggle.js"

---

# content ...

```