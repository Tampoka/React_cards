import {applyMiddleware, combineReducers, createStore} from 'redux';
import {AuthActionsType, authReducer} from './auth-reducer';
import {AppActionsType, appReducer} from './app-reducer';
import thunk, {ThunkAction} from 'redux-thunk';
import {composeWithDevTools} from 'redux-devtools-extension';
import {ProfileActionsType, profileReducer} from './profile-reducer';
import {NewPasswordActionsType, newPasswordReducer} from './newPassword-reducer';
import {RestorePasswordActionsType, restorePasswordReducer} from './restorePassword-reducer';
import {SignUpActionsType, signUpReducer} from './signUp-reducer';
import {TypedUseSelectorHook, useSelector} from 'react-redux';
import {DecksActionsType, decksReducer} from './decks-reducer';

const rootReducer = combineReducers({
    app: appReducer,
    auth: authReducer,
    profile: profileReducer,
    newPassword: newPasswordReducer,
    restorePassword: restorePasswordReducer,
    signUp: signUpReducer,
    decks: decksReducer
})

const middlewareEnhancer = applyMiddleware(thunk)
const composeEnhancers = composeWithDevTools(middlewareEnhancer)

export const store = createStore(rootReducer, composeEnhancers)

export type AppRootStateType = ReturnType<typeof rootReducer>

export type RootActionsType =
    SignUpActionsType
    | ProfileActionsType
    | AppActionsType
    | AuthActionsType
    | DecksActionsType
    | RestorePasswordActionsType
    | NewPasswordActionsType;

export type ThunkType = ThunkAction<void, AppRootStateType, unknown, RootActionsType>;

//export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store