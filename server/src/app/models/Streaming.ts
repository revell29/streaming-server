import mongoose, { Schema } from "mongoose";
const schema = mongoose.Schema;

const StreamingSchema = new schema({
    title: String,
    description: String,
    uuid: String,
});

const Streaming = mongoose.model("streaming", StreamingSchema);

export default Streaming;
