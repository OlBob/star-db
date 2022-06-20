import React, { Component } from 'react';
import Spinner from '../spinner';

const WithData = (WrappedList) => {
    return class extends Component {

        state = {
            data: null,
        }

        componentDidMount() {

            this.props.getData()
                .then((data) => this.setState({ data }))
        }

        render() {
            const { data } = this.state;

            if (!data) {
                return <Spinner />
            }

            return <WrappedList data={data} {...this.props} />
        }
    }
}

export default WithData;