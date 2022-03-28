export enum GameStatus {
  RUNNING = 1,
  PAUSED = 2,
  OVER = 3,
}

export default class GameState {
  constructor() {
    console.log("chujnia");
  }
  gameStatus: GameStatus = GameStatus.RUNNING;
  circleSize: number = 0;

  setCircleSize = (newSize: number) => {
    this.circleSize = newSize;
  };
}
