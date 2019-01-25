import styled from 'styled-components';

export const InnerLayout = styled.div`
      h3 {
        padding: 15px;
        padding-bottom: 0;
      }
      a {
          padding: 15px;
          border-bottom: 1px solid ${({ theme }) => theme.colours.grey};
          text-decoration: none;
          color: ${({ theme }) => theme.colours.unoBlue};
          font-weight: bold;

          :first-of-type {
            border-top: 1px solid ${({ theme }) => theme.colours.grey};
          }

          :last-of-type {
            border-bottom: none;
          }

          :hover {
            color: white;
            background: ${({ theme }) => theme.colours.unoBlue};
            border: 0;
          }
        }
      }
    }
  } */}

  .columnWrap {
    display: flex;
    flex-wrap: wrap;

    > div {
      padding: 0px;
      margin: 15px;
      display: flex;
      flex-direction: column;
      box-shadow: 0px 2px 10px 0px rgba(0,0,0,0.25);
      border: 1px solid ${({ theme }) => theme.colours.grey};
      border-radius: 4px;
      width: 400px;
    }
  }
`;
