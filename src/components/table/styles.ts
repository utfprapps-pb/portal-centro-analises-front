import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  flex-direction: column;
  gap: 24px;

  height: 100%;
  overflow-y: scroll;
`

export const Table = styled.table`
  width: 100%;
  border-collapse: separate;
  border-spacing: 0px 12px;
`

export const TableBody = styled.tbody`
  background-color: ${({ theme }) => theme.colors.white};
  color: ${({ theme }) => theme.colors.text};

  tr {
    box-shadow: 0px 2px 2px rgba(50, 50, 71, 0.06),
      0px 2px 4px rgba(50, 50, 71, 0.06);
  }
`

type TableHeadCellProps = {
  cursor?: 'pointer' | 'default'
}

export const TableCell = styled.td<{ align?: string }>`
  padding: 16px 24px;
  text-align: center;
`

export const TableFoot = styled.tfoot`
  font-size: ${({ theme }) => theme.fontSizes.b3};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};

  td {
    padding: 0px 12px;
  }
`

export const TableHead = styled.thead`
  font-size: ${({ theme }) => theme.fontSizes.b4};
  font-weight: bold;
  color: ${({ theme }) => theme.colors.text};
`

export const TableHeadCell = styled.th<TableHeadCellProps>`
  text-align: center;
  padding: 0px 24px;
  cursor: ${(props) => props.cursor || 'pointer'};

  svg {
    vertical-align: middle;
    margin-left: 8px;
  }
`

export const TableRow = styled.tr``
