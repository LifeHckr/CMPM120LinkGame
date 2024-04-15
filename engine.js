class Engine {

    static load(...args) {
        window.onload = () => new Engine(...args);
    }

    constructor(firstSceneClass, storyDataUrl) {

        this.firstSceneClass = firstSceneClass;
        this.storyDataUrl = storyDataUrl;

        this.header = document.body.appendChild(document.createElement("h1"));
        this.output = document.body.appendChild(document.createElement("div"));
        this.actionsContainer = document.body.appendChild(document.createElement("div"));

        fetch(storyDataUrl).then(
            (response) => response.json()
        ).then(
            (json) => {
                this.storyData = json;
                this.gotoScene(firstSceneClass)
            }
        );
    }

    gotoScene(sceneClass, data) {
        this.scene = new sceneClass(this);
        this.scene.create(data);
    }

    addChoice(action, data) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = action;
        button.onclick = () => {
            while(this.actionsContainer.firstChild) {
                this.actionsContainer.removeChild(this.actionsContainer.firstChild)
            }
            this.scene.handleChoice(data);
        }
    }

    //Was this neccessary? No. Was this fun? No. Am I gonna refactor this the smart way? No.
    addSpecial(name, msg, inspect, varToChange) {
        let button = this.actionsContainer.appendChild(document.createElement("button"));
        button.innerText = name;
        button.onclick = () => {
            this.show(msg + "<p>\>"+name+"</p>" + inspect); //poggers
            if(varToChange != -1) {
                //console.log(varToChange);
                varToChange.val = true;
                //console.log(varToChange);
            }
        }
    }

    //More custom buttons
    

    setTitle(title) {
        document.title = title;
        this.header.innerText = title;
    }

    show(msg) {
        //let div = document.createElement("div");
        this.output.innerHTML = msg;
        //this.output.appendChild(div);
    }

    appMessage(msg) {
        let div = document.createElement("div");
        div.innerHTML = msg;
        this.output.appendChild(div);
    }
}

class Scene {
    constructor(engine) {
        this.engine = engine;
    }

    create() { }

    update() { }

    handleChoice(action) {
        console.warn('no choice handler on scene ', this);
    }
}