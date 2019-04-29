import PropTypes from 'prop-types';
import React from 'react';

const Link = props => {

    if (props.post && props.post.link) {

        const { link } = props.link;

        return (
            <div className="link">
                <a className="title" href={link.url}>
                    <h4>{link.title}</h4>
                </a>
                <div className="url">{link.url}</div>
                <p className="description">{link.description}</p>
            </div>
        );
    }
    return null;

};

Link.propTypes = {
    link: PropTypes.shape({
        url: PropTypes.string,
        title: PropTypes.string,
        description: PropTypes.string
    })
};

export default Link;