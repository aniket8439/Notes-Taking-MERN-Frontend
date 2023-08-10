import { configureStore } from '@reduxjs/toolkit'
import noteSlice from '../../Modules/Notes/redux/note-slice';
import userSlice from '../../Modules/User/redux/user-slice';

export default configureStore({
    reducer: {
        //key: value
        noteSlice,
        userSlice
    }
});