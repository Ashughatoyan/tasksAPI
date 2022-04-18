import { atom } from 'recoil';

export const stateAtomForList = atom({
    key:'stateAtomForList',
    default:{ updateList:true },
})