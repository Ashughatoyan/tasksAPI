import { atom } from 'recoil';

export const stateAtom = atom({
    key:'stateAtom',
    default:{ user:false, pointer:10 },
})