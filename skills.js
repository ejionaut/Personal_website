var data = getData();


async function getData(){
    let url = './assets/data/skills.json';
    var skills = [];
    try {
        let res = await fetch(url);
        let data = await res.json();
        for(var skill of data.Skills){
            var temp = [];
            temp.push(skill.skill);
            temp.push(skill.logo);
            temp.push(skill.level);
            temp.push(skill.description);
            skills.push(temp);
        }
    } catch(error){
        console.log(error);
    }

    print(skills)
}

function print(data){
    for(var x = 0; x < data.length; x++){
        var img = document.createElement('img');
        img.src = data[x][1];
        document.getElementById("skill-box").appendChild(img);
    }
}

