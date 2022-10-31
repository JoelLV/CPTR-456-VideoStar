import { Offcanvas } from "react-bootstrap/esm";

const ShoppingCart = () => {
    return (
        <Offcanvas scroll={true} show={true} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>Cart</Offcanvas.Title>
            </Offcanvas.Header>
        </Offcanvas>
    )
}

export default ShoppingCart