import React from 'react';
import { MDBContainer, MDBNavbarNav, MDBNavbar, MDBNavbarBrand, MDBNavbarToggler, MDBCollapse, MDBNavItem, MDBNavLink } from 'mdbreact';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

class FixedNavbarExample extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          collapse: false,
      };
      this.onClick = this.onClick.bind(this);
  }

  onClick() {
    this.setState({
        collapse: !this.state.collapse,
      });
  }

  render() {
    // const bgBlack = {backgroundColor: '#f4f4f4'}
    const container = {height: 1300}
    return(
      <div>
        <Router>
          <header>
            <MDBNavbar color="black" fixed="top" dark expand="md">
              <MDBNavbarBrand href="/">
                  <strong>Dashboard</strong>
              </MDBNavbarBrand>
              <MDBNavbarToggler onClick={ this.onClick } />
              <MDBCollapse isOpen = { this.state.collapse } navbar>
                <MDBNavbarNav left>
                  <MDBNavItem active>
                      <MDBNavLink to="#" onClick={this.burgerToggle}>Events</MDBNavLink>
                  </MDBNavItem>
                  <MDBNavItem>
                      <MDBNavLink to="#section2">Processing Techniques</MDBNavLink>
                  </MDBNavItem>
                </MDBNavbarNav>
              </MDBCollapse>
            </MDBNavbar>
          </header>
          
        </Router>
        <MDBContainer style={container} className="text-center mt-5 pt-5">
        <h4 id="section1">section1</h4>
            <p>
              Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr
              enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle
              rights whatever. Anim keffiyeh carles cardigan. Velit seitan
              mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean
              shorts, williamsburg hoodie minim qui you probably haven't heard
              of them et cardigan trust fund culpa biodiesel wes anderson
              aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh
              artisan ullamco consequat.
            </p>
            <p>
              Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr
              enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle
              rights whatever. Anim keffiyeh carles cardigan. Velit seitan
              mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean
              shorts, williamsburg hoodie minim qui you probably haven't heard
              of them et cardigan trust fund culpa biodiesel wes anderson
              aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh
              artisan ullamco consequat.
            </p>
            <h4 id="section2">section2</h4>
            <p>
              Veniam marfa mustache skateboard, adipisicing fugiat velit
              pitchfork beard. Freegan beard aliqua cupidatat mcsweeney's vero.
              Cupidatat four loko nisi, ea helvetica nulla carles. Tattooed
              cosby sweater food truck, mcsweeney's quis non freegan vinyl.
              Lo-fi wes anderson +1 sartorial. Carles non aesthetic exercitation
              quis gentrify. Brooklyn adipisicing craft beer vice keytar
              deserunt.
            </p>
            <p>
              Ad leggings keytar, brunch id art party dolor labore. Pitchfork yr
              enim lo-fi before they sold out qui. Tumblr farm-to-table bicycle
              rights whatever. Anim keffiyeh carles cardigan. Velit seitan
              mcsweeney's photo booth 3 wolf moon irure. Cosby sweater lomo jean
              shorts, williamsburg hoodie minim qui you probably haven't heard
              of them et cardigan trust fund culpa biodiesel wes anderson
              aesthetic. Nihil tattooed accusamus, cred irony biodiesel keffiyeh
              artisan ullamco consequat.
            </p>
        </MDBContainer>
      </div>
    );
  }
}

export default FixedNavbarExample;