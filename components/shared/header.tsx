import React from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { withTranslation } from '../../i18n';
import { WithTranslation } from 'react-i18next';

export interface HeaderLocale {
    home: string;
    homeFull: string;
    about: string;
    groups: string;
    calendar: string;
    media: string;
    gallery: string;
    sermons: string;
    language: string;
    contact: string;
}

interface HeaderState {
    menuClass: string;
    menuDisplay: string;
    currentRoute?: string;
}

class Header extends React.Component<WithTranslation, HeaderState> {
    constructor(props: WithTranslation) {
        super(props);
        this.state = {
            menuClass: 'collapsed',
            menuDisplay: 'none',
        };
    }

    componentDidMount() {
        this.setState({ currentRoute: Router.route });
        Router.events.on('routeChangeComplete', this.handleRouteChange);
    }

    componentWillUnmount() {
        Router.events.off('routeChangeComplete', this.handleRouteChange);
    }

    static async getInitialProps() {
        return { namespacesRequired: ['common'] };
    }

    private handleRouteChange = (currentRoute: string) => {
        this.setState({ currentRoute });
    }

    openMenu = () => {
        this.setState({ menuDisplay: 'block' }, () => {
            window.setTimeout(() => this.setState({ menuClass: 'expanded' }), 0);
        });
    }

    closeMenu = () => {
        this.setState({ menuClass: 'collapsed' }, () => {
            window.setTimeout(() => this.setState({ menuDisplay: 'none' }), 500);
        });
    }

    changeLanguage = (lang: string) => {
        this.props.i18n.changeLanguage(lang);
        this.closeMenu();
    }

    getCurrentClass = (route: string) => (
        this.state.currentRoute === route ? 'current' : ''
    )

    getHomeClass = () => (
        this.state.currentRoute === '/' ? ' home-nav' : ''
    )

    render() {
        const { t, i18n } = this.props;
        const headerLocales = t<HeaderLocale>('header', { returnObjects: true });

        return (
            <React.Fragment>
                <nav className={`navbar navbar-expand-lg navbar-light${this.getHomeClass()}`}>
                    <div className='container'>
                        <Link href='/'>
                            <a id='brand' className='navbar-brand d-flex' >
                                <img
                                    src='/static/svg/logo.svg'
                                    width='40'
                                    height='40'
                                    alt='SDA logo'
                                />
                                <span className='mt-2'>{headerLocales.homeFull}</span>
                            </a>
                        </Link>

                        <button
                            className='navbar-toggler justify-self-start border-0'
                            type='button'
                            aria-expanded={this.state.menuClass === 'expanded'}
                            aria-label='Close mobile navigation'
                            onClick={this.openMenu}
                        >
                            <span className='navbar-toggler-icon' />
                        </button>

                        <div
                            className='navbar navbar-light d-none d-lg-block'
                            id='navbarSupportedContent'
                        >
                            <ul className='navbar-nav ml-auto'>
                                <li className={`nav-item ${this.getCurrentClass('/about')}`}>
                                    <Link href='/about'>
                                        <a className='nav-link hvr-overline-from-center'>
                                            {headerLocales.about}
                                            <span className='sr-only'>(current)</span>
                                        </a>
                                    </Link>
                                </li>

                                <li className={`nav-item ${this.getCurrentClass('/groups')}`}>
                                    <Link href='/groups'>
                                        <a className='nav-link hvr-overline-from-center'>
                                            {headerLocales.groups}
                                        </a>
                                    </Link>

                                </li>

                                <li className={`nav-item ${this.getCurrentClass('/calendar')}`}>
                                    <Link href='/calendar'>
                                        <a className='nav-link hvr-overline-from-center'>
                                            {headerLocales.calendar}
                                        </a>
                                    </Link>

                                </li>
                                <li className={`nav-item ${this.getCurrentClass('/sermons')}`}>
                                    <Link href='/sermons'>
                                        <a className='nav-link hvr-overline-from-center'>
                                            {headerLocales.sermons}
                                        </a>
                                    </Link>
                                </li>

                                <li className='nav-item dropdown'>
                                    <a
                                        className='nav-link dropdown-toggle hvr-overline-from-center'
                                        href='#'
                                        id='localeDropdown'
                                        role='button'
                                        data-toggle='dropdown'
                                        aria-haspopup='true'
                                        aria-expanded='false'
                                    >
                                        <i className='fas fa-language' />
                                        &nbsp;{headerLocales.language}
                                    </a>
                                    <div
                                        className='dropdown-menu'
                                        aria-labelledby='localeDropdown'
                                    >
                                        <button
                                            className='dropdown-item'
                                            onClick={() => i18n.changeLanguage('en')}
                                        >
                                            English
                                        </button>
                                        <button
                                            className='dropdown-item'
                                            onClick={() => i18n.changeLanguage('ru')}
                                        >
                                            Русский
                                        </button>
                                        <button
                                            className='dropdown-item'
                                            onClick={() => i18n.changeLanguage('uk')}
                                        >
                                            Українська
                                        </button>
                                    </div>
                                </li> {/* Locale dropdown */}

                                <li className='nav-item'>
                                    <Link href='/contact'>
                                        <a
                                            role='button'
                                            aria-label='Envelope'
                                            id='btn-contact-header'
                                            className='btn btn-outline-dark hvr-wobble-vertical'
                                        >
                                            <i className='far fa-envelope' />
                                        </a>
                                    </Link>
                                </li>
                            </ul>
                        </div> {/*   Collapsing content  */}
                    </div> {/* Navbar container */}
                </nav>

                <div
                    className={`mobile-nav-container${this.getHomeClass()}`}
                    style={{ display: this.state.menuDisplay }}
                >
                    <div
                        className={`mobile-nav-background ${this.state.menuClass}`}
                        aria-controls='navbarSupportedContent'
                        aria-expanded={this.state.menuClass === 'expanded'}
                        aria-label='Open mobile navigation'
                        onClick={this.closeMenu}
                    />
                    <div className={`mobile-nav-content ${this.state.menuClass}`}>
                        <ul className='navbar-nav ml-auto'>
                            <li
                                className={`nav-item ${this.getCurrentClass('/')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/'>
                                    <a className='nav-link hvr-overline-from-center' >
                                        <i className='fas fa-home' />
                                        &nbsp;
                                        {headerLocales.home}
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${this.getCurrentClass('/about')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/about'>
                                    <a className='nav-link hvr-overline-from-center'>
                                        <i className='fas fa-info-circle' />
                                        &nbsp;
                                        {headerLocales.about}
                                        <span className='sr-only'>(current)</span>
                                    </a>
                                </Link>
                            </li>

                            <li
                                className={`nav-item ${this.getCurrentClass('/groups')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/groups'>
                                    <a className='nav-link hvr-overline-from-center'>
                                        <i className='fas fa-users' />
                                        {headerLocales.groups}
                                    </a>
                                </Link>

                            </li>

                            <li
                                className={`nav-item ${this.getCurrentClass('/calendar')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/calendar'>
                                    <a className='nav-link hvr-overline-from-center'>
                                        <i className='far fa-calendar-alt' />
                                        &nbsp;
                                        {headerLocales.calendar}
                                    </a>
                                </Link>

                            </li>
                            <li
                                className={`nav-item ${this.getCurrentClass('/sermons')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/sermons'>
                                    <a className='nav-link hvr-overline-from-center'>
                                        <i className='far fa-play-circle' />
                                        &nbsp;
                                        {headerLocales.sermons}
                                    </a>
                                </Link>
                            </li>
                            <li
                                className={`nav-item ${this.getCurrentClass('/contact')}`}
                                onClick={this.closeMenu}
                            >
                                <Link href='/contact'>
                                    <a className='nav-link hvr-overline-from-center'>
                                        <i className='far fa-envelope' />
                                        &nbsp;
                                        {headerLocales.contact}
                                    </a>
                                </Link>
                            </li>

                            <li className='nav-item dropdown'>
                                <a
                                    className='nav-link dropdown-toggle hvr-overline-from-center'
                                    href='#'
                                    id='localeDropdown'
                                    role='button'
                                    data-toggle='dropdown'
                                    aria-haspopup='true'
                                    aria-expanded='false'
                                >
                                    <i className='fas fa-language' />
                                    &nbsp;{headerLocales.language}
                                </a>
                                <div
                                    className='dropdown-menu'
                                    aria-labelledby='localeDropdown'
                                >
                                    <button
                                        className='dropdown-item'
                                        onClick={() => this.changeLanguage('en')}
                                    >
                                        English
                                    </button>
                                    <button
                                        className='dropdown-item'
                                        onClick={() => this.changeLanguage('ru')}
                                    >
                                        Русский
                                    </button>
                                    <button
                                        className='dropdown-item'
                                        onClick={() => this.changeLanguage('uk')}
                                    >
                                        Українська
                                    </button>
                                </div>
                            </li> {/* Locale dropdown */}
                        </ul>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

export default withTranslation('common')(Header);
