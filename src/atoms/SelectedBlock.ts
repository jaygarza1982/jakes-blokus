import { atom } from 'recoil';
import { SelectedBlock } from '../GameData';

export const SelectedBlockAtom = atom<SelectedBlock>({
    key: 'SelectedBlock',
    default: {
        playerId: '',
        blockNumber: 0,
        shape: [],
        x: 0,
        y: 0,
        // Should denote if visible on screen
        selected: false
    }
});
