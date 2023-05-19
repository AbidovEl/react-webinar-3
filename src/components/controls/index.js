import React from "react";
import PropTypes from 'prop-types';
import './style.css';

function Controls({onOpenModalWindow}){
  return (
    <div className='Controls'>
      <div className="productBin">В корзине: пусто</div>
      <button onClick={() => onOpenModalWindow()}>Перейти</button>
    </div>
  )
}

Controls.propTypes = {
  onOpenModalWindow: PropTypes.func
};

Controls.defaultProps = {
  onOpenModalWindow: () => {}
}

export default React.memo(Controls);
