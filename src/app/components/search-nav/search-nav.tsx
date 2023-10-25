import { memo } from 'react';
import SearchNavStyles from './search-nav.module.css';

interface SearchNavProps extends React.InputHTMLAttributes<HTMLInputElement> {
    title: string;
}

function SearchNav({ title, ...restProps }: SearchNavProps) {
    return (
        <div className={SearchNavStyles.header}>
            <div className={SearchNavStyles.back}>
                <img src={require('app/assets/icons/back.png')} height="16" width="20" />
                <span className={SearchNavStyles['nav-title']}>{title}</span>
            </div>
            <div className="absolute right-0">
                <form action="https://duckduckgo.com/" role="search" className="search-form flex">
                    {/* <input type="submit" value="" className="search-submit" /> */}
                    <input
                        type="search"
                        name="q"
                        className={SearchNavStyles.searchText}
                        placeholder="Titles, people, genres..."
                        autoComplete="off"
                        {...restProps}
                    />
                </form>
            </div>
        </div>
    );
}

export default memo(SearchNav);
