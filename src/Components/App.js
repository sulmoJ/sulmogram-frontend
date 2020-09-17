import React from "react";
import { gql } from "apollo-boost";
import styled, { ThemeProvider } from "styled-components";
import GolobalStyles from "../Styles/GolobalStyles";
import Theme from "../Styles/Theme";
import Routes from "./Routes.js";
import { useQuery } from "react-apollo-hooks";
import Footer from "./Footer";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { HashRouter as Router } from "react-router-dom";
import Header from "./Header";

const QUERY = gql`
  {
    isLoggedIn @client
  }
`;

const Wrapper = styled.div`
  margin: 0 auto;
  max-width: ${(props) => props.theme.maxWidth};
  width: 100%;
`;

export default () => {
  const {
    data: { isLoggedIn },
  } = useQuery(QUERY);
  return (
    <ThemeProvider theme={Theme}>
      <GolobalStyles />
      <Router>
        <>
          <Header />
          <Wrapper>
            {console.log(isLoggedIn)}
            <Routes isLoggedIn={isLoggedIn} />
            <Footer />
          </Wrapper>
        </>
      </Router>
      <ToastContainer position={toast.POSITION.BOTTOM_LEFT} />
    </ThemeProvider>
  );
};
