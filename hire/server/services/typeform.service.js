const fs = require("fs");
const xlsx = require('xlsx');
const typeformRepository = require("../repositories/typeform.repository");

const saveLogs = async (params) => {
    try {
        if(params.path) {
            const { batch_id, o_id, role_id } = params;
            const workBook = xlsx.readFile(params.path);
            const sheet_name_list = workBook.SheetNames;
            const list = xlsx.utils.sheet_to_json(workBook.Sheets[sheet_name_list[0]]);
            const emails = list.map(listItem => 
                listItem["Email"] ? listItem["Email"].toLowerCase() : ""
            ).filter(email => email);
            const existingLogs = await typeformRepository.getLogs({ ...params, emails });
            const logs = list.map(listItem => ({ 
                name: listItem["Name"], 
                email: listItem["Email"] ? listItem["Email"].toLowerCase() : "",
                recording: listItem["Loom"], 
                remarks: listItem["Remarks"],
                score: listItem["Score"],
                batch_id,
                o_id,
                role_id,
                created_at: Math.round(new Date().getTime() / 1000),
                updated_at: Math.round(new Date().getTime() / 1000)
            }));
            const { updatedLogs, newLogs } = logs.reduce((accumulator, log) => {
                let existingLog = existingLogs.find(existingLog => 
                    existingLog.email === log.email
                );

                if(existingLog) {
                    accumulator.updatedLogs = [ ...accumulator.updatedLogs, log ];
                } else {
                    accumulator.newLogs = [ ...accumulator.newLogs, log ];
                }
                return accumulator;
            }, { updatedLogs: [], newLogs: [] });
            fs.unlinkSync(params.path);
            if(updatedLogs.length || newLogs.length) {
                if(updatedLogs.length) {
                    const updatedLogQueries = updatedLogs.map(updatedLog => ({
                        updateOne: {
                            filter: { 
                                batch_id,
                                o_id,
                                role_id,
                                email: updatedLog.email
                            },
                            update: updatedLog
                        }
                    }));

                    const response = await typeformRepository.updateLogs(updatedLogQueries);

                    if(response && !newLogs.length) {
                        return { status: 1, message: "Typeform logs saved successfully" }
                    }
                }
                const response = await typeformRepository.saveLogs(newLogs);
                if(response) {
                    return { status: 1, message: "Typeform logs saved successfully" }
                }
            } else {
                return { status: 0, message: "Please upload a sheet with valid data!" };
            }
        }
        return { status: 0, message: "Failed to save typeform logs" };
    } catch (err) {
        console.log(err);
        throw err;
    }
}

module.exports = {
    saveLogs
}