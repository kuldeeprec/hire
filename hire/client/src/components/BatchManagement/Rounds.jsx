import React, { useState } from "react";
import { Button, Form, Input, InputNumber, Select, Switch } from "antd";
import UploadModal from "./UploadModal";
import roundNames from "../../json/roundNames.json";

const { Option } = Select;

const Rounds = (props) => {
    const { activeBatch, rounds } = props;

    const [isModalVisible, setModalVisible] = useState(false);

    const renderRounds = () => {

        const renderRoundNames = () => {
            return roundNames.map((roundName, key) => 
                <Option value={roundName} key={key}>
                    { roundName }
                </Option>
            );
        }

        return [...Array(rounds)].map((_, key) =>
            <div>
                <div className="flex justify-between">
                    <div className="w-5/6">
                        <span className="font-semibold text-xs opacity-66">
                            Test type
                        </span>
                        <Form.Item
                            name={"round_" + (key + 1) + "_type"}
                            rules= {[{ 
                                required: true,
                                message: "Please select a test type",
                            }]}
                            initialValue={
                                activeBatch ? activeBatch["round_" + (key + 1) + "_type"] : undefined
                            }
                        >
                            <Select className="border-silver focus:border-silver 
                                focus:shadow-sm h-14 hover:border-silver" 
                                placeholder="Quiz (Objective)" 
                            >
                                <Option value={1}>Quiz (Objective)</Option>
                                <Option value={2}>Quiz (Subjective)</Option>
                                <Option value={3}>Typeform</Option>
                                <Option value={4}>Manual Scored</Option>
                            </Select>
                        </Form.Item>
                    </div>
                    <div width="w-1/6">
                        <span className="font-semibold text-xs opacity-66">
                            Result
                        </span>
                        <Form.Item
                            className="flex items-center h-12"
                            name={"round_" + (key + 1) + "_result"}
                            initialValue={
                                activeBatch ? activeBatch["round_" + (key + 1) + "_result"] ? true : false : undefined
                            }
                            valuePropName="checked"
                        >
                            <Switch />
                        </Form.Item>
                    </div>
                </div>
                <div className="grid grid-cols-3 gap-8">
                    <div>
                        <span className="font-semibold text-xs opacity-66">
                            Round Name
                        </span>
                        <Form.Item
                            name={"round_" + (key + 1) + "_name"}
                            rules= {[{ 
                                required: true,
                                message: "Please select a round name",
                            }]}
                            initialValue={
                                activeBatch ? activeBatch["round_" + (key + 1) + "_name"] : undefined
                            }
                        >
                            <Select className="border-silver focus:border-silver 
                                focus:shadow-sm h-14 hover:border-silver" 
                                placeholder="Aptitude Test"
                            >
                                { renderRoundNames() }
                            </Select>
                        </Form.Item>
                    </div>
                    <div>
                        <span className="font-semibold text-xs opacity-66">
                            Cutoff
                        </span>
                        <Form.Item
                            name={"round_" + (key + 1) + "_cutoff"}
                            rules= {[{ 
                                required: true,
                                message: "Please enter a cutoff",
                            }]}
                            initialValue={
                                activeBatch ? activeBatch["round_" + (key + 1) + "_cutoff"] : undefined
                            }
                        >
                            <InputNumber className="border-silver focus:border-silver 
                                focus:shadow-sm h-14 hover:border-silver w-full" 
                                placeholder="50" 
                                controls={false}
                                min={0} max={100}
                            />
                        </Form.Item>
                    </div>
                    <div>
                        <Form.Item
                            noStyle
                            shouldUpdate={(prevValues, currentValues) => 
                                prevValues["round_" + (key + 1) + "_type"] !== currentValues["round_" + (key + 1) + "_type"]
                            }
                        >
                            {({ getFieldValue }) =>
                                [1, 2].includes(getFieldValue("round_" + (key + 1)  + "_type")) ? (
                                    <>
                                        <span className="font-semibold text-xs opacity-66">
                                            Test ID
                                        </span>
                                        <Form.Item
                                            name={"round_" + (key + 1) + "_test_id"}
                                            rules= {[{ 
                                                required: true,
                                                message: "Test id cannot be empty"
                                            }]}
                                            initialValue={
                                                activeBatch ? activeBatch["round_" + (key + 1) + "_test_id"] : undefined
                                            }
                                        >
                                            <Input className="border-silver focus:border-silver 
                                                focus:shadow-sm h-14 hover:border-silver" 
                                                placeholder="T_1234"
                                            />
                                        </Form.Item>
                                    </>
                                ) : getFieldValue("round_" + (key + 1)  + "_type") === 3 ?
                                <>
                                    <span className="font-semibold text-xs opacity-66">
                                        Data
                                    </span>
                                    <Button className="default-blue-btn filled-blue 
                                    mt-1.5 w-full" onClick={() => setModalVisible(true)}>
                                        Update
                                    </Button>
                                </> : null
                            }
                        </Form.Item>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div>
            { renderRounds() }
            {
                isModalVisible &&
                <UploadModal 
                    activeBatch={activeBatch}
                    setModalVisible={setModalVisible}
                />
            }
        </div>
    )
}

export default Rounds;