var Multiplayer = pc.createScript('multiplayer');

// Called once after all entities are initialized
Multiplayer.prototype.initialize = function() {
    var client = new Colyseus.Client('ws://localhost:2567');  // Your Colyseus server address

    client.joinOrCreate("room").then(room => {
        console.log("Joined room:", room.sessionId);

        // Store the room and sessionId
        this.room = room;
        this.sessionId = room.sessionId;

        // Determine if this is Avatar_1 or Avatar_2
        this.playerName = this.entity.name;  // Avatar_1 or Avatar_2

        // Listen for updates on other players' positions
        room.onMessage("playerMove", (data) => {
            if (data.sessionId !== room.sessionId) {  // If it's not our own sessionId, move the other player
                this.updatePlayerPosition(data);
            }
        });
    }).catch(e => {
        console.error("Failed to join the room:", e);
    });
};

Multiplayer.prototype.updatePlayerPosition = function(data) {
    // Update the other player's position in the game
    var otherPlayer = this.app.root.findByName(data.name);  // Find the other player's avatar by name
    if (otherPlayer) {
        otherPlayer.setPosition(data.x, data.y, data.z);  // Update the other player's position
    }
};

Multiplayer.prototype.update = function(dt) {
    // Only control our own player
    if (this.room && this.entity.name === this.playerName) {
        var pos = this.entity.getPosition();  // Get the current player's position
        this.room.send("move", {
            sessionId: this.sessionId,
            name: this.entity.name,  // Send the avatar name (Avatar_1 or Avatar_2)
            x: pos.x,
            y: pos.y,
            z: pos.z
        });
    }
};
