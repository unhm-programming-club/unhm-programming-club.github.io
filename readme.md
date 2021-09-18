### UNHM Programming Club Webpage

Available at https://unhm-programming-club.github.io

Uses [Jekyll](https://jekyllrb.com/docs/), a Ruby based static site generator, and Github Pages.

This is a static site in a blog-oriented format.

# Folder Layout

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

Scss files which get compiled to `main.css` in `{{base.url}}/assets/css/main.css`

### _site

This is where Jekyll generates the actual site from the markdown. Nothing in here needs to be modified and will be overwritten anyway when Jekyll generates the site

### .jekyll-cache

This is internally for Jekyll. Nothing needs to be modified in here, and will be overwritten anyway when Jekyll generates the site.

### assets

Contains css, images, and javascript assets used on site pages.

To include javascript in a page, put the script under assets/js. Then, in the YAML front-matter, include it under the attribute `local-js-dependencies`.

To create a CSS page for a component that will be processed after everything else is styled, place it `assets/css/components/` and add it to the list `component_styles` in `_config.yml`. CSS pages will be added in the order listed.

# Using

## Creating a new post

In _posts

Must have name as YYYY-MM-DD-firstword-second-word.md

Use markdown.

Include YAML front matter at the very top of the page

```
---
layout: post
title:  "Meeting 0002 Results"
date:   2021-03-20 14:56:45 -0400
author: Karl Miller
tags: meeting-results
---

```

## Custom javascript

### Global Scripts

`<script>` elements are added by Jekyll to each page after the footer in `_includes/footer.html`
Each custom script is activated or deactivated in a build based on the boolean values in `_config.yml`. The values in the configuration file are listed in the order the scripts are added.

### Settings Menu

The global variable `popoutMenu` is available for other scripts to use. It's called with the `createMenuTopicSection` method.

For example: `popoutMenu.createMenuTopicSection('conways-bg', 'radio', ['true','false'], toggleConwaysBackground);`

- Where `'conways-bg'` is the name of the menu section, and the name of the [LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) key.
- Where `'radio'` is the type of button to create for each item, currently either 'select' or 'radio'.
- Where `['true','false']` are labels for each option as well as the possible values for the key in `LocalStorage`
- Where `toggleConwaysBackground` is a function that will be called when a new option is selected, and passed the corresponding selected value, in this case 'true' or 'false'. 

### Custom Javascript for only one page on the site

YAML front matter on any page (such as a post) may contain the jekyll variable `local-js-dependencies` and list paths (from assets/js) to scripts, which will be loaded *after* the `<head>` element of a page, but before the body. It's created in `_layouts/default.html`. Example YAML front matter:

```
---
layout: page
title: Constitution
permalink: /constitution/
local-js-dependencies: 
    - "/constitution-vote-toggle.js"

---
```

Because these scripts are loaded before the `body` element, script logic will likely have to be contained within a listener for the [DOMContentLoaded](https://developer.mozilla.org/en-US/docs/Web/API/Window/DOMContentLoaded_event) event

### External javascript for a page

Not currently used, but useful if you want to, say, put React in one of your posts. Add as YAML front matter for the list `external-js-dependencies`, with values corresponding to URLS. For example:

```
---
layout: post
title: My Cool React Apps
permalink: /my-cool-react-apps/
local-js-dependencies:
    - "/reactapps/myapp.js"
external-js-dependencies:
    - "https://unpkg.com/react-dom@17/umd/react-dom.development.js"
---
```

### A snippet of javascript in-line for a page

When writing a markdown page that will be processed by Jekyll, you can use [includes](https://jekyllrb.com/docs/includes/) at any time. 

You can add a custom 'snippet' into your page with a command similar to this:

`{% include snippet-in-page.html content="delete-posts-not-in-query-string.js" %}`

The include will look to `{{base.url}}/assets/js/snippets/` for the snippet you wish to include, which is passed as the `content` parameter of the include.





