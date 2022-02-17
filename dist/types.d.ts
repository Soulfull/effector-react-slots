import { Event } from "effector";
import { ReactElement } from "react";
declare const ACTIONS: {
    readonly HIDE: "hide";
    readonly REMOVE: "remove";
    readonly SET: "set";
    readonly SHOW: "show";
    readonly ATTACH_LOGGER: "attachLogger";
};
type Component<S> = (props: S) => ReactElement | null;
type SlotsApi<Id> = {
    [ACTIONS.HIDE]: Event<Readonly<{
        id: Id;
    }>>;
    [ACTIONS.REMOVE]: Event<Readonly<{
        id: Id;
    }>>;
    [ACTIONS.SET]: Event<Readonly<{
        id: Id;
        component: Component<any>;
    }>>;
    [ACTIONS.SHOW]: Event<Readonly<{
        id: Id;
    }>>;
};
export const createSlotFactory: <Id extends string>(slots: Record<string, Id>) => {
    api: {
        attachLogger: import("effector").Event<void | Readonly<{
            fn?: import("logger").Logger<Id, keyof SlotsApi<Id_1>, string> | undefined;
            watchList?: Id[] | undefined;
        }>>;
        hide: import("effector").Event<Readonly<{
            id: Id;
        }>>;
        remove: import("effector").Event<Readonly<{
            id: Id;
        }>>;
        set: import("effector").Event<Readonly<{
            id: Id;
            component: import("shared").Component<any>;
        }>>;
        show: import("effector").Event<Readonly<{
            id: Id;
        }>>;
    };
    createSlot: <P>(id: Id) => {
        Slot: (props?: P & {
            readonly children?: import("react").ReactNode;
        }) => JSX.Element | null;
    };
};
declare class Wrapper<Id> {
    wrapped(e: Id): {
        api: {
            attachLogger: import("effector").Event<void | Readonly<{
                fn?: import("logger").Logger<Id, keyof SlotsApi<Id_1>, string> | undefined;
                watchList?: Id[] | undefined;
            }>>;
            hide: import("effector").Event<Readonly<{
                id: Id;
            }>>;
            remove: import("effector").Event<Readonly<{
                id: Id;
            }>>;
            set: import("effector").Event<Readonly<{
                id: Id;
                component: import("shared").Component<any>;
            }>>;
            show: import("effector").Event<Readonly<{
                id: Id;
            }>>;
        };
        createSlot: <P>(id: Id) => {
            Slot: (props?: P & {
                readonly children?: import("react").ReactNode;
            }) => JSX.Element | null;
        };
    };
}
export type CreateSlotFactory<Id> = ReturnType<Wrapper<Id>['wrapped']>;
