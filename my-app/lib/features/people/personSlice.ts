import { createSlice, createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"
import { Result } from "@/app/people/person"

const url = "https://randomuser.me/api/?results=12"

/// used for async tasks

const initialState = {
    results: [],
    isLoading: true,
}


const personSlice = createSlice({
    name: "people",
    initialState,
    reducers: {
        clearList: (state) => {
            state.results = []
        },
        removeUser: (state, action) => {
            const uuid = action.payload
            state.results = state.results.filter(
                (user: Result) => user.login.uuid !== uuid)
        },
    },
    extraReducers: (builder) => {
        builder.addCase(fetchRandomUsers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(fetchRandomUsers.fulfilled, (state, action) => {
            console.log(state)
            console.log(action.payload)
            state.results = action.payload
            state.isLoading = false
            console.log(state.results.length)

        })
        builder.addCase(fetchRandomUsers.rejected, (state) => {
            state.isLoading = false
        })
    },
})


export const fetchRandomUsers = createAsyncThunk('people/getRandomUsers', async (name, thunkApi) => {
    try {
        const response = await axios.get(url)
        return response.data.results
    } catch (error: any) {
        if (error.isAxiosError) {
            console.log(error.response)
            return thunkApi.rejectWithValue(error.response)
        } else {
            console.log(error)
        }
    }

})

console.log(personSlice)


export const { clearList, removeUser } = personSlice.actions

export default personSlice.reducer