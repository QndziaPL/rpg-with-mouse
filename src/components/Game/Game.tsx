import React, { useEffect, useReducer, useState } from "react";
import GameCanvas from "../GameCanvas/GameCanvas";
import { usePlayerInput } from "../../playerInputs/usePlayerInput";
import { draw } from "../../draw/draw";

import {
  GameStateActionType,
  gameStateReducer,
  INITIAL_GAME_STATE,
} from "./reducers/gameStateReducer";

const Game = () => {
  const [canvasContext, setCanvasContext] =
    useState<CanvasRenderingContext2D | null>(null);

  const [gameState, dispatchGameState] = useReducer(
    gameStateReducer,
    INITIAL_GAME_STATE
  );

  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  const [initialSetup, setInitialSetup] = useState(true);

  useEffect(() => {
    if (initialSetup) {
      dispatchGameState({
        type: GameStateActionType.MOVE_PLAYER_TO,
        payload: {
          x: windowSize.width / 2,
          y: windowSize.height / 2,
        },
      });
      setInitialSetup(false);
    }
  }, [windowSize]);

  const { width, height } = windowSize;

  // console.log(gameState);

  const onPlayerMouseClick = () => {
    console.log("clicked");
  };

  const onNextWeaponClick = () => {
    dispatchGameState({ type: GameStateActionType.CHANGE_TO_NEXT_WEAPON });
  };

  const { mouseDown, playerMovementKeys, mousePosition } = usePlayerInput({
    onPlayerMouseClick,
    onNextWeaponClick,
  });

  const update = () => {
    // detectCollisions(); //todo
    dispatchGameState({
      type: GameStateActionType.MOVE_PLAYER_USING_KEYBOARD,
      payload: {
        windowSize,
        movementKeys: playerMovementKeys,
      },
    });
    shoot();
    movePlayerProjectiles();
    generateEnemies();
    // gameState.movePlayerProjectiles(windowSize);
    // gameState.moveEnemies();
  };

  const movePlayerProjectiles = () => {
    dispatchGameState({
      type: GameStateActionType.MOVE_PLAYER_PROJECTILES,
      payload: { windowSize },
    });
  };

  const shoot = () => {
    if (mouseDown) {
      dispatchGameState({
        type: GameStateActionType.PLAYER_SHOOT,
        payload: { mousePosition },
      });
    }
  };

  const generateEnemies = () => {
    dispatchGameState({
      type: GameStateActionType.GENERATE_ENEMIES,
      payload: { windowSize },
    });
  };

  return (
    <>
      <GameCanvas
        update={update}
        size={windowSize}
        setSize={setWindowSize}
        draw={(ctx) => draw({ ctx, gameState, mouseDown, mousePosition })}
        setCanvasContext={setCanvasContext}
        canvasContext={canvasContext}
      />
    </>
  );
};

export default Game;
