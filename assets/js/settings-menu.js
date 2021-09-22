/**
 * This class contains code the side menu, rendered as a settings button in the upper left.
 * 
 * Specifically, it contains function definitions then initializes the variables popoutMenu and settingsButton which can be accessed from other scripts on this website.
 * 
 * ----------------Classes ----------------------------------
 * SettingsButton - makes and styles the fixed settings button
 * PopoutMenu - the menu that pops out when the button is clicked 
 * MenuTopicSection - a zone of the menu corresponding to an option area
 * 
 * ----------------Use-----------------------------------------
 * New items can be added to the PopoutMenu by calling popoutMenu.createMenuTopicSection(name, type, values[], function)
 * MenuSections will be rendered in the order called
 * When an item is selected within a section, it is saved in *localStorage*
 * functions passed into MenuSelections on construction will be called whenever that item is selected
 * they will pass a value equivalent to that index of values (which is also how they are labeled in the UI)
 */

var popoutMenu = null; // access this from any other script
var settingsButton = null; // access this if necessary from outside script

class PopoutMenu {
    /**
     * Creates a menu with a title.
     * @param  {} menuName="Menu" The top 'title' header section of the menu
     * @param  {} classPrefix="" A prefix to attach to all created elements for styling, so it doesn't overlap with other elements.
     */
    constructor(menuName="Menu", classPrefix="") {
        this.menuName = menuName;
        this.classPrefix = classPrefix;
        this.menuSections = [];
        this.menuHeaderDiv = document.createElement('div');
        this.menuHeaderDiv.innerHTML = this.menuName;
        this.menuHeaderDiv.className = classPrefix + 'menuheader';
        this.menuElement = document.createElement('div');
        this.menuElement.className = classPrefix + "menu";
        this.radios = 0;
        this.selectBoxes = 0;
        this.menuElement.appendChild(this.menuHeaderDiv);
        document.body.appendChild(this.menuElement);
        this.menuElement.style.position = "fixed";
        this.menuElement.style.display = "none";
    }
    /**
     * Displays or hides the menu.
     * @param  {} top The top position of the menu
     * @param  {} right The left position of the menu
     */
    toggle(top, left) {
        if(this.menuElement.style.display == "none") {
            this.menuElement.style.display = 'block';
            this.menuElement.style.top = top +'px';
            this.menuElement.style.left = left + 'px';
        }
        else {
            this.menuElement.style.display = "none";
        }
    }
    /**
     * Creates a new menu section in the menu, containing a title of the section and either a series of radio buttons or a select drop down with various options.
     * @param  {string} sectionName="Section" The name of the section to be displayed
     * @param  {string} type="radio" Whether its a radio button or select drop down box
     * @param  {Array<string>} names=[] The names of the radio buttons or select options
     * @param  {function} selectionFunction The function to call when a button is selected in the topic section
     */
    createMenuTopicSection(sectionName="Section", type="radio", names=[], selectionFunction=(name)=>{}) {
        let section = new MenuTopicSection(sectionName, type, names, selectionFunction, this.classPrefix, this.radios);
        this.radios += 1;
        this.menuElement.appendChild(section.topicHeader);
        this.menuElement.appendChild(section.topicDiv);
        this.menuSections.push(section);
        return section;
    }

}

class MenuTopicSection {
    /**
     * Created through a menu by calling Menu.createMenuTopicSection. Adds a section to the menu. Will save and load selections from local storage. Key will be prefix+sectionName and value will be the selected radio button.
     * 
     * The callback function will be passed one selector 
     * @param  {string} sectionName="Section" The name to be displayed for the section
     * @param  {string} type="radio" Either radio or select
     * @param  {Array<string>} names=[] The names of each radio button or select option
     * @param  {function} selectionFunction The function to call when a selection is made.
     * @param  {string} classPrefix="" A prefix to attach to CSS style names to avoid style name overlaps
     * @param  {int} radioGroupCount=0 The total number of radio button groups created in this menui, so each can have a unique name attribute
     */
    constructor(sectionName="Section", type="radio", names = [], selectionFunction = (name)=>{}, classPrefix = "", radioGroupCount = 0) {
        this.type = type;
        this.names = names;
        this.selectionFunction = selectionFunction;
        this.classPrefix = classPrefix;
        this.topicDiv = document.createElement('div');
        this.topicDiv.className = this.classPrefix + "topic";
        this.topicHeader = document.createElement('div');
        this.topicHeader.className = classPrefix + 'topicheader';
        this.topicHeader.innerHTML = sectionName;
        this.radioGroupCount = radioGroupCount;
        this.selections = {};
        this.storageKey = classPrefix + sectionName;
        if(this.type == 'radio') {
            MenuTopicSection.createRadioElements(this);
        } else {
            MenuTopicSection.createSelectElements(this);
        }
        let val = localStorage.getItem(this.storageKey);
        if(val != null) {
            if(this.names.includes(val)) {
                this.selections[val].click();
                this.selectionFunction(val);
            }
        }
    }
    static createRadioElements(topic) {        
        for(let i = 0; i < topic.names.length; i++) {
            let newRadio = document.createElement('input');
            newRadio.type = 'radio';
            newRadio.id = topic.classPrefix + 'radio' + i;
            newRadio.name = topic.classPrefix + 'radio' + topic.radioGroupCount;
            newRadio['val'] = topic.names[i];
            let newLabel = document.createElement('label');
            newLabel.for = newRadio.id;
            newLabel.innerHTML = topic.names[i];
            topic.selections[topic.names[i]] = newRadio;
            newRadio.addEventListener('mousedown', (e)=> {
                topic.selectionFunction(topic.names[i]);
                localStorage.setItem(topic.storageKey, topic.names[i]);
            });
            topic.topicDiv.appendChild(newRadio);
            topic.topicDiv.appendChild(newLabel);
        }
    }
    static createSelectElements(topic) {
        let select = document.createElement('select');
        select.className = topic.classPrefix + 'select';
        for(let i = 0; i < topic.names.length; i++) {
            let option = document.createElement('option');
            option.className = topic.classPrefix + 'option';
            option.innerHTML = topic.names[i];
            topic.selections[topic.names[i]] = option;
            select.appendChild(option);
        }
        select.addEventListener('change', (changeEvent)=> {

            console.log('change event')
            let selectedOption = select.options[select.selectedIndex].innerHTML;
            localStorage.setItem(topic.storageKey, selectedOption);
            topic.selectionFunction(selectedOption);
        });

        topic.topicDiv.appendChild(select);

        //console.log(topic.storageKey);
        let val = localStorage.getItem(topic.storageKey);
        if(val) {
            for(let i = 0; i < select.options.length; i++) {
                if(select.options[i].innerHTML == val) {
                    select.selectedIndex = i;
                }
            }
            topic.selectionFunction(val);
        }
    }
}

class SettingsButton {
    constructor(menu=null, id='settingsButton') {
        this.icon = document.getElementById(id);
        let bb = this.icon.getBoundingClientRect();
        if(menu) {
            this.icon.addEventListener('mousedown', () => {
                menu.toggle(bb.top, bb.right);
            })
        }
    }
}

popoutMenu = new PopoutMenu('Settings', 'pm-');
menuButton = new SettingsButton(popoutMenu, 'pm-settings-button');