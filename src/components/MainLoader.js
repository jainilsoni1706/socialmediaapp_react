import './styles/MainLoader.css';


function MainLoader(props) {

    let isVisible = 'app-main-loader';

    if (props.isvisible === false) {
        isVisible = '';
    }

    return(
        <>
            <div className={isVisible}></div>
        </>
    );
}

export default MainLoader;