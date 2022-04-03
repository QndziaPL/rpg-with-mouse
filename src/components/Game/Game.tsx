import React, { useEffect, useState } from "react";
import GameCanvas from "../GameCanvas/GameCanvas";
import { usePlayerInput } from "../../playerInputs/usePlayerInput";
import GameState from "../../classes/GameState/GameState";
import Player from "../../classes/Player/Player";
import { draw } from "../../draw/draw";

const gameState = new GameState();
const player = new Player();
const Game = () => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [initialSetup, setInitialSetup] = useState(true);

  useEffect(() => {
    if (initialSetup) {
      player.movePlayerTo({
        x: windowSize.width / 2,
        y: windowSize.height / 2,
      });
      setInitialSetup(false);
    }
  }, [windowSize]);

  const { width, height } = windowSize;

  const onPlayerMouseClick = () => {
    console.log("clicked");
  };

  const onNextWeaponClick = () => {
    player.pickNextWeapon();
  };

  const { mouseDown, playerMovementKeys, mousePosition } = usePlayerInput({
    onPlayerMouseClick,
    onNextWeaponClick,
  });

  const update = () => {
    gameState.detectCollisions();
    gameState.removeDeadEnemies();
    player.movePlayer(playerMovementKeys, windowSize);
    shoot();
    gameState.movePlayerProjectiles(windowSize);
    gameState.generateEnemies(windowSize);
    gameState.moveEnemies();
  };

  const shoot = () => {
    gameState.shoot(mouseDown, player, mousePosition);
  };

  return (
    <>
      <GameCanvas
        update={update}
        size={windowSize}
        setSize={setWindowSize}
        draw={(ctx) =>
          draw({ ctx, player, gameState, mouseDown, mousePosition })
        }
        setCanvasContext={setCanvasContext}
        canvasContext={canvasContext}
      />
    </>
  );
};

export default Game;
