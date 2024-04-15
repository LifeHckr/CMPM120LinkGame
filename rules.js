class Start extends Scene {
    create() {
        this.engine.setTitle(this.engine.storyData.Title); 
        this.engine.addChoice("Begin the story");
    }

    handleChoice() {
        this.engine.gotoScene(Location, this.engine.storyData.InitialLocation); 
    }

    
}


class Location extends Scene {
    create(key) {
        let locationData = this.engine.storyData.Locations[key]; //Locationdata is a reference to the object of the current location
        this.engine.show(locationData.Body); 
        
        if('Choices' in locationData) { 
            for(let choices = 0; choices < locationData.Choices.length; choices++) { 
                this.engine.addChoice(locationData.Choices[choices].Text, locationData.Choices[choices]);
            }
            if (locationData.Type != 'Dialogue') {
                this.engine.addSpecial("Inspect", locationData.Body, locationData.Inspect, -1);
                //console.log(Inventory[locationData.Requirement]);
                //console.log(locationData.Requirement);
                if (!('Requirement' in locationData) || this.engine.storyData.Inventory[locationData.Requirement].val == true) {
                    //console.log(Inventory[locationData.Result]);
                    //console.log(locationData.Result);
                    this.engine.addSpecial(locationData.Type, locationData.Body, locationData.ExtraText, (('Result' in locationData) ? this.engine.storyData.Inventory[locationData.Result] : -1));
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }

    handleChoice(choice) {
        if (!choice) {
            this.engine.gotoScene(End);
        } else if (choice.Target == 'Chemist') {
            this.engine.gotoScene(Chemist, choice.Target);
        } else if (choice.Target == 'Library') {
            this.engine.gotoScene(Library, choice.Target);
        } else if(choice) {
            //this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } 
    }
}

class Chemist extends Scene {

    create(key) { 
        let locationData = this.engine.storyData.Locations[key]; //Locationdata is a reference to the object of the current location
        this.engine.show(locationData.Body); 

        if('Choices' in locationData) { 
            for(let choices = 0; choices < locationData.Choices.length; choices++) { 
                this.engine.addChoice(locationData.Choices[choices].Text, locationData.Choices[choices]);
            }

            this.engine.addSpecial("Inspect", locationData.Body, locationData.Inspect, -1);

            //Talk button for chemist
            if (!('Requirement' in locationData) || this.engine.storyData.Inventory[locationData.Requirement].val == true) {
                //console.log(Inventory[locationData.Result]);
                //console.log(locationData.Result);
                this.engine.addSpecial("Talk", locationData.Body, locationData.ExtraText, (('Result' in locationData) ? this.engine.storyData.Inventory[locationData.Result] : -1));
            }

            //Whether or not the 'Craft Soul' button appears, and whether or not it unlocks the ending.
            if (this.engine.storyData.Inventory[locationData.Unlock[0]].val == true) {
                //The option is unlocked completely
                if (this.engine.storyData.Inventory[locationData.Unlock[1]].val == true) {

                    //Hacky go to End2
                    let success = {
                        Target: "End2"
                    };
                    this.engine.addChoice(locationData.Special_Choice, success);

                    //Option is unlocked, but not fulfilled
                } else {
                    //Just Display failure text
                    this.engine.addSpecial(locationData.Special_Choice, locationData.Body, locationData.FailText, -1);
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }

    }


    handleChoice(choice) {
        if(choice) {
            //this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }
    }
}

class Library extends Scene {

    create(key) { 
        let locationData = this.engine.storyData.Locations[key]; //Locationdata is a reference to the object of the current location
        this.engine.show(locationData.Body); 

        if('Choices' in locationData) { 
            for(let choices = 0; choices < locationData.Choices.length; choices++) { 
                this.engine.addChoice(locationData.Choices[choices].Text, locationData.Choices[choices]);
            }

            this.engine.addSpecial("Inspect", locationData.Body, locationData.Inspect, -1);

            //Whether or not the 'Poison Tea' button appears, and whether or not it unlocks the ending.
            if (this.engine.storyData.Inventory[locationData.Unlock[0]].val == true) {
                //The option is unlocked completely
                if (this.engine.storyData.Inventory[locationData.Unlock[1]].val == true) {

                    //Hacky go to End1
                    let success = {
                        Target: "End1"
                    };
                    this.engine.addChoice(locationData.Special_Choice, success);

                    //Option is unlocked, but not fulfilled
                } else {
                    //Just Display failure text
                    this.engine.addSpecial(locationData.Special_Choice, locationData.Body, locationData.FailText, -1);
                }
            }
        } else {
            this.engine.addChoice("The end.")
        }
    }


    handleChoice(choice) {
        if(choice) {
            //this.engine.show("&gt; "+choice.Text);
            this.engine.gotoScene(Location, choice.Target);
        } else {
            this.engine.gotoScene(End);
        }    
    }
}

class End extends Scene {
    create() {
        this.engine.show("<hr>");
        this.engine.show(this.engine.storyData.Credits);
    }
}

Engine.load(Start, 'myStory.json');