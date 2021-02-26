import React, {Fragment} from 'react';
import './../assets/css/style.css'


function Navbar() {
  return (
    <Fragment>
      <nav className="navbar navbar-dark bg-primary">
        <div className="container-fluid">
          <div className="navbar-brand ">Backoffice Orders</div>
          <div className="d-flex">
              <img src="https://avataaars.io/?avatarStyle=Circle&topType=LongHairStraight&accessoriesType=Blank&hairColor=BrownDark&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light" className="img-cirlce" alt=""/>
          </div>
        </div>
      </nav>
    </Fragment>
  );
}

export default Navbar;
