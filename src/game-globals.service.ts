export class GameGlobalsService {
  gameSize: { width: number; height: number; };

  constructor() {
    this.gameSize = {
      width: document.body.clientWidth,
      height: (document.body.clientHeight || 700) / 2
    };
  }
  getGameSize() {
    return this.gameSize;
  }
}

export const gameGlobalService = new GameGlobalsService();