const baseUrl=import.meta.env.VITE_BASE_URL
export const courseURL={
    categoryURL:`${baseUrl}/courses/send-only-categories`,
    enrolledCourses:`${baseUrl}/courses//enrolled-courses`,
    getCartData:`${baseUrl}/courses/get-cart-items`,
    addCourseToCart:`${baseUrl}/courses/add-item-to-cart`,
    removeCourseFromCart:`${baseUrl}/courses/remove-item-from-cart`,
    createCourse:`${baseUrl}/courses/create-course`,
    updateCourse:`${baseUrl}/courses/update-course`,
    createSection:`${baseUrl}/courses/create-section`,
    updateSection:`${baseUrl}/courses/update-section`,
    deleteSection:`${baseUrl}/courses/delete-section`,
    createSubSection:`${baseUrl}/courses/create-sub-section`,
    updateSubSection:`${baseUrl}/courses/update-sub-section`,
    deleteSubSection:`${baseUrl}/courses/delete-sub-section`,
    draftCourse:`${baseUrl}/courses/draft-course`,
    publishCourse:`${baseUrl}/courses/publish-course`,
    sendCourseDetail:`${baseUrl}/courses/send-course-detail`,
    deleteCourse:`${baseUrl}/courses/delete-course`,
    getCategoryData:`${baseUrl}/courses/send-category`,
    getHalfCourseDetail:`${baseUrl}/courses/half-course-detail`,
    studentEnrolledCourses:`${baseUrl}/courses/student-enrolled-courses`,
    viewCourseDetail:`${baseUrl}/courses/view-course-detail`,
    createRatingAndReview:`${baseUrl}/courses/create-rating-review`,
    markCompleted:`${baseUrl}/courses/mark-completed`,
    getAllRatingAndReview:`${baseUrl}/courses/send-all-rating-review`,
    getDashboardData:`${baseUrl}/courses/dashboard-data`
    // categoryUrl:`${baseUrl}/courses/create-course`
    // categoryUrl:`${baseUrl}/courses/create-section`
    // categoryUrl:`${baseUrl}/courses/update-section`
    // categoryUrl:`${baseUrl}/courses/delete-section`
    // categoryUrl:`${baseUrl}/courses/delete-sub-section`
    // categoryUrl:`${baseUrl}/courses/send-course-detail`
    // categoryUrl:`${baseUrl}/courses/create-rating-review`
    // categoryUrl:`${baseUrl}/courses/send-all-rating-review`
    // categoryUrl:`${baseUrl}/courses/send-rating-review`
    // categoryUrl:`${baseUrl}/courses/create-category`
    // categoryUrl:`${baseUrl}/courses/send-all-categories`
    // categoryUrl:`${baseUrl}/courses/send-category`
}
