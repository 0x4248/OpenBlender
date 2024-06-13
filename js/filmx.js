if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    var root = '/';
} else {
    var root = '/OpenBlender-Site/';
}

function get_films(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', root + 'filmx.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function add_films(image = 'bee') {
    get_films(function (films) {
        var types = films.Types;
        for (const [type, films] of Object.entries(types)) {
            var gallery = document.getElementById(type + '_Gallery');
            for (const film of films) {
                var card = document.createElement('div');
                card.className = 'card';
                var img = document.createElement('img');
                img.src = root + 'FilmX/' + type + '/' + film + '/' + image + '.jpg';
                img.className = 'card-img';
                var name = document.createElement('p');
                name.innerHTML = film;
                name.className = 'card-text';
                card.appendChild(img);
                gallery.appendChild(card);
                card.appendChild(name);
            }
        }
    });
}

var url = new URL(window.location.href);
var demo_name = url.searchParams.get('demo_name');
if (demo_name === null) {
    demo_name = 'bee';
}
add_films(demo_name);

function changeDemoImage(demo_name) {
    var url = new URL(window.location.href);
    url.searchParams.set('demo_name', demo_name);
    window.location.href = url.href;
}