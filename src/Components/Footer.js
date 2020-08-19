import React from "react";
import styled from "styled-components";

const Footer = styled.div`
  height: 20vh;
  display: flex;
  align-items: center;
  justify-content: space-between;
  text-transform: uppercase;
  font-size: 12px;
  font-weight: 600px;
`;

const List = styled.ul`
  display: flex;
  align-items: center;
`;

const ListItem = styled.li`
  &:not(:last-child) {
    margin-right: 16px;
  }
`;

const Link = styled.a`
  color: ${(props) => props.theme.darkBlueColor};
`;

const Copyright = styled.span`
  color: ${(props) => props.theme.darkGreyColor};
`;

const ListItems = [
  { id: 1, name: "소개", url: "#" },
  { id: 2, name: "도움말", url: "#" },
  { id: 3, name: "홍보 센터", url: "#" },
  { id: 4, name: "API", url: "#" },
  { id: 5, name: "채용", url: "#" },
  { id: 6, name: "정보개인정보처리방침", url: "#" },
  { id: 7, name: "약관", url: "#" },
  { id: 8, name: "위치", url: "#" },
  { id: 9, name: "인기 계정", url: "#" },
  { id: 10, name: "해시태그", url: "#" },
  { id: 11, name: "언어", url: "#" },
];

export default () => (
  <Footer>
    <List>
      {ListItems.map((item) => (
        <ListItem key={item.id}>
          <Link href={item.url}>{item.name}</Link>
        </ListItem>
      ))}
    </List>
    <Copyright>
      {new Date().getFullYear()} &copy; sulmogram from sulmo
    </Copyright>
  </Footer>
);
