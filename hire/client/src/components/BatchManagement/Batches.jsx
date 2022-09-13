import React from "react";

const Batches = (props) => {
    const { batches, editBatch } = props;
    const renderBatches = () => {
        return batches.map(batch => 
            <div className="bg-lightblue cursor-pointer p-6 rounded" 
            onClick={() => editBatch(batch)}>
                <h4 className="font-bold text-bluelagoon text-base">
                    { "Batch " + batch.batch_id }
                </h4>
                <p className="mt-3">
                    <span className="text-bluelagoon">
                        { batch.rounds }
                    </span> Rounds
                </p>
            </div>
        )
    }
    return (
        <div className="grid grid-cols-6 gap-x-12 gap-y-6">
            { renderBatches() }
        </div>
    )
}

export default Batches;