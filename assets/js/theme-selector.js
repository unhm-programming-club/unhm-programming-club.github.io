---
layout: blank
---

var site_themes = [];
site_themes.push("{{site.theme}}")
{% for theme in site.alternate_themes %}
site_themes.push("{{theme}}");
{% endfor %}
var default_theme = site_themes[0];

function changeTheme(selectedTheme) {
    let linkElement = document.getElementById("styleLink");
    if(selectedTheme == default_theme) {
        linkElement.href = "{{site.baseurl}}/assets/css/main.css";
        return;
    }
    else {
        linkElement.href = "{{site.baseurl}}/assets/css/" + selectedTheme + ".css";
        return
    }
}

popoutMenu.createMenuTopicSection('selected-theme', 'select', site_themes, changeTheme);