import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../Shared/Services/api-client";


import axios from 'axios';
export const postObject = (objectData) => async(dispatch) => {
    try {
        const response = await axios.post('http://localhost:7777/add-note', objectData); // Adjust the API endpoint URL
        dispatch(addNote(response.data));
    } catch (error) {
        dispatch({ type: 'POST_OBJECT_FAILURE', payload: error.message });
    }
};

export const fetchNotes = createAsyncThunk('notes/fetch', async() => {
    try {

        const response = await apiClient.read(); // HTTP Call
        console.log('response is ', response);
        return response;
    } catch (err) {
        console.log('Err is ::: ', err);
        throw err;
    }
})
const noteSlice = createSlice({
    name: 'noteslice',
    initialState: {
        'notes': [],
        'total': 0,
        'search-result': [],
        isLoading: false,
        err: null
    },
    reducers: {
        //CRUD Operations
        //synchronised operations
        //action - coming from the component
        //state - update the centralized store
        addNote(state, action) {
            // const noteObject = action.payload;
            // state.notes.push(noteObject)
            // return state;
            state.notes.push(action.payload);
        },
        getTotalRecords(state, action) {
            state.total = state.notes.length;
        },
        searchNote(state, action) {
            const searchObj = action.payload;
            console.log('Search Obj :::: ', searchObj);
            //state['search-result'] = state.notes.filter(note=>note.title.includes(searchObj.search));
            state['search-result'] = state.notes.filter(note => note.id == searchObj.search);
        },
        sortNote(state, action) {
            const sortObject = action.payload;
            const key = sortObject.sortBy;
            state.notes.sort((first, second) => {
                if (key == 'id') {
                    return first[key] - second[key];
                } else {
                    return first[key].localeCompare(second[key]);
                }
            })
        },
        removeNote(state, action) {

        },
        getNotes(state, action) {

        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchNotes.pending, (state, action) => {
                state.isLoading = true;

                console.log('Pending....', action.payload);
            })
            .addCase(fetchNotes.fulfilled, (state, action) => {
                console.log('FullFilled.... ', action.payload);
                state.isLoading = false;
                state.notes = action.payload; // Array of Objects
            }).addCase(fetchNotes.rejected, (state, action) => {
                console.log('Rejected .... ', action.payload);
                state.isLoading = false;
                state.notes = [];
                state.err = action.payload;

            })
    }
});

export const { addNote, removeNote, getNotes, getTotalRecords, sortNote, searchNote } = noteSlice.actions; //Component
export default noteSlice.reducer