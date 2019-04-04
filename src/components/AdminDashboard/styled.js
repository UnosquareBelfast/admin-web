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
            border-color: ${({ theme }) => theme.colours.unoBlue};
          }
        }

        .disabled {
          color: ${({ theme }) => theme.colours.grey};
          :hover {
            color: ${({ theme }) => theme.colours.grey};
            background: transparent;
            border-color: ${({ theme }) => theme.colours.grey};
          }
        }
      }
    }
  }

  .columnWrap {
    display: flex;
    flex-wrap: wrap;

    > div {
      padding: 0px;
      margin-right: 50px;
      margin-bottom: 25px;
      display: flex;
      flex-direction: column;
      width: 400px;
    }
  }
`;
