var Movement = pc.createScript('movement');

// Movement speed
Movement.prototype.initialize = function() {
    this.speed = 5;
};

// Update function called every frame
Movement.prototype.update = function(dt) {
    var app = this.app;
    var direction = new pc.Vec3();

    // Keyboard controls
    if (app.keyboard.isPressed(pc.KEY_W)) {
        direction.z -= this.speed * dt;
    }
    if (app.keyboard.isPressed(pc.KEY_S)) {
        direction.z += this.speed * dt;
    }
    if (app.keyboard.isPressed(pc.KEY_A)) {
        direction.x -= this.speed * dt;
    }
    if (app.keyboard.isPressed(pc.KEY_D)) {
        direction.x += this.speed * dt;
    }

    // Apply the movement to the entity
    this.entity.translate(direction);
};
