

abstract class PlayerInstance {
    public playerId: string = ""
    public playerName: string = "Anonim"

    public position = [0, 1, 0]
    public quaternion = {x: 0, y:0, z: 0}

    abstract changeName(name:string):void
    abstract getPosition():number[]
    abstract setPosition(position: number[]): void
}

export default class Player extends PlayerInstance {

    constructor(id: string, name: string, position = [0, 1, 0]){
        super()
        this.playerId = id;
        this.playerName = name
        this.position = position
    }
    
    /**
     * This method sets/edits player's name
     * @param name {string}
     */
    public changeName(name) {
        this.playerName = name
    }

    /**
     * This method returns the players position x,y,z
     * @returns {number[]}
     */
    public getPosition(){
        return this.position
    }

    /**
     * This method sets the players position x,y,z
     * @param position {number[]}
     */
    public setPosition(position){
        this.position = position
    }

}
