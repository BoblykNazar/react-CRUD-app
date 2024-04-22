import { useNavigate } from 'react-router-dom';
import {
  Button,
  IconButton,
  Paper,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
  Tooltip
} from '@mui/material';
import {
  Add,
  Edit,
  Delete
} from '@mui/icons-material';
import cn from 'classnames';

import './ExpensesList.scss';
import { Expense } from '../../types';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import emptyImg from '../../images/empty-box.svg';

export const ExpensesList = () => {
  const navigate = useNavigate();

  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);

  const handleDelete = (position: number) => {
    const updatedExpenses = expenses.filter(expense => expense.position !== position);
    const updatedPosition = updatedExpenses.map((expense, index) => ({
      ...expense,
      position: index + 1
    }));

    setExpenses(updatedPosition);
  };

  const handleEdit = (position: number) => {
    navigate(`/edit/${position}`);
  };

  return (
    <>
      <div className="table-wrapper">
        <div className="button-container">
          <Button variant="contained" endIcon={<Add />} onClick={() => navigate('/add')}>
            Add Expense
          </Button>
        </div>

        {expenses.length > 0 && (
          <TableContainer component={Paper} >
            <Table aria-label="table">
              <TableHead>
                <TableRow>
                  <TableCell>#</TableCell>

                  <TableCell align="left">Amount</TableCell>

                  <TableCell align="left">Date</TableCell>

                  <TableCell align="left">Category</TableCell>

                  <TableCell align="left">Comment</TableCell>

                  <TableCell align="center"></TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {expenses.map((expense) => {
                  const { position, amount, date, category, comment } = expense;

                  return (
                    <TableRow
                      key={position}
                      sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                    >
                      <TableCell component="th" scope="row">{position}</TableCell>

                      <TableCell align="left">{amount}</TableCell>

                      <TableCell align="left">{date}</TableCell>

                      <TableCell align="left">
                        <span className={cn(
                          'categories',
                          `${category.toLowerCase()}`
                        )}>
                          {category}
                        </span>
                      </TableCell>

                      <TableCell align="left">{comment}</TableCell>

                      <TableCell align="right">
                        <Tooltip title="Edit">
                          <IconButton aria-label="edit" onClick={() => handleEdit(expense.position)}>
                            <Edit className='edit' />
                          </IconButton>
                        </Tooltip>

                        <Tooltip title="Delete">
                          <IconButton aria-label="delete" onClick={() => handleDelete(expense.position)}>
                            <Delete className='delete' />
                          </IconButton>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {expenses.length === 0 && (
          <div >
            <img
              className='emptyImg'
              src={emptyImg}
              alt="emptyImg"
            />
            <h2>Your expense list is empty.</h2>
          </div>
        )}
      </div>
    </>
  );
}