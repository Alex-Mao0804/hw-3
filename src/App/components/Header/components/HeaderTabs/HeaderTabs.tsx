import React from 'react';
import clsx from 'clsx';
import styles from './HeaderTabs.module.scss';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import Text from '../../../Text';
import ROUTES from '../../../../utils/routes';

const HeaderTabs = () => {
    const location = useLocation(); 
    const isActive = (path: string) => location.pathname === path;
    const navigate = useNavigate();
    return (
        <nav className={styles.header__tabs}>
            <ul className={styles.header__tabs__list}>
            <li onClick={() => navigate(ROUTES.CATALOG)} className={clsx(styles.header__tabs__list__item, isActive(ROUTES.CATALOG) && styles.active)}>
            <Text 
                    view='p-18'
                    weight={isActive(ROUTES.CATALOG) ? 'bold' : 'normal'}
                    color={isActive(ROUTES.CATALOG) ? 'accent' : 'primary'}
                    >Products</Text>
                    
                </li>
                <li onClick={() => navigate(ROUTES.CATEGORIES)} className={clsx(styles.header__tabs__list__item, isActive(ROUTES.CATEGORIES) && styles.active)}>
                    <Text 
                    view='p-18'
                    weight={isActive(ROUTES.CATEGORIES) ? 'bold' : 'normal'}
                    color={isActive(ROUTES.CATEGORIES) ? 'accent' : 'primary'}
                    >Categories</Text>
                </li>
                <li onClick={() => navigate(ROUTES.ABOUT)} className={clsx(styles.header__tabs__list__item,isActive(ROUTES.ABOUT) && styles.active)}>
                    <Text 
                    view='p-18'
                    weight={isActive(ROUTES.ABOUT) ? 'bold' : 'normal'}
                    color={isActive(ROUTES.ABOUT) ? 'accent' : 'primary'}
                    >About us</Text>
                </li>
            </ul>
        </nav>
    );
  }


export default HeaderTabs;
