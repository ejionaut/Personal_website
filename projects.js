var project_buttons = document.querySelectorAll(".projbutton");
var project_display = [];
var proj_title = "";
var curr_display = 0;

for(var x=0; x < project_buttons.length; x++){
    document.querySelectorAll(".projbutton")[x].addEventListener("click", function(){
        var text = this.innerHTML;
        curr_display = 0;
        getData(text);
    });
}

async function getData(type){
    let url = './assets/data/projects.json';
    project_display = [];

    try {
        let res = await fetch(url);
        let data = await res.json();
        for(var project of data.projects){
            if(project.Title == type){
                proj_title = project.Title;
                for(var y = 0; y <project.entities.length; y++){
                    project_display.push(project.entities[y]);
                }
            }
        }
    } catch(error){
        console.log(error);
    }

    displayProject()
}

function displayProject(){
    document.getElementById("project-nav").replaceChildren();
    const container_pro =  document.createElement("div");
    container_pro.id = "project-display";
    container_pro.classList.add("project-display");
    document.getElementById("project-nav").appendChild(container_pro);

    const section_image = document.createElement("div");
    section_image.classList.add("project_img");
    section_image.id = "section_image";
    document.getElementById("project-display").appendChild(section_image);

    if(project_display[curr_display].Media){
        if(project_display[curr_display].Media == "image"){
            var img = document.createElement('img');
            img.src = project_display[curr_display].ScreenShot;
            document.getElementById("section_image").appendChild(img);
        } else {
            var src = document.createElement('video');
            src.id = "video"
            src.autoplay = true;
            src.src = project_display[curr_display].ScreenShot;
    
            document.getElementById("section_image").appendChild(src);
        }
    } else {
        var img = document.createElement('img');
        img.src = project_display[curr_display].ScreenShot;
        document.getElementById("section_image").appendChild(img);
    }
    
    

    const section_details = document.createElement("div");
    section_image.classList.add("details_section");
    section_details.id = "details_section"
    document.getElementById("project-display").appendChild(section_details);

    const main_div = document.createElement("div");
    main_div.id = "title_div"
    document.getElementById("details_section").appendChild(main_div);
    
    const name = document.createElement("h3");
    name.innerHTML = project_display[curr_display].Name;
    document.getElementById("title_div").appendChild(name);

    const date = document.createElement("p");
    date.innerHTML = project_display[curr_display].Date;
    date.classList.add("date")
    document.getElementById("title_div").appendChild(date);

    const tags_div = document.createElement("div");
    tags_div.id = "tags_div"
    document.getElementById("details_section").appendChild(tags_div);

    const used_div = document.createElement("div");
    used_div.id = "used_div"
    document.getElementById("details_section").appendChild(used_div);

    for(var use = 0; use < project_display[curr_display].Used.length; use++){
        var used_button = document.createElement("div");
        used_button.classList.add("used_button");
        used_button.innerHTML = project_display[curr_display].Used[use];
        document.getElementById("used_div").appendChild(used_button);
    }

    for(var tags = 0; tags < project_display[curr_display].Tags.length; tags++){
        var tags_button = document.createElement("div");
        tags_button.classList.add("tags_button");
        tags_button.innerHTML = "#" + project_display[curr_display].Tags[tags];
        document.getElementById("tags_div").appendChild(tags_button);
    }

    const desc = document.createElement("p");
    desc.innerHTML = project_display[curr_display].Description;
    desc.classList.add("project-desc");
    document.getElementById("details_section").appendChild(desc);

    const btns_div = document.createElement("div");
    btns_div.id = "btns_div";
    document.getElementById("details_section").appendChild(btns_div);

    setButtons(proj_title);

    if(project_display.length > 1){
        var container = document.getElementById("section_image");
        var nav_container = document.createElement("div");
        nav_container.id = "nav_container"
        container.appendChild(nav_container);

        if(curr_display >= project_display.length -1){
            const pbutton = document.createElement("div");
            pbutton.classList.add("navbut");
            pbutton.innerHTML = "<"
            pbutton.id= "prev";
            nav_container.appendChild(pbutton);
            setPrevFunctions();

        } else if(curr_display == 0){
            const nbutton = document.createElement("div");
            nbutton.classList.add("navbut");
            nbutton.innerHTML = ">"
            nbutton.id= "nxt";
            nav_container.appendChild(nbutton);
            setNextFunction();

        } else {
            const nbutton = document.createElement("div");
            const pbutton = document.createElement("div");
            pbutton.id= "prev";
            nbutton.id= "nxt";
            nbutton.innerHTML = ">"
            pbutton.innerHTML = "<"
            nbutton.classList.add("navbut");
            pbutton.classList.add("navbut");

            nav_container.appendChild(pbutton);
            nav_container.appendChild(nbutton);
            setPrevFunctions();
            setNextFunction();
        }       
    }
}

function setButtons(title){
    var btn_cont = document.getElementById("btns_div");

    switch(title){
        case "General Programming":
            if(project_display[curr_display].LiveLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Live Link");
                hyperlink.target = "_blank"
                hyperlink.title = "Live Link";
                hyperlink.href=project_display[curr_display].LiveLink;

                
                
                btn_cont.appendChild(hyperlink);
            }

            if(project_display[curr_display].RepoLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Repository Link");
                hyperlink.appendChild(linktext);
                hyperlink.target = "_blank"
                hyperlink.title = "Repository Link";
                hyperlink.href=project_display[curr_display].RepoLink;

                btn_cont.appendChild(hyperlink);
            }
            break;

        case "Data Analysis": 
            if(project_display[curr_display].RepoLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Colab Link");
                hyperlink.appendChild(linktext);
                hyperlink.target = "_blank"
                hyperlink.title = "Repository Link";
                hyperlink.href = project_display[curr_display].RepoLink;

                btn_cont.appendChild(hyperlink);
            }

            if(project_display[curr_display].DataLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Download Dataset");
                hyperlink.appendChild(linktext);
                hyperlink.target = "_blank"
                hyperlink.title = "Repository Link";
                hyperlink.href = project_display[curr_display].DataLink;

                btn_cont.appendChild(hyperlink);
            }
            break;

        case "Designing / Creatives":
            if(project_display[curr_display].RepoLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Repository Link");
                hyperlink.appendChild(linktext);
                hyperlink.target = "_blank"
                hyperlink.title = "Repository Link";
                hyperlink.href = project_display[curr_display].RepoLink;

                btn_cont.appendChild(hyperlink);
            }
            break;

        case "Web Development":
            if(project_display[curr_display].LiveLink !== ""){
                var hyperlink= document.createElement('a');
                var linktext = document.createTextNode("Live Link");
                hyperlink.append(linktext);
                hyperlink.target = "_blank"
                hyperlink.title = "Live Link";
                hyperlink.href = project_display[curr_display].LiveLink;
                
                btn_cont.appendChild(hyperlink);
            }

            if(project_display[curr_display].RepoLink !== ""){
                var hyperlink = document.createElement('a');
                var linktext = document.createTextNode("Repository Link");
                hyperlink.title = "Repository Link";
                hyperlink.target = "_blank"
                hyperlink.appendChild(linktext);
                hyperlink.href = project_display[curr_display].RepoLink;

                btn_cont.appendChild(hyperlink);
            }

            break;
    }
}

function setPrevFunctions(){
        document.getElementById("prev").addEventListener("click",function(){
            curr_display -= 1;
            displayProject();
        });

}

function setNextFunction(){
    document.getElementById("nxt").addEventListener("click",function(){
        curr_display += 1;
        displayProject();
    });
}

