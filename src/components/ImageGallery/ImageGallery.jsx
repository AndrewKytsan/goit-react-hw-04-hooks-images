import React from 'react';
import s from './ImageGallery.module.scss';
import PropTypes from 'prop-types';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';

function ImageGallery({ images, onClick }) {
    return (
        <ul className={s.ImageGallery}>
            {images.map(image => (
                <ImageGalleryItem
                    key={image.id}
                    smallImg={image.webformatURL}
                    largeImg={() => onClick(image.largeImageURL)}
                />
            ))}
        </ul>
    );
}

ImageGallery.propTypes = {
    images: PropTypes.arrayOf(
        PropTypes.shape({
            id: PropTypes.number.isRequired,
            webformatURL: PropTypes.string.isRequired,
            largeImageURL: PropTypes.string.isRequired,
        }),
    ).isRequired,
    onClick: PropTypes.func.isRequired,
};

export default ImageGallery;
