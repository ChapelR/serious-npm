<!doctype html>
<html lang="en">
<head>
    <!--analytics
        <script async src="https://www.googletagmanager.com/gtag/js?id={{tracking-id}}"></script>
        <script>
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', '{{tracking-id}}');
        </script>
    analytics-->
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="{{description}}">
    <title>Serious</title>
    
    <link rel="stylesheet" href="https://unpkg.com/purecss@1.0.0/build/pure-min.css" integrity="sha384-nn4HPE8lTHyVtfCBi5yW9d20FjT8BJwUXyWZT9InLYax14RDjBj46LmSztkmNP9w" crossorigin="anonymous">
    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/chapelr/serious@latest/cdn/serious.min.css">
    <link rel="stylesheet" href="./theme.css">
    <!--cookies
    <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.css" />
    <script src="https://cdnjs.cloudflare.com/ajax/libs/cookieconsent2/3.1.0/cookieconsent.min.js"></script>
    <script>
    window.addEventListener("load", function(){
    window.cookieconsent.initialise({
      "palette": {
        "popup": {
          "background": "#edeff5",
          "text": "#111"
        },
        "button": {
          "background": "#4b81e8"
        }
      },
      "position": "top"
    })});
    </script>
    cookies-->
</head>
<body data-debug="{{debug}}" data-ep="0">
<div id="layout">
    <div id="overlay">
        <div class="loader">Loading...</div>
    </div>
    <a href="#menu" id="menuLink" class="menu-link" title="Toggle the menu.">
        <span></span>
    </a>

    <div id="menu">
        <div class="pure-menu">

            <ul class="pure-menu-list">
                <li class="pure-menu-item">
                    <a id="first-link" href="javascript:void(0)" class="pure-menu-link">First</a>
                </li>

                <li class="pure-menu-item hide">
                    <a id="last-link" href="javascript:void(0)" class="pure-menu-link">Latest</a>
                </li>

                <li class="pure-menu-item">
                    <a id="list-link" href="./?list=1" class="pure-menu-link">Episodes</a>
                </li>

                <li class="pure-menu-item">
                    <a id="home-link" href="./?" class="pure-menu-link">Recent</a>
                </li>
            </ul>
        </div>
    </div>

    <div id="main">
        <div class="header">
            <h1 id="title"></h1>
            <h2 id="subtitle"></h2>
        </div>

        <div id="content"></div>
    </div>

    <div id='footer'>
        <div id="nav-container">
            <a class="nav" id="prev">
                Previous
                <i class="material-icons">
                    arrow_left
                </i>
            </a>
            <a class="nav" id="next">
                Next
                <i class="material-icons">
                    arrow_right
                </i>
            </a>
        </div>
        <div id="disqus_thread" class="hide"></div>
        <span id="user-copyright"></span>
        <span id='byline'>Powered by <a href="https://twinelab.net/serious">Serious</a>.</span>
    </div>
</div>

<!-- scripts -->
<script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://cdn.jsdelivr.net/gh/chapelr/serious@{{version}}/cdn/serious.min.js"></script>

</body>
</html>