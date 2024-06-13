if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
    var root = '/';
    document.getElementById('title').innerHTML = 'OpenBlender';
} else {
    var root = '/OpenBlender/';
}

function get_projects(callback) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', root + 'files.json', true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && xhr.status == 200) {
            callback(JSON.parse(xhr.responseText));
        }
    }
    xhr.send();
}

function pick_featured_project(){
    get_projects(function (projects) {
        var featured_project = document.getElementById('featured');
        var top_pick_projects = projects.Projects.filter(function(project) {
            return project.Icons.IsTopPick === 'True';
        });
        var random_project = top_pick_projects[Math.floor(Math.random() * top_pick_projects.length)];
        featured_project.onclick = function () {
            window.location.href = root+'view_project.html?project=' + random_project.Name;
        }
        // Create flex container
        var flexContainer = document.createElement('div');
        flexContainer.style.display = 'flex';
        flexContainer.style.alignItems = 'center';
        
        // Create left container
        var leftContainer = document.createElement('div');
        leftContainer.style.flex = '1';
        leftContainer.style.marginRight = '10px';
        
        var h2 = document.createElement('h2');
        h2.innerHTML = 'Featured Project <i class="bi bi-star-fill" style="color: #ffcc00;"></i>'
        h2.style = 'margin-bottom: 40px;';
        leftContainer.appendChild(h2);

        // Create project name
        var project_name = document.createElement('h3');
        project_name.innerHTML = random_project.Name;
        leftContainer.appendChild(project_name);
        
        // Create description
        var description = document.createElement('p');
        description.innerHTML = random_project.Description;
        leftContainer.appendChild(description);
        
        // Create render engine
        var render_engine = document.createElement('p');
        render_engine.innerHTML = random_project.Engine;
        leftContainer.appendChild(render_engine);
        
        var render_engine = document.createElement('p');
        render_engine.innerHTML = "Click for more details";
        leftContainer.appendChild(render_engine);
        // Append left container to flex container
        flexContainer.appendChild(leftContainer);
        
        // Create thumbnail
        var thumbnail_img = document.createElement('img');
        thumbnail_img.className = 'thumbnail';
        if (random_project.Thumbnail) {
            thumbnail_img.src = random_project.Thumbnail;
        } else {
            thumbnail_img.src = root+'img/placeholder.jpg';
        }
        
        // Append thumbnail to flex container
        flexContainer.appendChild(thumbnail_img);
        
        // Append flex container to featured_project
        featured_project.appendChild(flexContainer);
    });
}

pick_featured_project();

function display_projects() {
    get_projects(function (projects) {
        var FXGallery = document.getElementById('FXGallery');
        var CompositingGallery = document.getElementById('CompositingGallery');
        var PlaygroundsGallery = document.getElementById('PlaygroundsGallery');
        var ObjectsGallery = document.getElementById('ObjectGallery');
        var DemoFilesGallery = document.getElementById('DemoFileGallery');
        var GeometryNodesGallery = document.getElementById('GeometryNodesGallery');
        projects.Projects.forEach(function (project) {
            var project_div = document.createElement('div');
            project_div.className = 'project';
            project_div.onclick = function () {
                window.location.href = root+'view_project.html?project=' + project.Name;
            }

            var project_name = document.createElement('h3');
            project_name.innerHTML = project.Name;
            if (project.Icons.IsTopPick === 'True') {
                project_name.innerHTML += ' <i class="bi bi-star-fill" style="color: #ffcc00;margin-left: 5px;"></i>';
            }
            if (project.Icons.Is3D === 'True') {
                project_name.innerHTML += ' <i class="bi bi-box" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsAsset === 'True') {
                project_name.innerHTML += ' <i class="bi bi-bookmark-fill" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsAssets === 'True') {
                project_name.innerHTML += ' <i class="bi bi-bookmarks-fill" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.RequiresFastComputer === 'True') {
                project_name.innerHTML += ' <i class="bi bi-speedometer2" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsAnimated === 'True') {
                project_name.innerHTML += ' <i class="bi bi-record-circle-fill" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsRigged === 'True') {
                project_name.innerHTML += ' <i class="bi bi-universal-access" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsCurves === 'True') {
                project_name.innerHTML += ' <i class="bi bi-bezier" style="color: #999;margin-left: 5px;"></i>';
            }
            if (project.Icons.IsGeoNodes === 'True') {
                project_name.innerHTML += ' <i class="bi bi-diagram-2-fill" style="color: #999;margin-left: 5px;"></i>';
            }


            var thumbnail_img = document.createElement('img');
            thumbnail_img.className = 'thumbnail';
            if (project.Thumbnail) {
                thumbnail_img.src = project.Thumbnail;
            } else {
                thumbnail_img.src = root+'img/placeholder.png';
            }

            var details_div = document.createElement('div');
            details_div.className = 'details';


            var description = document.createElement('p');
            description.innerHTML = project.Description;
            description.style = 'font-size: 14px; margin-top: 5px;margin-bottom: none;';

            var render_engine = document.createElement('p');
            render_engine.innerHTML = project.Engine;
            render_engine.style = 'font-size: 12px; margin-top: none;margin-bottom: 5px;';

            
            var blender_link = document.createElement('a');
            blender_link.href = project.Blender_File;
            blender_link.innerHTML = '<i class="bi bi-download"></i> Blender File';

            var project_link = document.createElement('a');
            project_link.onclick = function () {
                window.location.href = root+'view_project.html?project=' + project.Name;
            }
            project_link.innerHTML = 'View Project';

            project_div.appendChild(project_name);
            project_div.appendChild(thumbnail_img);
            details_div.appendChild(description);
            details_div.appendChild(render_engine);
            details_div.appendChild(blender_link);
            details_div.appendChild(project_link);
            project_div.appendChild(details_div);

            if (project.Category === 'FX') {
                FXGallery.appendChild(project_div);
            } else if (project.Category === 'Compositing') {
                CompositingGallery.appendChild(project_div);
            } else if (project.Category === 'Playgrounds') {
                PlaygroundsGallery.appendChild(project_div);
            } else if (project.Category === 'Object') {
                ObjectsGallery.appendChild(project_div);
            } else if (project.Category === 'DemoFile') {
                DemoFilesGallery.appendChild(project_div);
            }
            else if (project.Category === 'GeometryNodes') {
                GeometryNodesGallery.appendChild(project_div);
            }
        });
    });
}

display_projects();
