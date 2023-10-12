import { ICellTab } from '~/types';

export const useIsSomethingSelected = () => {
  return useState<boolean>('isSomethingSelected', () => false);
};

export const useHeldTab = () => {
  return useState<{
    coords: { x: number; y: number };
    tab: ICellTab | null;
  }>('heldTab', () => {
    return { coords: { x: 0, y: 0 }, tab: null };
  });
};
