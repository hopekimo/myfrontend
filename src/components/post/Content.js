import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';


const Content = ({ post }) => {
    const linkTo = "/posts/" + post.rawid;

    return (
        <p className="content"><Link to={linkTo}>{post.content}</Link></p>
    );
}


Content.propTypes = {
    post: PropTypes.object
};

export default Content;