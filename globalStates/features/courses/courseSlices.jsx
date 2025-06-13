import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"

const initialState = {
  courses: [],
  error: null,
  loading: false,
  enrolledCourses: [],
  completedCourses: [],
  isEnrollLoading: false,
  isCompletedLoading: false,
}

export const fetchEnrolledCourses = createAsyncThunk(
  "course/fetchEnrolledCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/enrollments/user/${userId}`, {
        completed: false,
      })
      return response.data.enrollments
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

export const fetchCompletedCourses = createAsyncThunk(
  "courseProgress/fetchCompletedCourses",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await axios.post(`/api/enrollments/user/${userId}`, {
        completed: true,
      })
      return response.data.enrollments
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
)

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload
    },
    addCourse: (state, action) => {
      const newCourse = {
        ...action.payload,
        id:
          state.courses.length > 0
            ? Math.max(...state.courses.map((course) => course.id)) + 1
            : 1,
        modules: action.payload.modules || 0,
        content: action.payload.content || [],
        quiz: null,
        certificates: [],
        completedBy: [],
        passedBy: [],
        createdAt: new Date().toISOString(),
        thumbnail: action.payload.thumbnail || "default-thumbnail.jpg",
      }

      state.courses.push(newCourse)
    },

    updateCourse: (state, action) => {
      const index = state.courses.findIndex(
        (course) => course.id === action.payload.id
      )
      if (index !== -1) {
        const originalCourse = state.courses[index]

        // Preserve fields that shouldn't be overwritten
        const updatedCourse = {
          ...originalCourse,
          ...action.payload,

          // Preserve these arrays unless explicitly provided
          content: action.payload.content || originalCourse.content,
          certificates: originalCourse.certificates,
          completedBy: originalCourse.completedBy,
          passedBy: originalCourse.passedBy,
          quiz: originalCourse.quiz,
          createdAt: originalCourse.createdAt,
        }

        if (
          action.payload.status &&
          action.payload.status !== originalCourse.status
        ) {
          state.stats[originalCourse.status] -= 1
          state.stats[action.payload.status] =
            (state.stats[action.payload.status] || 0) + 1
        }

        state.courses[index] = updatedCourse
      }
    },
    deleteCourse: (state, action) => {
      const courseToDelete = state.courses.find(
        (course) => course.id === action.payload
      )
      if (courseToDelete) {
        state.courses = state.courses.filter(
          (course) => course.id !== action.payload
        )
      }
    },
    addCategory: (state, action) => {
      if (!state.categories.includes(action.payload)) {
        state.categories.push(action.payload)
      }
    },
    addAssignment: (state, action) => {
      const { courseId, assignment } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        course.assignments.push(assignment)
      }
    },
    updateAssignment: (state, action) => {
      const { courseId, assignment } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        const index = course.assignments.findIndex(
          (a) => a.id === assignment.id
        )
        if (index !== -1) {
          course.assignments[index] = assignment
        }
      }
    },

    recordCompletion: (state, action) => {
      const { courseId, userId, score } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        if (!course.completedBy.includes(userId)) {
          course.completedBy.push(userId)
        }

        // Record quiz score if passed
        if (course.quiz && score >= course.quiz.passingScore) {
          if (!course.passedBy.includes(userId)) {
            course.passedBy.push(userId)
          }

          // Auto-issue certificate if enabled
          if (course.quiz.certificate?.autoIssue) {
            const certificateId = `cert-${Date.now()}`
            course.certificates.push({
              id: certificateId,
              userId,
              issuedAt: new Date().toISOString(),
              revoked: false,
            })
            state.stats.certified += 1
          }
        }
      }
    },
    issueCertificate: (state, action) => {
      const { courseId, userId } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        const certificateId = `cert-${Date.now()}`
        course.certificates.push({
          id: certificateId,
          userId,
          issuedAt: new Date().toISOString(),
          revoked: false,
        })
        state.stats.certified += 1
      }
    },
    revokeCertificate: (state, action) => {
      const { courseId, certificateId } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        const certIndex = course.certificates.findIndex(
          (c) => c.id === certificateId
        )
        if (certIndex !== -1 && !course.certificates[certIndex].revoked) {
          course.certificates[certIndex].revoked = true
          state.stats.certified -= 1
        }
      }
    },
    reinstateCertificate: (state, action) => {
      const { courseId, certificateId } = action.payload
      const course = state.courses.find((c) => c.id === courseId)
      if (course) {
        const certIndex = course.certificates.findIndex(
          (c) => c.id === certificateId
        )
        if (certIndex !== -1 && course.certificates[certIndex].revoked) {
          course.certificates[certIndex].revoked = false
          state.stats.certified += 1
        }
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchEnrolledCourses.pending, (state) => {
        state.isEnrollLoading = true
      })
      .addCase(fetchEnrolledCourses.fulfilled, (state, action) => {
        state.isEnrollLoading = false
        state.enrolledCourses = action.payload
      })
      .addCase(fetchEnrolledCourses.rejected, (state, action) => {
        state.isEnrollLoading = false
        state.error = action.payload
      })
      .addCase(fetchCompletedCourses.pending, (state) => {
        state.isCompletedLoading = true
      })
      .addCase(fetchCompletedCourses.fulfilled, (state, action) => {
        state.isCompletedLoading = false
        state.completedCourses = action.payload // already course IDs
      })
      .addCase(fetchCompletedCourses.rejected, (state, action) => {
        state.isCompletedLoading = false
        state.error = action.payload
      })
  },
})

export const {
  setCourses,
  addCourse,
  updateCourse,
  deleteCourse,
  addCategory,
  addAssignment,
  updateAssignment,
  recordCompletion,
  issueCertificate,
  revokeCertificate,
  reinstateCertificate,
} = coursesSlice.actions

export default coursesSlice.reducer

// Selectors
export const selectAllCourses = (state) => state.courses.courses
export const selectCourseById = (state, courseId) =>
  state.courses.courses.find((course) => course.id === courseId)
export const selectCategories = (state) => state.courses.categories
export const selectCourseStats = (state) => state.courses.stats
export const selectCourseQuiz = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId)
  return course?.quiz || null
}
export const selectCourseCertificates = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId)
  return course?.certificates || []
}

export const selectCourseCompletions = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId)
  return course?.completedBy || []
}
export const selectCoursePasses = (state, courseId) => {
  const course = state.courses.courses.find((c) => c.id === courseId)
  return course?.passedBy || []
}
