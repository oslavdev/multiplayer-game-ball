import Player from '../games/player'

type terminal = {
    author: string
    text: string
}

export default class Room   {
    
    public roomId: string = ""
    public players = new Map() as any
    public capacity: number = 4
    public terminal: terminal[] = []

    constructor(id: string){
        this.roomId = id
    }

    /**
     * This method checks if the room is full
     * @returns {boolean} 
     */
    public isFull(): boolean {
        return this.players.size === this.capacity
    }

    /**
     * This method checks the number of players in the room
     * @returns {number}
     */
    public numberOfPlayers(): number {
        return this.players.size
    }

    /**
     * This method adds a new player to the room
     * @param id 
     * @param player 
     */
    public addPlayer(id: string, player: Player): void {
        this.players.set(id, player)
    }

    /**
     * This method removes player from the room
     * @param id 
     */
    public removePlayer(id: string){
        this.players.delete(id)
    }

    /**
     * This method removes all the players from the room
     */
    public clearRoom(){
        this.players.clear()
    }

    /**
     * This method returns the list of all players in the room
     * @returns {Player[]} players
     */
    public getAllPlayers(): Player[]{
        let players: Player[] = []
        for (let [_, value] of this.players.entries()) {
            players.push(value)
        }

        return players
    }

    /**
     * This method  returns all the messages in the room
     * @returns {terminal[]} messages
     */
    public getAllMessages(): terminal[]{
        return this.terminal;
    }

    /**
     * This method adds a new message in the room
     * @param message {terminal}
     */
    public addMessage(message: terminal){
        this.terminal.push(message)
    }
}

