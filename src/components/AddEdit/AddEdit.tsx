import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { 
  Box, 
  Button, 
  InputAdornment, 
  FormControl, 
  InputLabel, 
  OutlinedInput, 
  Avatar, 
  Typography, 
  FormHelperText,
  Select,
  SelectChangeEvent,
  MenuItem
} from "@mui/material";
import { AccountBalanceWalletOutlined } from "@mui/icons-material";

import { Expense } from "../../types";
import { useLocalStorage } from "../../hooks/useLocalStorage";

export function AddEdit() {
  const { id } = useParams<{ id: string | undefined }>();
  const navigate = useNavigate();

  const [expenses, setExpenses] = useLocalStorage<Expense[]>('expenses', []);
  const [category, setCategory] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [comments, setComments] = useState<string>('');
  const [isValid, setIsValid] = useState<boolean>(false);
  const [touched, setTouched] = useState({ amount: false, category: false });
  const [amountError, setAmountError] = useState<string>('');
  const [categoryError, setCategoryError] = useState<string>('');

  const categories: string[] = ['Food', 'Transport', 'Shopping', 'Others'];

  useEffect(() => {
    if (id) {
      const existingExpense = expenses.find(expense => expense.position === +id);

      if (existingExpense) {
        setCategory(existingExpense.category);
        setAmount(existingExpense.amount);
        setComments(existingExpense.comment);
      }
    }
  }, [id, expenses]);

  useEffect(() => {
    setIsValid(amount > 0 && category !== '');
    setAmountError(touched.amount && amount <= 0 ? "Please enter a valid amount" : "");
    setCategoryError(touched.category && !category ? "Please select a category" : "");

  }, [amount, category, touched]);

  const handleCategoryChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value);
    setTouched(prev => ({ ...prev, category: true }));
  };

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAmount(+event.target.value);
    setTouched(prev => ({ ...prev, amount: true }));
  };

  const handleCommentsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setComments(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const expenseId = id ? +id : undefined;

    const newExpense: Expense = {
      position: expenseId || expenses.length + 1,
      amount,
      date: new Date().toISOString().split('T')[0],
      category,
      comment: comments
    };

    if (!expenseId) {
      setExpenses([...expenses, newExpense]);
    } else {
      const updatedExpenses = expenses.map(expense => expense.position === expenseId ? newExpense : expense);
      setExpenses(updatedExpenses);
    }

    navigate('/list');
  };

  const handleCancel = () => {
    navigate('/list');
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      noValidate
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '20px',
        alignItems: 'center',
        mt: '100px'
      }}
    >
      <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
        <AccountBalanceWalletOutlined />
      </Avatar>

      <Typography component="h1" variant="h5">
        Add new Expense
      </Typography>

      <FormControl sx={{ width: '260px' }} error={!!amountError}>
        <InputLabel htmlFor="outlined-adornment-amount">Amount</InputLabel>

        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label="Amount"
          value={amount}
          autoFocus
          onChange={handleAmountChange}
          onBlur={() => setTouched(prev => ({ ...prev, amount: true }))}
        />

        {(touched.amount && amountError) && 
          <FormHelperText>{amountError}</FormHelperText>
        }
      </FormControl>

      <FormControl sx={{ width: '260px' }} error={!!categoryError}>
        <InputLabel id="demo-simple-select-label">Categories</InputLabel>

        <Select
          labelId="select-label"
          id="select"
          value={category}
          label="Categories"
          onChange={handleCategoryChange}
          onBlur={() => setTouched(prev => ({ ...prev, category: true }))}
          required
        >
          {categories.map(item => (
            <MenuItem key={item} value={item}>{item}</MenuItem>
          ))}
        </Select>

        {(touched.category && categoryError) && 
          <FormHelperText>{categoryError}</FormHelperText>
        }
      </FormControl>

      <FormControl sx={{ width: '260px' }}>
        <InputLabel htmlFor="outlined-textarea">Comments</InputLabel>

        <OutlinedInput
          id="outlined-textarea"
          label="Comments"
          placeholder="Comments"
          multiline
          value={comments}
          onChange={handleCommentsChange}
        />
      </FormControl>

      <Box
        sx={{
          display: 'flex',
          gap: '10px',
          justifyContent: 'space-between',
          width: '260px'
        }}
      >
        <Button 
          fullWidth 
          type="submit" 
          variant="contained" 
          disabled={!isValid}
        >
          {id ? 'Save' : 'Add'}
        </Button>

        <Button 
          fullWidth 
          type="button" 
          variant="outlined" 
          onClick={handleCancel}
        >
          Cancel
        </Button>
      </Box>
    </Box>
  );
}