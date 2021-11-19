import s from './Button.module.scss';
import PropTypes from 'prop-types';

function Button({ onClick }) {
    return (
        <div className={s.ButtonWrapper}>
            <button className={s.Button} type="button" onClick={onClick}>
                Load More
            </button>
        </div>
    );
}

Button.propTypes = {
    onClick: PropTypes.func.isRequired,
};
export default Button;
