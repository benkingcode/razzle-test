import styled from 'styled-components';

export const ExtraWrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 0 -10px;

  > div {
    box-sizing: border-box;
    width: calc(50% - 20px);
    height: 150px;
    background: #fafafa;
    padding: 10px;
    margin: 10px;
  }
`;
