class Character {
    constructor(name, charClass, startingRoom) {
        this.name = name;
        this.class = charClass;
        this.location = startingRoom; // Room ID
        this.inventory = [];
        this.health = 100;
    }

    move(direction, world) {
        const currentRoom = world.getRoom(this.location);
        if (!currentRoom) {
            return "You are lost in the void.";
        }

        const nextRoomId = currentRoom.exits[direction];
        if (!nextRoomId) {
            return "You cannot go that way.";
        }

        const nextRoom = world.getRoom(nextRoomId);
        if (!nextRoom) {
            return "You try to walk through a portal to nowhere.";
        }

        this.location = nextRoomId;
        return `You move ${direction}.  ${this.look(world)}`;
    }

    look(world) {
        const currentRoom = world.getRoom(this.location);
        if (!currentRoom) {
            return "You see nothing but the endless void.";
        }

        let description = `You are in ${currentRoom.name}.\n${currentRoom.description}\n`;

        const objects = world.getObjectsInRoom(this.location);
        if (objects.length > 0) {
            description += "You see:\n";
            objects.forEach(obj => description += `- ${obj.name}: ${obj.description}\n`);
        }

        description += "\nExits: ";
        for (const direction in currentRoom.exits) {
            if (currentRoom.exits[direction]) {
                description += `${direction} `;
            }
        }

        return description;
    }
}
