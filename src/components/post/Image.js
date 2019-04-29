import PropTypes from 'prop-types';
import React from 'react';

const Image = props => {
    if (props.post && props.post.image) {
        return (
            <img
                className="img-responsive"
                src={`${process.env.REACT_APP_URL}` + props.post.image}
                alt="React in Action by Mark Thomas"
            />
        );
    }
    return null;
};

Image.propTypes = {
    post: PropTypes.shape({ image: PropTypes.string })
};

export default Image;