import './styles/FooterMenu.css';

function FooterMenu() {
    return(
        <>
        <div className={'main-menu-glass-bar ' + localStorage.getItem('color-mode')}>
            <div className={'sub-main-menu-glass-bar'}>
                <img src={process.env.PUBLIC_URL + `/${localStorage.getItem('color-mode')}/home.png`} />
            </div>
        </div>
        </>
    );
}

export default FooterMenu;