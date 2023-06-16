import Player from './player'
import Room from '../classes/room'
import pino from 'pino'
import { v4 as uuidv4 } from 'uuid';

const logger = pino({
    transport: {
      target: 'pino-pretty',
      options: {
        colorize: true
      }
    },
})


export default class MeetBallsGame  {
    public gameId: number = 0
    public rooms = []

    // Level coordinates to spawn player on
    public spawnCoordinates = [
        [0, 1, 0 ],
        [10, 1, 0],
        [0, 1, 10],
        [10, 1, 10]
    ]
    
    constructor(io: any) {
        io.on('connection', (socket) => {

            logger.info(`New connection established. Socket: ${socket.id}`)

            socket.on('joinRoom', ({name}: {name:string}) =>{

                if(this.rooms.length === 0 || this.rooms[this.rooms.length-1].isFull()){
                    // there are no rooms or the last room is full
                    // creating a new room
                    logger.info("Creating a new room...")
                    const room = new Room(uuidv4())
                    const position = this.spawnCoordinates[0]
                    const player = new Player(socket.id, name, position)

                    room.addPlayer(socket.id, player)

                    logger.info(`The new room was created. #${room.roomId}`)
                    this.rooms.push(room)

                } else {
                    // adding player to the last room
                    const currentRoom = this.rooms[this.rooms.length-1]
                    const position = this.spawnCoordinates[currentRoom.numberOfPlayers()]
                    const player = new Player(socket.id, name, position)

                    currentRoom.addPlayer(socket.id, player)
                    logger.info(`Player ${name} joined room: ${currentRoom.roomId}`)
                    currentRoom.addMessage({author:"server", text: `Player ${name} has joined.`})

                    // Start the game for player who joined
                    socket.emit("game", {
                        ready: true,
                        player,
                        playersInTheRoom: currentRoom.getAllPlayers(),
                    })

                    // update globally messages
                    io.emit('message', { terminal: currentRoom.getAllMessages() })
                    
                    // Update information for all players globally
                    io.emit("updatePlayers", {
                        players: currentRoom.getAllPlayers()
                    })
                }
              
            })

            socket.on('disconnect', () => {
                
                logger.info(`User ${socket.id} disconnected`);
                const currentRoom = this.rooms[this.rooms.length-1]
                
                currentRoom?.removePlayer(socket.id)
                currentRoom?.addMessage({author:"server", text: `Player ${socket.id} has left.`})

                io.emit("playerHasLeft", {
                    id: socket.id
                })
            });
        })
    }
}
