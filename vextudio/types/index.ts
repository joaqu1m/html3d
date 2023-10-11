import {defineComponent} from "#imports";

export type MainTab = "leftTab" | "rightTab";

export type ICells = {
    tabWidth: number | null;
    leftDirection: boolean;
    cells: ICell[];
}

export type ICell = {
    tabs: ICellTab[];
    height: number | null;
}

export type ICellTab = {
    title: string;
    component: ReturnType<typeof defineComponent>;
}