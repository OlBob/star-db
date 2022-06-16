import React, { Component } from "react";
import Spinner from "../spinner";

const DetailsWithData = (DetailsVeiw, getData) => {
    return class extends Component {

        state = {
            item: null,
            loading: true,
            error: false,
            image: null
        }

        componentDidMount() {
            this.updateItem()
        }

        componentDidUpdate(prevProps) {
            if (this.props.itemId !== prevProps.itemId) {
                this.updateItem()
            }
        }

        updateItem() {
            const { itemId, getImage } = this.props;

            if (!itemId) return <Spinner />

            getData(itemId)
                .then((item) => {
                    this.setState({
                        item,
                        loading: false,
                        image: getImage(item)
                    })
                })
                .catch(err => this.setState({ loading: false }))
        }

        render() {
            return <DetailsVeiw data={this.state} {...this.props} />
        }
    }
}

export default DetailsWithData;

