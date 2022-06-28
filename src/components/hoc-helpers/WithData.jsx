import React, { Component } from 'react';
import Spinner from '../spinner';
import ErrorIndicator from '../error-indicator';

const WithData = (WrappedList) => {
    return class extends Component {

        state = {
            data: null,
            loading: true,
            error: false
        }

        componentDidMount() {
            this.setState({
                loading: true,
                error: false
            })

            this.update()
        }

        componentDidUpdate(prevProps) {
            if (this.props.getData === prevProps.getData) {
                this.update()
            }
        }

        update() {
            this.props.getData()
                .then((data) => {
                    this.setState({
                        data,
                        loading: false
                    })
                })
                .catch(() => {
                    this.setState({
                        error: true,
                        loading: false
                    })
                })
        }

        render() {
            const { data, loading, error } = this.state;

            if (loading) {
                return <Spinner />
            }

            if (error) {
                return <ErrorIndicator />
            }

            return <WrappedList data={data} {...this.props} />
        }
    }
}

export default WithData;