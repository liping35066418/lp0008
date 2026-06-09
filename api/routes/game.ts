import { Router, type Request, type Response } from 'express';
import type {
  PlayRequest,
  PlayResponse,
  ResetResponse,
} from '../../shared/types.js';
import {
  generateComputerChoice,
  determineResult,
  isValidChoice,
} from '../services/gameLogic.js';
import { statsStore } from '../services/statsStore.js';

const router = Router();

router.post('/play', (req: Request, res: Response<PlayResponse | { error: string }>) => {
  const body = req.body as PlayRequest;
  const playerChoice = body?.playerChoice;

  if (!isValidChoice(playerChoice)) {
    return res.status(400).json({ error: 'Invalid choice. Must be one of: rock, paper, scissors' });
  }

  const computerChoice = generateComputerChoice();
  const result = determineResult(playerChoice, computerChoice);

  let stats;
  switch (result) {
    case 'win':
      stats = statsStore.recordWin();
      break;
    case 'lose':
      stats = statsStore.recordLoss();
      break;
    case 'draw':
      stats = statsStore.recordDraw();
      break;
  }

  const response: PlayResponse = {
    playerChoice,
    computerChoice,
    result,
    stats,
  };

  return res.status(200).json(response);
});

router.post('/reset', (_req: Request, res: Response<ResetResponse>) => {
  const stats = statsStore.reset();
  return res.status(200).json({
    success: true,
    stats,
  });
});

router.get('/stats', (_req: Request, res: Response) => {
  const stats = statsStore.getStats();
  return res.status(200).json(stats);
});

export default router;
