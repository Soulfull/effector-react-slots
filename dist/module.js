import {createEvent as $3Sbms$createEvent, createStore as $3Sbms$createStore, createApi as $3Sbms$createApi, guard as $3Sbms$guard, sample as $3Sbms$sample, createEffect as $3Sbms$createEffect} from "effector";
import {jsx as $3Sbms$jsx, Fragment as $3Sbms$Fragment} from "react/jsx-runtime";
import {useStoreMap as $3Sbms$useStoreMap} from "effector-react";
import "react";






const $611d2aab0eed73c0$export$92a1a3b7554e9387 = {
    HIDE: 'hide',
    REMOVE: 'remove',
    SET: 'set',
    SHOW: 'show',
    ATTACH_LOGGER: 'attachLogger'
};


const $f5e8d407a690a371$export$b76f4a035dc22741 = (api)=>(id)=>{
        const $slot = $3Sbms$createStore({
            component: ()=>null
            ,
            isVisible: true
        });
        const slotApi = $3Sbms$createApi($slot, {
            hide: (state)=>!state.isVisible ? undefined : {
                    ...state,
                    isVisible: false
                }
            ,
            remove: (state)=>({
                    ...state,
                    component: $slot.defaultState.component
                })
            ,
            set: (state, payload)=>({
                    ...state,
                    component: payload
                })
            ,
            show: (state)=>state.isVisible ? undefined : {
                    ...state,
                    isVisible: true
                }
        });
        const isSlotEventCalling = (payload)=>payload.id === id
        ;
        $3Sbms$guard({
            clock: api[$611d2aab0eed73c0$export$92a1a3b7554e9387.HIDE],
            filter: isSlotEventCalling,
            target: slotApi.hide
        });
        $3Sbms$guard({
            clock: api[$611d2aab0eed73c0$export$92a1a3b7554e9387.REMOVE],
            filter: isSlotEventCalling,
            target: slotApi.remove
        });
        $3Sbms$sample({
            clock: $3Sbms$guard({
                clock: api[$611d2aab0eed73c0$export$92a1a3b7554e9387.SET],
                filter: isSlotEventCalling
            }),
            fn: ({ component: component  })=>component
            ,
            target: slotApi.set
        });
        $3Sbms$guard({
            clock: api[$611d2aab0eed73c0$export$92a1a3b7554e9387.SHOW],
            filter: isSlotEventCalling,
            target: slotApi.show
        });
        const Slot = (props = {
        })=>$3Sbms$useStoreMap({
                store: $slot,
                fn: ({ component: Component , isVisible: isVisible  })=>{
                    if (!isVisible) return null;
                    return $slot.defaultState.component === Component ? /*#__PURE__*/ $3Sbms$jsx($3Sbms$Fragment, {
                        children: props.children
                    }) : /*#__PURE__*/ $3Sbms$jsx(Component, {
                        ...props
                    });
                },
                keys: [
                    props
                ]
            })
        ;
        return {
            Slot: Slot
        };
    }
;




const $98aed47355424b0e$export$9b917d2dbd09b9ef = '[effector-react-slots]';
const $98aed47355424b0e$export$fe2e61603b61130d = ({ api: api , slots: slots  })=>{
    const slotNames = new Map(Object.entries(slots).map(([key, value])=>[
            value,
            key
        ]
    ));
    const attachLogger = $3Sbms$createEvent();
    const $logger = $3Sbms$createStore({
        shouldLog: false,
        watchList: Object.values(slots)
    }).on(attachLogger, (state, payload)=>state.shouldLog ? undefined : {
            shouldLog: true,
            watchList: payload?.watchList || Object.values(slots)
        }
    );
    const getLogText = ({ action: action , slotId: slotId , slotName: slotName  })=>`${$98aed47355424b0e$export$9b917d2dbd09b9ef} ${slotName} -> ${action} // ${slotId}`
    ;
    const logFx = $3Sbms$createEffect(({ message: message  })=>console.info(message)
    );
    const unsub = attachLogger.watch((payload)=>{
        if (payload?.fn) logFx.use(payload.fn);
        unsub();
    });
    $3Sbms$guard({
        clock: $3Sbms$sample({
            clock: [
                api.hide.map(({ id: id  })=>({
                        action: $611d2aab0eed73c0$export$92a1a3b7554e9387.HIDE,
                        slotId: id,
                        slotName: slotNames.get(id)
                    })
                ),
                api.remove.map(({ id: id  })=>({
                        action: $611d2aab0eed73c0$export$92a1a3b7554e9387.REMOVE,
                        slotId: id,
                        slotName: slotNames.get(id)
                    })
                ),
                api.set.map(({ id: id  })=>({
                        action: $611d2aab0eed73c0$export$92a1a3b7554e9387.SET,
                        slotId: id,
                        slotName: slotNames.get(id)
                    })
                ),
                api.show.map(({ id: id  })=>({
                        action: $611d2aab0eed73c0$export$92a1a3b7554e9387.SHOW,
                        slotId: id,
                        slotName: slotNames.get(id)
                    })
                ), 
            ],
            source: $logger,
            fn: ({ shouldLog: shouldLog , watchList: watchList  }, logParameters)=>shouldLog && watchList.includes(logParameters.slotId) ? logParameters : null
        }),
        filter: (data)=>data !== null
        ,
        target: logFx.prepend((data)=>({
                message: getLogText(data),
                meta: data
            })
        )
    });
    return attachLogger;
};



const $24075a5d702d64b3$export$476b47a278d49701 = (slots)=>{
    const api = {
        [$611d2aab0eed73c0$export$92a1a3b7554e9387.HIDE]: $3Sbms$createEvent(),
        [$611d2aab0eed73c0$export$92a1a3b7554e9387.REMOVE]: $3Sbms$createEvent(),
        [$611d2aab0eed73c0$export$92a1a3b7554e9387.SET]: $3Sbms$createEvent(),
        [$611d2aab0eed73c0$export$92a1a3b7554e9387.SHOW]: $3Sbms$createEvent()
    };
    return {
        api: {
            ...api,
            [$611d2aab0eed73c0$export$92a1a3b7554e9387.ATTACH_LOGGER]: $98aed47355424b0e$export$fe2e61603b61130d({
                slots: slots,
                api: api
            })
        },
        createSlot: $f5e8d407a690a371$export$b76f4a035dc22741(api)
    };
};
class $24075a5d702d64b3$var$Wrapper {
    // wrapped has no explicit return type so we can infer it
    wrapped(e) {
        // @ts-expect-error
        return $24075a5d702d64b3$export$476b47a278d49701(e);
    }
}


export {$24075a5d702d64b3$export$476b47a278d49701 as createSlotFactory};
