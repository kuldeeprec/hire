const API_ROOT = "https://umeedbackend.herokuapp.com/api/v1";

export const APIUrls = {
  login: () => `${API_ROOT}/user/create-session`,
  signup: () => `${API_ROOT}/users/signup`,
  fetchStudent: (rollno) => `${API_ROOT}/student/info/?rollno=${rollno}`,
  fetcheducator: (batch) => `${API_ROOT}/teacher/info/?batch=${batch}`,
};
