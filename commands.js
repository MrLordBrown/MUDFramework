function handleCommand(command, player, world) {
    const parts = command.split(' ');
    const action = parts[0].toLowerCase();

    switch (action) {
        case 'north':
        case 'south':
        case 'east':
        case 'west':
            return player.move(action, world);
        case 'look':
            return player.look(world);
        default:
            return "Invalid command.";
    }
}
