import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Ad from '../components/ad/Ad';
import Post from '../components/post/Post';
import { Link } from 'react-router-dom';


export class SinglePost extends Component {
    static propTypes = {
        params: PropTypes.shape({
            rawid: PropTypes.string.isRequired
        })
    };

    render() {
        return (

            <div className="single-post">

                <Link to="/">
                    <div className="back">
                        <i className="fa fa-arrow-left" /> Back
                    </div>
                </Link>
                <Post rawid={this.props.match.params.rawid} />
                <Ad
                    url="https://www.manning.com/books/react-in-action"
                    imageUrl="/static/assets/ads/ria.png"
                />
            </div>
        );

    }

}
export default SinglePost;