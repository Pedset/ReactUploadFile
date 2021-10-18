import React from 'react';
import PropTypes from 'prop-types';

const Message = ({ msg }) => {
  let className = "alert alert-" + msg.type + " alert-dismissible fade show";
  return (
    <div className={className} role='alert'>
      {msg.text}
      <button
        type='button'
        className='close'
        data-dismiss='alert'
        aria-label='Close'
      >
      </button>
    </div>
  );
};



Message.propTypes = {
  msg: PropTypes.object.isRequired
};

export default Message;
