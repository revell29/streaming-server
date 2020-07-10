import { connect } from "react-redux";

import Broadcast from "./Broadcast";

var mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams.detail_stream,
    };
};

export default connect(null)(Broadcast);
