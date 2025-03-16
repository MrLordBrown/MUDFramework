class World {
    constructor() {
        this.blocks = {};
        this.buildings = {};
        this.rooms = {};
        this.objects = {};
    }

    async loadData() {
        try {
            const blocksData = await this.loadCSVData('data/blocks.csv');
            blocksData.forEach(block => this.blocks[block.id] = block);

            const buildingsData = await this.loadCSVData('data/buildings.csv');
            buildingsData.forEach(building => {
                building.roomList = building.roomList.split(','); // split the comma seperated strings to an array
                this.buildings[building.id] = building;
            });

            const roomsData = await this.loadCSVData('data/rooms.csv');
            roomsData.forEach(room => {
                room.objects = room.objects.split(',');
                this.rooms[room.id] = room;
            });

            const objectsData = await this.loadCSVData('data/objects.csv');
            objectsData.forEach(object => this.objects[object.id] = object);

        } catch (error) {
            console.error("Error loading world data:", error);
        }
    }

    async loadCSVData(filePath) {
        const response = await fetch(filePath);
        const text = await response.text();
        return parseCSV(text);
    }

    getRoom(roomId) {
        return this.rooms[roomId];
    }

    getBlock(blockId) {
        return this.blocks[blockId];
    }

    getBuilding(buildingId) {
        return this.buildings[buildingId];
    }

    getObject(objectId) {
        return this.objects[objectId];
    }

    getObjectsInRoom(roomId) {
        const room = this.getRoom(roomId);
        if (!room || !room.objects) {
            return [];
        }
        return room.objects.map(objectId => this.getObject(objectId));
    }

    // ... other world management methods (time, weather, etc.)
}
