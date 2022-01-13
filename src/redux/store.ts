import {applyMiddleware, combineReducers, createStore} from "redux";
import {authReducer} from "./auth-reducer";
import {AppActionsType, appReducer} from "./app-reducer";
import thunk, {ThunkAction} from "redux-thunk";
import {composeWithDevTools} from "redux-devtools-extension";
import {profileReducer} from "./profile-reducer";
import {newPasswordReducer} from "./newPassword-reducer";
import {restorePasswordReducer} from "./restorePassword-reducer";
import {signUpReducer} from "./signUp-reducer";
import {signInReducer} from "./signIn-reducer";
import {TypedUseSelectorHook, useSelector} from "react-redux";

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer,
    restorePassword: restorePasswordReducer,
    signIn: signInReducer,
    signUp: signUpReducer,
})

const middlewareEnhancer = applyMiddleware(thunk)
const composeEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composeEnhancers)

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType =
// RegistrationActionsType
// | ProfileActionsType
    | AppActionsType
// | AuthActionsType;

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, RootActionsType>;

//export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store