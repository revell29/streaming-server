import { connect } from "react-redux";
import { fetchStreams } from "../../redux/actions";

import Home from "./Home";

var mapStateToProps = (state) => {
    return {
        streams: state.streams.list_streams,
    };
};

export default connect(mapStateToProps, { fetchStreams })(Home);
