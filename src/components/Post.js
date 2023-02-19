import './styles/Post.css';

function Post(props) {
    return(
        <>
        <div id={props.uniqueid} className={'wrapper-post-container ' + localStorage.getItem('color-mode')}>
            <img src={process.env.PUBLIC_URL + props.src} />
            <div className={'post-profile-container'}>
            <span>{props.username}</span>
            <span>
                <img src={process.env.PUBLIC_URL + (props.isliked ? `/logos/liked.png` : `/logos/like.png`)} />
                <span>{props.likecount}</span>
            </span>
            </div>
        </div>
        </>
    );
}

export default Post;