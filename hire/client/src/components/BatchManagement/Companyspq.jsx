import React, { useState, useEffect } from "react";
import { Button, Divider, Form, Input, Select } from "antd";
import { MinusCircleOutlined } from "@ant-design/icons";
import { handleError, openNotification } from "../../utils/common";
import { G_API_URL } from "../../constants/constants";
import { __getToken } from "../../utils/user-details";
import axios from "axios";
const { Option } = Select;
const { TextArea } = Input;
const Companyspq = (props) => {
  const { o_id, role_id } = props;

  const mcqquestion = [
    {
      options: [1, 2],
    },
  ];

  const [numberofquestion, setNumberOfQuestion] = useState([1]);
  const [mcqquestions, setMcqQuestions] = useState(mcqquestion);
  const [isLoading, setLoading] = useState(false);
  const [save, setSave] = useState(false);
  useEffect(() => {}, [numberofquestion, mcqquestions]);
  const addquestion = () => {
    setMcqQuestions([...mcqquestions, ...mcqquestion]);
    setNumberOfQuestion([...numberofquestion, numberofquestion.length + 1]);
  };
  const addOption = (indexmatch) => {
    let newmcq = mcqquestions.map((quetion, indexmatch1) => {
      if (indexmatch === indexmatch1) {
        return { options: [...quetion.options, quetion.options.length + 1] };
      } else {
        return quetion;
      }
    });
    setMcqQuestions([...newmcq]);
  };

  const removeQuestion = (i) => {
    //   Form.setFieldsValue({
    //     keys: keys.filter(key => key !== k)
    //   });
    // };

    let newQuestion = [...numberofquestion];
    let newMcq = [...mcqquestions];
    newQuestion.splice(i, 1);
    setNumberOfQuestion(newQuestion);
    newMcq.splice(i, 1);
    setMcqQuestions(newMcq);
  };
  const removeoption = (key, i) => {
    let newMcq = [...mcqquestions];
    newMcq[key].options.splice(i, 1);
    setMcqQuestions(newMcq);
  };
  const addCompanyspq = (values) => {
    console.log(values);
    axios({
      method: "post",
      url: G_API_URL + "roles/add/companyspq",
      headers: {
        "Content-Type": "application/json",
        Authorization: __getToken(),
      },
      data: values,
    })
      .then((response) => {
        response = response.data;
        setLoading(false);
        if (response.status === 1) {
          openNotification("success", response.message, 2);
        } else {
          openNotification("error", response.message, 2);
        }
      })
      .catch((error) => {
        error = error.response;
        handleError(error);
      });
  };
  // const getCompanyspq = () => {
  //   axios
  //     .get("http://localhost:5000/api/roles/get/companyspq", {
  //       params: {
  //         o_id: o_id,
  //         role_id: role_id,
  //       },
  //       headers: {
  //         Authorization: __getToken(),
  //       },
  //     })
  //     .then((response) => {
  //       response = response.data;
  //       console.log(response);
  //       if (response.status === 1) {
  //         openNotification("error", response.message, 2);
  //       } else {
  //         openNotification("error", response.message, 2);
  //       }
  //     })
  //     .catch((error) => {
  //       error = error.response;
  //       handleError(error);
  //     });
  // };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  const handleFinish = (values) => {
    console.log("Finished:", values);
    // if (role_id === "") {
    //   openNotification("error", "first you should create or manage Test", 2);
    // } else {
    //   let mappedDataArray = [];
    //   if (values) {
    //     setLoading(true);
    //     for (let i = 1; i <= numberofquestion; i++) {
    //       let questionsofdata = {
    //         o_id: "",
    //         role_id: "",
    //         questionId: "",
    //         questionType: "",
    //         questionText: "",
    //         options: [],
    //       };
    //       let optionarray = [];
    //       if (values["question" + i + "type"] === 1) {
    //         questionsofdata.o_id = o_id;
    //         questionsofdata.role_id = role_id;
    //         questionsofdata.questionId = "000" + i;
    //         questionsofdata.questionType = "MULTIPLE";
    //         questionsofdata.questionText = values["question_id" + i];
    //         for (let j = 0; j < mcqquestions[i - 1].options.length; j++) {
    //           optionarray = [...optionarray, values["add_option_id" + i + j]];
    //         }
    //         questionsofdata.options = optionarray;
    //         mappedDataArray = [...mappedDataArray, questionsofdata];
    //       } else {
    //         questionsofdata.o_id = o_id;
    //         questionsofdata.questionId = "000" + i;
    //         questionsofdata.role_id = role_id;
    //         questionsofdata.questionType = "SUBJECTIVE";
    //         questionsofdata.questionText = values["question_id" + i];
    //         mappedDataArray = [...mappedDataArray, questionsofdata];
    //       }
    //     }
    //     // addCompanyspq(mappedDataArray);
    //     // getCompanyspq();
    //   }
    // }
  };

  return (
    <div className="bg-lightblue p-8 rounded">
      <h5 className="font-bold text-base">company specific question</h5>
      {numberofquestion.map((_, key) => (
        <Form
          className="mt-4"
          onFinish={handleFinish}
          onFinishFailed={onFinishFailed}
        >
          <div key={key} className="grid grid-cols-2 gap-8 mt-6">
            <Form.Item
              name={"question" + (key + 1) + "type"}
              rules={[
                {
                  required: true,
                  message: "please select question type",
                },
              ]}
            >
              <Select
                className="border-silver focus:border-silver
                                         focus:shadow-sm h-14 hover:border-silver"
                placeholder="Question type"
              >
                <Option value={1}>Multiple Choice</Option>
                <Option value={2}>Subjective</Option>
              </Select>
            </Form.Item>
          </div>
          <div>
            <Form.Item
              noStyle
              shouldUpdate={(prevValues, currentValues) =>
                prevValues["question" + (key + 1) + "type"] !==
                currentValues["question" + (key + 1) + "type"]
              }
            >
              {({ getFieldValue }) =>
                [1].includes(getFieldValue("question" + (key + 1) + "type")) ? (
                  <>
                    {mcqquestions.map((question, index) =>
                      index === key ? (
                        <div key={index}>
                          <div>
                            <MinusCircleOutlined
                              onClick={() => removeQuestion(key)}
                            />
                            <Form.Item
                              name={"question_id" + (key + 1)}
                              rules={[
                                {
                                  required: true,
                                  message: "question cannot be empty",
                                },
                              ]}
                            >
                              <TextArea
                                className="border-silver focus:border-silver
                                             focus:shadow-sm h-14 hover:border-silver"
                                placeholder={
                                  "enter the question no " + (key + 1)
                                }
                                autoSize={{ minRows: 4, maxRows: 8 }}
                              />
                            </Form.Item>
                          </div>
                          <div className="grid grid-cols-2 gap-8 mt-6">
                            {question.options.map((_, index1) => (
                              <div key={index1}>
                                <MinusCircleOutlined
                                  onClick={() => removeoption(key, index1)}
                                />
                                <div>
                                  <Form.Item
                                    name={"add_option_id" + (key + 1) + index1}
                                    rules={[
                                      {
                                        required: true,
                                        message: " options cannot be empty",
                                      },
                                    ]}
                                  >
                                    <Input
                                      className="border-silver focus:border-silver
                                             focus:shadow-sm h-14 hover:border-silver"
                                      placeholder={"option" + (index1 + 1)}
                                    />
                                  </Form.Item>
                                </div>
                              </div>
                            ))}
                          </div>
                          {save === false ? (
                            <div className="grid grid-cols-2 gap-8 mt-2">
                              <div>
                                <Button
                                  type="primary"
                                  ghost
                                  className="default-blue-btn
                                        mt-1 "
                                  onClick={() => addOption(key)}
                                >
                                  <i class="icon icon-plus text-xl mr-1"></i>
                                  Add an option
                                </Button>
                              </div>

                              <div>
                                <Button
                                  className="default-blue-btn filled-blue
                                  ml-auto mt-1 "
                                  htmlType="submit"
                                  loading={isLoading}
                                >
                                  save
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <div>
                              <Button
                                type="primary"
                                ghost
                                className="default-blue-btn 
                         ml-auto mt-1 "
                              >
                                Edit
                              </Button>
                            </div>
                          )}
                          <Divider className="filled-blue" />
                        </div>
                      ) : null
                    )}
                  </>
                ) : getFieldValue("question" + (key + 1) + "type") === 2 ? (
                  <>
                    <div>
                      <MinusCircleOutlined
                        onClick={() => removeQuestion(key)}
                      />
                      <Form.Item
                        name={"question_id" + (key + 1)}
                        rules={[
                          {
                            required: true,
                            message: "question cannot be empty",
                          },
                        ]}
                      >
                        <TextArea
                          className="border-silver focus:border-silver
                                             focus:shadow-sm h-14 hover:border-silver"
                          placeholder={"enter the question no " + (key + 1)}
                          autoSize={{ minRows: 4, maxRows: 8 }}
                        />
                      </Form.Item>
                    </div>
                    {save !== false ? (
                      <div>
                        <div>
                          <Button
                            className="default-blue-btn filled-blue
ml-auto mt-1 "
                            htmlType="submit"
                            loading={isLoading}
                          >
                            save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <div>
                        <Button
                          type="primary"
                          ghost
                          className="default-blue-btn 
                 ml-auto mt-1 "
                        >
                          Edit
                        </Button>
                      </div>
                    )}

                    <Divider className="filled-blue" />
                  </>
                ) : null
              }
            </Form.Item>
          </div>
        </Form>
      ))}

      <Button
        className="default-blue-btn filled-blue
            ml-auto mt-8 "
        block
        onClick={addquestion}
      >
        <i class="icon icon-plus text-xl mr-1"></i>Add a Question
      </Button>
    </div>
  );
};

export default Companyspq;
