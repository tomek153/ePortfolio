import React, { useState, useEffect } from 'react';
import UserCard from "./user-card";
import PaginationCustom from "./pagination";

const SearchResults = ({data}) => {
    const [users] = useState(data);
    const [currentPage, setCurrentPage] = useState(1);
    const [usersPerPage] = useState(10);

    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;
    const currentUsers = data.slice(indexOfFirstUser, indexOfLastUser);

    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <>
            {currentUsers.map((user, index) => <UserCard data={user} key={index}/>)}
            <br/>
            <br/>
            <br/>
            <PaginationCustom
                usersPerPage={usersPerPage}
                totalUsers={data.length}
                paginate={paginate}
            />
            <br/>
        </>
    );
};

export default SearchResults;