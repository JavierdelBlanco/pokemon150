import React from "react";
import { Navbar, Nav, NavDropdown,Form, FormControl, Button, Container} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import logo from '../img/pokemon150.png';
import '../styles/NavBar.css'

const NavBar = () => {

    const [word, setWord] = React.useState('');
    const navigate = useNavigate();


    return (
    
    <Navbar className='color-navbar' variant='light'>
        <Container>
            <Navbar.Brand>
                <img src={logo}  width={200} alt="logo"/>
            </Navbar.Brand>
        </Container>
        <Container>
            <Form className="d-flex">
                <FormControl
                    type="search"
                    placeholder="Search for a Pokemon"
                    className="me-1"
                    aria-label="Search"
                    onChange={(e) => setWord(e.target.value)}
                    onKeyPress={(e) => {
                        if(e.key === 'Enter'){
                            if (word !== '') {
                                e.preventDefault();
                                navigate(`/search=${word}`);
                            }       
                        }
                    }}
                />
                <Button onClick={ (e) => {
                    if (word !== '') {
                        navigate(`/search=${word}`);
                    }
                }} variant="dark">Search</Button>
            </Form>
        </Container>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav"></Navbar.Collapse>
        <Nav className='nav-custom' justify>
            <Nav.Link className="nav-link-custom" onClick={ () => navigate("/")}>Home</Nav.Link>
            <NavDropdown className="nav-dropdown-custom" title="Pokedex" id="nav-dropdown">
                <NavDropdown.Item onClick={ () => navigate("/pokedex/pokemon")}>Pokemon</NavDropdown.Item>
                <NavDropdown.Item onClick={ () => navigate("/pokedex/moves")}>Moves</NavDropdown.Item>
                <NavDropdown.Item onClick={ () => navigate("/pokedex/abilities")}>Abilities</NavDropdown.Item>
            </NavDropdown>
            <Nav.Link className="nav-link-custom" onClick={ () => navigate("/favorites")}>Favorites</Nav.Link>
        </Nav>
    </Navbar>       
    )
}
export {NavBar}

