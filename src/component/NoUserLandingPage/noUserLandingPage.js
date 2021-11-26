import React from "react";
import { TabContext, TabList, TabPanel } from "@material-ui/lab";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import studentImg from "../../assets/images/student.jpg";
import teacherImg from "../../assets/images/teacher.jpg";
import "./noUserLandingPage.css";
export default class NoUserLandingPage extends React.Component {
  constructor() {
    super();
    this.state = {
      value: "1",
    };
  }
  handleChange = (e, newValue) => {
    this.setState({
      value: newValue,
    });
  };

  render() {
    return (
      <div style={{ width: "100%", height: "100%", padding: "0% 10%" }}>
        <Box sx={{ width: "100%", typography: "body1" }}>
          <TabContext value={this.state.value}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <TabList
                onChange={(e, v) => this.handleChange(e, v)}
                aria-label="lab API tabs example"
                centered
              >
                <Tab label="Student" value="1" />
                <Tab label="Teacher" value="2" />
              </TabList>
            </Box>
            <TabPanel value="1">
              <section class="text-gray-600 body-font">
                <div class="container px-5 py-5 mx-auto flex flex-wrap">
                  <div class="flex flex-wrap w-full">
                    <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 1
                          </h2>
                          <p class="leading-relaxed">
                            Register / Login as a student
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 2
                          </h2>
                          <p class="leading-relaxed">
                            Click on Join Classroom button
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="5" r="3"></circle>
                            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 3
                          </h2>
                          <p class="leading-relaxed">
                            Enter classroom code given by teacher and join
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 4
                          </h2>
                          <p class="leading-relaxed">
                            Click on start button for available tests
                          </p>
                        </div>
                      </div>
                      <div class="flex relative">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            FINISH
                          </h2>
                          <p class="leading-relaxed">
                            Submit the test and see your scores
                          </p>
                        </div>
                      </div>
                    </div>
                    <img
                      class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
                      src={studentImg}
                      style={{ objectFit: "contain" }}
                      alt="step"
                    />
                  </div>
                </div>
              </section>
            </TabPanel>
            <TabPanel value="2">
              <section class="text-gray-600 body-font">
                <div class="container px-5 py-5 mx-auto flex flex-wrap">
                  <div class="flex flex-wrap w-full">
                    <div class="lg:w-2/5 md:w-1/2 md:pr-10 md:py-6">
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 1
                          </h2>
                          <p class="leading-relaxed">
                            Register / Login as a teacher
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 2
                          </h2>
                          <p class="leading-relaxed">
                            Click on New Classroom button to create a classroom
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <circle cx="12" cy="5" r="3"></circle>
                            <path d="M12 22V8M5 12H2a10 10 0 0020 0h-3"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 3
                          </h2>
                          <p class="leading-relaxed">
                            Enter class name and create classroom, distribute
                            class code to students
                          </p>
                        </div>
                      </div>
                      <div class="flex relative pb-12">
                        <div class="h-full w-10 absolute inset-0 flex items-center justify-center">
                          <div class="h-full w-1 bg-gray-200 pointer-events-none"></div>
                        </div>
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"></path>
                            <circle cx="12" cy="7" r="4"></circle>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            STEP 4
                          </h2>
                          <p class="leading-relaxed">
                            Click on create test button
                          </p>
                        </div>
                      </div>
                      <div class="flex relative">
                        <div class="flex-shrink-0 w-10 h-10 rounded-full bg-yellow-500 inline-flex items-center justify-center text-white relative z-10">
                          <svg
                            fill="none"
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            class="w-5 h-5"
                            viewBox="0 0 24 24"
                          >
                            <path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path>
                            <path d="M22 4L12 14.01l-3-3"></path>
                          </svg>
                        </div>
                        <div class="flex-grow pl-4">
                          <h2 class="font-medium title-font text-sm text-gray-900 mb-1 tracking-wider">
                            FINISH
                          </h2>
                          <p class="leading-relaxed">
                            Upload the created test and see the results after
                            students have attempted it
                          </p>
                        </div>
                      </div>
                    </div>
                    <img
                      class="lg:w-3/5 md:w-1/2 object-cover object-center rounded-lg md:mt-0 mt-12"
                      src={teacherImg}
                      style={{ objectFit: "contain" }}
                      alt="step"
                    />
                  </div>
                </div>
              </section>
            </TabPanel>
          </TabContext>
        </Box>
      </div>
    );
  }
}
