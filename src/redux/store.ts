import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import {appReducer} from "./app-reducer";
import thunk from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";

const rootReducer = combineReducers({
    app:appReducer,
    auth:authReducer,
})

const middlewareEnhancer = applyMiddleware(thunk)
const composeEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composeEnhancers)

export type AppRootStateType = ReturnType<typeof rootReducer>

//export const useAppDispatch = () => useDispatch<AppDispatch>()
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

// @ts-ignore
window.store = store