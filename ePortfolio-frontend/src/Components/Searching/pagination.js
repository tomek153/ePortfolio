import React, {useState} from "react";
import {Pagination} from "react-bootstrap";

const PaginationCustom = ({usersPerPage, totalUsers, paginate}) => {
    let pageNumbers = [];
    const [active, setActive] = useState(1);

    function changeActive(event) {
        const value = event.target.getAttribute('value');

        var allNumbs = document.querySelectorAll("ul.pagination > li");
        allNumbs.forEach(number => {
            number.classList.remove("active");
        });

        var activeNumb = document.querySelector("ul.pagination > li:nth-child("+value+")");
        activeNumb.classList.add("active");

        paginate(value);
    }

    for (let i=1; i<=Math.ceil(totalUsers/usersPerPage); i++) {
        if (i === 1) {
            pageNumbers.push(
                <Pagination.Item className="active" key={i} value={i} onClick={changeActive}>
                    {i}
                </Pagination.Item>)
        } else {
            pageNumbers.push(
                <Pagination.Item key={i} value={i} onClick={changeActive}>
                    {i}
                </Pagination.Item>)
        }

    }



    return(
        <Pagination>
            {pageNumbers}
        </Pagination>
    )
}

export default PaginationCustom;