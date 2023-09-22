import { store } from '../store/index';

export type State = ReturnType<typeof store.getState>; // псевдоним типа, равный структуре нашего хранилища

export type AppDispatch = typeof store.dispatch; // чтобы при диспатче мы получали информацию о типах, потом будем использовать с хуками, которые будут диспатчить наши действия.
