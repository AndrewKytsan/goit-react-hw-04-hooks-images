import imagesApi from './ApiService/imagesApi';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery/ImageGallery';
import Button from './components/Button/Button';
import Modal from './components/Modal/Modal';
import Loader from 'react-loader-spinner';
import s from './App.module.scss';
import { useEffect, useState } from 'react';

export default function App() {
    const [searchQuery, setSearchQuery] = useState('');
    const [page, setPage] = useState(1);
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(false);
    const [modalImage, setModalImage] = useState(null);

    useEffect(() => {
        if (!searchQuery) {
            return;
        }
        async function imagesRequest() {
            setLoading(true);
            try {
                const images = await imagesApi.fetchImages(searchQuery, page);
                if (!images.length) {
                    throw new Error();
                }
                setResults(prev => [...prev, ...images]);
                setLoading(false);
                page > 1 &&
                    window.scrollTo({
                        top: document.documentElement.scrollHeight,
                        behavior: 'smooth',
                    });
            } catch (error) {
                console.log(error);
            }
        }
        imagesRequest();
    }, [searchQuery, page]);

    const searchbarHandler = query => {
        if (searchQuery === query) {
            return;
        }
        reset();
        setSearchQuery(query);
    };

    const reset = () => {
        setSearchQuery('');
        setPage(1);
        setResults([]);
        setLoading(false);
    };

    const loadMoreBtn = () => {
        setPage(prevPage => prevPage + 1);
    };

    const openModal = largeImage => {
        setModalImage(largeImage);
    };

    const closeModal = () => {
        setModalImage(null);
    };

    return (
        <div className={s.App}>
            <Searchbar onSubmit={searchbarHandler} />;
            <ImageGallery images={results} onClick={openModal} />
            {modalImage && (
                <Modal largeImage={modalImage} onClose={closeModal} />
            )}
            {loading && (
                <div className={s.Loader}>
                    <Loader
                        type="Puff"
                        color="#00BFFF"
                        height={80}
                        width={80}
                    />
                </div>
            )}
            {results.length > 0 && <Button onClick={loadMoreBtn} />}
        </div>
    );
}
