import PropTypes from "prop-types";
import React from "react";

class CreatePost extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
            valid: false,
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    handlePostChange(e) {
        const content = e.target.value;
        this.setState(() => {
            return {
                content,
                valid: content.length <= 280
            };
        });
    }

    handleSubmit() {

        if (!this.state.valid) {
            return;
        }

        const newPost = {
            content: this.state.content
        };

        // if (this.state.locationSelected) {
        //     newPost.location = this.state.location;
        // }

        this.props.onSubmit(newPost);
        this.setState(() => ({
             content: "",
             valid: false,
        //     showLocationPicker: false,
        //     location: this.initialState.location,
        //     locationSelected: false
        }));
    }

    render() {
        return (
            <div className="create-post">
                <button onClick={this.handleSubmit}>Post</button>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
            </div>
        );
    }

}

export default CreatePost;