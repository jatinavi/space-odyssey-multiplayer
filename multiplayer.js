var Multiplayer = pc.createScript('multiplayer');

// Called once after all entities are initialized
Multiplayer.prototype.initialize = function() {
    var client = new Colyseus.Client('ws://localhost:2567');  // Your Colyseus server address

    client.joinOrCreate("room").then(room => {
        console.log("Joined room:", room.sessionId);

        // Store the room and sessionId
        this.room = room;
        this.sessionId = room.sessionId;

        // Track player position data
        this.otherPlayers = {};  // Store other players' positions
        this.interpolationSpeed = 0.1;  // Smoothing for movement

        // Determine if this is Avatar_1 or Avatar_2
        this.playerName = this.entity.name;  // Avatar_1 or Avatar_2

        // Listen for updates on other players' positions
        room.onMessage("playerMove", (data) => {
            if (data.sessionId !== room.sessionId) {  // If it's not our own sessionId, move the other player
                if (!this.otherPlayers[data.sessionId]) {
                    this.otherPlayers[data.sessionId] = { entity: this.app.root.findByName(data.name) };
                }
                this.otherPlayers[data.sessionId].targetPos = new pc.Vec3(data.x, data.y, data.z);
            }
        });
    }).catch(e => {
        console.error("Failed to join the room:", e);
    });
};

// Interpolate other players' positions for smoother transitions
Multiplayer.prototype.update = function(dt) {
    var pos = this.entity.getPosition();
    
    // Send our position to the server
    if (this.room && this.entity.name === this.playerName) {
        this.room.send("move", {
            sessionId: this.sessionId,
            name: this.entity.name,  // Send the avatar name (Avatar_1 or Avatar_2)
            x: pos.x,
            y: pos.y,
            z: pos.z
        });
    }

    // Interpolate the position of other players
    for (var sessionId in this.otherPlayers) {
        var otherPlayer = this.otherPlayers[sessionId];
        if (otherPlayer.entity && otherPlayer.targetPos) {
            var currentPos = otherPlayer.entity.getPosition();
            var newPos = currentPos.lerp(currentPos, otherPlayer.targetPos, this.interpolationSpeed);
            otherPlayer.entity.setPosition(newPos);
        }
    }
};
