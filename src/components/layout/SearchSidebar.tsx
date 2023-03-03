import React from 'react';

import Icon from '@/components/ui/Icon';
import SearchInput from '@/components/searchSidebar/SearchInput';

interface SearchSidebarProps {}

const SearchSidebar = ({}: SearchSidebarProps) => {
    return (
        <nav className='hidden h-full flex-col pt-1.5 lg:flex lg:w-[290px] xl:w-[350px]'>
            <SearchInput
                startAdornment={
                    <Icon
                        className='mx-3 h-[18.5px] w-[18.5px]'
                        name='search'
                    />
                }
            />
        </nav>
    );
};

export default SearchSidebar;
