import React from "react";
import PropTypes from 'prop-types';

function Post({id,title}){
    return(
        <div className="Post">
            <div className="Post_title">{title}</div>
            <img 
            className="Post_imge" 
            src={'https://source.unsplash.com/radom?sig=${id}'}
            />
        </div>
    );
}

Post.propTypes = {
    id : PropTypes.number.isRequired,
    title: PropTypes.string.isRequired
};

export default Post;