var Movement = pc.createScript('movement');

// Movement speed and jump force
Movement.prototype.initialize = function() {
    this.speed = 5;
    this.jumpForce = 10;
    this.grounded = true;

    // Detect when the player is on the ground
    this.entity.collision.on('collisionstart', function (result) {
        this.grounded = true;
    }, this);
};

// Update function for keyboard input
Movement.prototype.update = function(dt) {
    var app = this.app;
    var direction = new pc.Vec3();

    // Keyboard controls for movement
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

    // Jumping (space key)
    if (app.keyboard.wasPressed(pc.KEY_SPACE) && this.grounded) {
        this.entity.rigidbody.applyImpulse(0, this.jumpForce, 0);
        this.grounded = false;
    }

    // Apply movement to the entity
    this.entity.translate(direction);
};
