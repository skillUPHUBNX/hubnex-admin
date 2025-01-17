/* eslint-disable @typescript-eslint/no-explicit-any */
import { axiosClient } from "@/api/axiosClient";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface Submission {
  _id: string;
  name: string;
  email: string;
  phonenumber: string;
  message: string;
  service: string;
  isRead:boolean;
  createdAt: string;
  updatedAt: string;
}

interface SubmissionsState {
  submissions: Submission[];
  loading: boolean;
  error: string | null;
}

// Initial state
const initialState: SubmissionsState = {
  submissions: [],
  loading: false,
  error: null,
};

// Async thunk to fetch submissions
export const getSubmissions = createAsyncThunk(
  "submissions/getSubmissions",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get("/api/from/fromDetails");
 
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("Failed to fetch submissions");
    }
  }
);

// Async thunk to delete submission by ID
export const deleteSubmission = createAsyncThunk(
  "submissions/deleteSubmission",
  async (submissionId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.delete(`/api/from/deleteDetails/${submissionId}`);
      return response.data?._id;
    } catch (error: any) {
      console.log(error);    
      return rejectWithValue("Failed to delete submission");
    }
  }
);

// Async thunk to toggle `isSeen` status
export const updateSubmission = createAsyncThunk(
  "submissions/updateSubmission",
  async (submissionId: string, { rejectWithValue }) => {
    try {
      const response = await axiosClient.patch(`/api/from/updateDetails/${submissionId}`); 
      console.log(response);
      
      return response.data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue("Failed to update submission");
    }
  }
);

// Create slice
const submissionsSlice = createSlice({
  name: "submissions",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // GET Submissions
    builder
      .addCase(getSubmissions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        getSubmissions.fulfilled,
        (state, action: PayloadAction<SubmissionsState>) => {
          state.submissions = action.payload.submissions;
          state.loading = false;
        }
      )
      .addCase(getSubmissions.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      // DELETE Submission
      .addCase(deleteSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        deleteSubmission.fulfilled,
        (state, action: PayloadAction<string>) => {
          state.submissions = state.submissions.filter(
            (submission) => submission._id !== action.payload
          );
          state.loading = false;
        }
      )
      .addCase(
        deleteSubmission.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      )

      // UPDATE Submission (toggle isSeen)
      .addCase(updateSubmission.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(
        updateSubmission.fulfilled,
        (state, action: PayloadAction<Submission>) => {
          state.submissions = state.submissions.map((submission) =>
            submission._id === action.payload._id ? action.payload : submission
          );
          state.loading = false;
        }
      )
      .addCase(
        updateSubmission.rejected,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.error = action.payload;
        }
      );
  },
});

export const submissionsReducer = submissionsSlice.reducer;
