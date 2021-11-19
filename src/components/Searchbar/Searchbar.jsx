import s from './Searchbar.module.scss';
import PropTypes from 'prop-types';
import { useState } from 'react';
export default function Searchbar({ onSubmit }) {
    const [inputValue, setInputValue] = useState('');

    const inputHandler = e => {
        setInputValue(e.target.value);
    };
    const formHandler = e => {
        e.preventDefault();
        onSubmit(inputValue);
        setInputValue('');
    };

    return (
        <header className={s.Searchbar}>
            <form className={s.SearchForm} onSubmit={formHandler}>
                <button type="submit" className={s.SearchFormButton}>
                    <span className={s.SearchFormButtonLabel}>Search</span>
                </button>

                <input
                    className={s.SearchFormInput}
                    type="text"
                    value={inputValue}
                    onChange={inputHandler}
                    autoComplete="off"
                    autoFocus
                    placeholder="Search images and photos"
                />
            </form>
        </header>
    );
}

Searchbar.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};
