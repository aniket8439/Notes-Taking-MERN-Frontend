import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiClient } from "../../../Shared/Services/api-client";



export const fetchUsers = createAsyncThunk('users/fetch', async() => {
    try {
        const response = await apiClient.readUser();
        console.log('response is....', response);
        return response;
    } catch (err) {
        console.log('Err is ::: ', err);
        throw err;
    }
})

const userSlice = createSlice({
    name: "userslice",
    initialState: {
        'users': [],
        'total': 0,
        'search-result': [],
        isLoading: false,
        err: null
    },
    reducers: {
        addUser(state, action) {
            const userObject = action.payload;
            state.users.push(userObject);
            return state;
        },
        getTotalRecords(state, action) {
            state.total = state.users.length;
        },
        sortUser(state, action) {
            const sortObject = action.payload;
            const key = sortObject.sortBy;
            state.users.sort((first, second) => {
                if (key == 'id') {
                    return first[key] - second[key];
                } else {
                    return first[key].localeCompare(second[key]);
                }
            })
        },
        searchUser(state, action) {
            const searchObj = action.payload;
            console.log('Search Obj :::', searchObj);
            state['search-result'] = state.users.filter(user => user.id == searchObj.search);
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchUsers.pending, (state, action) => {
                state.isLoading = true;
                console.log('Pending......', action.payload);
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                console.log('Fulfilled......', action.payload);
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                console.log('Rejected.....', action.payload);
                state.isLoading = false;
                state.users = [];
                state.err = action.payload;
            })
    }
});

export const {
    addUser,
    getTotalRecords,
    sortUser,
    searchUser
} = userSlice.actions;

export default userSlice.reducer;