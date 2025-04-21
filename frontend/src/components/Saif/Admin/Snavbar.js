import React from 'react';
import { Nav } from 'react-bootstrap';
import { House, Speedometer, Table, Grid, PersonCircle } from 'react-bootstrap-icons';
import { FaAd } from 'react-icons/fa';
import { FaFileAlt } from 'react-icons/fa';
import { FaDatabase } from 'react-icons/fa';

const Snavbar = () => {
    return (
        // https://getbootstrap.com/docs/5.0/examples/sidebars/
        
        <div className="d-flex flex-sm-column flex-row flex-nowrap align-items-center sticky-top" style={{ backgroundColor: '#172026' }}>

            <Nav className="nav-pills nav-flush flex-sm-column flex-row flex-nowrap mb-auto mx-auto text-center align-items-center">
                <Nav.Link href="/home" className="nav-link py-3 px-2" title="Home">
                    <House className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/AdminDashboard" className="nav-link py-3 px-2" title="Dashboard">
                    <Speedometer className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/Orders" className="nav-link py-3 px-2" title="Orders">
                    <Table className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/admin" className="nav-link py-3 px-2" title="Products">
                    <Grid className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/UsersList" className="nav-link py-3 px-2" title="Customers">

                    <PersonCircle className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/AdminAds" className="nav-link py-3 px-2" title="Ads">
                    <FaAd className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/AdminPoster" className="nav-link py-3 px-2" title="Posters">
                    <FaFileAlt className="fs-1" />
                </Nav.Link>
                <Nav.Link href="/AdminDB" className="nav-link py-3 px-2" title="Posters">
                    <FaDatabase className="fs-1" />
                </Nav.Link>
            </Nav>

        </div>
    );
};

export default Snavbar;
