var Setting = new Settings();
function Settings() {}

var Toolkit = Java.type("java.awt.Toolkit");
var DataFlavor = Java.type("java.awt.datatransfer.DataFlavor");

/**
 * Registers all hooks and triggers for a new SettingsObject.
 * 
 * @param {*} self the settingsObject to register
 */
Settings.prototype.register = function(self) {
    self.load();
        
    register("gameUnload", function() {
        self.save();
    });
    
    if (self.command != undefined) {
        register("command", function() {
            if (arguments[0] == "reset") {
                self.reset();
                ChatLib.chat("&7Settings reset for " + self.module);
            } else {
                self.open();
            }
        }).setName(self.command);
    }
    
    self.gui.registerDraw(function(mouseX, mouseY) {
        self.draw(mouseX, mouseY);
    });

    self.gui.registerClicked(function(mouseX, mouseY, button) {
        if (button != 0) return;
        self.click(mouseX, mouseY);
    });

    self.gui.registerKeyTyped(function(char, key) {
        self.keyType(char, key);
    });

    register("dragged", function(dx, dy, mouseX, mouseY, button) {
        if (!self.gui.isOpen()) return;
        if (button != 0) return;
        self.drag(mouseX, mouseY);
    });
    
    register("step", function() {
        self.update();
    }).setFps(120);
}