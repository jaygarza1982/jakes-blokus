import { atom } from "recoil";
import { Player } from "../GameData";


const localStorageEffect = <T>(key: string) => ({ setSelf, onSet }: { setSelf: (value: T) => void; onSet: (value: any) => void }) => {
    const savedValue = localStorage.getItem(key);

    if (savedValue != null) {
        try {
            const parsedValue: T = JSON.parse(savedValue);
            setSelf(parsedValue);
        } catch (error) {
            console.error(`Error parsing stored value for key "${key}"`, error);
            localStorage.removeItem(key);
        }
    }

    onSet((newValue: any) => {
        try {
            localStorage.setItem(key, JSON.stringify(newValue));
        } catch (error) {
            console.error(`Error storing value for key "${key}"`, error);
        }
    });
};

const randomHue = () => Math.floor(Math.random() * 360);

export const PlayerInfo = atom<Player>({
    key: 'playerInfo',
    default: {
        id: '',
        hue: randomHue(),
    },
    effects: [localStorageEffect('playerInfo')]
});
