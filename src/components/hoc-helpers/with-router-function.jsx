import React from "react";
import { useParams, useLocation, useNavigate } from 'react-router-dom';

function withRouter(Component) {
    return (props) => {
        // debugger
        const location = useLocation();
        const navigate = useNavigate();
        const params = useParams();

        return (
            <Component
                {...props}
                router={{ location, navigate, params }}
            />
        );
    }
}

export default withRouter;