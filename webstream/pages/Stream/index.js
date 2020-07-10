import { connect } from "react-redux";

import Show from "./Show";

var mapStateToProps = (state, ownProps) => {
    return {
        stream: state.streams.detail_stream,
    };
};

export default connect(mapStateToProps)(Show);
