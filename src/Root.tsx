import {
  Navigate,
  Route,
  HashRouter as Router,
  Routes,
} from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { ExpensesList } from './components/ExpensesList';
import { AddEdit } from './components/AddEdit';
import { Login } from './components/Login';
import { App } from './App';

export const Root = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<App />}>
          <Route element={<ProtectedRoute />}>
            <Route index element={<Navigate replace to="/list" />} />

            <Route path="list" element={<ExpensesList />} />

            <Route path="add" element={<AddEdit />} />
            <Route path="/edit/:id" element={<AddEdit />} />
          </Route>

          <Route path="*" element={<Navigate replace to="/login" />} />
        </Route>

        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}
